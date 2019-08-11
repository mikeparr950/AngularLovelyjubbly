import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { MainRoutingModule } from './main-routing.module';
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
        SharedModule,
        MaterialModule,
        MainRoutingModule
    ]
})

export class MainModule {
}
