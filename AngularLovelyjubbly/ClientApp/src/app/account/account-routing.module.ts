import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './account-register.component';
import { LoginComponent } from './account-login.component';
//import { ChangePasswordComponent } from './account-changepassword.component';
//import { UserListComponent } from './account-list.component';
//import { ConfirmEmailComponent } from './account-confirmemail.component';
import { ForgotPasswordComponent } from './account-forgotpassword.component';

const routes: Routes = [
    //{ path: '', component: FixtureListComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'Register', component: RegisterComponent },
    { path: 'ForgotPassword', component: ForgotPasswordComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }