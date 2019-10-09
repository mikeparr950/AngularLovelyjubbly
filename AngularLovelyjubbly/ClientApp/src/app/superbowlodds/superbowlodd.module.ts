import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { SyncfusionModule } from '../shared/modules/syncfusion.module';

import { SuperbowlOddRoutingModule } from './superbowlodd-routing.module';
import { SuperbowlOddViewComponent } from './superbowlodd-view.component';
import { SuperbowlOddsService } from '../shared/services/superbowlodds.service';

@NgModule({
    declarations: [
        SuperbowlOddViewComponent
    ],
    imports: [
        SharedModule, /** includes CommonModule, FormsModule and HttpModule */
        SyncfusionModule,
        SuperbowlOddRoutingModule
    ],
    /** service providers */
    providers: [
        SuperbowlOddsService
    ]
})

export class SuperbowlOddModule {
}
