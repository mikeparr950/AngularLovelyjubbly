import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';
import { ITurnoverDifferential, TurnoverDifferential } from '../models/turnoverdifferential';
import { Tournament } from '../models/tournament';
import { Team } from '../models/team';
import { Coach } from '../models/coach';
import { Division } from '../models/division';

@Injectable({
    providedIn: 'root',
})
export class TurnoverDifferentialService {

    private _turnoverDifferentialGetUrl;
    private _turnoverDifferentialGetBySeasonNameUrl;
    private _turnoverDifferentialPostUrl;
    private _turnoverDifferentialPutUrl;
    private _turnoverDifferentialDeleteUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _cookieService: CookieService, private _logService: LogService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._turnoverDifferentialGetUrl = this._configService.getApiURI() + "/TurnoverDifferentials";
        this._turnoverDifferentialGetBySeasonNameUrl = this._configService.getApiURI() + "/TurnoverDifferentialsBySeasonName/";
        this._turnoverDifferentialPostUrl = this._configService.getApiURI() + "/TurnoverDifferentials/Add";
        this._turnoverDifferentialPutUrl = this._configService.getApiURI() + "/TurnoverDifferentials/Update";
        this._turnoverDifferentialDeleteUrl = this._configService.getApiURI() + "/TurnoverDifferentials/Delete";
    }

    getTurnoverDifferentials(): Observable<ITurnoverDifferential[]> {
        return this._httpClient.get<ITurnoverDifferential[]>(this._turnoverDifferentialGetUrl).pipe(
            map((turnoverdifferentials: ITurnoverDifferential[]) => {
                var td = new Array<TurnoverDifferential>();
                for (var i in turnoverdifferentials) {
                    td.push(new TurnoverDifferential(turnoverdifferentials[i].turnoverDifferentialId,
                        new Tournament(turnoverdifferentials[i].tournament.tournamentId, turnoverdifferentials[i].tournament.tournamentName,
                            turnoverdifferentials[i].tournament.seasonId),
                        Number(turnoverdifferentials[i].tournament.tournamentName.substr(turnoverdifferentials[i].tournament.tournamentName.length - 4)),
                        new Team(turnoverdifferentials[i].team.teamId, turnoverdifferentials[i].team.teamName,
                            turnoverdifferentials[i].team.teamNameShort,
                            new Coach(0, '', ''),
                            new Division(0, ''), '', '', '', '', '', null, null, null),
                        turnoverdifferentials[i].fumbleTakeaways, turnoverdifferentials[i].interceptionTakeaways,
                        turnoverdifferentials[i].fumbleTakeaways + turnoverdifferentials[i].interceptionTakeaways,
                        turnoverdifferentials[i].fumbleGiveaways, turnoverdifferentials[i].interceptionGiveaways,
                        turnoverdifferentials[i].fumbleGiveaways + turnoverdifferentials[i].interceptionGiveaways,
                        turnoverdifferentials[i].fumbleTakeaways + turnoverdifferentials[i].interceptionTakeaways -
                        turnoverdifferentials[i].fumbleGiveaways - turnoverdifferentials[i].interceptionGiveaways));
                }
                return td;
            }),
            tap(data => this._logService.log('All Turnover Differentials: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getTurnoverDifferential(id: number): Observable<ITurnoverDifferential> {
        return this.getTurnoverDifferentials().pipe(
            map((turnoverdifferentials: ITurnoverDifferential[]) => {
                const td = turnoverdifferentials.find(q => q.turnoverDifferentialId === id);
                var calculatedTurnoverDifferential = this.calculateTurnoverDifferential(td.fumbleTakeaways, td.interceptionTakeaways,
                    td.fumbleGiveaways, td.interceptionGiveaways);
                return new TurnoverDifferential(td.turnoverDifferentialId,
                    new Tournament(td.tournament.tournamentId, td.tournament.tournamentName,
                        td.tournament.seasonId),
                    Number(td.tournament.tournamentName.substr(td.tournament.tournamentName.length - 4)),
                    new Team(td.team.teamId, td.team.teamName,
                        td.team.teamNameShort,
                        new Coach(0, '', ''),
                        new Division(0, ''), '', '', '', '', '', null, null, null),
                    td.fumbleTakeaways, td.interceptionTakeaways,
                    td.fumbleTakeaways + td.interceptionTakeaways,
                    td.fumbleGiveaways, td.interceptionGiveaways,
                    td.fumbleGiveaways + td.interceptionGiveaways,
                    td.fumbleTakeaways + td.interceptionTakeaways -
                    td.fumbleGiveaways - td.interceptionGiveaways);
            }),
            tap(data => this._logService.log('Get QB Rating: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getTurnoverDifferentialsBySeasonName(seasonName: string): Observable<ITurnoverDifferential[]> {
        return this._httpClient.get<ITurnoverDifferential[]>(this._turnoverDifferentialGetBySeasonNameUrl + seasonName).pipe(
            map((turnoverdifferentials: ITurnoverDifferential[]) => {
                var td = new Array<TurnoverDifferential>();
                for (const i in turnoverdifferentials) {
                    if (turnoverdifferentials.hasOwnProperty(i)) {
                        if (turnoverdifferentials[i].tournament.tournamentName.substring
                            (turnoverdifferentials[i].tournament.tournamentName.length - 4) === seasonName) {
                            td.push(new TurnoverDifferential(turnoverdifferentials[i].turnoverDifferentialId,
                                new Tournament(turnoverdifferentials[i].tournament.tournamentId,
                                    turnoverdifferentials[i].tournament.tournamentName,
                                    turnoverdifferentials[i].tournament.seasonId),
                                Number(turnoverdifferentials[i].tournament.tournamentName.substr(turnoverdifferentials[i].tournament.tournamentName.length - 4)),
                                new Team(turnoverdifferentials[i].team.teamId, turnoverdifferentials[i].team.teamName,
                                    turnoverdifferentials[i].team.teamNameShort,
                                    new Coach(0, '', ''),
                                    new Division(0, ''), '', '', '', '', '', null, null, null),
                                turnoverdifferentials[i].fumbleTakeaways, turnoverdifferentials[i].interceptionTakeaways,
                                turnoverdifferentials[i].fumbleTakeaways + turnoverdifferentials[i].interceptionTakeaways,
                                turnoverdifferentials[i].fumbleGiveaways, turnoverdifferentials[i].interceptionGiveaways,
                                turnoverdifferentials[i].fumbleGiveaways + turnoverdifferentials[i].interceptionGiveaways,
                                turnoverdifferentials[i].fumbleTakeaways + turnoverdifferentials[i].interceptionTakeaways -
                                turnoverdifferentials[i].fumbleGiveaways - turnoverdifferentials[i].interceptionGiveaways));
                        }
                    }
                }
                return td;
            }),
            tap(data => this._logService.log('Turnover Differentials By Season Name: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    calculateTurnoverDifferential(fumbleTakeaways: number, interceptionTakeaways: number,
        fumbleGiveaways: number, interceptionGiveaways: number): number {

        var calculatedTurnoverDifferential = 0;

        if (fumbleTakeaways < 0) {
            fumbleTakeaways = 0;
        }

        if (interceptionTakeaways < 0) {
            interceptionTakeaways = 0;
        }

        if (fumbleGiveaways < 0) {
            fumbleGiveaways = 0;
        }

        if (interceptionGiveaways < 0) {
            interceptionGiveaways = 0;
        }

        calculatedTurnoverDifferential = +fumbleTakeaways + +interceptionTakeaways - +fumbleGiveaways - +interceptionGiveaways;

        return calculatedTurnoverDifferential;
    }

    addTurnoverDifferential(turnoverDifferential: TurnoverDifferential): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(turnoverDifferential);

            return this._httpClient.post(this._turnoverDifferentialPostUrl, body, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(turnoverDifferential);

            return this._httpClient.post(this._turnoverDifferentialPostUrl, body, { headers });
        }
    }

    updateTurnoverDifferential(turnoverDifferential: TurnoverDifferential): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(turnoverDifferential);

            return this._httpClient.put(this._turnoverDifferentialPutUrl, body, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(turnoverDifferential);

            return this._httpClient.put(this._turnoverDifferentialPutUrl, body, { headers });
        }
    }

    deleteTurnoverDifferential(turnoverDifferentialId: number): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

            const turnoverDifferentialDeleteUrlWithId = this._turnoverDifferentialDeleteUrl + '/' + turnoverDifferentialId;

            return this._httpClient.delete(turnoverDifferentialDeleteUrlWithId, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

            const turnoverDifferentialDeleteUrlWithId = this._turnoverDifferentialDeleteUrl + '/' + turnoverDifferentialId;

            return this._httpClient.delete(turnoverDifferentialDeleteUrlWithId, { headers });
        }
    }
}
