import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnoverDifferentialListComponent } from './turnoverdifferential-list.component';
import { TurnoverDifferentialAddComponent } from './turnoverdifferential-add.component';
import { TurnoverDifferentialUpdateComponent } from './turnoverdifferential-update.component';
import { TurnoverDifferentialEditGuard } from './turnoverdifferential-guard.service';
import { TurnoverDifferentialViewComponent } from './turnoverdifferential-view.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', component: TurnoverDifferentialListComponent },
    { path: 'View', component: TurnoverDifferentialViewComponent },
    { path: 'Update/:id', component: TurnoverDifferentialUpdateComponent, canActivate: [AuthGuard, TurnoverDifferentialEditGuard] },
    { path: 'Add', component: TurnoverDifferentialAddComponent, canActivate: [AuthGuard] },

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
