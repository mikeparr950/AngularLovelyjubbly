import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/modules/shared.module';

import { SuperbowlOddViewComponent } from './superbowlodd-view.component';
import { SuperbowlOddsService } from '../shared/services/superbowlodds.service';

@NgModule({
    declarations: [
        SuperbowlOddViewComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: 'SuperbowlOdds', component: SuperbowlOddViewComponent }
        ]),
        SharedModule /** includes CommonModule, FormsModule and HttpModule */
    ],
    /** service providers */
    providers: [
        SuperbowlOddsService
    ]
})

export class SuperbowlOddModule {
}
