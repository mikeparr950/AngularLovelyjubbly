import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainHallOfFameComponent } from './main-halloffame.component';
import { MainLinksComponent } from './main-links.component';
import { MainSeasonPredictionsComponent } from './main-seasonpredictions.component';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: 'HallOfFame', component: MainHallOfFameComponent, pathMatch: 'full' },
            { path: 'Links', component: MainLinksComponent, pathMatch: 'full' },
            { path: 'SeasonPredictions', component: MainSeasonPredictionsComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
