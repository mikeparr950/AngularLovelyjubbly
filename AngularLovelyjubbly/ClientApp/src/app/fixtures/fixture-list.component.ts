import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GridComponent, ToolbarItems, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { IFixture } from '../shared/models/fixture';
import { FixtureService } from '../shared/services/fixture.service';
import { UserService } from '../shared/services/user.service';
import { LogService } from '../shared/utils/log.service';

@Component({
    selector: 'app-fixture-list',
    templateUrl: '../fixtures/fixture-list.component.html'
})
export class FixtureListComponent implements OnInit {
    /**properties */
    pageTitle = 'Fixture List!';
    errorMessage: string;
    public editSettings: EditSettingsModel;
    public toolbar: ToolbarItems[];
    public sortOptions: object;
    public pageSettings: any;
    @ViewChild('grid') public grid: GridComponent;

    /** array of any if we don't have a type specified */
    fixtures: IFixture[];

    /**constructor */
    /** inject services */
    constructor(public _fixtureService: FixtureService, private _router: Router, public snackBar: MatSnackBar,
        public _userService: UserService, private _logService: LogService) {
        this.editSettings = { allowAdding: true };
        this.toolbar = ['Add', 'ExcelExport'];
        this.sortOptions = {
            columns: [{ field: 'tournamentShort', direction: 'descending' },
            { field: 'week.weekId', direction: 'descending' }]
        };
        this.pageSettings = { pageSize: 12 };
    }

    /**events */
    ngOnInit(): void {
        /** subscribe to observables
        let sub = x.subscribe(valueFn, errorFn, completeFn) */
        this.refreshFixtureList();
    }

    /** delete fixture */
    clicked(e: any, test: any) {
        this._fixtureService.deleteFixture(test).subscribe(
            data => {
                this._logService.logObject('success:' + data);
                let config = new MatSnackBarConfig();
                config.politeness = 'assertive';
                config.duration = 4000;
                config.panelClass = ['snack-bar-success'];

                if (this._userService.currentLanguage() === 'en') {
                    this.snackBar.open('Fixture deleted', '', config);
                }
                else if (this._userService.currentLanguage() === 'fi') {
                    this.snackBar.open('Ottelu poistettu', '', config);
                }

                this.refreshFixtureList();
            },
            err => {
                this._logService.logObject('error:' + err);
                let config = new MatSnackBarConfig();
                config.politeness = 'assertive';
                config.duration = 4000;
                config.panelClass = ['snack-bar-warning'];
                let snackBarRef = this.snackBar.open(err, '', config);
            }
        )
        this.refreshFixtureList();
    }

    refreshFixtureList() {
        this._fixtureService.getFixtures()
            .subscribe(fixtures => this.fixtures = fixtures,
                error => this.errorMessage = <any>error);
    }

    refreshHeader() {
        var colId = this.grid.getColumnByField('fixtureId');
        var colTournamentShort = this.grid.getColumnByField('tournamentShort');
        var colWeek = this.grid.getColumnByField('week.weekId');
        var colAwayTeamName = this.grid.getColumnByField('awayTeam.teamName');
        var colAwayTeamScore = this.grid.getColumnByField('awayTeamScore');
        var colHomeTeamName = this.grid.getColumnByField('homeTeam.teamName');
        var colHomeTeamScore = this.grid.getColumnByField('homeTeamScore');
        var colIsOvertime = this.grid.getColumnByField('isOvertime');

        if (this._userService.currentLanguage() === 'en') {
            colId.headerText = "Id";
            colTournamentShort.headerText = "Season";
            colWeek.headerText = "Week";
            colAwayTeamName.headerText = 'Away Team';
            colAwayTeamScore.headerText = 'Score';
            colHomeTeamName.headerText = 'Home Team';
            colHomeTeamScore.headerText = 'Score';
            colIsOvertime.headerText = 'OT';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            colId.headerText = "Tunnus";
            colTournamentShort.headerText = "Kausi";
            colWeek.headerText = "Viikko";
            colAwayTeamName.headerText = 'Vierasjoukkue';
            colAwayTeamScore.headerText = 'Pisteet';
            colHomeTeamName.headerText = 'Kotijoukkue';
            colHomeTeamScore.headerText = 'Pisteet';
            colIsOvertime.headerText = 'JA';
        }

        this.grid.refreshHeader();
    }

    changeLanguage() {
        this._logService.log('language selector clicked');
        //this.grid.refresh();

        this.refreshHeader();
    }

    toolbarClick(args: ClickEventArgs): void {

        this._logService.log(args.item.id);
        this._logService.logObject(args.item);

        switch (args.item.id) {

            case 'Grid_add':
                this._router.navigate(['/Fixtures/Add']);
                break;

            case 'Grid_excelexport': // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
                this.grid.excelExport();
                break;
        }
    }
}
