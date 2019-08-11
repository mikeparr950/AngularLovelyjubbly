import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixtureListComponent } from './fixture-list.component';
import { FixtureAddComponent } from './fixture-add.component';
import { FixtureUpdateComponent } from './fixture-update.component';
import { FixtureEditGuard } from './fixture-guard.service';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', component: FixtureListComponent },
    { path: 'Update/:id', component: FixtureUpdateComponent, canActivate: [AuthGuard, FixtureEditGuard] },
    { path: 'Add', component: FixtureAddComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        FixtureEditGuard,
        AuthGuard
    ]
})
export class FixtureRoutingModule { }
