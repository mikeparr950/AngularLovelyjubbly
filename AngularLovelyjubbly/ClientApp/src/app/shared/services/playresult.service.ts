import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';
import { IPlayResult, PlayResult } from '../models/playresult';
import { Formation } from '../models/formation';
import { OffensivePlay } from '../models/offensiveplay';
import { DefensivePlay } from '../models/defensiveplay';

@Injectable({
    providedIn: 'root',
})
export class PlayResultService {

    private _playResultGetUrl;
    private _playResultGetBySeasonNameUrl;
    //private _fixtureGetCompletedByTournamentUrl;
    //private _fixtureGetCompletedByTournamentAndDivisionUrl;
    private _playResultPostUrl;
    //private _fixturePutUrl;
    //private _fixtureDeleteUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _cookieService: CookieService, private _logService: LogService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._playResultGetUrl = this._configService.getApiURI() + "/PlayResults";
        this._playResultGetBySeasonNameUrl = this._configService.getApiURI() + "/PlayResultsBySeasonName/";
        //this._fixtureGetCompletedByTournamentUrl = this._configService.getApiURI() + "/CompletedFixturesByTournament";
        //this._fixtureGetCompletedByTournamentAndDivisionUrl = this._configService.getApiURI() + "/CompletedFixturesByTournamentAndDivision";
        this._playResultPostUrl = this._configService.getApiURI() + "/PlayResults/Add";
        //this._fixturePutUrl = this._configService.getApiURI() + "/Fixtures/Update";
        //this._fixtureDeleteUrl = this._configService.getApiURI() + "/Fixtures/Delete";
    }

    getPlayResults(): Observable<IPlayResult[]> {
        return this._httpClient.get<IPlayResult[]>(this._playResultGetUrl).pipe(
            map((pr: IPlayResult[]) => {
                const playresults = new Array<PlayResult>();
                for (const i in pr) {
                    if (pr.hasOwnProperty(i)) {
                        playresults.push(new PlayResult(pr[i].playResultId,
                            new Formation(pr[i].formation.formationId, pr[i].formation.formationName),
                            new OffensivePlay(pr[i].offensivePlay.offensivePlayId, pr[i].offensivePlay.offensivePlayName),
                            new DefensivePlay(pr[i].defensivePlay.defensivePlayId, pr[i].defensivePlay.defensivePlayName),
                            pr[i].yards, pr[i].isOffensivePenalty, pr[i].isDefensivePenalty, pr[i].isSack,
                            pr[i].isFumble, pr[i].isInterception, pr[i].returnYards));
                    }
                }
                return playresults;
            }),
            tap(data => this._logService.log('All Play Results: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getPlayResultsBySeasonName(seasonName: string): Observable<IPlayResult[]> {
        return this._httpClient.get<IPlayResult[]>(this._playResultGetBySeasonNameUrl + seasonName).pipe(
            map((pr: IPlayResult[]) => {
                const playresults = new Array<PlayResult>();
                for (const i in pr) {
                    if (pr.hasOwnProperty(i)) {
                        playresults.push(new PlayResult(pr[i].playResultId,
                            new Formation(pr[i].formation.formationId, pr[i].formation.formationName),
                            new OffensivePlay(pr[i].offensivePlay.offensivePlayId, pr[i].offensivePlay.offensivePlayName),
                            new DefensivePlay(pr[i].defensivePlay.defensivePlayId, pr[i].defensivePlay.defensivePlayName),
                            pr[i].yards, pr[i].isOffensivePenalty, pr[i].isDefensivePenalty, pr[i].isSack,
                            pr[i].isFumble, pr[i].isInterception, pr[i].returnYards));
                    }
                }
                return playresults;
            }),
            tap(data => this._logService.log('Get Play Results By Season Name: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    //getFixture(id: number): Observable<IFixture> {
    //    return this.getFixtures().pipe(
    //        map((fixtures: IFixture[]) => {
    //            const fx = fixtures.find(f => f.fixtureId === id);
    //            return new Fixture(fx.fixtureId,
    //                new Tournament(fx.tournament.tournamentId, fx.tournament.tournamentName, fx.tournament.seasonId),
    //                Number(fx.tournament.tournamentName.substr(fx.tournament.tournamentName.length - 4)),
    //                new Week(fx.week.weekId, fx.week.weekNumber),
    //                new Team(fx.homeTeam.teamId, fx.homeTeam.teamName, fx.homeTeam.teamNameShort,
    //                    null, null, '', '', '', '', '', null, null, null),
    //                fx.homeTeamScore,
    //                new Team(fx.awayTeam.teamId, fx.awayTeam.teamName, fx.awayTeam.teamNameShort,
    //                    null, null, '', '', '', '', '', null, null, null),
    //                fx.awayTeamScore, fx.isOvertime);
    //        }),
    //        tap(data => this._logService.log('Get Fixture: ' + JSON.stringify(data))),
    //        catchError(this._commonService.errorHandler));  /** catch error */
    //}

    addPlayResult(playResult: PlayResult): Observable<any> {
        if (this.isLocalStorageAvailable) {
            //let authToken = localStorage.getItem('auth_token');
            //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

            const body = JSON.stringify(playResult);

            return this._httpClient.post(this._playResultPostUrl, body, { headers });
        }
        else {
            //use cookies
            //let authToken = this._cookieService.get('auth_token');
            //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
            const body = JSON.stringify(playResult);

            return this._httpClient.post(this._playResultPostUrl, body, { headers });
        }
    }

    //updateFixture(fixture: Fixture): Observable<any> {
    //    if (this.isLocalStorageAvailable) {
    //        let authToken = localStorage.getItem('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
    //        const body = JSON.stringify(fixture);

    //        return this._httpClient.put(this._fixturePutUrl, body, { headers });
    //    }
    //    else {
    //        //use cookies
    //        let authToken = this._cookieService.get('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
    //        const body = JSON.stringify(fixture);

    //        return this._httpClient.put(this._fixturePutUrl, body, { headers });
    //    }
    //}

    //deleteFixture(fixtureId: number): Observable<any> {
    //    if (this.isLocalStorageAvailable) {
    //        let authToken = localStorage.getItem('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

    //        const fixtureDeleteUrlWithId = this._fixtureDeleteUrl + '/' + fixtureId;

    //        return this._httpClient.delete(fixtureDeleteUrlWithId, { headers });
    //    }
    //    else {
    //        //use cookies
    //        let authToken = this._cookieService.get('auth_token');
    //        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

    //        const fixtureDeleteUrlWithId = this._fixtureDeleteUrl + '/' + fixtureId;

    //        return this._httpClient.delete(fixtureDeleteUrlWithId, { headers });
    //    }
    //}
}
