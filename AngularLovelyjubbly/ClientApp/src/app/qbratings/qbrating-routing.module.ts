import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QBRatingListComponent } from './qbrating-list.component';
import { QBRatingAddComponent } from './qbrating-add.component';
import { QBRatingUpdateComponent } from './qbrating-update.component';
import { QBRatingEditGuard } from './qbrating-guard.service';
import { QBRatingViewComponent } from './qbrating-view.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: '', component: QBRatingListComponent, pathMatch: 'full' },
            { path: 'View', component: QBRatingViewComponent, pathMatch: 'full' },
            { path: 'Update/:id', component: QBRatingUpdateComponent, canActivate: [AuthGuard, QBRatingEditGuard], pathMatch: 'full' },
            { path: 'Add', component: QBRatingAddComponent, canActivate: [AuthGuard], pathMatch: 'full' }
        ]
    }
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
