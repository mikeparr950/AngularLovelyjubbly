import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { ITeam, Team } from '../shared/models/team';
import { TeamAddComponent } from '../teams/team-add.component';
import { TeamUpdateComponent } from '../teams/team-update.component';

@Injectable()
export class TeamEditGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('invalid team id');
            /** start a new navigation to redirect to list page */
            this.router.navigate(['/Teams']);
            /** abort current navigation */
            return false;
        };
        return true;
    }
}

/** @Injectable()
export class TeamUpdateGuard implements CanDeactivate<TeamUpdateComponent> {

    canDeactivate(component: TeamUpdateComponent): boolean {
        if (component.teamForm.dirty) {
            let teamName = component.teamForm.get('teamName').value;
            return confirm(`Navigate away and lose all changes to ${teamName}?`);
        }
    }
} */
