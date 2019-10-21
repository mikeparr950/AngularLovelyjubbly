import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { CookieService } from 'ngx-cookie-service';
import { IFormation, Formation } from '../models/formation';

@Injectable({
    providedIn: 'root',
})
export class FormationService {

    private _formationGetUrl;

    private isLocalStorageAvailable = false;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _cookieService: CookieService, private _logService: LogService) {
        this.isLocalStorageAvailable = _commonService.isLocalStorageAvailable();
        this._formationGetUrl = this._configService.getApiURI() + "/Formations";
    }

    getFormations(): Observable<IFormation[]> {
        return this._httpClient.get<IFormation[]>(this._formationGetUrl).pipe(
            tap(data => this._logService.log('All Formations: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
