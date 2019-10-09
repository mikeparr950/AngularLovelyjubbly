import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { SyncfusionModule } from '../shared/modules/syncfusion.module';
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
        SyncfusionModule,
        PowerRankingRoutingModule
    ],
    /** service providers */
    providers: [
        PowerRankingService
    ]
})

export class PowerRankingModule {

}
