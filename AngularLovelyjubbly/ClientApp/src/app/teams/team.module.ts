import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './team-list.component';
import { TeamAddComponent } from './team-add.component';
import { TeamUpdateComponent } from './team-update.component';
import { TeamViewComponent } from './team-view.component';
import { TeamService } from '../shared/services/team.service';
import { ChartsModule } from 'ng2-charts';

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
        TeamRoutingModule,
        ChartsModule
    ],
    /** service providers */
    providers: [
        TeamService
    ]
})

export class TeamModule {

}
