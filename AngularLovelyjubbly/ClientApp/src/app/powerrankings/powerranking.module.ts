import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { PowerRankingRoutingModule } from './powerranking-routing.module';
import { PowerRankingListComponent } from './powerranking-list.component';
import { PowerRankingViewComponent } from './powerranking-view.component';
import { PowerRankingService } from '../shared/services/powerranking.service';

@NgModule({
    declarations: [
        PowerRankingListComponent,
        PowerRankingViewComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        PowerRankingRoutingModule
    ],
    /** service providers */
    providers: [
        PowerRankingService
    ]
})

export class PowerRankingModule {

}
