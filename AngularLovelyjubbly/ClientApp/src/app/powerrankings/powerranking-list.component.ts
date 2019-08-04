import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { GridComponent, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { IPowerRanking } from '../shared/models/powerranking';
import { PowerRankingService } from '../shared/services/powerranking.service';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-powerranking-list',
    templateUrl: '../powerrankings/powerranking-list.component.html'
})
export class PowerRankingListComponent implements OnInit {
    /**properties */
    pageTitle = 'Power Ranking List!';
    errorMessage: string;
    public editSettings: EditSettingsModel;
    public toolbar: object[];
    public sortOptions: object;
    public selectOptions: Object;
    public pageSettings: any;
    isRequesting: boolean;

    @ViewChild('grid') public grid: GridComponent;

    /** array of any if we don't have a type specified */
    powerrankings: IPowerRanking[];
    editedpowerrankings: number[];

    /**constructor */
    /** inject services */
    constructor(public _powerrankingService: PowerRankingService, private _router: Router, public snackBar: MatSnackBar,
        public _userService: UserService) {
        this.editSettings = { allowAdding: true };
        if (this._userService.currentLanguage() === 'en') {
            this.toolbar = [{ text: 'Update', tooltipText: 'Update', prefixIcon: 'e-update', id: 'update' },
            { text: 'Cancel', tooltipText: 'Cancel', prefixIcon: 'e-cancel', id: 'cancel' }];
        }
        else if (this._userService.currentLanguage() === 'fi') {
            this.toolbar = [{ text: 'Päivitä', tooltipText: 'Päivitä', prefixIcon: 'e-update', id: 'update' },
                { text: 'Keskeytä', tooltipText: 'Keskeytä', prefixIcon: 'e-cancel', id: 'cancel' }];
        }
        this.selectOptions = { type: 'Multiple' };
        this.pageSettings = { pageSize: 24 };
        this.editedpowerrankings = [];
    }

    /**events */
    ngOnInit(): void {
        /** subscribe to observables
        let sub = x.subscribe(valueFn, errorFn, completeFn) */
        this.refreshPowerRankingList();
    }

    refreshPowerRankingList() {
        this._powerrankingService.getPowerRankingsByTournamentAndWeek(20,1)
            .subscribe(powerrankings => this.powerrankings = powerrankings,
                error => this.errorMessage = <any>error);
    }

    refreshHeader() {
        //var colId = this.grid.getColumnByField('powerRankingId');
        var colTeamName = this.grid.getColumnByField('team.teamNameShort');
        var colPreviousRanking = this.grid.getColumnByField('previousRanking');
        var colCurrentRanking = this.grid.getColumnByField('currentRanking');

        if (this._userService.currentLanguage() === 'en') {
            //colId.headerText = "Id";
            colTeamName.headerText = "Team Name";
            colPreviousRanking.headerText = 'Previous';
            colCurrentRanking.headerText = 'Current';
            this.toolbar = [{ text: 'Update', tooltipText: 'Update', prefixIcon: 'e-update', id: 'update' },
            { text: 'Cancel', tooltipText: 'Cancel', prefixIcon: 'e-cancel', id: 'cancel' }];
        }
        else if (this._userService.currentLanguage() === 'fi') {
            //colId.headerText = "Tunnus";
            colTeamName.headerText = "Joukkueen nimi";
            colPreviousRanking.headerText = 'Edellinen';
            colCurrentRanking.headerText = 'Nykyinen';
            this.toolbar = [{ text: 'Päivitä', tooltipText: 'Päivitä', prefixIcon: 'e-update', id: 'update' },
            { text: 'Keskeytä', tooltipText: 'Keskeytä', prefixIcon: 'e-cancel', id: 'cancel' }];
        }

        this.grid.refreshHeader();
    }

    changeLanguage() {
        console.log('language selector clicked');

        this.refreshHeader();
    }

    toolbarClick(args: ClickEventArgs): void {

        console.log(args.item.id);
        console.log(args.item);

        switch (args.item.id) {

            case 'update':
                console.log(this.grid.dataSource);
                this.save();
                break;

            case 'cancel':
                this.refreshPowerRankingList();
                this.grid.refresh();
                break;
        }
    }

    save() {
        this.isRequesting = true;

        for (let key in this.grid.dataSource) {
            let value = this.grid.dataSource[key];

            for (var k in value) {
                if (value.hasOwnProperty(k)) {
                    if (k === 'powerRankingId') {
                        this.editedpowerrankings.push(value['powerRankingId']);
                    }
                }
            }
        }

        console.log(this.editedpowerrankings);
        
        this._powerrankingService.updatePowerRankings(this.editedpowerrankings).pipe(
            finalize(() => {
                this.isRequesting = false
            })
        )
            .subscribe(
                data => {
                    console.log('success:', data);
                    let config = new MatSnackBarConfig();
                    config.politeness = 'assertive';
                    config.duration = 4000;
                    config.panelClass = ['snack-bar-success'];

                    if (this._userService.currentLanguage() === 'en') {
                        this.snackBar.open('Power Rankings updated', '', config);
                    }
                    else if (this._userService.currentLanguage() === 'fi') {
                        this.snackBar.open('Power Rankings päivitetty', '', config);
                    }

                    this.editedpowerrankings = [];
                    this.refreshPowerRankingList();
                },
                err => {
                    console.log('error:', err);
                    let config = new MatSnackBarConfig();
                    config.politeness = 'assertive';
                    config.duration = 4000;
                    config.panelClass = ['snack-bar-warning'];
                    let snackBarRef = this.snackBar.open(err.json(), '', config);

                    this.editedpowerrankings = [];
                    this.refreshPowerRankingList();
                }
            )
    }
}
