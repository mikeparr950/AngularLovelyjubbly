import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamListComponent } from './team-list.component';
import { TeamAddComponent } from './team-add.component';
import { TeamUpdateComponent } from './team-update.component';
import { TeamViewComponent } from './team-view.component';
import { TeamEditGuard } from './team-guard.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: '', component: TeamListComponent, pathMatch: 'full' },
            { path: 'View', component: TeamViewComponent, pathMatch: 'full' },
            { path: 'Update/:id', component: TeamUpdateComponent, canActivate: [AuthGuard, TeamEditGuard], pathMatch: 'full' },
            { path: 'Add', component: TeamAddComponent, canActivate: [AuthGuard], pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        TeamEditGuard,
        AuthGuard
    ]
})
export class TeamRoutingModule { }
