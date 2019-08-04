import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';
import { ITeam, Team } from '../models/team';
import { ICoach, Coach } from '../models/coach';
import { IDivision, Division } from '../models/division';

@Injectable({
    providedIn: 'root',
})
export class TeamService {

    private _teamGetUrl;
    private _teamPostUrl;
    private _teamPutUrl;
    private _teamDeleteUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _cookieService: CookieService, private _logService: LogService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._teamGetUrl = this._configService.getApiURI() + "/Teams";
        this._teamPostUrl = this._configService.getApiURI() + "/Teams/Add";
        this._teamPutUrl = this._configService.getApiURI() + "/Teams/Update";
        this._teamDeleteUrl = this._configService.getApiURI() + "/Teams/Delete";
    }

    getTeams(): Observable<ITeam[]> {
        return this._httpClient.get<ITeam[]>(this._teamGetUrl).pipe(
            tap(data => this._logService.log('All Teams: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getTeam(id: number): Observable<ITeam> {
        return this.getTeams().pipe(
            map((teams: ITeam[]) => {
                const tm = teams.find(p => p.teamId === id);
                return new Team(tm.teamId, tm.teamName, tm.teamNameShort,
                    new Coach(tm.coach.coachId, tm.coach.coachName, tm.coach.coachNameShort),
                    new Division(tm.division.divisionId, tm.division.divisionName), tm.cheerleaderImage, tm.coachImage,
                    tm.headerImage, tm.logoImage, tm.hex, tm.r, tm.g, tm.b);
            }),
            tap(data => this._logService.log('Get Team: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getTeamByTeamName(teamName: string): Observable<ITeam> {
        return this.getTeams().pipe(
            map((teams: ITeam[]) => {
                const tm = teams.find(p => p.teamName === teamName);
                return new Team(tm.teamId, tm.teamName, tm.teamNameShort,
                    new Coach(tm.coach.coachId, tm.coach.coachName, tm.coach.coachNameShort),
                    new Division(tm.division.divisionId, tm.division.divisionName), tm.cheerleaderImage, tm.coachImage,
                    tm.headerImage, tm.logoImage, tm.hex, tm.r, tm.g, tm.b);
            }),
            tap(data => this._logService.log('Get Team By Team Name: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    addTeam(team: Team): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(team);

            let options = { headers: headers };

            return this._httpClient.post(this._teamPostUrl, body, options);
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(team);

            return this._httpClient.post(this._teamPostUrl, body, { headers });
        }
    }

    updateTeam(team: Team): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(team);

            return this._httpClient.put(this._teamPutUrl, body, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(team);

            return this._httpClient.put(this._teamPutUrl, body, { headers });
        }
    }

    deleteTeam(teamId: number): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

            const teamDeleteUrlWithId = this._teamDeleteUrl + '/' + teamId;

            return this._httpClient.delete(teamDeleteUrlWithId, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

            const teamDeleteUrlWithId = this._teamDeleteUrl + '/' + teamId;

            return this._httpClient.delete(teamDeleteUrlWithId, { headers });
        }
    }
}
