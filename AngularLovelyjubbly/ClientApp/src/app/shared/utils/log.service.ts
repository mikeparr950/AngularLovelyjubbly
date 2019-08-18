import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LogService {

    constructor() {
    }

    log(text: string) {
        if (!environment.production) {
            console.log(text);
        }
    }

    logObject(text: any) {
        if (!environment.production) {
            console.log(text);
        }
    }
}
