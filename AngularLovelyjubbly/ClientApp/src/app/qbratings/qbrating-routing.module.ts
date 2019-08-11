import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QBRatingListComponent } from './qbrating-list.component';
import { QBRatingAddComponent } from './qbrating-add.component';
import { QBRatingUpdateComponent } from './qbrating-update.component';
import { QBRatingEditGuard } from './qbrating-guard.service';
import { QBRatingViewComponent } from './qbrating-view.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', component: QBRatingListComponent },
    { path: 'View', component: QBRatingViewComponent },
    { path: 'Update/:id', component: QBRatingUpdateComponent, canActivate: [AuthGuard, QBRatingEditGuard] },
    { path: 'Add', component: QBRatingAddComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        QBRatingEditGuard,
        AuthGuard
    ]
})
export class QBRatingRoutingModule { }
