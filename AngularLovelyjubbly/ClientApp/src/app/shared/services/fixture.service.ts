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
import { ITournament, Tournament } from '../models/tournament';
import { IWeek, Week } from '../models/week';
import { ITeam, Team } from '../models/team';
import { ICoach, Coach } from '../models/coach';
import { IDivision, Division } from '../models/division';
import { IStanding, Standing } from '../models/standing';

@Injectable({
    providedIn: 'root',
})
export class FixtureService {

    private _fixtureGetUrl;
    private _fixtureGetByTeamAndTournamentUrl;
    private _fixturePostUrl;
    private _fixturePutUrl;
    private _fixtureDeleteUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _cookieService: CookieService, private _logService: LogService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._fixtureGetUrl = this._configService.getApiURI() + "/Fixtures";
        this._fixtureGetByTeamAndTournamentUrl = this._configService.getApiURI() + "/FixturesByTeamAndTournament";
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
        return this.getFixtures().pipe(
            map((fixtures: IFixture[]) => {
                const completedFixtures = new Array<Fixture>();
                for (const i in fixtures) {
                    if (fixtures[i].tournament.tournamentId === id && fixtures[i].homeTeamScore !== null
                        && fixtures[i].awayTeamScore !== null
                        && parseInt(fixtures[i].week.weekNumber, 10) < 17) {
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

    getAFCEastStandingsByTournament(id: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournament(id).pipe(
            map((fixtures: IFixture[]) => {
                const standingsAFCEast = new Array<Standing>();

                /** 55 teams, i = teamId */
                for (let i = 1; i < 55; i++) {

                    let teamName = '';
                    let teamNameShort = '';
                    let coachId = 0;
                    let coachName = '';
                    let coachNameShort = '';
                    let divisionId = 0;
                    let divisionName = '';
                    let won = 0;
                    let lost = 0;
                    let tied = 0;
                    let pointsFor = 0;
                    let pointsAgainst = 0;
                    let pointsDifference = 0;

                    let count = 0;

                    for (let j = 0; j < fixtures.length; j++) {

                        if (fixtures[j].homeTeam.teamId === i) {
                            teamName = fixtures[j].homeTeam.teamName;
                            teamNameShort = fixtures[j].homeTeam.teamNameShort;
                            coachId = fixtures[j].homeTeam.coach.coachId;
                            coachName = fixtures[j].homeTeam.coach.coachName;
                            coachNameShort = fixtures[j].homeTeam.coach.coachNameShort;
                            divisionId = fixtures[j].homeTeam.division.divisionId;
                            divisionName = fixtures[j].homeTeam.division.divisionName;
                            if (fixtures[j].homeTeamScore > fixtures[j].awayTeamScore) {
                                won++;
                            }
                            if (fixtures[j].homeTeamScore === fixtures[j].awayTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].homeTeamScore < fixtures[j].awayTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].homeTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].awayTeamScore;
                        }

                        if (fixtures[j].awayTeam.teamId === i) {
                            teamName = fixtures[j].awayTeam.teamName;
                            teamNameShort = fixtures[j].awayTeam.teamNameShort;
                            coachId = fixtures[j].awayTeam.coach.coachId;
                            coachName = fixtures[j].awayTeam.coach.coachName;
                            coachNameShort = fixtures[j].awayTeam.coach.coachNameShort;
                            divisionId = fixtures[j].awayTeam.division.divisionId;
                            divisionName = fixtures[j].awayTeam.division.divisionName;
                            if (fixtures[j].awayTeamScore > fixtures[j].homeTeamScore) {
                                won++;
                            }
                            if (fixtures[j].awayTeamScore === fixtures[j].homeTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].awayTeamScore < fixtures[j].homeTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].awayTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].homeTeamScore;
                        }

                        count++;

                        if (count === fixtures.length) {

                            /** filter out the teams that aren't active */
                            if (coachName !== 'None') {
                                pointsDifference = pointsFor - pointsAgainst;

                                if (divisionName === 'AFC East') {
                                    standingsAFCEast.push
                                        (new Standing(new Team(i, teamName, teamNameShort,
                                            new Coach(coachId, coachName, coachNameShort),
                                            new Division(divisionId, divisionName), '', '', '', '', '', null, null, null),
                                            won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                                }
                            }
                        }
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

    getAFCCentralStandingsByTournament(id: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournament(id).pipe(
            map((fixtures: IFixture[]) => {
                const standingsAFCCentral = new Array<Standing>();

                /** 55 teams, i = teamId */
                for (let i = 1; i < 55; i++) {

                    let teamName = '';
                    let teamNameShort = '';
                    let coachId = 0;
                    let coachName = '';
                    let coachNameShort = '';
                    let divisionId = 0;
                    let divisionName = '';
                    let won = 0;
                    let lost = 0;
                    let tied = 0;
                    let pointsFor = 0;
                    let pointsAgainst = 0;
                    let pointsDifference = 0;

                    let count = 0;

                    for (let j = 0; j < fixtures.length; j++) {

                        if (fixtures[j].homeTeam.teamId === i) {
                            teamName = fixtures[j].homeTeam.teamName;
                            teamNameShort = fixtures[j].homeTeam.teamNameShort;
                            coachId = fixtures[j].homeTeam.coach.coachId;
                            coachName = fixtures[j].homeTeam.coach.coachName;
                            coachNameShort = fixtures[j].homeTeam.coach.coachNameShort;
                            divisionId = fixtures[j].homeTeam.division.divisionId;
                            divisionName = fixtures[j].homeTeam.division.divisionName;
                            if (fixtures[j].homeTeamScore > fixtures[j].awayTeamScore) {
                                won++;
                            }
                            if (fixtures[j].homeTeamScore === fixtures[j].awayTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].homeTeamScore < fixtures[j].awayTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].homeTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].awayTeamScore;
                        }

                        if (fixtures[j].awayTeam.teamId === i) {
                            teamName = fixtures[j].awayTeam.teamName;
                            teamNameShort = fixtures[j].awayTeam.teamNameShort;
                            coachId = fixtures[j].awayTeam.coach.coachId;
                            coachName = fixtures[j].awayTeam.coach.coachName;
                            coachNameShort = fixtures[j].awayTeam.coach.coachNameShort;
                            divisionId = fixtures[j].awayTeam.division.divisionId;
                            divisionName = fixtures[j].awayTeam.division.divisionName;
                            if (fixtures[j].awayTeamScore > fixtures[j].homeTeamScore) {
                                won++;
                            }
                            if (fixtures[j].awayTeamScore === fixtures[j].homeTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].awayTeamScore < fixtures[j].homeTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].awayTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].homeTeamScore;
                        }

                        count++;

                        if (count === fixtures.length) {

                            /** filter out the teams that aren't active */
                            if (coachName !== 'None') {
                                pointsDifference = pointsFor - pointsAgainst;

                                if (divisionName === 'AFC Central') {
                                    standingsAFCCentral.push
                                        (new Standing(new Team(i, teamName, teamNameShort,
                                            new Coach(coachId, coachName, coachNameShort),
                                            new Division(divisionId, divisionName), '', '', '', '', '', null, null, null),
                                            won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                                }
                            }
                        }
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

    getAFCWestStandingsByTournament(id: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournament(id).pipe(
            map((fixtures: IFixture[]) => {
                const standingsAFCWest = new Array<Standing>();

                /** 55 teams, i = teamId */
                for (let i = 1; i < 55; i++) {

                    let teamName = '';
                    let teamNameShort = '';
                    let coachId = 0;
                    let coachName = '';
                    let coachNameShort = '';
                    let divisionId = 0;
                    let divisionName = '';
                    let won = 0;
                    let lost = 0;
                    let tied = 0;
                    let pointsFor = 0;
                    let pointsAgainst = 0;
                    let pointsDifference = 0;

                    let count = 0;

                    for (let j = 0; j < fixtures.length; j++) {

                        if (fixtures[j].homeTeam.teamId === i) {
                            teamName = fixtures[j].homeTeam.teamName;
                            teamNameShort = fixtures[j].homeTeam.teamNameShort;
                            coachId = fixtures[j].homeTeam.coach.coachId;
                            coachName = fixtures[j].homeTeam.coach.coachName;
                            coachNameShort = fixtures[j].homeTeam.coach.coachNameShort;
                            divisionId = fixtures[j].homeTeam.division.divisionId;
                            divisionName = fixtures[j].homeTeam.division.divisionName;
                            if (fixtures[j].homeTeamScore > fixtures[j].awayTeamScore) {
                                won++;
                            }
                            if (fixtures[j].homeTeamScore === fixtures[j].awayTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].homeTeamScore < fixtures[j].awayTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].homeTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].awayTeamScore;
                        }

                        if (fixtures[j].awayTeam.teamId === i) {
                            teamName = fixtures[j].awayTeam.teamName;
                            teamNameShort = fixtures[j].awayTeam.teamNameShort;
                            coachId = fixtures[j].awayTeam.coach.coachId;
                            coachName = fixtures[j].awayTeam.coach.coachName;
                            coachNameShort = fixtures[j].awayTeam.coach.coachNameShort;
                            divisionId = fixtures[j].awayTeam.division.divisionId;
                            divisionName = fixtures[j].awayTeam.division.divisionName;
                            if (fixtures[j].awayTeamScore > fixtures[j].homeTeamScore) {
                                won++;
                            }
                            if (fixtures[j].awayTeamScore === fixtures[j].homeTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].awayTeamScore < fixtures[j].homeTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].awayTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].homeTeamScore;
                        }

                        count++;

                        if (count === fixtures.length) {

                            /** filter out the teams that aren't active */
                            if (coachName !== 'None') {
                                pointsDifference = pointsFor - pointsAgainst;

                                if (divisionName === 'AFC West') {
                                    standingsAFCWest.push
                                        (new Standing(new Team(i, teamName, teamNameShort,
                                            new Coach(coachId, coachName, coachNameShort),
                                            new Division(divisionId, divisionName), '', '', '', '', '', null, null, null),
                                            won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                                }
                            }
                        }
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

    getNFCEastStandingsByTournament(id: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournament(id).pipe(
            map((fixtures: IFixture[]) => {
                const standingsNFCEast = new Array<Standing>();

                /** 55 teams, i = teamId */
                for (let i = 1; i < 55; i++) {

                    let teamName = '';
                    let teamNameShort = '';
                    let coachId = 0;
                    let coachName = '';
                    let coachNameShort = '';
                    let divisionId = 0;
                    let divisionName = '';
                    let won = 0;
                    let lost = 0;
                    let tied = 0;
                    let pointsFor = 0;
                    let pointsAgainst = 0;
                    let pointsDifference = 0;

                    let count = 0;

                    for (let j = 0; j < fixtures.length; j++) {

                        if (fixtures[j].homeTeam.teamId === i) {
                            teamName = fixtures[j].homeTeam.teamName;
                            teamNameShort = fixtures[j].homeTeam.teamNameShort;
                            coachId = fixtures[j].homeTeam.coach.coachId;
                            coachName = fixtures[j].homeTeam.coach.coachName;
                            coachNameShort = fixtures[j].homeTeam.coach.coachNameShort;
                            divisionId = fixtures[j].homeTeam.division.divisionId;
                            divisionName = fixtures[j].homeTeam.division.divisionName;
                            if (fixtures[j].homeTeamScore > fixtures[j].awayTeamScore) {
                                won++;
                            }
                            if (fixtures[j].homeTeamScore === fixtures[j].awayTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].homeTeamScore < fixtures[j].awayTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].homeTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].awayTeamScore;
                        }

                        if (fixtures[j].awayTeam.teamId === i) {
                            teamName = fixtures[j].awayTeam.teamName;
                            teamNameShort = fixtures[j].awayTeam.teamNameShort;
                            coachId = fixtures[j].awayTeam.coach.coachId;
                            coachName = fixtures[j].awayTeam.coach.coachName;
                            coachNameShort = fixtures[j].awayTeam.coach.coachNameShort;
                            divisionId = fixtures[j].awayTeam.division.divisionId;
                            divisionName = fixtures[j].awayTeam.division.divisionName;
                            if (fixtures[j].awayTeamScore > fixtures[j].homeTeamScore) {
                                won++;
                            }
                            if (fixtures[j].awayTeamScore === fixtures[j].homeTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].awayTeamScore < fixtures[j].homeTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].awayTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].homeTeamScore;
                        }

                        count++;

                        if (count === fixtures.length) {

                            /** filter out the teams that aren't active */
                            if (coachName !== 'None') {
                                pointsDifference = pointsFor - pointsAgainst;

                                if (divisionName === 'NFC East') {
                                    standingsNFCEast.push
                                        (new Standing(new Team(i, teamName, teamNameShort,
                                            new Coach(coachId, coachName, coachNameShort),
                                            new Division(divisionId, divisionName), '', '', '', '', '', null, null, null),
                                            won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                                }
                            }
                        }
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

    getNFCCentralStandingsByTournament(id: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournament(id).pipe(
            map((fixtures: IFixture[]) => {
                const standingsNFCCentral = new Array<Standing>();

                /** 55 teams, i = teamId */
                for (let i = 1; i < 55; i++) {

                    let teamName = '';
                    let teamNameShort = '';
                    let coachId = 0;
                    let coachName = '';
                    let coachNameShort = '';
                    let divisionId = 0;
                    let divisionName = '';
                    let won = 0;
                    let lost = 0;
                    let tied = 0;
                    let pointsFor = 0;
                    let pointsAgainst = 0;
                    let pointsDifference = 0;

                    let count = 0;

                    for (let j = 0; j < fixtures.length; j++) {

                        if (fixtures[j].homeTeam.teamId === i) {
                            teamName = fixtures[j].homeTeam.teamName;
                            teamNameShort = fixtures[j].homeTeam.teamNameShort;
                            coachId = fixtures[j].homeTeam.coach.coachId;
                            coachName = fixtures[j].homeTeam.coach.coachName;
                            coachNameShort = fixtures[j].homeTeam.coach.coachNameShort;
                            divisionId = fixtures[j].homeTeam.division.divisionId;
                            divisionName = fixtures[j].homeTeam.division.divisionName;
                            if (fixtures[j].homeTeamScore > fixtures[j].awayTeamScore) {
                                won++;
                            }
                            if (fixtures[j].homeTeamScore === fixtures[j].awayTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].homeTeamScore < fixtures[j].awayTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].homeTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].awayTeamScore;
                        }

                        if (fixtures[j].awayTeam.teamId === i) {
                            teamName = fixtures[j].awayTeam.teamName;
                            teamNameShort = fixtures[j].awayTeam.teamNameShort;
                            coachId = fixtures[j].awayTeam.coach.coachId;
                            coachName = fixtures[j].awayTeam.coach.coachName;
                            coachNameShort = fixtures[j].awayTeam.coach.coachNameShort;
                            divisionId = fixtures[j].awayTeam.division.divisionId;
                            divisionName = fixtures[j].awayTeam.division.divisionName;
                            if (fixtures[j].awayTeamScore > fixtures[j].homeTeamScore) {
                                won++;
                            }
                            if (fixtures[j].awayTeamScore === fixtures[j].homeTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].awayTeamScore < fixtures[j].homeTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].awayTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].homeTeamScore;
                        }

                        count++;

                        if (count === fixtures.length) {

                            /** filter out the teams that aren't active */
                            if (coachName !== 'None') {
                                pointsDifference = pointsFor - pointsAgainst;

                                if (divisionName === 'NFC Central') {
                                    standingsNFCCentral.push
                                        (new Standing(new Team(i, teamName, teamNameShort,
                                            new Coach(coachId, coachName, coachNameShort),
                                            new Division(divisionId, divisionName), '', '', '', '', '', null, null, null),
                                            won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                                }
                            }
                        }
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

    getNFCWestStandingsByTournament(id: number): Observable<IStanding[]> {
        return this.getCompletedRegularSeasonFixturesByTournament(id).pipe(
            map((fixtures: IFixture[]) => {
                const standingsNFCWest = new Array<Standing>();

                /** 55 teams, i = teamId */
                for (let i = 1; i < 55; i++) {

                    let teamName = '';
                    let teamNameShort = '';
                    let coachId = 0;
                    let coachName = '';
                    let coachNameShort = '';
                    let divisionId = 0;
                    let divisionName = '';
                    let won = 0;
                    let lost = 0;
                    let tied = 0;
                    let pointsFor = 0;
                    let pointsAgainst = 0;
                    let pointsDifference = 0;

                    let count = 0;

                    for (let j = 0; j < fixtures.length; j++) {

                        if (fixtures[j].homeTeam.teamId === i) {
                            teamName = fixtures[j].homeTeam.teamName;
                            teamNameShort = fixtures[j].homeTeam.teamNameShort;
                            coachId = fixtures[j].homeTeam.coach.coachId;
                            coachName = fixtures[j].homeTeam.coach.coachName;
                            coachNameShort = fixtures[j].homeTeam.coach.coachNameShort;
                            divisionId = fixtures[j].homeTeam.division.divisionId;
                            divisionName = fixtures[j].homeTeam.division.divisionName;
                            if (fixtures[j].homeTeamScore > fixtures[j].awayTeamScore) {
                                won++;
                            }
                            if (fixtures[j].homeTeamScore === fixtures[j].awayTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].homeTeamScore < fixtures[j].awayTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].homeTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].awayTeamScore;
                        }

                        if (fixtures[j].awayTeam.teamId === i) {
                            teamName = fixtures[j].awayTeam.teamName;
                            teamNameShort = fixtures[j].awayTeam.teamNameShort;
                            coachId = fixtures[j].awayTeam.coach.coachId;
                            coachName = fixtures[j].awayTeam.coach.coachName;
                            coachNameShort = fixtures[j].awayTeam.coach.coachNameShort;
                            divisionId = fixtures[j].awayTeam.division.divisionId;
                            divisionName = fixtures[j].awayTeam.division.divisionName;
                            if (fixtures[j].awayTeamScore > fixtures[j].homeTeamScore) {
                                won++;
                            }
                            if (fixtures[j].awayTeamScore === fixtures[j].homeTeamScore) {
                                tied++;
                            }
                            if (fixtures[j].awayTeamScore < fixtures[j].homeTeamScore) {
                                lost++;
                            }
                            pointsFor = pointsFor + fixtures[j].awayTeamScore;
                            pointsAgainst = pointsAgainst + fixtures[j].homeTeamScore;
                        }

                        count++;

                        if (count === fixtures.length) {

                            /** filter out the teams that aren't active */
                            if (coachName !== 'None') {
                                pointsDifference = pointsFor - pointsAgainst;

                                if (divisionName === 'NFC West') {
                                    standingsNFCWest.push
                                        (new Standing(new Team(i, teamName, teamNameShort,
                                            new Coach(coachId, coachName, coachNameShort),
                                            new Division(divisionId, divisionName), '', '', '', '', '', null, null, null),
                                            won, lost, tied, pointsFor, pointsAgainst, pointsDifference));
                                }
                            }
                        }
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
