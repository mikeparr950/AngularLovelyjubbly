import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayResultListComponent } from './playresult-list.component';
import { PlayResultAddComponent } from './playresult-add.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: '', component: PlayResultListComponent, pathMatch: 'full' },
            { path: 'Add', component: PlayResultAddComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        AuthGuard
    ]
})
export class PlayResultRoutingModule { }
