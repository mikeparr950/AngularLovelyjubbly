import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';
import { IFixture, Fixture } from '../models/fixture';
import { IFixtureList, FixtureList } from '../models/fixturelist';
import { Tournament } from '../models/tournament';
import { Week } from '../models/week';
import { Team } from '../models/team';
import { Coach } from '../models/coach';
import { Division } from '../models/division';
import { IStanding, Standing } from '../models/standing';

@Injectable({
    providedIn: 'root',
})
export class FixtureService {

    private _fixtureGetUrl;
    private _fixtureGetByTeamAndTournamentUrl;
    private _fixtureGetCompletedByTournamentUrl;
    private _fixtureGetCompletedByTournamentAndDivisionUrl;
    private _fixturePostUrl;
    private _fixturePutUrl;
    private _fixtureDeleteUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _cookieService: CookieService, private _logService: LogService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._fixtureGetUrl = this._configService.getApiURI() + "/Fixtures";
        this._fixtureGetByTeamAndTournamentUrl = this._configService.getApiURI() + "/FixturesByTeamAndTournament";
        this._fixtureGetCompletedByTournamentUrl = this._configService.getApiURI() + "/CompletedFixturesByTournament";
        this._fixtureGetCompletedByTournamentAndDivisionUrl = this._configService.getApiURI() + "/CompletedFixturesByTournamentAndDivision";
        this._fixturePostUrl = this._configService.getApiURI() + "/Fixtures/Add";
        this._fixturePutUrl = this._configService.getApiURI() + "/Fixtures/Update";
        this._fixtureDeleteUrl = this._configService.getApiURI() + "/Fixtures/Delete";
    }

    getFixtures(): Observable<IFixture[]> {
        return this._httpClient.get<IFixture[]>(this._fixtureGetUrl).pipe(
            map((fx: IFixture[]) => {
                const fixtures = new Array<Fixture>();
                for (const i in fx) {
                    if (fx.hasOwnProperty(i)) {
                        fixtures.push(new Fixture(fx[i].fixtureId,
                            new Tournament(fx[i].tournament.tournamentId, fx[i].tournament.tournamentName,
                                fx[i].tournament.seasonId), Number(fx[i].tournament.tournamentName.substr(fx[i].tournament.tournamentName.length - 4)),
                            new Week(fx[i].week.weekId, fx[i].week.weekNumber),
                            new Team(fx[i].homeTeam.teamId, fx[i].homeTeam.teamName, fx[i].homeTeam.teamNameShort,
                                new Coach(fx[i].homeTeam.coach.coachId, fx[i].homeTeam.coach.coachName,
                                    fx[i].homeTeam.coach.coachNameShort),
                                new Division(fx[i].homeTeam.division.divisionId, fx[i].homeTeam.division.divisionName), '', '', '', '',
                                '', null, null, null),
                            fx[i].homeTeamScore,
                            new Team(fx[i].awayTeam.teamId, fx[i].awayTeam.teamName, fx[i].awayTeam.teamNameShort,
                                new Coach(fx[i].awayTeam.coach.coachId, fx[i].awayTeam.coach.coachName,
                                    fx[i].awayTeam.coach.coachNameShort),
                                new Division(fx[i].awayTeam.division.divisionId, fx[i].awayTeam.division.divisionName), '', '', '', '',
                                '', null, null, null),
                            fx[i].awayTeamScore, fx[i].isOvertime));
                    }
                }
                return fixtures;
            }),
            tap(data => this._logService.log('All Fixtures: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getFixturesByTeamAndTournament(teamId: number, tournamentId: number): Observable<IFixtureList[]> {
        return this._httpClient.get(this._fixtureGetByTeamAndTournamentUrl + "/" + teamId + "/" + tournamentId).pipe(
            map((fixtures: IFixture[]) => {
                const fixtureList = new Array<FixtureList>();
                for (const i in fixtures) {
                    if (fixtures.hasOwnProperty(i)) {
                        if (fixtures[i].homeTeam.teamId === teamId) {
                            if (fixtures[i].isOvertime) {
                                fixtureList.push(new FixtureList(fixtures[i].fixtureId,
                                    new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
                                        fixtures[i].tournament.seasonId),
                                    new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
                                    new Team(fixtures[i].awayTeam.teamId, fixtures[i].awayTeam.teamName.toUpperCase(), fixtures[i].awayTeam.teamNameShort,
                                        new Coach(fixtures[i].awayTeam.coach.coachId, fixtures[i].awayTeam.coach.coachName,
                                            fixtures[i].awayTeam.coach.coachNameShort),
                                        new Division(fixtures[i].awayTeam.division.divisionId, fixtures[i].awayTeam.division.divisionName), '', '', '', fixtures[i].awayTeam.logoImage,
                                        '', null, null, null),
                                    (fixtures[i].homeTeamScore === null) ? "-" : fixtures[i].homeTeamScore + '-' + fixtures[i].awayTeamScore + ' (OT)'));
                            }
                            else {
                                fixtureList.push(new FixtureList(fixtures[i].fixtureId,
                                    new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
                                        fixtures[i].tournament.seasonId),
                                    new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
                                    new Team(fixtures[i].awayTeam.teamId, fixtures[i].awayTeam.teamName.toUpperCase(), fixtures[i].awayTeam.teamNameShort,
                                        new Coach(fixtures[i].awayTeam.coach.coachId, fixtures[i].awayTeam.coach.coachName,
                                            fixtures[i].awayTeam.coach.coachNameShort),
                                        new Division(fixtures[i].awayTeam.division.divisionId, fixtures[i].awayTeam.division.divisionName), '', '', '', fixtures[i].awayTeam.logoImage,
                                        '', null, null, null),
                                    (fixtures[i].homeTeamScore === null) ? "-" : fixtures[i].homeTeamScore + '-' + fixtures[i].awayTeamScore));
                            }
                        }
                        else {
                            if (fixtures[i].isOvertime) {
                                fixtureList.push(new FixtureList(fixtures[i].fixtureId,
                                    new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
                                        fixtures[i].tournament.seasonId),
                                    new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
                                    new Team(fixtures[i].homeTeam.teamId, fixtures[i].homeTeam.teamName, fixtures[i].homeTeam.teamNameShort,
                                        new Coach(fixtures[i].homeTeam.coach.coachId, fixtures[i].homeTeam.coach.coachName,
                                            fixtures[i].homeTeam.coach.coachNameShort),
                                        new Division(fixtures[i].homeTeam.division.divisionId, fixtures[i].homeTeam.division.divisionName), '', '', '', fixtures[i].homeTeam.logoImage,
                                        '', null, null, null),
                                    (fixtures[i].awayTeamScore === null) ? "-" : fixtures[i].awayTeamScore + '-' + fixtures[i].homeTeamScore + ' (OT)'));
                            }
                            else {
                                fixtureList.push(new FixtureList(fixtures[i].fixtureId,
                                    new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
                                        fixtures[i].tournament.seasonId),
                                    new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
                                    new Team(fixtures[i].homeTeam.teamId, fixtures[i].homeTeam.teamName, fixtures[i].homeTeam.teamNameShort,
                                        new Coach(fixtures[i].homeTeam.coach.coachId, fixtures[i].homeTeam.coach.coachName,
                                            fixtures[i].homeTeam.coach.coachNameShort),
                                        new Division(fixtures[i].homeTeam.division.divisionId, fixtures[i].homeTeam.division.divisionName), '', '', '', fixtures[i].homeTeam.logoImage,
                                        '', null, null, null),
                                    (fixtures[i].awayTeamScore === null) ? "-" : fixtures[i].awayTeamScore + '-' + fixtures[i].homeTeamScore));
                            }
                        }
                    }
                }
                return fixtureList;
            }),
            tap(data => this._logService.log('Fixtures By Team and Tournament: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getFixture(id: number): Observable<IFixture> {
        return this.getFixtures().pipe(
            map((fixtures: IFixture[]) => {
                const fx = fixtures.find(f => f.fixtureId === id);
                return new Fixture(fx.fixtureId,
                    new Tournament(fx.tournament.tournamentId, fx.tournament.tournamentName, fx.tournament.seasonId),
                    Number(fx.tournament.tournamentName.substr(fx.tournament.tournamentName.length - 4)),
                    new Week(fx.week.weekId, fx.week.weekNumber),
                    new Team(fx.homeTeam.teamId, fx.homeTeam.teamName, fx.homeTeam.teamNameShort,
                        null, null, '', '', '', '', '', null, null, null),
                    fx.homeTeamScore,
                    new Team(fx.awayTeam.teamId, fx.awayTeam.teamName, fx.awayTeam.teamNameShort,
                        null, null, '', '', '', '', '', null, null, null),
                    fx.awayTeamScore, fx.isOvertime);
            }),
            tap(data => this._logService.log('Get Fixture: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getCompletedRegularSeasonFixturesByTournament(id: number): Observable<IFixture[]> {
        return this._httpClient.get<IFixture[]>(this._fixtureGetCompletedByTournamentUrl + "/" + id).pipe(
            map((fixtures: IFixture[]) => {
                const completedFixtures = new Array<Fixture>();
                for (const i in fixtures) {
                    if (fixtures.hasOwnProperty(i)) {
                        completedFixtures.push(new Fixture(fixtures[i].fixtureId,
                            new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
                                fixtures[i].tournament.seasonId),
                            Number(fixtures[i].tournament.tournamentName.substr(fixtures[i].tournament.tournamentName.length - 4)),
                            new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
                            new Team(fixtures[i].homeTeam.teamId, fixtures[i].homeTeam.teamName, fixtures[i].homeTeam.teamNameShort,
                                new Coach(fixtures[i].homeTeam.coach.coachId, fixtures[i].homeTeam.coach.coachName,
                                    fixtures[i].homeTeam.coach.coachNameShort),
                                new Division(fixtures[i].homeTeam.division.divisionId, fixtures[i].homeTeam.division.divisionName),
                                '', '', '', '', '', null, null, null),
                            fixtures[i].homeTeamScore,
                            new Team(fixtures[i].awayTeam.teamId, fixtures[i].awayTeam.teamName, fixtures[i].awayTeam.teamNameShort,
                                new Coach(fixtures[i].awayTeam.coach.coachId, fixtures[i].awayTeam.coach.coachName,
                                    fixtures[i].awayTeam.coach.coachNameShort),
                                new Division(fixtures[i].awayTeam.division.divisionId, fixtures[i].awayTeam.division.divisionName),
                                '', '', '', '', '', null, null, null),
                            fixtures[i].awayTeamScore, fixtures[i].isOvertime));
                    }
                }
                return completedFixtures;
            }),
            tap(data => this._logService.log('Selected fixtures: ' + JSON.stringify(data))), /** log returned data to console */
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getCompletedRegularSeasonFixturesByTournamentAndDivision(tournamentId: number, divisionId: number): Observable<IFixture[]> {
        return this._httpClient.get<IFixture[]>(this._fixtureGetCompletedByTournamentAndDivisionUrl + "/" + tournamentId + "/" + divisionId).pipe(
            map((fixtures: IFixture[]) => {
                const completedFixtures = new Array<Fixture>();
                for (const i in fixtures) {
                    if (fixtures.hasOwnProperty(i)) {
                        completedFixtures.push(new Fixture(fixtures[i].fixtureId,
                            new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
                                fixtures[i].tournament.seasonId),
                            Number(fixtures[i].tournament.tournamentName.substr(fixtures[i].tournament.tournamentName.length - 4)),
                            new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
                            new Team(fixtures[i].homeTeam.teamId, fixtures[i].homeTeam.teamName, fixtures[i].homeTeam.teamNameShort,
                                new Coach(fixtures[i].homeTeam.coach.coachId, fixtures[i].homeTeam.coach.coachName,
                                    fixtures[i].homeTeam.coach.coachNameShort),
                                new Division(fixtures[i].homeTeam.division.divisionId, fixtures[i].homeTeam.division.divisionName),
                                '', fixtures[i].homeTeam.coachImage, '', '', '', null, null, null),
                            fixtures[i].homeTeamScore,
                            new Team(fixtures[i].awayTeam.teamId, fixtures[i].awayTeam.teamName, fixtures[i].awayTeam.teamNameShort,
                                new Coach(fixtures[i].awayTeam.coach.coachId, fixtures[i].awayTeam.coach.coachName,
                                    fixtures[i].awayTeam.coach.coachNameShort),
                                new Division(fixtures[i].awayTeam.division.divisionId, fixtures[i].awayTeam.division.divisionName),
                                '', fixtures[i].awayTeam.coachImage, '', '', '', null, null, null),
                            fixtures[i].awayTeamScore, fixtures[i].isOvertime));
                    }
                }
                return completedFixtures;
            }),
            tap(data => this._logService.log('Selected fixtures: ' + JSON.stringify(data))), /** log returned data to console */
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    //getCompletedRegularSeasonFixturesByTournament(id: number): Observable<IFixture[]> {
    //    return this.getFixtures().pipe(
    //        map((fixtures: IFixture[]) => {
    //            const completedFixtures = new Array<Fixture>();
    //            for (const i in fixtures) {
    //                if (fixtures[i].tournament.tournamentId === id && fixtures[i].homeTeamScore !== null
    //                    && fixtures[i].awayTeamScore !== null
    //                    && parseInt(fixtures[i].week.weekNumber, 10) < 17) {
    //                    completedFixtures.push(new Fixture(fixtures[i].fixtureId,
    //                        new Tournament(fixtures[i].tournament.tournamentId, fixtures[i].tournament.tournamentName,
    //                            fixtures[i].tournament.seasonId),
    //                        Number(fixtures[i].tournament.tournamentName.substr(fixtures[i].tournament.tournamentName.length - 4)),
    //                        new Week(fixtures[i].week.weekId, fixtures[i].week.weekNumber),
    //                        new Team(fixtures[i].homeTeam.teamId, fixtures[i].homeTeam.teamName, fixtures[i].homeTeam.teamNameShort,
    //                            new Coach(fixtures[i].homeTeam.coach.coachId, fixtures[i].homeTeam.coach.coachName,
    //                                fixtures[i].homeTeam.coach.coachNameShort),
    //                            new Division(fixtures[i].homeTeam.division.divisionId, fixtures[i].homeTeam.division.divisionName),
    //                            '', '', '', '', '', null, null, null),
    //                        fixtures[i].homeTeamScore,
    //                        new Team(fixtures[i].awayTeam.teamId, fixtures[i].awayTeam.teamName, fixtures[i].awayTeam.teamNameShort,
    //                            new Coach(fixtures[i].awayTeam.coach.coachId, fixtures[i].awayTeam.coach.coachName,
    //                                fixtures[i].awayTeam.coach.coachNameShort),
    //                            new Division(fixtures[i].awayTeam.division.divisionId, fixtures[i].awayTeam.division.divisionName),
    //                            '', '', '', '', '', null, null, null),
    //                        fixtures[i].awayTeamScore, fixtures[i].isOvertime));
    //                }
    //            }
    //            return completedFixtures;
    //        }),
    //        tap(data => this._logService.log('Selected fixtures: ' + JSON.stringify(data))), /** log returned data to console */
    //        catchError(this._commonService.errorHandler));  /** catch error */
    //}

    getAFCEastStandingsByTournament(tournamentId: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournamentAndDivision(tournamentId, 7).pipe(
            map((fixtures: IFixture[]) => {
                let standingsAFCEast = new Array<Standing>();

                let teamName = '';
                let teamNameShort = '';
                let coachId = 0;
                let coachName = '';
                let coachNameShort = '';
                let coachImage = '';
                let divisionId = 0;
                let divisionName = '';
                let won = 0;
                let lost = 0;
                let tied = 0;
                let pointsFor = 0;
                let pointsAgainst = 0;
                let pointsDifference = 0;

                let countMia = 0;
                let countNE = 0;
                let countNY = 0;
                let countInd = 0;

                const fxMia = fixtures.filter(f => f.awayTeam.teamId === 38 || f.homeTeam.teamId === 38);

                for (let j = 0; j < fxMia.length; j++) {

                    if (fxMia[j].homeTeam.teamId === 38) {
                        teamName = fxMia[j].homeTeam.teamName;
                        teamNameShort = fxMia[j].homeTeam.teamNameShort;
                        coachId = fxMia[j].homeTeam.coach.coachId;
                        coachName = fxMia[j].homeTeam.coach.coachName;
                        coachNameShort = fxMia[j].homeTeam.coach.coachNameShort;
                        coachImage = fxMia[j].homeTeam.coachImage;
                        divisionId = fxMia[j].homeTeam.division.divisionId;
                        divisionName = fxMia[j].homeTeam.division.divisionName;
                        if (fxMia[j].homeTeamScore > fxMia[j].awayTeamScore) {
                            won++;
                        }
                        if (fxMia[j].homeTeamScore === fxMia[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxMia[j].homeTeamScore < fxMia[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxMia[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxMia[j].awayTeamScore;
                    }

                    if (fxMia[j].awayTeam.teamId === 38) {
                        teamName = fxMia[j].awayTeam.teamName;
                        teamNameShort = fxMia[j].awayTeam.teamNameShort;
                        coachId = fxMia[j].awayTeam.coach.coachId;
                        coachName = fxMia[j].awayTeam.coach.coachName;
                        coachNameShort = fxMia[j].awayTeam.coach.coachNameShort;
                        coachImage = fxMia[j].awayTeam.coachImage;
                        divisionId = fxMia[j].awayTeam.division.divisionId;
                        divisionName = fxMia[j].awayTeam.division.divisionName;
                        if (fxMia[j].awayTeamScore > fxMia[j].homeTeamScore) {
                            won++;
                        }
                        if (fxMia[j].awayTeamScore === fxMia[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxMia[j].awayTeamScore < fxMia[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxMia[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxMia[j].homeTeamScore;
                    }

                    countMia++;

                    if (countMia === fxMia.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCEast.push
                            (new Standing(new Team(38, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxNE = fixtures.filter(f => f.awayTeam.teamId === 40 || f.homeTeam.teamId === 40);

                for (let j = 0; j < fxNE.length; j++) {

                    if (fxNE[j].homeTeam.teamId === 40) {
                        teamName = fxNE[j].homeTeam.teamName;
                        teamNameShort = fxNE[j].homeTeam.teamNameShort;
                        coachId = fxNE[j].homeTeam.coach.coachId;
                        coachName = fxNE[j].homeTeam.coach.coachName;
                        coachNameShort = fxNE[j].homeTeam.coach.coachNameShort;
                        coachImage = fxNE[j].homeTeam.coachImage;
                        divisionId = fxNE[j].homeTeam.division.divisionId;
                        divisionName = fxNE[j].homeTeam.division.divisionName;
                        if (fxNE[j].homeTeamScore > fxNE[j].awayTeamScore) {
                            won++;
                        }
                        if (fxNE[j].homeTeamScore === fxNE[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxNE[j].homeTeamScore < fxNE[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxNE[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxNE[j].awayTeamScore;
                    }

                    if (fxNE[j].awayTeam.teamId === 40) {
                        teamName = fxNE[j].awayTeam.teamName;
                        teamNameShort = fxNE[j].awayTeam.teamNameShort;
                        coachId = fxNE[j].awayTeam.coach.coachId;
                        coachName = fxNE[j].awayTeam.coach.coachName;
                        coachNameShort = fxNE[j].awayTeam.coach.coachNameShort;
                        coachImage = fxNE[j].awayTeam.coachImage;
                        divisionId = fxNE[j].awayTeam.division.divisionId;
                        divisionName = fxNE[j].awayTeam.division.divisionName;
                        if (fxNE[j].awayTeamScore > fxNE[j].homeTeamScore) {
                            won++;
                        }
                        if (fxNE[j].awayTeamScore === fxNE[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxNE[j].awayTeamScore < fxNE[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxNE[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxNE[j].homeTeamScore;
                    }

                    countNE++;

                    if (countNE === fxNE.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCEast.push
                            (new Standing(new Team(40, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxNY = fixtures.filter(f => f.awayTeam.teamId === 43 || f.homeTeam.teamId === 43);

                for (let j = 0; j < fxNY.length; j++) {

                    if (fxNY[j].homeTeam.teamId === 43) {
                        teamName = fxNY[j].homeTeam.teamName;
                        teamNameShort = fxNY[j].homeTeam.teamNameShort;
                        coachId = fxNY[j].homeTeam.coach.coachId;
                        coachName = fxNY[j].homeTeam.coach.coachName;
                        coachNameShort = fxNY[j].homeTeam.coach.coachNameShort;
                        coachImage = fxNY[j].homeTeam.coachImage;
                        divisionId = fxNY[j].homeTeam.division.divisionId;
                        divisionName = fxNY[j].homeTeam.division.divisionName;
                        if (fxNY[j].homeTeamScore > fxNY[j].awayTeamScore) {
                            won++;
                        }
                        if (fxNY[j].homeTeamScore === fxNY[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxNY[j].homeTeamScore < fxNY[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxNY[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxNY[j].awayTeamScore;
                    }

                    if (fxNY[j].awayTeam.teamId === 43) {
                        teamName = fxNY[j].awayTeam.teamName;
                        teamNameShort = fxNY[j].awayTeam.teamNameShort;
                        coachId = fxNY[j].awayTeam.coach.coachId;
                        coachName = fxNY[j].awayTeam.coach.coachName;
                        coachNameShort = fxNY[j].awayTeam.coach.coachNameShort;
                        coachImage = fxNY[j].awayTeam.coachImage;
                        divisionId = fxNY[j].awayTeam.division.divisionId;
                        divisionName = fxNY[j].awayTeam.division.divisionName;
                        if (fxNY[j].awayTeamScore > fxNY[j].homeTeamScore) {
                            won++;
                        }
                        if (fxNY[j].awayTeamScore === fxNY[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxNY[j].awayTeamScore < fxNY[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxNY[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxNY[j].homeTeamScore;
                    }

                    countNY++;

                    if (countNY === fxNY.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCEast.push
                            (new Standing(new Team(43, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxInd = fixtures.filter(f => f.awayTeam.teamId === 33 || f.homeTeam.teamId === 33);

                for (let j = 0; j < fxInd.length; j++) {

                    if (fxInd[j].homeTeam.teamId === 33) {
                        teamName = fxInd[j].homeTeam.teamName;
                        teamNameShort = fxInd[j].homeTeam.teamNameShort;
                        coachId = fxInd[j].homeTeam.coach.coachId;
                        coachName = fxInd[j].homeTeam.coach.coachName;
                        coachNameShort = fxInd[j].homeTeam.coach.coachNameShort;
                        coachImage = fxInd[j].homeTeam.coachImage;
                        divisionId = fxInd[j].homeTeam.division.divisionId;
                        divisionName = fxInd[j].homeTeam.division.divisionName;
                        if (fxInd[j].homeTeamScore > fxInd[j].awayTeamScore) {
                            won++;
                        }
                        if (fxInd[j].homeTeamScore === fxInd[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxInd[j].homeTeamScore < fxInd[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxInd[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxInd[j].awayTeamScore;
                    }

                    if (fxInd[j].awayTeam.teamId === 33) {
                        teamName = fxInd[j].awayTeam.teamName;
                        teamNameShort = fxInd[j].awayTeam.teamNameShort;
                        coachId = fxInd[j].awayTeam.coach.coachId;
                        coachName = fxInd[j].awayTeam.coach.coachName;
                        coachNameShort = fxInd[j].awayTeam.coach.coachNameShort;
                        coachImage = fxInd[j].awayTeam.coachImage;
                        divisionId = fxInd[j].awayTeam.division.divisionId;
                        divisionName = fxInd[j].awayTeam.division.divisionName;
                        if (fxInd[j].awayTeamScore > fxInd[j].homeTeamScore) {
                            won++;
                        }
                        if (fxInd[j].awayTeamScore === fxInd[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxInd[j].awayTeamScore < fxInd[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxInd[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxInd[j].homeTeamScore;
                    }

                    countInd++;

                    if (countInd === fxInd.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCEast.push
                            (new Standing(new Team(33, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }


                /** sort */
                standingsAFCEast.sort(function (a, b) {

                    /** a tie is equal to 0.5 wins, so 2 ties === 1 win, but calculation not needed unless team has
                    more than one tie in a season, so not currently included in this sort */
                    if ((a.won === b.won) && (a.tied === b.tied) && (a.pointsDifference === b.pointsDifference)) {
                        return (a.pointsFor > b.pointsFor) ? -1 : (a.pointsFor < b.pointsFor) ? 1 : 0;
                    } else if ((a.won === b.won) && (a.tied === b.tied)) {
                        return (a.pointsDifference > b.pointsDifference) ? -1 : (a.pointsDifference < b.pointsDifference) ? 1 : 0;
                    } else if (a.won === b.won) {
                        return (a.tied > b.tied) ? -1 : (a.tied < b.tied) ? 1 : 0;
                    } else {
                        return (a.won > b.won) ? -1 : 1;
                    }
                });

                return standingsAFCEast;

            }),
            tap(data => this._logService.log('AFC East standings: ' + JSON.stringify(data))), /** log returned data to console */
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getAFCCentralStandingsByTournament(tournamentId: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournamentAndDivision(tournamentId, 6).pipe(
            map((fixtures: IFixture[]) => {
                let standingsAFCCentral = new Array<Standing>();

                let teamName = '';
                let teamNameShort = '';
                let coachId = 0;
                let coachName = '';
                let coachNameShort = '';
                let coachImage = '';
                let divisionId = 0;
                let divisionName = '';
                let won = 0;
                let lost = 0;
                let tied = 0;
                let pointsFor = 0;
                let pointsAgainst = 0;
                let pointsDifference = 0;

                let countHou = 0;
                let countCin = 0;
                let countPit = 0;
                let countCle = 0;

                const fxHou = fixtures.filter(f => f.awayTeam.teamId === 32 || f.homeTeam.teamId === 32);

                for (let j = 0; j < fxHou.length; j++) {

                    if (fxHou[j].homeTeam.teamId === 32) {
                        teamName = fxHou[j].homeTeam.teamName;
                        teamNameShort = fxHou[j].homeTeam.teamNameShort;
                        coachId = fxHou[j].homeTeam.coach.coachId;
                        coachName = fxHou[j].homeTeam.coach.coachName;
                        coachNameShort = fxHou[j].homeTeam.coach.coachNameShort;
                        coachImage = fxHou[j].homeTeam.coachImage;
                        divisionId = fxHou[j].homeTeam.division.divisionId;
                        divisionName = fxHou[j].homeTeam.division.divisionName;
                        if (fxHou[j].homeTeamScore > fxHou[j].awayTeamScore) {
                            won++;
                        }
                        if (fxHou[j].homeTeamScore === fxHou[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxHou[j].homeTeamScore < fxHou[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxHou[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxHou[j].awayTeamScore;
                    }

                    if (fxHou[j].awayTeam.teamId === 32) {
                        teamName = fxHou[j].awayTeam.teamName;
                        teamNameShort = fxHou[j].awayTeam.teamNameShort;
                        coachId = fxHou[j].awayTeam.coach.coachId;
                        coachName = fxHou[j].awayTeam.coach.coachName;
                        coachNameShort = fxHou[j].awayTeam.coach.coachNameShort;
                        coachImage = fxHou[j].awayTeam.coachImage;
                        divisionId = fxHou[j].awayTeam.division.divisionId;
                        divisionName = fxHou[j].awayTeam.division.divisionName;
                        if (fxHou[j].awayTeamScore > fxHou[j].homeTeamScore) {
                            won++;
                        }
                        if (fxHou[j].awayTeamScore === fxHou[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxHou[j].awayTeamScore < fxHou[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxHou[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxHou[j].homeTeamScore;
                    }

                    countHou++;

                    if (countHou === fxHou.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCCentral.push
                            (new Standing(new Team(32, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxCin = fixtures.filter(f => f.awayTeam.teamId === 24 || f.homeTeam.teamId === 24);

                for (let j = 0; j < fxCin.length; j++) {

                    if (fxCin[j].homeTeam.teamId === 24) {
                        teamName = fxCin[j].homeTeam.teamName;
                        teamNameShort = fxCin[j].homeTeam.teamNameShort;
                        coachId = fxCin[j].homeTeam.coach.coachId;
                        coachName = fxCin[j].homeTeam.coach.coachName;
                        coachNameShort = fxCin[j].homeTeam.coach.coachNameShort;
                        coachImage = fxCin[j].homeTeam.coachImage;
                        divisionId = fxCin[j].homeTeam.division.divisionId;
                        divisionName = fxCin[j].homeTeam.division.divisionName;
                        if (fxCin[j].homeTeamScore > fxCin[j].awayTeamScore) {
                            won++;
                        }
                        if (fxCin[j].homeTeamScore === fxCin[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxCin[j].homeTeamScore < fxCin[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxCin[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxCin[j].awayTeamScore;
                    }

                    if (fxCin[j].awayTeam.teamId === 24) {
                        teamName = fxCin[j].awayTeam.teamName;
                        teamNameShort = fxCin[j].awayTeam.teamNameShort;
                        coachId = fxCin[j].awayTeam.coach.coachId;
                        coachName = fxCin[j].awayTeam.coach.coachName;
                        coachNameShort = fxCin[j].awayTeam.coach.coachNameShort;
                        coachImage = fxCin[j].awayTeam.coachImage;
                        divisionId = fxCin[j].awayTeam.division.divisionId;
                        divisionName = fxCin[j].awayTeam.division.divisionName;
                        if (fxCin[j].awayTeamScore > fxCin[j].homeTeamScore) {
                            won++;
                        }
                        if (fxCin[j].awayTeamScore === fxCin[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxCin[j].awayTeamScore < fxCin[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxCin[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxCin[j].homeTeamScore;
                    }

                    countCin++;

                    if (countCin === fxCin.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCCentral.push
                            (new Standing(new Team(24, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxPit = fixtures.filter(f => f.awayTeam.teamId === 46 || f.homeTeam.teamId === 46);

                for (let j = 0; j < fxPit.length; j++) {

                    if (fxPit[j].homeTeam.teamId === 46) {
                        teamName = fxPit[j].homeTeam.teamName;
                        teamNameShort = fxPit[j].homeTeam.teamNameShort;
                        coachId = fxPit[j].homeTeam.coach.coachId;
                        coachName = fxPit[j].homeTeam.coach.coachName;
                        coachNameShort = fxPit[j].homeTeam.coach.coachNameShort;
                        coachImage = fxPit[j].homeTeam.coachImage;
                        divisionId = fxPit[j].homeTeam.division.divisionId;
                        divisionName = fxPit[j].homeTeam.division.divisionName;
                        if (fxPit[j].homeTeamScore > fxPit[j].awayTeamScore) {
                            won++;
                        }
                        if (fxPit[j].homeTeamScore === fxPit[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxPit[j].homeTeamScore < fxPit[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxPit[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxPit[j].awayTeamScore;
                    }

                    if (fxPit[j].awayTeam.teamId === 46) {
                        teamName = fxPit[j].awayTeam.teamName;
                        teamNameShort = fxPit[j].awayTeam.teamNameShort;
                        coachId = fxPit[j].awayTeam.coach.coachId;
                        coachName = fxPit[j].awayTeam.coach.coachName;
                        coachNameShort = fxPit[j].awayTeam.coach.coachNameShort;
                        coachImage = fxPit[j].awayTeam.coachImage;
                        divisionId = fxPit[j].awayTeam.division.divisionId;
                        divisionName = fxPit[j].awayTeam.division.divisionName;
                        if (fxPit[j].awayTeamScore > fxPit[j].homeTeamScore) {
                            won++;
                        }
                        if (fxPit[j].awayTeamScore === fxPit[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxPit[j].awayTeamScore < fxPit[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxPit[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxPit[j].homeTeamScore;
                    }

                    countPit++;

                    if (countPit === fxPit.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCCentral.push
                            (new Standing(new Team(46, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxCle = fixtures.filter(f => f.awayTeam.teamId === 25 || f.homeTeam.teamId === 25);

                for (let j = 0; j < fxCle.length; j++) {

                    if (fxCle[j].homeTeam.teamId === 25) {
                        teamName = fxCle[j].homeTeam.teamName;
                        teamNameShort = fxCle[j].homeTeam.teamNameShort;
                        coachId = fxCle[j].homeTeam.coach.coachId;
                        coachName = fxCle[j].homeTeam.coach.coachName;
                        coachNameShort = fxCle[j].homeTeam.coach.coachNameShort;
                        coachImage = fxCle[j].homeTeam.coachImage;
                        divisionId = fxCle[j].homeTeam.division.divisionId;
                        divisionName = fxCle[j].homeTeam.division.divisionName;
                        if (fxCle[j].homeTeamScore > fxCle[j].awayTeamScore) {
                            won++;
                        }
                        if (fxCle[j].homeTeamScore === fxCle[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxCle[j].homeTeamScore < fxCle[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxCle[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxCle[j].awayTeamScore;
                    }

                    if (fxCle[j].awayTeam.teamId === 25) {
                        teamName = fxCle[j].awayTeam.teamName;
                        teamNameShort = fxCle[j].awayTeam.teamNameShort;
                        coachId = fxCle[j].awayTeam.coach.coachId;
                        coachName = fxCle[j].awayTeam.coach.coachName;
                        coachNameShort = fxCle[j].awayTeam.coach.coachNameShort;
                        coachImage = fxCle[j].awayTeam.coachImage;
                        divisionId = fxCle[j].awayTeam.division.divisionId;
                        divisionName = fxCle[j].awayTeam.division.divisionName;
                        if (fxCle[j].awayTeamScore > fxCle[j].homeTeamScore) {
                            won++;
                        }
                        if (fxCle[j].awayTeamScore === fxCle[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxCle[j].awayTeamScore < fxCle[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxCle[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxCle[j].homeTeamScore;
                    }

                    countCle++;

                    if (countCle === fxCle.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCCentral.push
                            (new Standing(new Team(25, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }


                /** sort */
                standingsAFCCentral.sort(function (a, b) {

                    /** a tie is equal to 0.5 wins, so 2 ties === 1 win, but calculation not needed unless team has
                    more than one tie in a season, so not currently included in this sort */
                    if ((a.won === b.won) && (a.tied === b.tied) && (a.pointsDifference === b.pointsDifference)) {
                        return (a.pointsFor > b.pointsFor) ? -1 : (a.pointsFor < b.pointsFor) ? 1 : 0;
                    } else if ((a.won === b.won) && (a.tied === b.tied)) {
                        return (a.pointsDifference > b.pointsDifference) ? -1 : (a.pointsDifference < b.pointsDifference) ? 1 : 0;
                    } else if (a.won === b.won) {
                        return (a.tied > b.tied) ? -1 : (a.tied < b.tied) ? 1 : 0;
                    } else {
                        return (a.won > b.won) ? -1 : 1;
                    }
                });

                return standingsAFCCentral;

            }),
            tap(data => this._logService.log('AFC Central standings: ' + JSON.stringify(data))), /** log returned data to console */
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getAFCWestStandingsByTournament(tournamentId: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournamentAndDivision(tournamentId, 5).pipe(
            map((fixtures: IFixture[]) => {
                let standingsAFCWest = new Array<Standing>();

                let teamName = '';
                let teamNameShort = '';
                let coachId = 0;
                let coachName = '';
                let coachNameShort = '';
                let coachImage = '';
                let divisionId = 0;
                let divisionName = '';
                let won = 0;
                let lost = 0;
                let tied = 0;
                let pointsFor = 0;
                let pointsAgainst = 0;
                let pointsDifference = 0;

                let countKC = 0;
                let countSD = 0;
                let countOak = 0;
                let countDen = 0;

                const fxKC = fixtures.filter(f => f.awayTeam.teamId === 35 || f.homeTeam.teamId === 35);

                for (let j = 0; j < fxKC.length; j++) {

                    if (fxKC[j].homeTeam.teamId === 35) {
                        teamName = fxKC[j].homeTeam.teamName;
                        teamNameShort = fxKC[j].homeTeam.teamNameShort;
                        coachId = fxKC[j].homeTeam.coach.coachId;
                        coachName = fxKC[j].homeTeam.coach.coachName;
                        coachNameShort = fxKC[j].homeTeam.coach.coachNameShort;
                        coachImage = fxKC[j].homeTeam.coachImage;
                        divisionId = fxKC[j].homeTeam.division.divisionId;
                        divisionName = fxKC[j].homeTeam.division.divisionName;
                        if (fxKC[j].homeTeamScore > fxKC[j].awayTeamScore) {
                            won++;
                        }
                        if (fxKC[j].homeTeamScore === fxKC[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxKC[j].homeTeamScore < fxKC[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxKC[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxKC[j].awayTeamScore;
                    }

                    if (fxKC[j].awayTeam.teamId === 35) {
                        teamName = fxKC[j].awayTeam.teamName;
                        teamNameShort = fxKC[j].awayTeam.teamNameShort;
                        coachId = fxKC[j].awayTeam.coach.coachId;
                        coachName = fxKC[j].awayTeam.coach.coachName;
                        coachNameShort = fxKC[j].awayTeam.coach.coachNameShort;
                        coachImage = fxKC[j].awayTeam.coachImage;
                        divisionId = fxKC[j].awayTeam.division.divisionId;
                        divisionName = fxKC[j].awayTeam.division.divisionName;
                        if (fxKC[j].awayTeamScore > fxKC[j].homeTeamScore) {
                            won++;
                        }
                        if (fxKC[j].awayTeamScore === fxKC[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxKC[j].awayTeamScore < fxKC[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxKC[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxKC[j].homeTeamScore;
                    }

                    countKC++;

                    if (countKC === fxKC.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCWest.push
                            (new Standing(new Team(35, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxSD = fixtures.filter(f => f.awayTeam.teamId === 47 || f.homeTeam.teamId === 47);

                for (let j = 0; j < fxSD.length; j++) {

                    if (fxSD[j].homeTeam.teamId === 47) {
                        teamName = fxSD[j].homeTeam.teamName;
                        teamNameShort = fxSD[j].homeTeam.teamNameShort;
                        coachId = fxSD[j].homeTeam.coach.coachId;
                        coachName = fxSD[j].homeTeam.coach.coachName;
                        coachNameShort = fxSD[j].homeTeam.coach.coachNameShort;
                        coachImage = fxSD[j].homeTeam.coachImage;
                        divisionId = fxSD[j].homeTeam.division.divisionId;
                        divisionName = fxSD[j].homeTeam.division.divisionName;
                        if (fxSD[j].homeTeamScore > fxSD[j].awayTeamScore) {
                            won++;
                        }
                        if (fxSD[j].homeTeamScore === fxSD[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxSD[j].homeTeamScore < fxSD[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxSD[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxSD[j].awayTeamScore;
                    }

                    if (fxSD[j].awayTeam.teamId === 47) {
                        teamName = fxSD[j].awayTeam.teamName;
                        teamNameShort = fxSD[j].awayTeam.teamNameShort;
                        coachId = fxSD[j].awayTeam.coach.coachId;
                        coachName = fxSD[j].awayTeam.coach.coachName;
                        coachNameShort = fxSD[j].awayTeam.coach.coachNameShort;
                        coachImage = fxSD[j].awayTeam.coachImage;
                        divisionId = fxSD[j].awayTeam.division.divisionId;
                        divisionName = fxSD[j].awayTeam.division.divisionName;
                        if (fxSD[j].awayTeamScore > fxSD[j].homeTeamScore) {
                            won++;
                        }
                        if (fxSD[j].awayTeamScore === fxSD[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxSD[j].awayTeamScore < fxSD[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxSD[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxSD[j].homeTeamScore;
                    }

                    countSD++;

                    if (countSD === fxSD.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCWest.push
                            (new Standing(new Team(47, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxOak = fixtures.filter(f => f.awayTeam.teamId === 44 || f.homeTeam.teamId === 44);

                for (let j = 0; j < fxOak.length; j++) {

                    if (fxOak[j].homeTeam.teamId === 44) {
                        teamName = fxOak[j].homeTeam.teamName;
                        teamNameShort = fxOak[j].homeTeam.teamNameShort;
                        coachId = fxOak[j].homeTeam.coach.coachId;
                        coachName = fxOak[j].homeTeam.coach.coachName;
                        coachNameShort = fxOak[j].homeTeam.coach.coachNameShort;
                        coachImage = fxOak[j].homeTeam.coachImage;
                        divisionId = fxOak[j].homeTeam.division.divisionId;
                        divisionName = fxOak[j].homeTeam.division.divisionName;
                        if (fxOak[j].homeTeamScore > fxOak[j].awayTeamScore) {
                            won++;
                        }
                        if (fxOak[j].homeTeamScore === fxOak[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxOak[j].homeTeamScore < fxOak[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxOak[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxOak[j].awayTeamScore;
                    }

                    if (fxOak[j].awayTeam.teamId === 44) {
                        teamName = fxOak[j].awayTeam.teamName;
                        teamNameShort = fxOak[j].awayTeam.teamNameShort;
                        coachId = fxOak[j].awayTeam.coach.coachId;
                        coachName = fxOak[j].awayTeam.coach.coachName;
                        coachNameShort = fxOak[j].awayTeam.coach.coachNameShort;
                        coachImage = fxOak[j].awayTeam.coachImage;
                        divisionId = fxOak[j].awayTeam.division.divisionId;
                        divisionName = fxOak[j].awayTeam.division.divisionName;
                        if (fxOak[j].awayTeamScore > fxOak[j].homeTeamScore) {
                            won++;
                        }
                        if (fxOak[j].awayTeamScore === fxOak[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxOak[j].awayTeamScore < fxOak[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxOak[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxOak[j].homeTeamScore;
                    }

                    countOak++;

                    if (countOak === fxOak.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCWest.push
                            (new Standing(new Team(44, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxDen = fixtures.filter(f => f.awayTeam.teamId === 28 || f.homeTeam.teamId === 28);

                for (let j = 0; j < fxDen.length; j++) {

                    if (fxDen[j].homeTeam.teamId === 28) {
                        teamName = fxDen[j].homeTeam.teamName;
                        teamNameShort = fxDen[j].homeTeam.teamNameShort;
                        coachId = fxDen[j].homeTeam.coach.coachId;
                        coachName = fxDen[j].homeTeam.coach.coachName;
                        coachNameShort = fxDen[j].homeTeam.coach.coachNameShort;
                        coachImage = fxDen[j].homeTeam.coachImage;
                        divisionId = fxDen[j].homeTeam.division.divisionId;
                        divisionName = fxDen[j].homeTeam.division.divisionName;
                        if (fxDen[j].homeTeamScore > fxDen[j].awayTeamScore) {
                            won++;
                        }
                        if (fxDen[j].homeTeamScore === fxDen[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxDen[j].homeTeamScore < fxDen[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxDen[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxDen[j].awayTeamScore;
                    }

                    if (fxDen[j].awayTeam.teamId === 28) {
                        teamName = fxDen[j].awayTeam.teamName;
                        teamNameShort = fxDen[j].awayTeam.teamNameShort;
                        coachId = fxDen[j].awayTeam.coach.coachId;
                        coachName = fxDen[j].awayTeam.coach.coachName;
                        coachNameShort = fxDen[j].awayTeam.coach.coachNameShort;
                        coachImage = fxDen[j].awayTeam.coachImage;
                        divisionId = fxDen[j].awayTeam.division.divisionId;
                        divisionName = fxDen[j].awayTeam.division.divisionName;
                        if (fxDen[j].awayTeamScore > fxDen[j].homeTeamScore) {
                            won++;
                        }
                        if (fxDen[j].awayTeamScore === fxDen[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxDen[j].awayTeamScore < fxDen[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxDen[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxDen[j].homeTeamScore;
                    }

                    countDen++;

                    if (countDen === fxDen.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsAFCWest.push
                            (new Standing(new Team(28, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }


                /** sort */
                standingsAFCWest.sort(function (a, b) {

                    /** a tie is equal to 0.5 wins, so 2 ties === 1 win, but calculation not needed unless team has
                    more than one tie in a season, so not currently included in this sort */
                    if ((a.won === b.won) && (a.tied === b.tied) && (a.pointsDifference === b.pointsDifference)) {
                        return (a.pointsFor > b.pointsFor) ? -1 : (a.pointsFor < b.pointsFor) ? 1 : 0;
                    } else if ((a.won === b.won) && (a.tied === b.tied)) {
                        return (a.pointsDifference > b.pointsDifference) ? -1 : (a.pointsDifference < b.pointsDifference) ? 1 : 0;
                    } else if (a.won === b.won) {
                        return (a.tied > b.tied) ? -1 : (a.tied < b.tied) ? 1 : 0;
                    } else {
                        return (a.won > b.won) ? -1 : 1;
                    }
                });

                return standingsAFCWest;

            }),
            tap(data => this._logService.log('AFC West standings: ' + JSON.stringify(data))), /** log returned data to console */
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getNFCEastStandingsByTournament(tournamentId: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournamentAndDivision(tournamentId, 4).pipe(
            map((fixtures: IFixture[]) => {
                let standingsNFCEast = new Array<Standing>();

                let teamName = '';
                let teamNameShort = '';
                let coachId = 0;
                let coachName = '';
                let coachNameShort = '';
                let coachImage = '';
                let divisionId = 0;
                let divisionName = '';
                let won = 0;
                let lost = 0;
                let tied = 0;
                let pointsFor = 0;
                let pointsAgainst = 0;
                let pointsDifference = 0;

                let countNYG = 0;
                let countPhi = 0;
                let countWas = 0;
                let countAri = 0;

                const fxNYG = fixtures.filter(f => f.awayTeam.teamId === 42 || f.homeTeam.teamId === 42);

                for (let j = 0; j < fxNYG.length; j++) {

                    if (fxNYG[j].homeTeam.teamId === 42) {
                        teamName = fxNYG[j].homeTeam.teamName;
                        teamNameShort = fxNYG[j].homeTeam.teamNameShort;
                        coachId = fxNYG[j].homeTeam.coach.coachId;
                        coachName = fxNYG[j].homeTeam.coach.coachName;
                        coachNameShort = fxNYG[j].homeTeam.coach.coachNameShort;
                        coachImage = fxNYG[j].homeTeam.coachImage;
                        divisionId = fxNYG[j].homeTeam.division.divisionId;
                        divisionName = fxNYG[j].homeTeam.division.divisionName;
                        if (fxNYG[j].homeTeamScore > fxNYG[j].awayTeamScore) {
                            won++;
                        }
                        if (fxNYG[j].homeTeamScore === fxNYG[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxNYG[j].homeTeamScore < fxNYG[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxNYG[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxNYG[j].awayTeamScore;
                    }

                    if (fxNYG[j].awayTeam.teamId === 42) {
                        teamName = fxNYG[j].awayTeam.teamName;
                        teamNameShort = fxNYG[j].awayTeam.teamNameShort;
                        coachId = fxNYG[j].awayTeam.coach.coachId;
                        coachName = fxNYG[j].awayTeam.coach.coachName;
                        coachNameShort = fxNYG[j].awayTeam.coach.coachNameShort;
                        coachImage = fxNYG[j].awayTeam.coachImage;
                        divisionId = fxNYG[j].awayTeam.division.divisionId;
                        divisionName = fxNYG[j].awayTeam.division.divisionName;
                        if (fxNYG[j].awayTeamScore > fxNYG[j].homeTeamScore) {
                            won++;
                        }
                        if (fxNYG[j].awayTeamScore === fxNYG[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxNYG[j].awayTeamScore < fxNYG[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxNYG[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxNYG[j].homeTeamScore;
                    }

                    countNYG++;

                    if (countNYG === fxNYG.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCEast.push
                            (new Standing(new Team(42, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxPhi = fixtures.filter(f => f.awayTeam.teamId === 45 || f.homeTeam.teamId === 45);

                for (let j = 0; j < fxPhi.length; j++) {

                    if (fxPhi[j].homeTeam.teamId === 45) {
                        teamName = fxPhi[j].homeTeam.teamName;
                        teamNameShort = fxPhi[j].homeTeam.teamNameShort;
                        coachId = fxPhi[j].homeTeam.coach.coachId;
                        coachName = fxPhi[j].homeTeam.coach.coachName;
                        coachNameShort = fxPhi[j].homeTeam.coach.coachNameShort;
                        coachImage = fxPhi[j].homeTeam.coachImage;
                        divisionId = fxPhi[j].homeTeam.division.divisionId;
                        divisionName = fxPhi[j].homeTeam.division.divisionName;
                        if (fxPhi[j].homeTeamScore > fxPhi[j].awayTeamScore) {
                            won++;
                        }
                        if (fxPhi[j].homeTeamScore === fxPhi[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxPhi[j].homeTeamScore < fxPhi[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxPhi[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxPhi[j].awayTeamScore;
                    }

                    if (fxPhi[j].awayTeam.teamId === 45) {
                        teamName = fxPhi[j].awayTeam.teamName;
                        teamNameShort = fxPhi[j].awayTeam.teamNameShort;
                        coachId = fxPhi[j].awayTeam.coach.coachId;
                        coachName = fxPhi[j].awayTeam.coach.coachName;
                        coachNameShort = fxPhi[j].awayTeam.coach.coachNameShort;
                        coachImage = fxPhi[j].awayTeam.coachImage;
                        divisionId = fxPhi[j].awayTeam.division.divisionId;
                        divisionName = fxPhi[j].awayTeam.division.divisionName;
                        if (fxPhi[j].awayTeamScore > fxPhi[j].homeTeamScore) {
                            won++;
                        }
                        if (fxPhi[j].awayTeamScore === fxPhi[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxPhi[j].awayTeamScore < fxPhi[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxPhi[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxPhi[j].homeTeamScore;
                    }

                    countPhi++;

                    if (countPhi === fxPhi.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCEast.push
                            (new Standing(new Team(45, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxWas = fixtures.filter(f => f.awayTeam.teamId === 53 || f.homeTeam.teamId === 53);

                for (let j = 0; j < fxWas.length; j++) {

                    if (fxWas[j].homeTeam.teamId === 53) {
                        teamName = fxWas[j].homeTeam.teamName;
                        teamNameShort = fxWas[j].homeTeam.teamNameShort;
                        coachId = fxWas[j].homeTeam.coach.coachId;
                        coachName = fxWas[j].homeTeam.coach.coachName;
                        coachNameShort = fxWas[j].homeTeam.coach.coachNameShort;
                        coachImage = fxWas[j].homeTeam.coachImage;
                        divisionId = fxWas[j].homeTeam.division.divisionId;
                        divisionName = fxWas[j].homeTeam.division.divisionName;
                        if (fxWas[j].homeTeamScore > fxWas[j].awayTeamScore) {
                            won++;
                        }
                        if (fxWas[j].homeTeamScore === fxWas[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxWas[j].homeTeamScore < fxWas[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxWas[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxWas[j].awayTeamScore;
                    }

                    if (fxWas[j].awayTeam.teamId === 53) {
                        teamName = fxWas[j].awayTeam.teamName;
                        teamNameShort = fxWas[j].awayTeam.teamNameShort;
                        coachId = fxWas[j].awayTeam.coach.coachId;
                        coachName = fxWas[j].awayTeam.coach.coachName;
                        coachNameShort = fxWas[j].awayTeam.coach.coachNameShort;
                        coachImage = fxWas[j].awayTeam.coachImage;
                        divisionId = fxWas[j].awayTeam.division.divisionId;
                        divisionName = fxWas[j].awayTeam.division.divisionName;
                        if (fxWas[j].awayTeamScore > fxWas[j].homeTeamScore) {
                            won++;
                        }
                        if (fxWas[j].awayTeamScore === fxWas[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxWas[j].awayTeamScore < fxWas[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxWas[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxWas[j].homeTeamScore;
                    }

                    countWas++;

                    if (countWas === fxWas.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCEast.push
                            (new Standing(new Team(53, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxAri = fixtures.filter(f => f.awayTeam.teamId === 1 || f.homeTeam.teamId === 1);

                for (let j = 0; j < fxAri.length; j++) {

                    if (fxAri[j].homeTeam.teamId === 1) {
                        teamName = fxAri[j].homeTeam.teamName;
                        teamNameShort = fxAri[j].homeTeam.teamNameShort;
                        coachId = fxAri[j].homeTeam.coach.coachId;
                        coachName = fxAri[j].homeTeam.coach.coachName;
                        coachNameShort = fxAri[j].homeTeam.coach.coachNameShort;
                        coachImage = fxAri[j].homeTeam.coachImage;
                        divisionId = fxAri[j].homeTeam.division.divisionId;
                        divisionName = fxAri[j].homeTeam.division.divisionName;
                        if (fxAri[j].homeTeamScore > fxAri[j].awayTeamScore) {
                            won++;
                        }
                        if (fxAri[j].homeTeamScore === fxAri[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxAri[j].homeTeamScore < fxAri[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxAri[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxAri[j].awayTeamScore;
                    }

                    if (fxAri[j].awayTeam.teamId === 1) {
                        teamName = fxAri[j].awayTeam.teamName;
                        teamNameShort = fxAri[j].awayTeam.teamNameShort;
                        coachId = fxAri[j].awayTeam.coach.coachId;
                        coachName = fxAri[j].awayTeam.coach.coachName;
                        coachNameShort = fxAri[j].awayTeam.coach.coachNameShort;
                        coachImage = fxAri[j].awayTeam.coachImage;
                        divisionId = fxAri[j].awayTeam.division.divisionId;
                        divisionName = fxAri[j].awayTeam.division.divisionName;
                        if (fxAri[j].awayTeamScore > fxAri[j].homeTeamScore) {
                            won++;
                        }
                        if (fxAri[j].awayTeamScore === fxAri[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxAri[j].awayTeamScore < fxAri[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxAri[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxAri[j].homeTeamScore;
                    }

                    countAri++;

                    if (countAri === fxAri.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCEast.push
                            (new Standing(new Team(1, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }


                /** sort */
                standingsNFCEast.sort(function (a, b) {

                    /** a tie is equal to 0.5 wins, so 2 ties === 1 win, but calculation not needed unless team has
                    more than one tie in a season, so not currently included in this sort */
                    if ((a.won === b.won) && (a.tied === b.tied) && (a.pointsDifference === b.pointsDifference)) {
                        return (a.pointsFor > b.pointsFor) ? -1 : (a.pointsFor < b.pointsFor) ? 1 : 0;
                    } else if ((a.won === b.won) && (a.tied === b.tied)) {
                        return (a.pointsDifference > b.pointsDifference) ? -1 : (a.pointsDifference < b.pointsDifference) ? 1 : 0;
                    } else if (a.won === b.won) {
                        return (a.tied > b.tied) ? -1 : (a.tied < b.tied) ? 1 : 0;
                    } else {
                        return (a.won > b.won) ? -1 : 1;
                    }
                });

                return standingsNFCEast;

            }),
            tap(data => this._logService.log('NFC East standings: ' + JSON.stringify(data))), /** log returned data to console */
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getNFCCentralStandingsByTournament(tournamentId: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournamentAndDivision(tournamentId, 3).pipe(
            map((fixtures: IFixture[]) => {
                let standingsNFCCentral = new Array<Standing>();

                let teamName = '';
                let teamNameShort = '';
                let coachId = 0;
                let coachName = '';
                let coachNameShort = '';
                let coachImage = '';
                let divisionId = 0;
                let divisionName = '';
                let won = 0;
                let lost = 0;
                let tied = 0;
                let pointsFor = 0;
                let pointsAgainst = 0;
                let pointsDifference = 0;

                let countGB = 0;
                let countMin = 0;
                let countTB = 0;
                let countDet = 0;

                const fxGB = fixtures.filter(f => f.awayTeam.teamId === 30 || f.homeTeam.teamId === 30);

                for (let j = 0; j < fxGB.length; j++) {

                    if (fxGB[j].homeTeam.teamId === 30) {
                        teamName = fxGB[j].homeTeam.teamName;
                        teamNameShort = fxGB[j].homeTeam.teamNameShort;
                        coachId = fxGB[j].homeTeam.coach.coachId;
                        coachName = fxGB[j].homeTeam.coach.coachName;
                        coachNameShort = fxGB[j].homeTeam.coach.coachNameShort;
                        coachImage = fxGB[j].homeTeam.coachImage;
                        divisionId = fxGB[j].homeTeam.division.divisionId;
                        divisionName = fxGB[j].homeTeam.division.divisionName;
                        if (fxGB[j].homeTeamScore > fxGB[j].awayTeamScore) {
                            won++;
                        }
                        if (fxGB[j].homeTeamScore === fxGB[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxGB[j].homeTeamScore < fxGB[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxGB[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxGB[j].awayTeamScore;
                    }

                    if (fxGB[j].awayTeam.teamId === 30) {
                        teamName = fxGB[j].awayTeam.teamName;
                        teamNameShort = fxGB[j].awayTeam.teamNameShort;
                        coachId = fxGB[j].awayTeam.coach.coachId;
                        coachName = fxGB[j].awayTeam.coach.coachName;
                        coachNameShort = fxGB[j].awayTeam.coach.coachNameShort;
                        coachImage = fxGB[j].awayTeam.coachImage;
                        divisionId = fxGB[j].awayTeam.division.divisionId;
                        divisionName = fxGB[j].awayTeam.division.divisionName;
                        if (fxGB[j].awayTeamScore > fxGB[j].homeTeamScore) {
                            won++;
                        }
                        if (fxGB[j].awayTeamScore === fxGB[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxGB[j].awayTeamScore < fxGB[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxGB[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxGB[j].homeTeamScore;
                    }

                    countGB++;

                    if (countGB === fxGB.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCCentral.push
                            (new Standing(new Team(30, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxMin = fixtures.filter(f => f.awayTeam.teamId === 39 || f.homeTeam.teamId === 39);

                for (let j = 0; j < fxMin.length; j++) {

                    if (fxMin[j].homeTeam.teamId === 39) {
                        teamName = fxMin[j].homeTeam.teamName;
                        teamNameShort = fxMin[j].homeTeam.teamNameShort;
                        coachId = fxMin[j].homeTeam.coach.coachId;
                        coachName = fxMin[j].homeTeam.coach.coachName;
                        coachNameShort = fxMin[j].homeTeam.coach.coachNameShort;
                        coachImage = fxMin[j].homeTeam.coachImage;
                        divisionId = fxMin[j].homeTeam.division.divisionId;
                        divisionName = fxMin[j].homeTeam.division.divisionName;
                        if (fxMin[j].homeTeamScore > fxMin[j].awayTeamScore) {
                            won++;
                        }
                        if (fxMin[j].homeTeamScore === fxMin[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxMin[j].homeTeamScore < fxMin[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxMin[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxMin[j].awayTeamScore;
                    }

                    if (fxMin[j].awayTeam.teamId === 39) {
                        teamName = fxMin[j].awayTeam.teamName;
                        teamNameShort = fxMin[j].awayTeam.teamNameShort;
                        coachId = fxMin[j].awayTeam.coach.coachId;
                        coachName = fxMin[j].awayTeam.coach.coachName;
                        coachNameShort = fxMin[j].awayTeam.coach.coachNameShort;
                        coachImage = fxMin[j].awayTeam.coachImage;
                        divisionId = fxMin[j].awayTeam.division.divisionId;
                        divisionName = fxMin[j].awayTeam.division.divisionName;
                        if (fxMin[j].awayTeamScore > fxMin[j].homeTeamScore) {
                            won++;
                        }
                        if (fxMin[j].awayTeamScore === fxMin[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxMin[j].awayTeamScore < fxMin[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxMin[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxMin[j].homeTeamScore;
                    }

                    countMin++;

                    if (countMin === fxMin.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCCentral.push
                            (new Standing(new Team(39, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxTB = fixtures.filter(f => f.awayTeam.teamId === 51 || f.homeTeam.teamId === 51);

                for (let j = 0; j < fxTB.length; j++) {

                    if (fxTB[j].homeTeam.teamId === 51) {
                        teamName = fxTB[j].homeTeam.teamName;
                        teamNameShort = fxTB[j].homeTeam.teamNameShort;
                        coachId = fxTB[j].homeTeam.coach.coachId;
                        coachName = fxTB[j].homeTeam.coach.coachName;
                        coachNameShort = fxTB[j].homeTeam.coach.coachNameShort;
                        coachImage = fxTB[j].homeTeam.coachImage;
                        divisionId = fxTB[j].homeTeam.division.divisionId;
                        divisionName = fxTB[j].homeTeam.division.divisionName;
                        if (fxTB[j].homeTeamScore > fxTB[j].awayTeamScore) {
                            won++;
                        }
                        if (fxTB[j].homeTeamScore === fxTB[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxTB[j].homeTeamScore < fxTB[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxTB[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxTB[j].awayTeamScore;
                    }

                    if (fxTB[j].awayTeam.teamId === 51) {
                        teamName = fxTB[j].awayTeam.teamName;
                        teamNameShort = fxTB[j].awayTeam.teamNameShort;
                        coachId = fxTB[j].awayTeam.coach.coachId;
                        coachName = fxTB[j].awayTeam.coach.coachName;
                        coachNameShort = fxTB[j].awayTeam.coach.coachNameShort;
                        coachImage = fxTB[j].awayTeam.coachImage;
                        divisionId = fxTB[j].awayTeam.division.divisionId;
                        divisionName = fxTB[j].awayTeam.division.divisionName;
                        if (fxTB[j].awayTeamScore > fxTB[j].homeTeamScore) {
                            won++;
                        }
                        if (fxTB[j].awayTeamScore === fxTB[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxTB[j].awayTeamScore < fxTB[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxTB[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxTB[j].homeTeamScore;
                    }

                    countTB++;

                    if (countTB === fxTB.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCCentral.push
                            (new Standing(new Team(51, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxDet = fixtures.filter(f => f.awayTeam.teamId === 29 || f.homeTeam.teamId === 29);

                for (let j = 0; j < fxDet.length; j++) {

                    if (fxDet[j].homeTeam.teamId === 29) {
                        teamName = fxDet[j].homeTeam.teamName;
                        teamNameShort = fxDet[j].homeTeam.teamNameShort;
                        coachId = fxDet[j].homeTeam.coach.coachId;
                        coachName = fxDet[j].homeTeam.coach.coachName;
                        coachNameShort = fxDet[j].homeTeam.coach.coachNameShort;
                        coachImage = fxDet[j].homeTeam.coachImage;
                        divisionId = fxDet[j].homeTeam.division.divisionId;
                        divisionName = fxDet[j].homeTeam.division.divisionName;
                        if (fxDet[j].homeTeamScore > fxDet[j].awayTeamScore) {
                            won++;
                        }
                        if (fxDet[j].homeTeamScore === fxDet[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxDet[j].homeTeamScore < fxDet[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxDet[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxDet[j].awayTeamScore;
                    }

                    if (fxDet[j].awayTeam.teamId === 29) {
                        teamName = fxDet[j].awayTeam.teamName;
                        teamNameShort = fxDet[j].awayTeam.teamNameShort;
                        coachId = fxDet[j].awayTeam.coach.coachId;
                        coachName = fxDet[j].awayTeam.coach.coachName;
                        coachNameShort = fxDet[j].awayTeam.coach.coachNameShort;
                        coachImage = fxDet[j].awayTeam.coachImage;
                        divisionId = fxDet[j].awayTeam.division.divisionId;
                        divisionName = fxDet[j].awayTeam.division.divisionName;
                        if (fxDet[j].awayTeamScore > fxDet[j].homeTeamScore) {
                            won++;
                        }
                        if (fxDet[j].awayTeamScore === fxDet[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxDet[j].awayTeamScore < fxDet[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxDet[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxDet[j].homeTeamScore;
                    }

                    countDet++;

                    if (countDet === fxDet.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCCentral.push
                            (new Standing(new Team(29, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }


                /** sort */
                standingsNFCCentral.sort(function (a, b) {

                    /** a tie is equal to 0.5 wins, so 2 ties === 1 win, but calculation not needed unless team has
                    more than one tie in a season, so not currently included in this sort */
                    if ((a.won === b.won) && (a.tied === b.tied) && (a.pointsDifference === b.pointsDifference)) {
                        return (a.pointsFor > b.pointsFor) ? -1 : (a.pointsFor < b.pointsFor) ? 1 : 0;
                    } else if ((a.won === b.won) && (a.tied === b.tied)) {
                        return (a.pointsDifference > b.pointsDifference) ? -1 : (a.pointsDifference < b.pointsDifference) ? 1 : 0;
                    } else if (a.won === b.won) {
                        return (a.tied > b.tied) ? -1 : (a.tied < b.tied) ? 1 : 0;
                    } else {
                        return (a.won > b.won) ? -1 : 1;
                    }
                });

                return standingsNFCCentral;

            }),
            tap(data => this._logService.log('NFC Central standings: ' + JSON.stringify(data))), /** log returned data to console */
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getNFCWestStandingsByTournament(tournamentId: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournamentAndDivision(tournamentId, 2).pipe(
            map((fixtures: IFixture[]) => {
                let standingsNFCWest = new Array<Standing>();

                let teamName = '';
                let teamNameShort = '';
                let coachId = 0;
                let coachName = '';
                let coachNameShort = '';
                let coachImage = '';
                let divisionId = 0;
                let divisionName = '';
                let won = 0;
                let lost = 0;
                let tied = 0;
                let pointsFor = 0;
                let pointsAgainst = 0;
                let pointsDifference = 0;

                let countCar = 0;
                let countNO = 0;
                let countSF = 0;
                let countAtl = 0;

                const fxCar = fixtures.filter(f => f.awayTeam.teamId === 22 || f.homeTeam.teamId === 22);

                for (let j = 0; j < fxCar.length; j++) {

                    if (fxCar[j].homeTeam.teamId === 22) {
                        teamName = fxCar[j].homeTeam.teamName;
                        teamNameShort = fxCar[j].homeTeam.teamNameShort;
                        coachId = fxCar[j].homeTeam.coach.coachId;
                        coachName = fxCar[j].homeTeam.coach.coachName;
                        coachNameShort = fxCar[j].homeTeam.coach.coachNameShort;
                        coachImage = fxCar[j].homeTeam.coachImage;
                        divisionId = fxCar[j].homeTeam.division.divisionId;
                        divisionName = fxCar[j].homeTeam.division.divisionName;
                        if (fxCar[j].homeTeamScore > fxCar[j].awayTeamScore) {
                            won++;
                        }
                        if (fxCar[j].homeTeamScore === fxCar[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxCar[j].homeTeamScore < fxCar[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxCar[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxCar[j].awayTeamScore;
                    }

                    if (fxCar[j].awayTeam.teamId === 22) {
                        teamName = fxCar[j].awayTeam.teamName;
                        teamNameShort = fxCar[j].awayTeam.teamNameShort;
                        coachId = fxCar[j].awayTeam.coach.coachId;
                        coachName = fxCar[j].awayTeam.coach.coachName;
                        coachNameShort = fxCar[j].awayTeam.coach.coachNameShort;
                        coachImage = fxCar[j].awayTeam.coachImage;
                        divisionId = fxCar[j].awayTeam.division.divisionId;
                        divisionName = fxCar[j].awayTeam.division.divisionName;
                        if (fxCar[j].awayTeamScore > fxCar[j].homeTeamScore) {
                            won++;
                        }
                        if (fxCar[j].awayTeamScore === fxCar[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxCar[j].awayTeamScore < fxCar[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxCar[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxCar[j].homeTeamScore;
                    }

                    countCar++;

                    if (countCar === fxCar.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCWest.push
                            (new Standing(new Team(22, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxNO = fixtures.filter(f => f.awayTeam.teamId === 41 || f.homeTeam.teamId === 41);

                for (let j = 0; j < fxNO.length; j++) {

                    if (fxNO[j].homeTeam.teamId === 41) {
                        teamName = fxNO[j].homeTeam.teamName;
                        teamNameShort = fxNO[j].homeTeam.teamNameShort;
                        coachId = fxNO[j].homeTeam.coach.coachId;
                        coachName = fxNO[j].homeTeam.coach.coachName;
                        coachNameShort = fxNO[j].homeTeam.coach.coachNameShort;
                        coachImage = fxNO[j].homeTeam.coachImage;
                        divisionId = fxNO[j].homeTeam.division.divisionId;
                        divisionName = fxNO[j].homeTeam.division.divisionName;
                        if (fxNO[j].homeTeamScore > fxNO[j].awayTeamScore) {
                            won++;
                        }
                        if (fxNO[j].homeTeamScore === fxNO[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxNO[j].homeTeamScore < fxNO[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxNO[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxNO[j].awayTeamScore;
                    }

                    if (fxNO[j].awayTeam.teamId === 41) {
                        teamName = fxNO[j].awayTeam.teamName;
                        teamNameShort = fxNO[j].awayTeam.teamNameShort;
                        coachId = fxNO[j].awayTeam.coach.coachId;
                        coachName = fxNO[j].awayTeam.coach.coachName;
                        coachNameShort = fxNO[j].awayTeam.coach.coachNameShort;
                        coachImage = fxNO[j].awayTeam.coachImage;
                        divisionId = fxNO[j].awayTeam.division.divisionId;
                        divisionName = fxNO[j].awayTeam.division.divisionName;
                        if (fxNO[j].awayTeamScore > fxNO[j].homeTeamScore) {
                            won++;
                        }
                        if (fxNO[j].awayTeamScore === fxNO[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxNO[j].awayTeamScore < fxNO[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxNO[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxNO[j].homeTeamScore;
                    }

                    countNO++;

                    if (countNO === fxNO.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCWest.push
                            (new Standing(new Team(41, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxSF = fixtures.filter(f => f.awayTeam.teamId === 48 || f.homeTeam.teamId === 48);

                for (let j = 0; j < fxSF.length; j++) {

                    if (fxSF[j].homeTeam.teamId === 48) {
                        teamName = fxSF[j].homeTeam.teamName;
                        teamNameShort = fxSF[j].homeTeam.teamNameShort;
                        coachId = fxSF[j].homeTeam.coach.coachId;
                        coachName = fxSF[j].homeTeam.coach.coachName;
                        coachNameShort = fxSF[j].homeTeam.coach.coachNameShort;
                        coachImage = fxSF[j].homeTeam.coachImage;
                        divisionId = fxSF[j].homeTeam.division.divisionId;
                        divisionName = fxSF[j].homeTeam.division.divisionName;
                        if (fxSF[j].homeTeamScore > fxSF[j].awayTeamScore) {
                            won++;
                        }
                        if (fxSF[j].homeTeamScore === fxSF[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxSF[j].homeTeamScore < fxSF[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxSF[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxSF[j].awayTeamScore;
                    }

                    if (fxSF[j].awayTeam.teamId === 48) {
                        teamName = fxSF[j].awayTeam.teamName;
                        teamNameShort = fxSF[j].awayTeam.teamNameShort;
                        coachId = fxSF[j].awayTeam.coach.coachId;
                        coachName = fxSF[j].awayTeam.coach.coachName;
                        coachNameShort = fxSF[j].awayTeam.coach.coachNameShort;
                        coachImage = fxSF[j].awayTeam.coachImage;
                        divisionId = fxSF[j].awayTeam.division.divisionId;
                        divisionName = fxSF[j].awayTeam.division.divisionName;
                        if (fxSF[j].awayTeamScore > fxSF[j].homeTeamScore) {
                            won++;
                        }
                        if (fxSF[j].awayTeamScore === fxSF[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxSF[j].awayTeamScore < fxSF[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxSF[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxSF[j].homeTeamScore;
                    }

                    countSF++;

                    if (countSF === fxSF.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCWest.push
                            (new Standing(new Team(48, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }

                won = 0;
                lost = 0;
                tied = 0;
                pointsFor = 0;
                pointsAgainst = 0;
                pointsDifference = 0;

                const fxAtl = fixtures.filter(f => f.awayTeam.teamId === 2 || f.homeTeam.teamId === 2);

                for (let j = 0; j < fxAtl.length; j++) {

                    if (fxAtl[j].homeTeam.teamId === 2) {
                        teamName = fxAtl[j].homeTeam.teamName;
                        teamNameShort = fxAtl[j].homeTeam.teamNameShort;
                        coachId = fxAtl[j].homeTeam.coach.coachId;
                        coachName = fxAtl[j].homeTeam.coach.coachName;
                        coachNameShort = fxAtl[j].homeTeam.coach.coachNameShort;
                        coachImage = fxAtl[j].homeTeam.coachImage;
                        divisionId = fxAtl[j].homeTeam.division.divisionId;
                        divisionName = fxAtl[j].homeTeam.division.divisionName;
                        if (fxAtl[j].homeTeamScore > fxAtl[j].awayTeamScore) {
                            won++;
                        }
                        if (fxAtl[j].homeTeamScore === fxAtl[j].awayTeamScore) {
                            tied++;
                        }
                        if (fxAtl[j].homeTeamScore < fxAtl[j].awayTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxAtl[j].homeTeamScore;
                        pointsAgainst = pointsAgainst + fxAtl[j].awayTeamScore;
                    }

                    if (fxAtl[j].awayTeam.teamId === 2) {
                        teamName = fxAtl[j].awayTeam.teamName;
                        teamNameShort = fxAtl[j].awayTeam.teamNameShort;
                        coachId = fxAtl[j].awayTeam.coach.coachId;
                        coachName = fxAtl[j].awayTeam.coach.coachName;
                        coachNameShort = fxAtl[j].awayTeam.coach.coachNameShort;
                        coachImage = fxAtl[j].awayTeam.coachImage;
                        divisionId = fxAtl[j].awayTeam.division.divisionId;
                        divisionName = fxAtl[j].awayTeam.division.divisionName;
                        if (fxAtl[j].awayTeamScore > fxAtl[j].homeTeamScore) {
                            won++;
                        }
                        if (fxAtl[j].awayTeamScore === fxAtl[j].homeTeamScore) {
                            tied++;
                        }
                        if (fxAtl[j].awayTeamScore < fxAtl[j].homeTeamScore) {
                            lost++;
                        }
                        pointsFor = pointsFor + fxAtl[j].awayTeamScore;
                        pointsAgainst = pointsAgainst + fxAtl[j].homeTeamScore;
                    }

                    countAtl++;

                    if (countAtl === fxAtl.length) {

                        pointsDifference = pointsFor - pointsAgainst;

                        standingsNFCWest.push
                            (new Standing(new Team(2, teamName, teamNameShort,
                                new Coach(coachId, coachName, coachNameShort),
                                new Division(divisionId, divisionName), '', coachImage, '', '', '', null, null, null),
                                won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                    }
                }


                /** sort */
                standingsNFCWest.sort(function (a, b) {

                    /** a tie is equal to 0.5 wins, so 2 ties === 1 win, but calculation not needed unless team has
                    more than one tie in a season, so not currently included in this sort */
                    if ((a.won === b.won) && (a.tied === b.tied) && (a.pointsDifference === b.pointsDifference)) {
                        return (a.pointsFor > b.pointsFor) ? -1 : (a.pointsFor < b.pointsFor) ? 1 : 0;
                    } else if ((a.won === b.won) && (a.tied === b.tied)) {
                        return (a.pointsDifference > b.pointsDifference) ? -1 : (a.pointsDifference < b.pointsDifference) ? 1 : 0;
                    } else if (a.won === b.won) {
                        return (a.tied > b.tied) ? -1 : (a.tied < b.tied) ? 1 : 0;
                    } else {
                        return (a.won > b.won) ? -1 : 1;
                    }
                });

                return standingsNFCWest;

            }),
            tap(data => this._logService.log('NFC West standings: ' + JSON.stringify(data))), /** log returned data to console */
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    addFixture(fixture: Fixture): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(fixture);

            return this._httpClient.post(this._fixturePostUrl, body, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(fixture);

            return this._httpClient.post(this._fixturePostUrl, body, { headers });
        }
    }

    updateFixture(fixture: Fixture): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(fixture);

            return this._httpClient.put(this._fixturePutUrl, body, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(fixture);

            return this._httpClient.put(this._fixturePutUrl, body, { headers });
        }
    }

    deleteFixture(fixtureId: number): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

            const fixtureDeleteUrlWithId = this._fixtureDeleteUrl + '/' + fixtureId;

            return this._httpClient.delete(fixtureDeleteUrlWithId, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);

            const fixtureDeleteUrlWithId = this._fixtureDeleteUrl + '/' + fixtureId;

            return this._httpClient.delete(fixtureDeleteUrlWithId, { headers });
        }
    }
}
