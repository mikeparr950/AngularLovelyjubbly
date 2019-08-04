import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { ICountry } from '../models/country';

@Injectable({
    providedIn: 'root',
})
export class CountryService {

    private _countryUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._countryUrl = this._configService.getApiURI() + "/countries";
    }

    getCountries(): Observable<ICountry[]> {
        return this._httpClient.get<ICountry[]>(this._countryUrl).pipe(
            tap(data => this._logService.log('All Countries: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
