import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { MainHallOfFameComponent } from './main-halloffame.component';
import { MainSeasonPredictionsComponent } from './main-seasonpredictions.component';
import { MainLinksComponent } from './main-links.component';

@NgModule({
    declarations: [
        MainHallOfFameComponent,
        MainSeasonPredictionsComponent,
        MainLinksComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: 'HallOfFame', component: MainHallOfFameComponent },
            { path: 'SeasonPredictions', component: MainSeasonPredictionsComponent },
            { path: 'Links', component: MainLinksComponent }
        ]),
        SharedModule,
        MaterialModule
    ],
    /** service providers */
    providers: [
    ]
})

export class MainModule {

}
