import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortfolioViewComponent } from './portfolio-view.component';
import { PortfolioScreenshotComponent } from './portfolio-screenshot.component';
import { PortfolioLayoutComponent } from '../shared/components/portfolio-layout/portfolio-layout.component';

const routes: Routes = [
    {
        path: '',
        component: PortfolioLayoutComponent,
        children: [
            { path: 'View', component: PortfolioViewComponent, pathMatch: 'full' },
            { path: 'Screenshot/:id', component: PortfolioScreenshotComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PortfolioRoutingModule { }
