import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { ISeason } from '../models/season';

@Injectable({
    providedIn: 'root',
})
export class SeasonService {

    private _seasonUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._seasonUrl = this._configService.getApiURI() + "/seasons";
    }

    getSeasons(): Observable<ISeason[]> {
        return this._httpClient.get<ISeason[]>(this._seasonUrl).pipe(
            tap(data => this._logService.log('All Seasons: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
