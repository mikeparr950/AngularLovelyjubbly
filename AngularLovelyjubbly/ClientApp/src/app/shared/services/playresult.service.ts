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
    //private _fixtureGetByTeamAndTournamentUrl;
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
        //this._fixtureGetByTeamAndTournamentUrl = this._configService.getApiURI() + "/FixturesByTeamAndTournament";
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

    //getFixturesByTeamAndTournament(teamId: number, tournamentId: number): Observable<IFixtureList[]> {
    //    return this._httpClient.get(this._fixtureGetByTeamAndTournamentUrl + "/" + teamId + "/" + tournamentId).pipe(
    //        map((fixtures: IFixture[]) => {
    //            const fixtureList = new Array<FixtureList>();
    //            for (const i in fixtures) {
    //                if (fixtures.hasOwnProperty(i)) {
    //                    if (fixtures[i].homeTeam.teamId === teamId) {
    //                        if (fixtures[i].isOvertime) {
    //                            fixtureList.push(new FixtureList(fixtures[i].fixtureId,
    //                                new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
    //                                    fixtures[i].tournament.seasonId),
    //                                new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
    //                                new Team(fixtures[i].awayTeam.teamId, fixtures[i].awayTeam.teamName.toUpperCase(), fixtures[i].awayTeam.teamNameShort,
    //                                    new Coach(fixtures[i].awayTeam.coach.coachId, fixtures[i].awayTeam.coach.coachName,
    //                                        fixtures[i].awayTeam.coach.coachNameShort),
    //                                    new Division(fixtures[i].awayTeam.division.divisionId, fixtures[i].awayTeam.division.divisionName), '', '', '', fixtures[i].awayTeam.logoImage,
    //                                    '', null, null, null),
    //                                (fixtures[i].homeTeamScore === null) ? "-" : fixtures[i].homeTeamScore + '-' + fixtures[i].awayTeamScore + ' (OT)'));
    //                        }
    //                        else {
    //                            fixtureList.push(new FixtureList(fixtures[i].fixtureId,
    //                                new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
    //                                    fixtures[i].tournament.seasonId),
    //                                new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
    //                                new Team(fixtures[i].awayTeam.teamId, fixtures[i].awayTeam.teamName.toUpperCase(), fixtures[i].awayTeam.teamNameShort,
    //                                    new Coach(fixtures[i].awayTeam.coach.coachId, fixtures[i].awayTeam.coach.coachName,
    //                                        fixtures[i].awayTeam.coach.coachNameShort),
    //                                    new Division(fixtures[i].awayTeam.division.divisionId, fixtures[i].awayTeam.division.divisionName), '', '', '', fixtures[i].awayTeam.logoImage,
    //                                    '', null, null, null),
    //                                (fixtures[i].homeTeamScore === null) ? "-" : fixtures[i].homeTeamScore + '-' + fixtures[i].awayTeamScore));
    //                        }
    //                    }
    //                    else {
    //                        if (fixtures[i].isOvertime) {
    //                            fixtureList.push(new FixtureList(fixtures[i].fixtureId,
    //                                new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
    //                                    fixtures[i].tournament.seasonId),
    //                                new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
    //                                new Team(fixtures[i].homeTeam.teamId, fixtures[i].homeTeam.teamName, fixtures[i].homeTeam.teamNameShort,
    //                                    new Coach(fixtures[i].homeTeam.coach.coachId, fixtures[i].homeTeam.coach.coachName,
    //                                        fixtures[i].homeTeam.coach.coachNameShort),
    //                                    new Division(fixtures[i].homeTeam.division.divisionId, fixtures[i].homeTeam.division.divisionName), '', '', '', fixtures[i].homeTeam.logoImage,
    //                                    '', null, null, null),
    //                                (fixtures[i].awayTeamScore === null) ? "-" : fixtures[i].awayTeamScore + '-' + fixtures[i].homeTeamScore + ' (OT)'));
    //                        }
    //                        else {
    //                            fixtureList.push(new FixtureList(fixtures[i].fixtureId,
    //                                new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
    //                                    fixtures[i].tournament.seasonId),
    //                                new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
    //                                new Team(fixtures[i].homeTeam.teamId, fixtures[i].homeTeam.teamName, fixtures[i].homeTeam.teamNameShort,
    //                                    new Coach(fixtures[i].homeTeam.coach.coachId, fixtures[i].homeTeam.coach.coachName,
    //                                        fixtures[i].homeTeam.coach.coachNameShort),
    //                                    new Division(fixtures[i].homeTeam.division.divisionId, fixtures[i].homeTeam.division.divisionName), '', '', '', fixtures[i].homeTeam.logoImage,
    //                                    '', null, null, null),
    //                                (fixtures[i].awayTeamScore === null) ? "-" : fixtures[i].awayTeamScore + '-' + fixtures[i].homeTeamScore));
    //                        }
    //                    }
    //                }
    //            }
    //            return fixtureList;
    //        }),
    //        tap(data => this._logService.log('Fixtures By Team and Tournament: ' + JSON.stringify(data))),
    //        catchError(this._commonService.errorHandler));  /** catch error */
    //}

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
