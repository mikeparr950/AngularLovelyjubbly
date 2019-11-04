import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { IPlayResult } from '../shared/models/playresult';
import { PlayResultService } from '../shared/services/playresult.service';
import { UserService } from '../shared/services/user.service';
import { LogService } from '../shared/utils/log.service';

@Component({
    selector: 'app-playresult2027-list',
    templateUrl: '../playresults/playresult2027-list.component.html'
})
export class PlayResult2027ListComponent implements OnInit {
    /**properties */
    errorMessage: string;
    public toolbar: ToolbarItems[];
    public sortOptions: object;
    public pageSettings: any;
    @ViewChild('grid') public grid: GridComponent;

    /** array of any if we don't have a type specified */
    playResults: IPlayResult[];

    /**constructor */
    /** inject services */
    constructor(public _playResultService: PlayResultService, private _router: Router, public snackBar: MatSnackBar,
        public _userService: UserService, private _logService: LogService) {
        this.toolbar = ['ExcelExport'];
        this.sortOptions = {
            columns: [{ field: 'formation.formationName', direction: 'ascending' },
            { field: 'offensivePlay.offensivePlayName', direction: 'ascending' },
            { field: 'defensivePlay.defensivePlayName', direction: 'ascending' },
            { field: 'yards', direction: 'descending' }]
        };
        this.pageSettings = { pageSize: 12 };
    }

    /**events */
    ngOnInit(): void {
        /** subscribe to observables
        let sub = x.subscribe(valueFn, errorFn, completeFn) */
        this.refreshPlayResultList();
    }

    /** delete fixture */
    //clicked(e: any, test: any) {
    //    this._fixtureService.deleteFixture(test).subscribe(
    //        data => {
    //            this._logService.logObject('success:' + data);
    //            let config = new MatSnackBarConfig();
    //            config.politeness = 'assertive';
    //            config.duration = 4000;
    //            config.panelClass = ['snack-bar-success'];

    //            if (this._userService.currentLanguage() === 'en') {
    //                this.snackBar.open('Fixture deleted', '', config);
    //            }
    //            else if (this._userService.currentLanguage() === 'fi') {
    //                this.snackBar.open('Ottelu poistettu', '', config);
    //            }

    //            this.refreshFixtureList();
    //        },
    //        err => {
    //            this._logService.logObject('error:' + err);
    //            let config = new MatSnackBarConfig();
    //            config.politeness = 'assertive';
    //            config.duration = 4000;
    //            config.panelClass = ['snack-bar-warning'];
    //            let snackBarRef = this.snackBar.open(err, '', config);
    //        }
    //    )
    //    this.refreshFixtureList();
    //}

    refreshPlayResultList() {
        this._playResultService.getPlayResultsBySeasonName('2027')
            .subscribe(playResults => this.playResults = playResults,
                error => this.errorMessage = <any>error);
    }

    //refreshHeader() {
    //    var colId = this.grid.getColumnByField('fixtureId');
    //    var colTournamentShort = this.grid.getColumnByField('tournamentShort');
    //    var colWeek = this.grid.getColumnByField('week.weekId');
    //    var colAwayTeamName = this.grid.getColumnByField('awayTeam.teamName');
    //    var colAwayTeamScore = this.grid.getColumnByField('awayTeamScore');
    //    var colHomeTeamName = this.grid.getColumnByField('homeTeam.teamName');
    //    var colHomeTeamScore = this.grid.getColumnByField('homeTeamScore');
    //    var colIsOvertime = this.grid.getColumnByField('isOvertime');

    //    if (this._userService.currentLanguage() === 'en') {
    //        colId.headerText = "Id";
    //        colTournamentShort.headerText = "Season";
    //        colWeek.headerText = "Week";
    //        colAwayTeamName.headerText = 'Away Team';
    //        colAwayTeamScore.headerText = 'Score';
    //        colHomeTeamName.headerText = 'Home Team';
    //        colHomeTeamScore.headerText = 'Score';
    //        colIsOvertime.headerText = 'OT';
    //    }
    //    else if (this._userService.currentLanguage() === 'fi') {
    //        colId.headerText = "Tunnus";
    //        colTournamentShort.headerText = "Kausi";
    //        colWeek.headerText = "Viikko";
    //        colAwayTeamName.headerText = 'Vierasjoukkue';
    //        colAwayTeamScore.headerText = 'Pisteet';
    //        colHomeTeamName.headerText = 'Kotijoukkue';
    //        colHomeTeamScore.headerText = 'Pisteet';
    //        colIsOvertime.headerText = 'JA';
    //    }

    //    this.grid.refreshHeader();
    //}

    //changeLanguage() {
    //    this._logService.log('language selector clicked');
    //    //this.grid.refresh();

    //    this.refreshHeader();
    //}

    //toolbarClick(args: ClickEventArgs): void {

    //    this._logService.log(args.item.id);
    //    this._logService.logObject(args.item);

    //    switch (args.item.id) {

    //        case 'Grid_add':
    //            this._router.navigate(['/PlayResults/Add']);
    //            break;

    //        case 'Grid_excelexport': // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
    //            this.grid.excelExport();
    //            break;
    //    }
    //}
}
