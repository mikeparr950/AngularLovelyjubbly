import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperbowlOddViewComponent } from './superbowlodd-view.component';

const routes: Routes = [
    { path: '', component: SuperbowlOddViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuperbowlOddRoutingModule { }
