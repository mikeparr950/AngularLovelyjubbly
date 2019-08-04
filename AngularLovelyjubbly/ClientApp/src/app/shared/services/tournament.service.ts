import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { ITournament } from '../models/tournament';

@Injectable({
    providedIn: 'root',
})
export class TournamentService {

    private _tournamentUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._tournamentUrl = this._configService.getApiURI() + "/tournaments";
    }

    getTournaments(): Observable<ITournament[]> {
        return this._httpClient.get<ITournament[]>(this._tournamentUrl).pipe(
            tap(data => this._logService.log('All Tournaments: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
