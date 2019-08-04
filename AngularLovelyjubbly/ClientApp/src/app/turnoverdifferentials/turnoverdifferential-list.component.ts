import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GridComponent, ToolbarItems, EditSettingsModel, ColumnModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { ITurnoverDifferential } from '../shared/models/turnoverdifferential';
import { TurnoverDifferentialService } from '../shared/services/turnoverdifferential.service';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-turnoverdifferential-list',
    templateUrl: '../turnoverdifferentials/turnoverdifferential-list.component.html'
})
export class TurnoverDifferentialListComponent implements OnInit {
    /**properties */
    pageTitle = 'Turnover Differential List!';
    errorMessage: string;
    public editSettings: EditSettingsModel;
    public toolbar: ToolbarItems[];
    public sortOptions: object;
    public takeawayColumns: ColumnModel[];
    public giveawayColumns: ColumnModel[];
    public pageSettings: any;
    @ViewChild('grid') public grid: GridComponent;

    /** array of any if we don't have a type specified */
    turnoverdifferentials: ITurnoverDifferential[];

    /**constructor */
    /** inject services */
    constructor(public _turnoverdifferentialService: TurnoverDifferentialService, private _router: Router, public snackBar: MatSnackBar,
        public _userService: UserService) {
        this.editSettings = { allowAdding: true };
        this.toolbar = ['Add', 'ExcelExport'];
        this.sortOptions = {
            columns: [{ field: 'tournamentShort', direction: 'descending' }, { field: 'turnoverDifferential', direction: 'descending' }]
        };
        var txtFumbleTakeaways, txtInterceptionTakeaways, txtTotalTakeaways;
        var txtFumbleGiveaways, txtInterceptionGiveaways, txtTotalGiveaways;

        if (this._userService.currentLanguage() === 'en') {
            txtFumbleTakeaways = 'Fumbles';
            txtInterceptionTakeaways = 'Interceptions';
            txtTotalTakeaways = 'Total';
            txtFumbleGiveaways = 'Fumbles';
            txtInterceptionGiveaways = 'Interceptions';
            txtTotalGiveaways = 'Total';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            txtFumbleTakeaways = 'Sähläykset';
            txtInterceptionTakeaways = 'Intterit';
            txtTotalTakeaways = 'Yhteensä';
            txtFumbleGiveaways = 'Sähläykset';
            txtInterceptionGiveaways = 'Intterit';
            txtTotalGiveaways = 'Yhteensä';
        }
        this.takeawayColumns = [
            {
                field: 'fumbleTakeaways',
                headerText: txtFumbleTakeaways,
                width: 130,
                textAlign: 'Right',
                minWidth: 10
            },
            {
                field: 'interceptionTakeaways',
                headerText: txtInterceptionTakeaways,
                width: 140,
                textAlign: 'Right',
                minWidth: 10
            },
            {
                field: 'totalTakeaways',
                headerText: txtTotalTakeaways,
                width: 120,
                textAlign: 'Right',
                minWidth: 10
            }
        ];
        this.giveawayColumns = [
            {
                field: 'fumbleGiveaways',
                headerText: txtFumbleGiveaways,
                width: 130,
                textAlign: 'Right',
                minWidth: 10
            },
            {
                field: 'interceptionGiveaways',
                headerText: txtInterceptionGiveaways,
                width: 140,
                textAlign: 'Right',
                minWidth: 10
            },
            {
                field: 'totalGiveaways',
                headerText: txtTotalGiveaways,
                width: 120,
                textAlign: 'Right',
                minWidth: 10
            }
        ];
        this.pageSettings = { pageSize: 12 };
    }

    /**events */
    ngOnInit(): void {
        this.refreshTurnoverDifferentialList();
    }

    /** delete turnover differential */
    clicked(e: any, test: any) {
        this._turnoverdifferentialService.deleteTurnoverDifferential(test).subscribe(
            data => {
                console.log('success:', data);
                let config = new MatSnackBarConfig();
                config.politeness = 'assertive';
                config.duration = 4000;
                config.panelClass = ['snack-bar-success'];

                if (this._userService.currentLanguage() === 'en') {
                    this.snackBar.open('Turnover Differential deleted', '', config);
                }
                else if (this._userService.currentLanguage() === 'fi') {
                    this.snackBar.open('Turnover Differential poistettu', '', config);
                }

                this.refreshTurnoverDifferentialList();
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
        this.refreshTurnoverDifferentialList();
    }

    refreshTurnoverDifferentialList() {
        this._turnoverdifferentialService.getTurnoverDifferentials()
            .subscribe(turnoverdifferentials => this.turnoverdifferentials = turnoverdifferentials,
                error => this.errorMessage = <any>error);
    }

    refreshHeader() {
        var colId = this.grid.getColumnByField('turnoverDifferentialId');
        var colTournamentShort = this.grid.getColumnByField('tournamentShort');
        var colTeamName = this.grid.getColumnByField('team.teamName');
        var colFumbleTakeaways = this.grid.getColumnByField('fumbleTakeaways');
        var colInterceptionTakeaways = this.grid.getColumnByField('interceptionTakeaways');
        var colTotalTakeaways = this.grid.getColumnByField('totalTakeaways');
        var colFumbleGiveaways = this.grid.getColumnByField('fumbleGiveaways');
        var colInterceptionGiveaways = this.grid.getColumnByField('interceptionGiveaways');
        var colTotalGiveaways = this.grid.getColumnByField('totalGiveaways');
        var colTurnoverDifferential = this.grid.getColumnByField('turnoverDifferential');
        
        if (this._userService.currentLanguage() === 'en') {
            colId.headerText = "Id";
            colTournamentShort.headerText = "Season";
            colTeamName.headerText = "Team Name";
            colFumbleTakeaways.headerText = 'Fumbles';
            colInterceptionTakeaways.headerText = 'Interceptions';
            colTotalTakeaways.headerText = 'Total';
            colFumbleGiveaways.headerText = 'Fumbles';
            colInterceptionGiveaways.headerText = 'Interceptions';
            colTotalGiveaways.headerText = 'Total';
            colTurnoverDifferential.headerText = 'Turnover Differential';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            colId.headerText = "Tunnus";
            colTournamentShort.headerText = "Kausi";
            colTeamName.headerText = "Joukkueen nimi";
            colFumbleTakeaways.headerText = 'Sähläykset';
            colInterceptionTakeaways.headerText = 'Intterit';
            colTotalTakeaways.headerText = 'Yhteensä';
            colFumbleGiveaways.headerText = 'Sähläykset';
            colInterceptionGiveaways.headerText = 'Intterit';
            colTotalGiveaways.headerText = 'Yhteensä';
            colTurnoverDifferential.headerText = 'Turnover Differential';
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
                this._router.navigate(['/TurnoverDifferentialAdd']);
                break;

            case 'Grid_excelexport': // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
                this.grid.excelExport();
                break;
        }
    }
}
