import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnoverDifferentialListComponent } from './turnoverdifferential-list.component';
import { TurnoverDifferentialAddComponent } from './turnoverdifferential-add.component';
import { TurnoverDifferentialUpdateComponent } from './turnoverdifferential-update.component';
import { TurnoverDifferentialEditGuard } from './turnoverdifferential-guard.service';
import { TurnoverDifferentialViewComponent } from './turnoverdifferential-view.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { GameplanLayoutComponent } from '../shared/components/gameplan-layout/gameplan-layout.component';

const routes: Routes = [
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: '', component: TurnoverDifferentialListComponent, pathMatch: 'full' },
            { path: 'View', component: TurnoverDifferentialViewComponent, pathMatch: 'full' },
            { path: 'Update/:id', component: TurnoverDifferentialUpdateComponent, canActivate: [AuthGuard, TurnoverDifferentialEditGuard], pathMatch: 'full' },
            { path: 'Add', component: TurnoverDifferentialAddComponent, canActivate: [AuthGuard], pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        TurnoverDifferentialEditGuard,
        AuthGuard
    ]
})
export class TurnoverDifferentialRoutingModule { }
