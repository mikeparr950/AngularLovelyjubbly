import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';
import { IOffensivePlay, OffensivePlay } from '../models/offensiveplay';

@Injectable({
    providedIn: 'root',
})
export class OffensivePlayService {

    private _offensivePlayGetUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _cookieService: CookieService, private _logService: LogService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._offensivePlayGetUrl = this._configService.getApiURI() + "/OffensivePlays";
    }

    getOffensivePlays(): Observable<IOffensivePlay[]> {
        return this._httpClient.get<IOffensivePlay[]>(this._offensivePlayGetUrl).pipe(
            tap(data => this._logService.log('All Offensive Plays: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
