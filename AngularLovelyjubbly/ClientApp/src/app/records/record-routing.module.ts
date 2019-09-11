import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordViewComponent } from './record-view.component';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: '', component: RecordViewComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecordRoutingModule { }
