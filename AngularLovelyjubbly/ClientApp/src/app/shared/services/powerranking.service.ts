import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';
import { IPowerRanking, PowerRanking } from '../models/powerranking';
import { Week } from '../models/week';
import { Team } from '../models/team';
import { Coach } from '../models/coach';
import { Division } from '../models/division';
import { Tournament } from '../models/tournament';

@Injectable({
    providedIn: 'root',
})
export class PowerRankingService {

    private _powerRankingGetByTournamentAndWeekUrl;
    private _powerRankingPutUrl;
    private _powerRankingEqualImageUrl;
    private _powerRankingUpImageUrl;
    private _powerRankingDownImageUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService,
        private _commonService: CommonService, private _logService: LogService,
        private _cookieService: CookieService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._powerRankingGetByTournamentAndWeekUrl = this._configService.getApiURI() + "/PowerRankingsByTournamentAndWeek/";
        this._powerRankingPutUrl = this._configService.getApiURI() + "/PowerRankings/Update";
        this._powerRankingEqualImageUrl = this._configService.getServer() + "/assets/images/powerrankings/equal.png";
        this._powerRankingUpImageUrl = this._configService.getServer() + "/assets/images/powerrankings/up.png";
        this._powerRankingDownImageUrl = this._configService.getServer() + "/assets/images/powerrankings/down.png";
    }

    getPowerRankingsByTournamentAndWeek(tournamentId: number, weekId: number): Observable<IPowerRanking[]> {
        return this._httpClient.get<IPowerRanking[]>(this._powerRankingGetByTournamentAndWeekUrl + tournamentId + "/" + weekId).pipe(
            map((powerrankings: IPowerRanking[]) => {
                var pr = new Array<PowerRanking>();
                var statusChangeImage = '';
                for (const i in powerrankings) {
                    if (powerrankings.hasOwnProperty(i)) {
                        if (powerrankings[i].currentRanking === powerrankings[i].previousRanking) {
                            statusChangeImage = this._powerRankingEqualImageUrl;
                        }
                        else if (powerrankings[i].currentRanking < powerrankings[i].previousRanking) {
                            statusChangeImage = this._powerRankingUpImageUrl;
                        }
                        else if (powerrankings[i].currentRanking > powerrankings[i].previousRanking) {
                            statusChangeImage = this._powerRankingDownImageUrl;
                        }
                        else {
                            statusChangeImage = this._powerRankingEqualImageUrl;
                        }

                        pr.push(new PowerRanking(powerrankings[i].powerRankingId,
                            new Tournament(powerrankings[i].tournament.tournamentId, powerrankings[i].tournament.tournamentName,
                                powerrankings[i].tournament.seasonId),
                            new Week(powerrankings[i].week.weekId, powerrankings[i].week.weekNumber),
                            new Team(powerrankings[i].team.teamId, powerrankings[i].team.teamName, powerrankings[i].team.teamNameShort,
                                new Coach(0, '', ''),
                                new Division(0, ''), '', '', '', '', '', null, null, null),
                            powerrankings[i].currentRanking, powerrankings[i].previousRanking, statusChangeImage));
                    }
                }
                return pr;
            }),
            tap(data => this._logService.log('Power Rankings By Tournament And Week: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    updatePowerRankings(powerRankings: number[]): Observable<any> {
        if (this.isLocalStorageAvailable) {
            let authToken = localStorage.getItem('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(powerRankings);

            return this._httpClient.put(this._powerRankingPutUrl, body, { headers });
        }
        else {
            //use cookies
            let authToken = this._cookieService.get('auth_token');
            const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', `Bearer ${authToken}`);
            const body = JSON.stringify(powerRankings);

            return this._httpClient.put(this._powerRankingPutUrl, body, { headers });
        }
    }
}
