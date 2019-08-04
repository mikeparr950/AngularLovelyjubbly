import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { GridComponent } from '@syncfusion/ej2-angular-grids';

import { ISuperbowlOdds } from '../shared/models/superbowlodds';
import { SuperbowlOddsService } from '../shared/services/superbowlodds.service';
import { UserService } from '../shared/services/user.service';

@Component({
    templateUrl: '../superbowlodds/superbowlodd-view.component.html',
})

export class SuperbowlOddViewComponent implements OnInit {

    errorMessage: string;
    superbowlodds: ISuperbowlOdds[];
    public sortOptions: object;
    @ViewChild('grid') public grid: GridComponent;

    constructor(public _superbowlOddsService: SuperbowlOddsService, public _userService: UserService) {
        this.sortOptions = {
            columns: [{ field: 'odds', direction: 'ascending' }]
        };
    }

    ngOnInit(): void {

        this._superbowlOddsService.getSuperbowlOddsBySeasonName('2025')
            .subscribe(superbowlodds => this.superbowlodds = superbowlodds,
                error => this.errorMessage = <any>error);
    }

    changeLanguage() {
        console.log('language selector clicked');

        this.refreshHeader();
    }

    refreshHeader() {
        var colTeamName = this.grid.getColumnByField('team.teamName');
        var colOdds = this.grid.getColumnByField('odds');

        if (this._userService.currentLanguage() === 'en') {
            colTeamName.headerText = "Team Name";
            colOdds.headerText = 'To Win Superbowl';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            colTeamName.headerText = "Joukkueen nimi";
            colOdds.headerText = 'Voittaa Superbowlin';
        }

        this.grid.refreshHeader();
    }
}
