import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { QBRatingRoutingModule } from './qbrating-routing.module';
import { QBRatingListComponent } from './qbrating-list.component';
import { QBRatingAddComponent } from './qbrating-add.component';
import { QBRatingUpdateComponent } from './qbrating-update.component';
import { QBRatingViewComponent } from './qbrating-view.component';
///** import { QBRatingFilterPipe } from './qbrating-filter.pipe'; */
import { QBRatingService } from '../shared/services/qbrating.service';

@NgModule({
    declarations: [
        QBRatingListComponent,
        QBRatingAddComponent,
        QBRatingUpdateComponent,
        QBRatingViewComponent
        /** QBRatingFilterPipe */
    ],
    imports: [
        SharedModule,
        MaterialModule,
        ReactiveFormsModule,
        QBRatingRoutingModule
    ],
    /** service providers */
    providers: [
        QBRatingService
    ]
})

export class QBRatingModule {

}
