﻿import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

@Injectable()
export class FixtureEditGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('invalid fixture id');
            /** start a new navigation to redirect to list page */
            this.router.navigate(['/Fixtures']);
            /** abort current navigation */
            return false;
        };
        return true;
    }
}
