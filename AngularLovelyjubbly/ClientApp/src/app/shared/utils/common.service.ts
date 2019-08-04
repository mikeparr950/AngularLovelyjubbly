import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { LogService } from '../utils/log.service';
import { _localeFactory } from '@angular/core/src/application_module';

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    /** Angular : https://angular.io/guide/browser-support
        Local Storage : http://caniuse.com/#search=local%20storage
        So local storage is supported in all browsers that Angular supports
        However, local storage can be disabled :
        In FireFox: Type “about:config” in your address bar and hit enter to view your internal browser settings. Scroll down to „dom.storage.enabled“, right click on it and hit „Toggle“
        to disable the DOM Storage
        In IE : http://www.techentice.com/enable-disable-dom-storage-cookies-internet-explorerfirefox/ */

    _isLocalStorageAvailable: boolean;

    constructor(private _logService: LogService) {

    }

    /** Error Handling method */
    errorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    isLocalStorageAvailable() {
        if (typeof localStorage !== 'undefined' && localStorage !== null) {
            try {
                localStorage.setItem('feature_test', 'yes');
                if (localStorage.getItem('feature_test') === 'yes') {
                    localStorage.removeItem('feature_test');
                    // localStorage is enabled
                    this._logService.log('local storage available');
                    return true;
                } else {
                    // localStorage is disabled
                    this._logService.log('local storage disabled');
                    return false;
                }
            } catch (e) {
                // localStorage is disabled
                this._logService.log('local storage disabled');
                return false;
            }
        } else {
            // localStorage is not available
            this._logService.log('local storage unavailable');
            return false;
        }
    }

    /** https://stackoverflow.com/questions/47287181/angular-material-2-change-datepicker-date-format-on-button */
    private _to2digit(n: number) {
        return ("00" + n).slice(-2);
    }

    formatDate(date: Date): string {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return this._to2digit(day) + "/" + this._to2digit(month) + "/" + year;
    }

    firstCharToUpperCase(string: string): string {
        return string.charAt(0).toUpperCase() + string.substr(1);
    }
}
