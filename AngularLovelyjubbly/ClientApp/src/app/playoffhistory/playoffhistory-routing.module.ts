import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayoffHistoryViewComponent } from './playoffhistory-view.component';

const routes: Routes = [
    { path: 'View', component: PlayoffHistoryViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PlayoffHistoryRoutingModule { }
