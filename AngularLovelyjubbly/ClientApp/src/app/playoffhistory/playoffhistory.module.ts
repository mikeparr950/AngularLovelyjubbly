import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { PlayoffHistoryRoutingModule } from './playoffhistory-routing.module';
import { PlayoffHistoryViewComponent } from './playoffhistory-view.component';

@NgModule({
    declarations: [
        PlayoffHistoryViewComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        PlayoffHistoryRoutingModule
    ]
})

export class PlayoffHistoryModule {

}
