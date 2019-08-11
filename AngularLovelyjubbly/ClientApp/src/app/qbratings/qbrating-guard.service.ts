import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { IQBRating, QBRating } from '../shared/models/qbrating';
import { QBRatingAddComponent } from '../qbratings/qbrating-add.component';
import { QBRatingUpdateComponent } from '../qbratings/qbrating-update.component';

@Injectable()
export class QBRatingEditGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('invalid qb rating id');
            /** start a new navigation to redirect to list page */
            this.router.navigate(['/QBRatings']);
            /** abort current navigation */
            return false;
        };
        return true;
    }
}
