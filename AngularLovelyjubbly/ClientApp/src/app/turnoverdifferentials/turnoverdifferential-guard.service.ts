import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { ITurnoverDifferential, TurnoverDifferential } from '../shared/models/turnoverdifferential';
import { TurnoverDifferentialAddComponent } from '../turnoverdifferentials/turnoverdifferential-add.component';
import { TurnoverDifferentialUpdateComponent } from '../turnoverdifferentials/turnoverdifferential-update.component';

@Injectable()
export class TurnoverDifferentialEditGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('invalid turnover differential id');
            /** start a new navigation to redirect to list page */
            this.router.navigate(['TurnoverDifferentials']);
            /** abort current navigation */
            return false;
        };
        return true;
    }
}
