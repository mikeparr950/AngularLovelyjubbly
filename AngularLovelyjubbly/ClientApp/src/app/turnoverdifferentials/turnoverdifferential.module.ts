import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { TurnoverDifferentialViewComponent } from './turnoverdifferential-view.component';
import { TurnoverDifferentialService } from '../shared/services/turnoverdifferential.service';
import { TurnoverDifferentialListComponent } from './turnoverdifferential-list.component';
import { TurnoverDifferentialAddComponent } from './turnoverdifferential-add.component';
import { TurnoverDifferentialUpdateComponent } from './turnoverdifferential-update.component';
import { TurnoverDifferentialEditGuard } from './turnoverdifferential-guard.service';

import { AuthGuard } from '../shared/guards/auth.guard';

@NgModule({
    declarations: [
        TurnoverDifferentialListComponent,
        TurnoverDifferentialAddComponent,
        TurnoverDifferentialUpdateComponent,
        TurnoverDifferentialViewComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        RouterModule.forChild([
            {
                path: 'TurnoverDifferentialUpdate/:id', component: TurnoverDifferentialUpdateComponent,
                canActivate: [AuthGuard, TurnoverDifferentialEditGuard]
            },
            { path: 'TurnoverDifferentialAdd', component: TurnoverDifferentialAddComponent, canActivate: [AuthGuard] },
            { path: 'TurnoverDifferentials', component: TurnoverDifferentialListComponent },
            { path: 'TurnoverDifferential', component: TurnoverDifferentialViewComponent }
        ])
    ],
    /** service providers */
    providers: [
        TurnoverDifferentialService,
        TurnoverDifferentialEditGuard,
        AuthGuard
    ]
})

export class TurnoverDifferentialModule {

}
