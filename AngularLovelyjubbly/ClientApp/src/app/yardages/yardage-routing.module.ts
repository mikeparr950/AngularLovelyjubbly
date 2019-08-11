import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YardageViewComponent } from './yardage-view.component';

const routes: Routes = [
    { path: 'View', component: YardageViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class YardageRoutingModule { }
