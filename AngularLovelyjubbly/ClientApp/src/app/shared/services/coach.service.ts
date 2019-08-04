import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { ICoach } from '../models/coach';

@Injectable({
    providedIn: 'root',
})
export class CoachService {

    private _coachUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._coachUrl = this._configService.getApiURI() + "/coaches";
    }

    getCoaches(): Observable<ICoach[]> {
        return this._httpClient.get<ICoach[]>(this._coachUrl).pipe(
            tap(data => this._logService.log('All Coaches: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    } 
}
