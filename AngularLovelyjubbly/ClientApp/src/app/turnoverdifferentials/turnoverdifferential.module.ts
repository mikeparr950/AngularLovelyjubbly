import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

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
        TurnoverDifferentialRoutingModule
    ],
    /** service providers */
    providers: [
        TurnoverDifferentialService
    ]
})

export class TurnoverDifferentialModule {

}
