import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainHallOfFameComponent } from './main-halloffame.component';
import { MainLinksComponent } from './main-links.component';
import { MainSeasonPredictionsComponent } from './main-seasonpredictions.component';

const routes: Routes = [
    { path: 'HallOfFame', component: MainHallOfFameComponent },
    { path: 'Links', component: MainLinksComponent },
    { path: 'SeasonPredictions', component: MainSeasonPredictionsComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
