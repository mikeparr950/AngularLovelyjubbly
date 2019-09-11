import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {

    _apiURI: string;
    _server: string;

    constructor() {
        if (!environment.production) {
            this._apiURI = 'http://localhost:9220/api';
            this._server = 'http://localhost:9220';
        }
        else {
            this._apiURI = 'https://angularlovelyjubbly.azurewebsites.net/api';
            this._server = 'https://angularlovelyjubbly.azurewebsites.net';
        }
    }

    getApiURI() {
        return this._apiURI;
    }

    getServer() {
        return this._server;
    }
}
