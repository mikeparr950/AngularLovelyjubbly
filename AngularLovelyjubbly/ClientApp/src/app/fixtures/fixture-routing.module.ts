import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixtureListComponent } from './fixture-list.component';
import { FixtureAddComponent } from './fixture-add.component';
import { FixtureUpdateComponent } from './fixture-update.component';
import { FixtureEditGuard } from './fixture-guard.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: '', component: FixtureListComponent, pathMatch: 'full' },
            { path: 'Update/:id', component: FixtureUpdateComponent, canActivate: [AuthGuard, FixtureEditGuard], pathMatch: 'full' },
            { path: 'Add', component: FixtureAddComponent, canActivate: [AuthGuard], pathMatch: 'full' }
        ]
    }
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
