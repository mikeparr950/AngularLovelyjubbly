import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { AccountLogin } from '../shared/models/account.login';

import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../shared/utils/common.service';
import { UserService } from '../shared/services/user.service';
import { LogService } from '../shared/utils/log.service';

@Component({
    selector: 'app-login-form',
    templateUrl: '../account/account-login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup; /** root form group */

    private subscription: Subscription;

    redirectFrom: string;
    errors: string;
    isRequesting: boolean;
    credentials: AccountLogin = { email: '', password: '' };

    color = 'primary';
    mode = 'indeterminate';
    spinnerValue = 0;

    private isLocalStorageAvailable = false;

    constructor(private router: Router, private activatedRoute: ActivatedRoute,
        private fb: FormBuilder, public snackBar: MatSnackBar, public _userService: UserService,
        private commonService: CommonService, private cookieService: CookieService,
        private logService: LogService) {
        //this.isLocalStorageAvailable = false;
        this.isLocalStorageAvailable = commonService.isLocalStorageAvailable();
    }

    ngOnInit() {

        // subscribe to router event
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.redirectFrom = param['redirectFrom'];
                this.credentials.email = param['email'];
            });

        /** formBuilder creates a form model from configuration */
        this.loginForm = this.fb.group({
            /** form controls, key value pairs */
            /** can also be array */
            /** 1st array element is default value, 2nd is array of validation rules, 3rd is async validators */
            /** eg server side validation, these run after synchronous validators pass */
            email: [this.credentials.email, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')]],
            password: ['', Validators.required]
        });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }

    login() {
        this.isRequesting = true;
        this.errors = '';

        const emailControl = this.loginForm.get('email');
        const passwordControl = this.loginForm.get('password');

        this._userService.login(emailControl.value, passwordControl.value)
            .pipe(
                finalize(() => {
                    this.isRequesting = false
                })
            )
            .subscribe(
                result => {
                    this.logService.logObject(result);
                    if (result) {
                        let config = new MatSnackBarConfig();
                        config.politeness = 'assertive';
                        config.duration = 4000;
                        config.panelClass = ['snack-bar-success'];

                        if (this._userService.currentLanguage() === 'en') {
                            this.snackBar.open('Login successful', '', config);
                        }
                        else if (this._userService.currentLanguage() === 'fi') {
                            this.snackBar.open('Sisäänkirjautuminen onnistui', '', config);
                        }

                        this.router.navigate(['/']);
                    }
                    else {
                        this.router.navigate(['/TwoFactorAuth']);
                    }
                },
                error => {
                    this.errors = error;

                    let config = new MatSnackBarConfig();
                    config.politeness = 'assertive';
                    config.duration = 4000;
                    config.panelClass = ['snack-bar-warning'];
                    let snackBarRef = this.snackBar.open(this.errors, '', config);
                });
    }
}
