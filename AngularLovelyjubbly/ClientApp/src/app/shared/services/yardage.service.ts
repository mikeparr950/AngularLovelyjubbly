import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { IYardage, Yardage } from '../models/yardage';
import { Tournament } from '../models/tournament';
import { Team } from '../models/team';
import { Coach } from '../models/coach';
import { Division } from '../models/division';

@Injectable({
    providedIn: 'root',
})
export class YardageService {

    private _yardageGetUrl;
    private _yardageGetBySeasonNameUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._yardageGetUrl = this._configService.getApiURI() + "/Yardages";
        this._yardageGetBySeasonNameUrl = this._configService.getApiURI() + "/YardagesBySeasonName/";
    }

    getYardages(): Observable<IYardage[]> {
        return this._httpClient.get<IYardage[]>(this._yardageGetUrl).pipe(
            map((yardages: IYardage[]) => {
                var y = new Array<Yardage>();
                for (var i in yardages) {
                    y.push(new Yardage(yardages[i].yardageId,
                        new Tournament(yardages[i].tournament.tournamentId, yardages[i].tournament.tournamentName,
                            yardages[i].tournament.seasonId),
                        new Team(yardages[i].team.teamId, yardages[i].team.teamName, yardages[i].team.teamNameShort,
                            new Coach(0, '', ''),
                            new Division(0, ''), '', '', '', '', '', null, null, null),
                        yardages[i].offensePassingYards, yardages[i].offenseRushingYards, yardages[i].offenseTotalYards,
                        yardages[i].defensePassingYards, yardages[i].defenseRushingYards, yardages[i].defenseTotalYards,
                        yardages[i].offenseTotalYards - yardages[i].defenseTotalYards));
                }
                return y;

            }),
            tap(data => this._logService.log('All Yardages: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getYardagesBySeasonName(seasonName: string): Observable<IYardage[]> {
        return this._httpClient.get<IYardage[]>(this._yardageGetBySeasonNameUrl + seasonName).pipe(
            map((yardages: IYardage[]) => {
                var y = new Array<Yardage>();
                for (const i in yardages) {
                    if (yardages.hasOwnProperty(i)) {
                        if (yardages[i].tournament.tournamentName.substring(yardages[i].tournament.tournamentName.length - 4) === seasonName) {
                            y.push(new Yardage(yardages[i].yardageId,
                                new Tournament(yardages[i].tournament.tournamentId, yardages[i].tournament.tournamentName,
                                    yardages[i].tournament.seasonId),
                                new Team(yardages[i].team.teamId, yardages[i].team.teamName, yardages[i].team.teamNameShort,
                                    new Coach(0, '', ''),
                                    new Division(0, ''), '', '', '', '', '', null, null, null),
                                yardages[i].offensePassingYards, yardages[i].offenseRushingYards, yardages[i].offenseTotalYards,
                                yardages[i].defensePassingYards, yardages[i].defenseRushingYards, yardages[i].defenseTotalYards,
                                yardages[i].offenseTotalYards - yardages[i].defenseTotalYards));
                        }
                    }
                }
                return y;
            }),
            tap(data => this._logService.log('Yardages By Season Name: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
