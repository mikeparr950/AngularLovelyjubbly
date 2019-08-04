import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { IRefreshToken, RefreshToken } from '../models/refreshtoken';

@Injectable({
    providedIn: 'root',
})
export class RefreshTokenService {

    private _refreshTokenUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._refreshTokenUrl = this._configService.getApiURI() + "/ValidRefreshTokens";
    }

    getValidRefreshTokens(): Observable<IRefreshToken[]> {
        return this._httpClient.get<IRefreshToken[]>(this._refreshTokenUrl).pipe(
            map((refreshTokens: IRefreshToken[]) => {
                var rt = new Array<RefreshToken>();
                for (const i in refreshTokens) {
                    if (refreshTokens.hasOwnProperty(i)) {
                        rt.push(new RefreshToken(refreshTokens[i].refreshTokenId, refreshTokens[i].userId,
                            refreshTokens[i].startDate, refreshTokens[i].endDate,
                            refreshTokens[i].isEnabled));
                    }
                }
                return rt;
            }),
            tap(data => this._logService.log('All Refresh Tokens: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    getRefreshToken(id: string): Observable<IRefreshToken> {
        return this.getValidRefreshTokens().pipe(
            map((refreshTokens: IRefreshToken[]) => {
                const rt = refreshTokens.find(r => r.refreshTokenId === id);
                if (rt !== undefined) {
                    return new RefreshToken(rt.refreshTokenId, rt.userId, rt.startDate, rt.endDate, rt.isEnabled);
                }
                else {
                    return null;
                }
            }),
            tap(data => this._logService.log('Selected refresh token: ' + JSON.stringify(data))), /** log returned data to console */
            catchError(this._commonService.errorHandler));
    }
}
