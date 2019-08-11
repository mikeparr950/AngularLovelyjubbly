import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { FixtureRoutingModule } from './fixture-routing.module';
import { FixtureListComponent } from './fixture-list.component';
import { FixtureAddComponent } from './fixture-add.component';
import { FixtureUpdateComponent } from './fixture-update.component';
import { FixtureService } from '../shared/services/fixture.service';


@NgModule({
    declarations: [
        FixtureListComponent,
        FixtureAddComponent,
        FixtureUpdateComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        FixtureRoutingModule
    ],
    /** service providers */
    providers: [
        FixtureService
    ]
})

export class FixtureModule {

}
