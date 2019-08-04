import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { IRegularSeasonWins } from '../models/regularseasonwins';

/** make the service injectable */
@Injectable({
    providedIn: 'root',
})
export class RegularSeasonWinsService {

    private _regularSeasonWinsByTeamNameUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._regularSeasonWinsByTeamNameUrl = this._configService.getApiURI() + "/RegularSeasonWinsByTeamName/";
    }

    /** Observable<Response> is returned, here Response is mapped to IRegularSeasonWins array */
    getRegularSeasonWinsByTeamName(teamName: string): Observable<IRegularSeasonWins[]> {
        return this._httpClient.get<IRegularSeasonWins[]>(this._regularSeasonWinsByTeamNameUrl + teamName).pipe(
            tap(data => this._logService.log('Regular Season Wins By Team Name: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
