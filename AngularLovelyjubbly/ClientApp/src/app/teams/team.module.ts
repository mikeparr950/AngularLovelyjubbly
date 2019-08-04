import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { TeamListComponent } from './team-list.component';
import { TeamAddComponent } from './team-add.component';
import { TeamUpdateComponent } from './team-update.component';
import { TeamViewComponent } from './team-view.component';
import { TeamService } from '../shared/services/team.service';
import { TeamEditGuard } from './team-guard.service';
//import { RegularSeasonWinsService } from '../shared/services/regularseasonwins.service';
import { ChartsModule } from 'ng2-charts';

import { AuthGuard } from '../shared/guards/auth.guard';

@NgModule({
    declarations: [
        TeamListComponent,
        TeamAddComponent,
        TeamUpdateComponent,
        TeamViewComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        RouterModule.forChild([
            { path: 'TeamUpdate/:id', component: TeamUpdateComponent, canActivate: [AuthGuard, TeamEditGuard] },
            { path: 'TeamAdd', component: TeamAddComponent, canActivate: [AuthGuard] },
            { path: 'Teams', component: TeamListComponent },
            { path: 'Team', component: TeamViewComponent }
        ]),
        ChartsModule
    ],
    /** service providers */
    providers: [
        TeamService,
        TeamEditGuard,
        AuthGuard
        //RegularSeasonWinsService
    ]
})

export class TeamModule {

}
