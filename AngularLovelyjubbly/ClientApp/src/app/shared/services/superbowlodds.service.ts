import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { ISuperbowlOdds, SuperbowlOdds } from '../models/superbowlodds';
import { Tournament } from '../models/tournament';
import { Team } from '../models/team';
import { Coach } from '../models/coach';
import { Division } from '../models/division';

@Injectable({
    providedIn: 'root',
})
export class SuperbowlOddsService {

    private _superbowlOddGetUrl;
    private _superbowlOddGetBySeasonNameUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._superbowlOddGetUrl = this._configService.getApiURI() + "/SuperbowlOdds";
        this._superbowlOddGetBySeasonNameUrl = this._configService.getApiURI() + "/SuperbowlOddsBySeasonName/";
    }

    getSuperbowlOdds(): Observable<ISuperbowlOdds[]> {
        return this._httpClient.get<ISuperbowlOdds[]>(this._superbowlOddGetUrl).pipe(
            map((superbowlodds: ISuperbowlOdds[]) => {
                var so = new Array<SuperbowlOdds>();
                for (var i in superbowlodds) {
                    so.push(new SuperbowlOdds(superbowlodds[i].superbowlOddsId,
                        new Tournament(superbowlodds[i].tournament.tournamentId, superbowlodds[i].tournament.tournamentName,
                            superbowlodds[i].tournament.seasonId),
                        new Team(superbowlodds[i].team.teamId, superbowlodds[i].team.teamName, superbowlodds[i].team.teamNameShort,
                            new Coach(0, '', ''),
                            new Division(0, ''), '', '', '', '', '', null, null, null),
                        superbowlodds[i].odds));
                }
                return so;
            }),
            tap(data => this._logService.log('All Superbowl Odds: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getSuperbowlOddsBySeasonName(seasonName: string): Observable<ISuperbowlOdds[]> {
        return this._httpClient.get<ISuperbowlOdds[]>(this._superbowlOddGetBySeasonNameUrl + seasonName).pipe(
            map((superbowlodds: ISuperbowlOdds[]) => {
            var so = new Array<SuperbowlOdds>();
                for (const i in superbowlodds) {
                    if (superbowlodds.hasOwnProperty(i)) {
                        if (superbowlodds[i].tournament.tournamentName.substring(superbowlodds[i].tournament.tournamentName.length - 4)
                            === seasonName)
                        {
                            so.push(new SuperbowlOdds(superbowlodds[i].superbowlOddsId,
                                new Tournament(superbowlodds[i].tournament.tournamentId, superbowlodds[i].tournament.tournamentName,
                                    superbowlodds[i].tournament.seasonId),
                                new Team(superbowlodds[i].team.teamId, superbowlodds[i].team.teamName, superbowlodds[i].team.teamNameShort,
                                    new Coach(0, '', ''),
                                    new Division(0, ''), '', '', '', '', '', null, null, null),
                                superbowlodds[i].odds));
                        }
                    }
                }
            return so;
        }),
        tap(data => this._logService.log('Superbowl Odds By Season Name: ' + JSON.stringify(data))),
        catchError(this._commonService.errorHandler));  /** catch error */
    }
}
