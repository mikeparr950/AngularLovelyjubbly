import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { IDivision } from '../models/division';

@Injectable({
    providedIn: 'root',
})
export class DivisionService {

    private _divisionUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._divisionUrl = this._configService.getApiURI() + "/divisions";
    }

    getDivisions(): Observable<IDivision[]> {
        return this._httpClient.get<IDivision[]>(this._divisionUrl).pipe(
            tap(data => this._logService.log('All Divisions: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
