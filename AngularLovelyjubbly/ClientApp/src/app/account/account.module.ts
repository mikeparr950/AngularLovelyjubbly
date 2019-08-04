import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { UserService } from '../shared/services/user.service';

import { RegisterComponent } from './account-register.component';
import { LoginComponent } from './account-login.component';
//import { ChangePasswordComponent } from './account-changepassword.component';
//import { UserListComponent } from './account-list.component';
//import { ConfirmEmailComponent } from './account-confirmemail.component';
import { ForgotPasswordComponent } from './account-forgotpassword.component';
//import { ForgotPasswordConfirmationComponent } from './account-forgotpasswordconfirmation.component';
//import { ResetPasswordComponent } from './account-resetpassword.component';
//import { ResetPasswordConfirmationComponent } from './account-resetpasswordconfirmation.component';
//import { TwoFactorAuthComponent } from './account-twofactorauth.component';
//import { ViewProfileComponent } from './account-viewprofile.component';
//import { AddPhoneNumberComponent } from './account-addphonenumber.component';
//import { VerifyPhoneNumberComponent } from './account-verifyphonenumber.component';
//import { EnableTwoFactorAuthComponent } from './account-enabletwofactorauth.component';

//removed this as we want to catch 401 with interceptor instead
//import { AuthGuard } from '../shared/guards/auth.guard';

/** protect views with guard, protect api calls with [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] */
@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        RouterModule.forChild([
            { path: 'Login', component: LoginComponent },
            { path: 'Register', component: RegisterComponent },
            { path: 'ForgotPassword', component: ForgotPasswordComponent }

        ])
    ],
    declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
    providers: [UserService]
})
export class AccountModule {

}
