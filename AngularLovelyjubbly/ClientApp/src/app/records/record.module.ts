import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';
import { ChartsModule } from 'ng2-charts';

import { RecordRoutingModule } from './record-routing.module';
import { RecordViewComponent } from './record-view.component';
import { RecordService } from '../shared/services/record.service';

@NgModule({
    declarations: [
        RecordViewComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        RecordRoutingModule,
        ChartsModule
    ],
    /** service providers */
    providers: [
        RecordService
    ]
})

export class RecordModule {

}
