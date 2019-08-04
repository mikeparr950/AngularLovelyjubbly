import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    status: boolean;
    subscription: Subscription;

    constructor(private userService: UserService) {
    }

    logout() {
        this.userService.logout();
    }
}
