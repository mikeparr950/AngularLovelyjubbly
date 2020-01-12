import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { SyncfusionModule } from '../shared/modules/syncfusion.module';
import { MaterialModule } from '../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { YardageRoutingModule } from './yardage-routing.module';
import { YardageViewComponent } from './yardage-view.component';
import { YardageService } from '../shared/services/yardage.service';

@NgModule({
    declarations: [
        YardageViewComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        SyncfusionModule,
        ReactiveFormsModule,
        YardageRoutingModule
    ],
    /** service providers */
    providers: [
        YardageService
    ]
})

export class YardageModule {

}
