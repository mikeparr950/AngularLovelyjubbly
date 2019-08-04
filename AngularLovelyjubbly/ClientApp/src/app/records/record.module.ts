import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';
import { ChartsModule } from 'ng2-charts';

import { RecordViewComponent } from './record-view.component';
import { RecordService } from '../shared/services/record.service';

@NgModule({
    declarations: [
        RecordViewComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        RouterModule.forChild([
            { path: 'Record', component: RecordViewComponent }
        ]),
        ChartsModule
    ],
    /** service providers */
    providers: [
        RecordService
    ]
})

export class RecordModule {

}
