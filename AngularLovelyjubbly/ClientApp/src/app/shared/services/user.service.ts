import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';

//import { AccountRegister } from '../models/account.register';
//import { AccountChangePassword } from '../models/account.changepassword';
//import { AccountProfile } from '../models/account.profile';
//import { AccountForgotPassword } from '../models/account.forgotpassword';
//import { AccountResetPassword } from '../models/account.resetpassword';
//import { AccountAddPhoneNumber } from '../models/account.addphonenumber';
//import { AccountEnableTwoFactorAuth } from '../models/account.enabletwofactorauth';
//import { ICountry } from '../models/country';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private _userGetUrl;

    public getLoggedInName = new Subject<any>(); //Alternate method to Emitting data across Components. Subject() is doing both Emitting data and Subscribing it in another component. So its the best way to compare with Emitting using Output.
    private loggedIn = false;

    /** store cached requests */
    cachedRequests: Array<HttpRequest<any>> = [];

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private cookieService: CookieService, private _logService: LogService) {
        /** this.isLocalStorageAvailable = false; */
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();

        if (this.isLocalStorageAvailable) {
            this.loggedIn = !!localStorage.getItem('auth_token');
        } else {
            /** use cookies */
            this.loggedIn = !!cookieService.get('auth_token');
        }

        this._userGetUrl = this._configService.getApiURI() + "/UserProfiles";
    }

    login(userName: string, password: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        let options = { headers: headers };
        const body = JSON.stringify({ userName, password });

        return this._httpClient.post(this._configService.getApiURI() + '/auth/login', body, options).pipe(
            map(res => {
                console.log(res);
                if (res['two_factor_auth_enabled'] && res['two_factor_auth_enabled'] === true) {
                    this._logService.log('2fac');
                    this.getLoggedInName.next(false);
                    return false;
                } else {
                    if (this.isLocalStorageAvailable) {
                        this.addLocalStorageItemsOnLogin(res);
                        this.logLoginLocalStorageDetailsToConsole();
                    } else {
                        this.addCookieItemsOnLogin(res);
                        this.logLoginCookieDetailsToConsole();
                    }

                    this.loggedIn = true;
                    this.getLoggedInName.next(res['first_name']); //next() method is alternate to emit().

                    return true;
                }
            }),
            catchError(this._commonService.errorHandler)); 
    }

    addLocalStorageItemsOnLogin(res: any) {
        localStorage.setItem('auth_token', res.auth_token);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('auth_token_valid', res.expires_in);
        localStorage.setItem('auth_token_created', res.auth_token_created);
        localStorage.setItem('auth_token_expires', res.auth_token_expires);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('email', res.email);
        localStorage.setItem('two_factor_auth_enabled', res.two_factor_auth_enabled);
        localStorage.setItem('phone_number', res.phone_number);
        localStorage.setItem('first_name', res.first_name);
        localStorage.setItem('surname', res.surname);
    }

    addCookieItemsOnLogin(res: any) {
        this.cookieService.set('auth_token', res.auth_token);
        this.cookieService.set('userId', res.id);
        this.cookieService.set('auth_token_valid', res.expires_in);
        this.cookieService.set('auth_token_created', res.auth_token_created);
        this.cookieService.set('auth_token_expires', res.auth_token_expires);
        this.cookieService.set('refresh_token', res.refresh_token);
        this.cookieService.set('email', res.email);
        this.cookieService.set('two_factor_auth_enabled', res.two_factor_auth_enabled);
        this.cookieService.set('phone_number', res.phone_number);
        this.cookieService.set('first_name', res.first_name);
        this.cookieService.set('surname', res.surname);
    }

    logLoginLocalStorageDetailsToConsole() {
        this._logService.log(localStorage.getItem('auth_token'));
        this._logService.log(localStorage.getItem('userId'));
        this._logService.log(localStorage.getItem('auth_token_valid'));
        this._logService.log(localStorage.getItem('auth_token_created'));
        this._logService.log(localStorage.getItem('auth_token_expires'));
        this._logService.log(localStorage.getItem('refresh_token'));
        this._logService.log(localStorage.getItem('email'));
        this._logService.log(localStorage.getItem('two_factor_auth_enabled'));
        this._logService.log(localStorage.getItem('phone_number'));
        this._logService.log(localStorage.getItem('first_name'));
        this._logService.log(localStorage.getItem('surname'));
    }

    logLoginCookieDetailsToConsole() {
        this._logService.log(this.cookieService.get('auth_token'));
        this._logService.log(this.cookieService.get('userId'));
        this._logService.log(this.cookieService.get('auth_token_valid'));
        this._logService.log(this.cookieService.get('auth_token_created'));
        this._logService.log(this.cookieService.get('auth_token_expires'));
        this._logService.log(this.cookieService.get('refresh_token'));
        this._logService.log(this.cookieService.get('email'));
        this._logService.log(this.cookieService.get('two_factor_auth_enabled'));
        this._logService.log(this.cookieService.get('phone_number'));
        this._logService.log(this.cookieService.get('first_name'));
        this._logService.log(this.cookieService.get('surname'));
    }

    logout() {
        if (this.isLocalStorageAvailable) {
            this.clearLocalStorage();
        } else {
            this.clearCookies();
        }

        this.loggedIn = false;
        this.getLoggedInName.next(false);
    }

    clearLocalStorage() {
        localStorage.removeItem('userId');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_token_valid');
        localStorage.removeItem('auth_token_created');
        localStorage.removeItem('auth_token_expires');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('email');
        localStorage.removeItem('two_factor_auth_enabled');
        localStorage.removeItem('phone_number');
        localStorage.removeItem('first_name');
        localStorage.removeItem('surname');
        localStorage.removeItem('add_phone_number_token');
        localStorage.removeItem('phone_number_to_be_verified');
    }

    clearCookies() {
        this.cookieService.delete('userId');
        this.cookieService.delete('auth_token');
        this.cookieService.delete('auth_token_valid');
        this.cookieService.delete('auth_token_created');
        this.cookieService.delete('auth_token_expires');
        this.cookieService.delete('refresh_token');
        this.cookieService.delete('email');
        this.cookieService.delete('two_factor_auth_enabled');
        this.cookieService.delete('phone_number');
        this.cookieService.delete('first_name');
        this.cookieService.delete('surname');
        this.cookieService.delete('add_phone_number_token');
        this.cookieService.delete('phone_number_to_be_verified');
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    currentLanguage() : string {
        var lang;

        if (this.isLocalStorageAvailable) {
            lang = localStorage.getItem('selectedLang');
        } else {
            /** use cookies */
            lang = this.cookieService.get('selectedLang');
        }

        return lang;
    }

    //getTeams(): Observable<ITeam[]> {
    //    return this._httpClient.get<ITeam[]>(this._teamGetUrl).pipe(
    //        tap(data => console.log('All Teams: ' + JSON.stringify(data))),
    //        catchError(this._commonService.errorHandler));  /** catch error */
    //}

    //getTeam(id: number): Observable<ITeam> {
    //    return this.getTeams().pipe(
    //        map((teams: ITeam[]) => {
    //            const tm = teams.find(p => p.teamId === id);
    //            return new Team(tm.teamId, tm.teamName, tm.teamNameShort,
    //                new Coach(tm.coach.coachId, tm.coach.coachName, tm.coach.coachNameShort),
    //                new Division(tm.division.divisionId, tm.division.divisionName), tm.cheerleaderImage, tm.coachImage,
    //                tm.headerImage, tm.logoImage, tm.hex, tm.r, tm.g, tm.b);
    //        }),
    //        tap(data => console.log('Get Team: ' + JSON.stringify(data))),
    //        catchError(this._commonService.errorHandler));  /** catch error */
    //}

    //getTeamByTeamName(teamName: string): Observable<ITeam> {
    //    return this.getTeams().pipe(
    //        map((teams: ITeam[]) => {
    //            const tm = teams.find(p => p.teamName === teamName);
    //            return new Team(tm.teamId, tm.teamName, tm.teamNameShort,
    //                new Coach(tm.coach.coachId, tm.coach.coachName, tm.coach.coachNameShort),
    //                new Division(tm.division.divisionId, tm.division.divisionName), tm.cheerleaderImage, tm.coachImage,
    //                tm.headerImage, tm.logoImage, tm.hex, tm.r, tm.g, tm.b);
    //        }),
    //        tap(data => console.log('Get Team By Team Name: ' + JSON.stringify(data))),
    //        catchError(this._commonService.errorHandler));  /** catch error */
    //}

    //addTeam(team: Team): Observable<any> {
    //    if (this.isLocalStorageAvailable) {
    //        let authToken = localStorage.getItem('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
    //        const body = JSON.stringify(team);

    //        return this._httpClient.post(this._teamPostUrl, body, { headers });
    //    }
    //    else {
    //        //use cookies
    //        let authToken = this._cookieService.get('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
    //        const body = JSON.stringify(team);

    //        return this._httpClient.post(this._teamPostUrl, body, { headers });
    //    }
    //}

    //updateTeam(team: Team): Observable<any> {
    //    if (this.isLocalStorageAvailable) {
    //        let authToken = localStorage.getItem('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
    //        const body = JSON.stringify(team);

    //        return this._httpClient.put(this._teamPutUrl, body, { headers });
    //    }
    //    else {
    //        //use cookies
    //        let authToken = this._cookieService.get('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
    //        const body = JSON.stringify(team);

    //        return this._httpClient.put(this._teamPutUrl, body, { headers });
    //    }
    //}

    //deleteTeam(teamId: number): Observable<any> {
    //    if (this.isLocalStorageAvailable) {
    //        let authToken = localStorage.getItem('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

    //        const teamDeleteUrlWithId = this._teamDeleteUrl + '/' + teamId;

    //        return this._httpClient.delete(teamDeleteUrlWithId, { headers });
    //    }
    //    else {
    //        //use cookies
    //        let authToken = this._cookieService.get('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

    //        const teamDeleteUrlWithId = this._teamDeleteUrl + '/' + teamId;

    //        return this._httpClient.delete(teamDeleteUrlWithId, { headers });
    //    }
    //}
}
