import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './account-register.component';
import { LoginComponent } from './account-login.component';
//import { ChangePasswordComponent } from './account-changepassword.component';
//import { UserListComponent } from './account-list.component';
//import { ConfirmEmailComponent } from './account-confirmemail.component';
import { ForgotPasswordComponent } from './account-forgotpassword.component';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: 'Login', component: LoginComponent, pathMatch: 'full' },
            { path: 'Register', component: RegisterComponent, pathMatch: 'full' },
            { path: 'ForgotPassword', component: ForgotPasswordComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }