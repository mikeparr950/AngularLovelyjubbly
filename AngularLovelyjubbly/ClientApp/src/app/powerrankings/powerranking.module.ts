import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

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
        RouterModule.forChild([
            { path: 'PowerRanking', component: PowerRankingViewComponent },
            { path: 'PowerRankings', component: PowerRankingListComponent }
           
        ])
    ],
    /** service providers */
    providers: [
        PowerRankingService
    ]
})

export class PowerRankingModule {

}
