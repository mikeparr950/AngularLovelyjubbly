import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { FixtureListComponent } from './fixture-list.component';
import { FixtureAddComponent } from './fixture-add.component';
import { FixtureUpdateComponent } from './fixture-update.component';
import { FixtureService } from '../shared/services/fixture.service';
import { FixtureEditGuard } from './fixture-guard.service';

import { AuthGuard } from '../shared/guards/auth.guard';

@NgModule({
    declarations: [
        FixtureListComponent,
        FixtureAddComponent,
        FixtureUpdateComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        RouterModule.forChild([
            { path: 'FixtureUpdate/:id', component: FixtureUpdateComponent, canActivate: [AuthGuard, FixtureEditGuard] },
            { path: 'FixtureAdd', component: FixtureAddComponent, canActivate: [AuthGuard] },
            { path: 'Fixtures', component: FixtureListComponent }
        ])
    ],
    /** service providers */
    providers: [
        FixtureService,
        FixtureEditGuard,
        AuthGuard
    ]
})

export class FixtureModule {

}
