import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { SyncfusionModule } from '../shared/modules/syncfusion.module';
import { MaterialModule } from '../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayResultRoutingModule } from './playresult-routing.module';
import { PlayResultListComponent } from './playresult-list.component';
import { PlayResult2027ListComponent } from './playresult2027-list.component';
import { PlayResultAddComponent } from './playresult-add.component';
import { PlayResultService } from '../shared/services/playresult.service';


@NgModule({
    declarations: [
        PlayResultListComponent,
        PlayResult2027ListComponent,
        PlayResultAddComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        SyncfusionModule,
        ReactiveFormsModule,
        PlayResultRoutingModule
    ],
    /** service providers */
    providers: [
        PlayResultService
    ]
})

export class PlayResultModule {

}
