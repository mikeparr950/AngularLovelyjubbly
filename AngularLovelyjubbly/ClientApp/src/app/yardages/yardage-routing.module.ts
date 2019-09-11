import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YardageViewComponent } from './yardage-view.component';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: 'View', component: YardageViewComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class YardageRoutingModule { }
