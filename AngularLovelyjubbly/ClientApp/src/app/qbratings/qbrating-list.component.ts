import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GridComponent, ToolbarItems, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { IQBRating } from '../shared/models/qbrating';
import { QBRatingService } from '../shared/services/qbrating.service';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-qbrating-list',
    templateUrl: '../qbratings/qbrating-list.component.html'
})
export class QBRatingListComponent implements OnInit {
    /**properties */
    pageTitle = 'QB Rating List!';
    errorMessage: string;
    public editSettings: EditSettingsModel;
    public toolbar: ToolbarItems[];
    public sortOptions: object;
    public pageSettings: any;
    @ViewChild('grid') public grid: GridComponent;

    /** array of any if we don't have a type specified */
    qbratings: IQBRating[];

    /**constructor */
    /** inject services */
    constructor(public _qbratingService: QBRatingService, private _router: Router, public snackBar: MatSnackBar,
        public _userService: UserService) {
        this.editSettings = { allowAdding: true };
        this.toolbar = ['Add', 'ExcelExport'];
        this.sortOptions = {
            columns: [{ field: 'tournamentShort', direction: 'descending' }, { field: 'rating', direction: 'descending' }]
        };
        this.pageSettings = { pageSize: 12 };
    }

    /**events */
    ngOnInit(): void {
        /** subscribe to observables
        let sub = x.subscribe(valueFn, errorFn, completeFn) */
        this.refreshQBRatingList();
    }

    /** delete fixture */
    clicked(e: any, test: any) {
        this._qbratingService.deleteQBRating(test).subscribe(
            data => {
                console.log('success:', data);
                let config = new MatSnackBarConfig();
                config.politeness = 'assertive';
                config.duration = 4000;
                config.panelClass = ['snack-bar-success'];

                if (this._userService.currentLanguage() === 'en') {
                    this.snackBar.open('QB Rating deleted', '', config);
                }
                else if (this._userService.currentLanguage() === 'fi') {
                    this.snackBar.open('QB:n luokitus poistettu', '', config);
                }

                this.refreshQBRatingList();
            },
            err => {
                console.log('error:', err);
                let config = new MatSnackBarConfig();
                config.politeness = 'assertive';
                config.duration = 4000;
                config.panelClass = ['snack-bar-warning'];
                let snackBarRef = this.snackBar.open(err, '', config);
            }
        )
        this.refreshQBRatingList();
    }

    refreshQBRatingList() {
        this._qbratingService.getQBRatings()
            .subscribe(qbratings => this.qbratings = qbratings,
                error => this.errorMessage = <any>error);
    }

    refreshHeader() {
        var colId = this.grid.getColumnByField('qbRatingId');
        var colTournamentShort = this.grid.getColumnByField('tournamentShort');
        var colTeamName = this.grid.getColumnByField('team.teamName');
        var colCompletion = this.grid.getColumnByField('completion');
        var colGain = this.grid.getColumnByField('gain');
        var colTouchdown = this.grid.getColumnByField('touchdown');
        var colInterception = this.grid.getColumnByField('interception');
        var colRating = this.grid.getColumnByField('rating');

        if (this._userService.currentLanguage() === 'en') {
            colId.headerText = "Id";
            colTournamentShort.headerText = "Season";
            colTeamName.headerText = "Team Name";
            colCompletion.headerText = 'Comp %';
            colGain.headerText = 'Av Gain';
            colTouchdown.headerText = 'TD %';
            colInterception.headerText = 'Int %';
            colRating.headerText = 'Rating';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            colId.headerText = "Tunnus";
            colTournamentShort.headerText = "Kausi";
            colTeamName.headerText = "Joukkueen nimi";
            colCompletion.headerText = 'Valm %';
            colGain.headerText = 'Keskim yardit';
            colTouchdown.headerText = 'TD %';
            colInterception.headerText = 'Int %';
            colRating.headerText = 'Luokitus';
        }

        this.grid.refreshHeader();
    }

    changeLanguage() {
        console.log('language selector clicked');
        //this.grid.refresh();

        this.refreshHeader();
    }

    toolbarClick(args: ClickEventArgs): void {

        console.log(args.item.id);
        console.log(args.item);

        switch (args.item.id) {

            case 'Grid_add':
                this._router.navigate(['/QBRatingAdd']);
                break;

            case 'Grid_excelexport': // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
                this.grid.excelExport();
                break;
        }
    }
}
