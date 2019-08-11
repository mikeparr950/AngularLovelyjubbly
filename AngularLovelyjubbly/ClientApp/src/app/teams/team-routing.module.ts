import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamListComponent } from './team-list.component';
import { TeamAddComponent } from './team-add.component';
import { TeamUpdateComponent } from './team-update.component';
import { TeamViewComponent } from './team-view.component';
import { TeamEditGuard } from './team-guard.service';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', component: TeamListComponent },
    { path: 'View', component: TeamViewComponent },
    { path: 'Update/:id', component: TeamUpdateComponent, canActivate: [AuthGuard, TeamEditGuard] },
    { path: 'Add', component: TeamAddComponent, canActivate: [AuthGuard] },

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
