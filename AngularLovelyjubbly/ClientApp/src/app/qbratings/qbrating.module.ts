import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { QBRatingListComponent } from './qbrating-list.component';
import { QBRatingAddComponent } from './qbrating-add.component';
import { QBRatingUpdateComponent } from './qbrating-update.component';
import { QBRatingViewComponent } from './qbrating-view.component';
///** import { QBRatingFilterPipe } from './qbrating-filter.pipe'; */
import { QBRatingService } from '../shared/services/qbrating.service';
import { QBRatingEditGuard } from './qbrating-guard.service';

import { AuthGuard } from '../shared/guards/auth.guard';

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
        RouterModule.forChild([
            { path: 'QBRatingUpdate/:id', component: QBRatingUpdateComponent, canActivate: [AuthGuard, QBRatingEditGuard] },
            { path: 'QBRatingAdd', component: QBRatingAddComponent, canActivate: [AuthGuard] },
            { path: 'QBRating', component: QBRatingViewComponent },
            { path: 'QBRatings', component: QBRatingListComponent }
        ])
    ],
    /** service providers */
    providers: [
        QBRatingService,
        QBRatingEditGuard,
        AuthGuard
    ]
})

export class QBRatingModule {

}
