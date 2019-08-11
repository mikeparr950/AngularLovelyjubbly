import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PowerRankingListComponent } from './powerranking-list.component';
import { PowerRankingViewComponent } from './powerranking-view.component';

const routes: Routes = [
    { path: '', component: PowerRankingListComponent },
    { path: 'View', component: PowerRankingViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PowerRankingRoutingModule { }
