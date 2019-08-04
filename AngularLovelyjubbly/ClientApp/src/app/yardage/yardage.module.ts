import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { YardageViewComponent } from './yardage-view.component';
import { YardageService } from '../shared/services/yardage.service';

@NgModule({
    declarations: [
        YardageViewComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        RouterModule.forChild([
            { path: 'Yardage', component: YardageViewComponent }
        ])
    ],
    /** service providers */
    providers: [
        YardageService
    ]
})

export class YardageModule {

}
