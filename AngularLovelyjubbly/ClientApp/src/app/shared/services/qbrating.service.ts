import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';
import { IQBRating, QBRating } from '../models/qbrating';
import { Tournament } from '../models/tournament';
import { Team } from '../models/team';
import { Coach } from '../models/coach';
import { Division } from '../models/division';

@Injectable({
    providedIn: 'root',
})
export class QBRatingService {

    private _qbRatingGetUrl;
    private _qbRatingGetBySeasonNameUrl;
    private _qbRatingPostUrl;
    private _qbRatingPutUrl;
    private _qbRatingDeleteUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _cookieService: CookieService, private _logService: LogService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._qbRatingGetUrl = this._configService.getApiURI() + "/QBRatings";
        this._qbRatingGetBySeasonNameUrl = this._configService.getApiURI() + "/QBRatingsBySeasonName/";
        this._qbRatingPostUrl = this._configService.getApiURI() + "/QBRatings/Add";
        this._qbRatingPutUrl = this._configService.getApiURI() + "/QBRatings/Update";
        this._qbRatingDeleteUrl = this._configService.getApiURI() + "/QBRatings/Delete";
    }

    getQBRatings(): Observable<IQBRating[]> {
        return this._httpClient.get<IQBRating[]>(this._qbRatingGetUrl).pipe(
            map((qbratings: IQBRating[]) => {
                var qr = new Array<QBRating>();
                for (var i in qbratings) {
                    var calculatedRating = this.calculateQBRating(qbratings[i].completion, qbratings[i].gain, qbratings[i].touchdown,
                        qbratings[i].interception);
                    qr.push(new QBRating(qbratings[i].qbRatingId,
                        new Tournament(qbratings[i].tournament.tournamentId, qbratings[i].tournament.tournamentName,
                            qbratings[i].tournament.seasonId),
                        Number(qbratings[i].tournament.tournamentName.substr(qbratings[i].tournament.tournamentName.length - 4)),
                        new Team(qbratings[i].team.teamId, qbratings[i].team.teamName, qbratings[i].team.teamNameShort,
                            new Coach(0, '', ''),
                            new Division(0, ''), '', '', '', '', '', null, null, null),
                        qbratings[i].completion, qbratings[i].gain, qbratings[i].touchdown, qbratings[i].interception, +calculatedRating));
                }
                return qr;
            }),
            tap(data => this._logService.log('All QB Ratings: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getQBRating(id: number): Observable<IQBRating> {
        return this.getQBRatings().pipe(
            map((qbratings: IQBRating[]) => {
                const qbr = qbratings.find(q => q.qbRatingId === id);
                var calculatedRating = this.calculateQBRating(qbr.completion, qbr.gain, qbr.touchdown,
                    qbr.interception);
                return new QBRating(qbr.qbRatingId,
                    new Tournament(qbr.tournament.tournamentId, qbr.tournament.tournamentName, qbr.tournament.seasonId),
                    Number(qbr.tournament.tournamentName.substr(qbr.tournament.tournamentName.length - 4)),
                    new Team(qbr.team.teamId, qbr.team.teamName, qbr.team.teamNameShort,
                        new Coach(0, '', ''),
                        new Division(0, ''), '', '', '', '', '', null, null, null),
                    qbr.completion, qbr.gain, qbr.touchdown, qbr.interception, +calculatedRating);
            }),
            tap(data => this._logService.log('Get QB Rating: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getQBRatingsBySeasonName(seasonName: string): Observable<IQBRating[]> {
        return this._httpClient.get<IQBRating[]>(this._qbRatingGetBySeasonNameUrl + seasonName).pipe(
            map((qbratings: IQBRating[]) => {
                var qr = new Array<QBRating>();
                for (const i in qbratings) {
                    if (qbratings.hasOwnProperty(i)) {
                        if (qbratings[i].tournament.tournamentName.substring(qbratings[i].tournament.tournamentName.length - 4) === seasonName) {
                            var calculatedRating = this.calculateQBRating(qbratings[i].completion, qbratings[i].gain, qbratings[i].touchdown,
                                qbratings[i].interception);
                            qr.push(new QBRating(qbratings[i].qbRatingId,
                                new Tournament(qbratings[i].tournament.tournamentId, qbratings[i].tournament.tournamentName,
                                    qbratings[i].tournament.seasonId), Number(qbratings[i].tournament.tournamentName.substr(qbratings[i].tournament.tournamentName.length - 4)),
                                new Team(qbratings[i].team.teamId, qbratings[i].team.teamName, qbratings[i].team.teamNameShort,
                                    new Coach(0, '', ''),
                                    new Division(0, ''), '', '', '', '', '', null, null, null),
                                qbratings[i].completion, qbratings[i].gain, qbratings[i].touchdown, qbratings[i].interception, +calculatedRating));
                        }
                    }
                }
                return qr;
            }),
            tap(data => this._logService.log('Get QB Ratings By Season Name: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    calculateQBRating(completion: number, gain: number, touchdown: number, interception: number): string {

        var calculatedRating = '';

        completion = ((completion - 30) * 0.05);

        if (completion < 0) {
            completion = 0;
        }

        if (completion > 2.375) {
            completion = 2.375;
        }

        gain = ((gain - 3) * 0.25);

        if (gain < 0) {
            gain = 0;
        }

        if (gain > 2.375) {
            gain = 2.375;
        }

        touchdown = (touchdown * 0.2);

        if (touchdown > 2.375) {
            touchdown = 2.375;
        }

        interception = (2.375 - (interception * 0.25));

        if (interception < 0) {
            interception = 0;
        }

        calculatedRating = (((completion + gain + touchdown + interception) / 6) * 100).toFixed(2);

        return calculatedRating;
    }

    addQBRating(qbRating: QBRating): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(qbRating);

            return this._httpClient.post(this._qbRatingPostUrl, body, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(qbRating);

            return this._httpClient.post(this._qbRatingPostUrl, body, { headers });
        }
    }

    updateQBRating(qbRating: QBRating): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(qbRating);

            return this._httpClient.put(this._qbRatingPutUrl, body, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(qbRating);

            return this._httpClient.put(this._qbRatingPutUrl, body, { headers });
        }
    }

    deleteQBRating(qbRatingId: number): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

            const qbRatingDeleteUrlWithId = this._qbRatingDeleteUrl + '/' + qbRatingId;

            return this._httpClient.delete(qbRatingDeleteUrlWithId, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

            const qbRatingDeleteUrlWithId = this._qbRatingDeleteUrl + '/' + qbRatingId;

            return this._httpClient.delete(qbRatingDeleteUrlWithId, { headers });
        }
    }
}
