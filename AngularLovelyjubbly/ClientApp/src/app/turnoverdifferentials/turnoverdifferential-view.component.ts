import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { GridComponent, ToolbarItems, ColumnModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

import { ITurnoverDifferential } from '../shared/models/turnoverdifferential';
import { TurnoverDifferentialService } from '../shared/services/turnoverdifferential.service';
import { ISeason, Season } from '../shared/models/season';
import { SeasonService } from '../shared/services/season.service';
import { UserService } from '../shared/services/user.service';

@Component({
    templateUrl: '../turnoverdifferentials/turnoverdifferential-view.component.html',
})

export class TurnoverDifferentialViewComponent implements OnInit {

    turnoverDifferentialViewForm: FormGroup; /** root form group */

    errorMessage: string;
    seasons: ISeason[];
    turnoverdifferentials: ITurnoverDifferential[];
    /** parameter passed to translate */
    selectedSeason: string = '';
    public sortOptions: Object;
    public toolbar: ToolbarItems[];
    public takeawayColumns: ColumnModel[];
    public giveawayColumns: ColumnModel[];
    @ViewChild('grid') public grid: GridComponent;
    @ViewChild('gridSmall') public gridSmall: GridComponent;

    constructor
        (public _seasonService: SeasonService, private fb: FormBuilder,
        public _turnoverDifferentialService: TurnoverDifferentialService,
        public _userService: UserService) {
        this.toolbar = ['ExcelExport'];
        this.sortOptions = {
            columns: [{ field: 'turnoverDifferential', direction: 'descending' }]
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
    }

    ngOnInit(): void {

        this.turnoverDifferentialViewForm = this.fb.group({
            season: ['']
        });

        this._seasonService.getSeasons()
            .subscribe(seasons => {
                this.seasons = new Array<Season>();

                for (const s in seasons) {
                    if (seasons[s].seasonName !== '1992' && seasons[s].seasonName !== '1993'
                        && seasons[s].seasonName !== '1994' && seasons[s].seasonName !== '2009') {
                        this.seasons.push(new Season(seasons[s].seasonId, seasons[s].seasonName));
                    }
                }
            },
                error => this.errorMessage = <any>error);
    }

    changeTurnoverDifferentialView(): void {
        const seasonControl = this.turnoverDifferentialViewForm.get('season');

        const obj = seasonControl.value;
        this.selectedSeason = obj.seasonName;
        console.log(obj.seasonName);

        /**clear previous*/
        this.turnoverdifferentials = null;

        this._turnoverDifferentialService.getTurnoverDifferentialsBySeasonName(this.selectedSeason)
            .subscribe(turnoverdifferentials => this.turnoverdifferentials = turnoverdifferentials,
                error => this.errorMessage = <any>error);
    }

    refreshHeader() {
        var colTeamName = this.grid.getColumnByField('team.teamName');
        var colFumbleTakeaways = this.grid.getColumnByField('fumbleTakeaways');
        var colInterceptionTakeaways = this.grid.getColumnByField('interceptionTakeaways');
        var colTotalTakeaways = this.grid.getColumnByField('totalTakeaways');
        var colFumbleGiveaways = this.grid.getColumnByField('fumbleGiveaways');
        var colInterceptionGiveaways = this.grid.getColumnByField('interceptionGiveaways');
        var colTotalGiveaways = this.grid.getColumnByField('totalGiveaways');
        var colTurnoverDifferential = this.grid.getColumnByField('turnoverDifferential');

        if (this._userService.currentLanguage() === 'en') {
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

    refreshHeaderSmall() {
        var colTeamName = this.gridSmall.getColumnByField('team.teamNameShort');
        var colTotalTakeaways = this.gridSmall.getColumnByField('totalTakeaways');
        var colTotalGiveaways = this.gridSmall.getColumnByField('totalGiveaways');
        var colTurnoverDifferential = this.gridSmall.getColumnByField('turnoverDifferential');

        if (this._userService.currentLanguage() === 'en') {
            colTeamName.headerText = "Team";
            colTotalTakeaways.headerText = 'Takeaways';
            colTotalGiveaways.headerText = 'Giveaways';
            colTurnoverDifferential.headerText = 'Diff';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            colTeamName.headerText = "Joukkue";
            colTotalTakeaways.headerText = 'Takeaways';
            colTotalGiveaways.headerText = 'Giveaways';
            colTurnoverDifferential.headerText = 'Ero';
        }

        this.gridSmall.refreshHeader();
    }

    changeLanguage() {
        console.log('language selector clicked');
        //this.grid.refresh();

        this.refreshHeader();
        this.refreshHeaderSmall();
    }

    toolbarClick(args: ClickEventArgs): void {

        console.log(args.item.id);
        console.log(args.item);

        switch (args.item.id) {

            case 'Grid_excelexport': // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
                this.grid.excelExport();
                break;
        }
    }

    toolbarClickSmall(args: ClickEventArgs): void {

        console.log(args.item.id);
        console.log(args.item);

        switch (args.item.id) {

            case 'GridSmall_excelexport': // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
                this.gridSmall.excelExport();
                break;
        }
    }
}
