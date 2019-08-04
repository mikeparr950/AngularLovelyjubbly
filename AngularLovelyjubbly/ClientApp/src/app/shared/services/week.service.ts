import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { IWeek } from '../models/week';

@Injectable({
    providedIn: 'root',
})
export class WeekService {

    private _weekUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._weekUrl = this._configService.getApiURI() + "/weeks";
    }

    getWeeks(): Observable<IWeek[]> {
        return this._httpClient.get<IWeek[]>(this._weekUrl).pipe(
            tap(data => this._logService.log('All Weeks: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
