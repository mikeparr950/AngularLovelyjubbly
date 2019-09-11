import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { MaterialModule } from '../shared/modules/material.module';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioViewComponent } from './portfolio-view.component';
import { PortfolioScreenshotComponent } from './portfolio-screenshot.component';

@NgModule({
    declarations: [
        PortfolioViewComponent,
        PortfolioScreenshotComponent
    ],
    imports: [
        SharedModule,
        MaterialModule,
        PortfolioRoutingModule
    ]
})

export class PortfolioModule {

}
