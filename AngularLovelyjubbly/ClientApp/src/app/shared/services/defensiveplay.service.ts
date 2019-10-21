import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';
import { IDefensivePlay, DefensivePlay } from '../models/defensiveplay';

@Injectable({
    providedIn: 'root',
})
export class DefensivePlayService {

    private _defensivePlayGetUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _cookieService: CookieService, private _logService: LogService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._defensivePlayGetUrl = this._configService.getApiURI() + "/DefensivePlays";
    }

    getDefensivePlays(): Observable<IDefensivePlay[]> {
        return this._httpClient.get<IDefensivePlay[]>(this._defensivePlayGetUrl).pipe(
            tap(data => this._logService.log('All Defensive Plays: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
