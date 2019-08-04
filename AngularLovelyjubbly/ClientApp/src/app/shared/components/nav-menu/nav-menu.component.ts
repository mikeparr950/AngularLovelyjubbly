import { Component, OnInit } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html'
})

export class NavMenuComponent implements OnInit {
    firstName: string;

    constructor(public userService: UserService) {
    }

    ngOnInit() {
        this.userService.getLoggedInName.subscribe(firstName => this.firstName = firstName);
    }

    logout() {
        this.userService.logout();
    }
}
