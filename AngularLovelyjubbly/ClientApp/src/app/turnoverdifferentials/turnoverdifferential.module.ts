import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';
import { SyncfusionModule } from '../shared/modules/syncfusion.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TurnoverDifferentialRoutingModule } from './turnoverdifferential-routing.module';
import { TurnoverDifferentialViewComponent } from './turnoverdifferential-view.component';
import { TurnoverDifferentialListComponent } from './turnoverdifferential-list.component';
import { TurnoverDifferentialAddComponent } from './turnoverdifferential-add.component';
import { TurnoverDifferentialUpdateComponent } from './turnoverdifferential-update.component';
import { TurnoverDifferentialService } from '../shared/services/turnoverdifferential.service';

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
        SyncfusionModule,
        ReactiveFormsModule,
        TurnoverDifferentialRoutingModule
    ],
    /** service providers */
    providers: [
        TurnoverDifferentialService
    ]
})

export class TurnoverDifferentialModule {

}
