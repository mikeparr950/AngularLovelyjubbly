import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PowerRankingListComponent } from './powerranking-list.component';
import { PowerRankingViewComponent } from './powerranking-view.component';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: '', component: PowerRankingListComponent, pathMatch: 'full' },
            { path: 'View', component: PowerRankingViewComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PowerRankingRoutingModule { }
