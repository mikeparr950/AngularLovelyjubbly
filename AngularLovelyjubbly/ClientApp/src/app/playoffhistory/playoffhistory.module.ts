import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { PlayoffHistoryViewComponent } from './playoffhistory-view.component';

@NgModule({
    declarations: [
        PlayoffHistoryViewComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: 'PlayoffHistory', component: PlayoffHistoryViewComponent }
        ]),
        SharedModule,
        MaterialModule
    ],
    /** service providers */
    providers: [
    ]
})

export class PlayoffHistoryModule {

}
