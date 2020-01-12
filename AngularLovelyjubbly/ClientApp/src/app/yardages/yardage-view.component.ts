import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { GridComponent, ToolbarItems, ColumnModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

import { IYardage } from '../shared/models/yardage';
import { YardageService } from '../shared/services/yardage.service';
import { ISeason, Season } from '../shared/models/season';
import { SeasonService } from '../shared/services/season.service';
import { UserService } from '../shared/services/user.service';

@Component({
    templateUrl: '../yardages/yardage-view.component.html',
})

export class YardageViewComponent implements OnInit {

    yardageViewForm: FormGroup; /** root form group */

    errorMessage: string;
    seasons: ISeason[];
    yardages: IYardage[];
    /** parameter passed to translate */
    selectedSeason: string = '';
    public sortOptions: Object;
    public toolbar: ToolbarItems[];
    public offenseColumns: ColumnModel[];
    public defenseColumns: ColumnModel[];
    @ViewChild('grid') public grid: GridComponent;
    @ViewChild('gridSmall') public gridSmall: GridComponent;

    constructor
        (public _seasonService: SeasonService, private fb: FormBuilder,
            public _yardageService: YardageService,
            public _userService: UserService) {
        this.toolbar = ['ExcelExport'];
        this.sortOptions = {
            columns: [{ field: 'netYards', direction: 'descending' }]
        };
        var txtOffensePassingYards, txtOffenseRushingYards, txtOffenseTotalYards;
        var txtDefensePassingYards, txtDefenseRushingYards, txtDefenseTotalYards;

        if (this._userService.currentLanguage() === 'en') {
            txtOffensePassingYards = 'Passing Yards';
            txtOffenseRushingYards = 'Rushing Yards';
            txtOffenseTotalYards = 'Total';
            txtDefensePassingYards = 'Passing Yards';
            txtDefenseRushingYards = 'Rushing Yards';
            txtDefenseTotalYards = 'Total';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            txtOffensePassingYards = 'Heitto jaardia';
            txtOffenseRushingYards = 'Juoksu jaardia';
            txtOffenseTotalYards = 'Yhteensä';
            txtDefensePassingYards = 'Heitto jaardia';
            txtDefenseRushingYards = 'Juoksu jaardia';
            txtDefenseTotalYards = 'Yhteensä';
        }
        this.offenseColumns = [
            {
                field: 'offensePassingYards',
                headerText: txtOffensePassingYards,
                width: 130,
                textAlign: 'Right',
                minWidth: 10
            },
            {
                field: 'offenseRushingYards',
                headerText: txtOffenseRushingYards,
                width: 140,
                textAlign: 'Right',
                minWidth: 10
            },
            {
                field: 'offenseTotalYards',
                headerText: txtOffenseTotalYards,
                width: 120,
                textAlign: 'Right',
                minWidth: 10
            }
        ];
        this.defenseColumns = [
            {
                field: 'defensePassingYards',
                headerText: txtDefensePassingYards,
                width: 130,
                textAlign: 'Right',
                minWidth: 10
            },
            {
                field: 'defenseRushingYards',
                headerText: txtDefenseRushingYards,
                width: 140,
                textAlign: 'Right',
                minWidth: 10
            },
            {
                field: 'defenseTotalYards',
                headerText: txtDefenseTotalYards,
                width: 120,
                textAlign: 'Right',
                minWidth: 10
            }
        ];
    }

    ngOnInit(): void {

        this.yardageViewForm = this.fb.group({
            season: ['']
        });

        this._seasonService.getSeasons()
            .subscribe(seasons => {
                this.seasons = new Array<Season>();

                for (const s in seasons) {
                        this.seasons.push(new Season(seasons[s].seasonId, seasons[s].seasonName));
                }
            },
                error => this.errorMessage = <any>error);
    }

    changeYardageView(): void {
        const seasonControl = this.yardageViewForm.get('season');

        const obj = seasonControl.value;
        this.selectedSeason = obj.seasonName;
        console.log(obj.seasonName);

        /**clear previous*/
        this.yardages = null;

        this._yardageService.getYardagesBySeasonName(this.selectedSeason)
            .subscribe(yardages => this.yardages = yardages,
                error => this.errorMessage = <any>error);
    }

    refreshHeader() {
        var colTeamName = this.grid.getColumnByField('team.teamName');
        var colOffensePassingYards = this.grid.getColumnByField('offensePassingYards');
        var colOffenseRushingYards = this.grid.getColumnByField('offenseRushingYards');
        var colOffenseTotalYards = this.grid.getColumnByField('offenseTotalYards');
        var colDefensePassingYards = this.grid.getColumnByField('defensePassingYards');
        var colDefenseRushingYards = this.grid.getColumnByField('defenseRushingYards');
        var colDefenseTotalYards = this.grid.getColumnByField('defenseTotalYards');
        var colNetYards = this.grid.getColumnByField('netYards');

        if (this._userService.currentLanguage() === 'en') {
            colTeamName.headerText = "Team Name";
            colOffensePassingYards.headerText = 'Passing Yards';
            colOffenseRushingYards.headerText = 'Rushing Yards';
            colOffenseTotalYards.headerText = 'Total';
            colDefensePassingYards.headerText = 'Passing Yards';
            colDefenseRushingYards.headerText = 'Rushing Yards';
            colDefenseTotalYards.headerText = 'Total';
            colNetYards.headerText = 'Net Yards';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            colTeamName.headerText = "Joukkueen nimi";
            colOffensePassingYards.headerText = 'Heitto jaardia';
            colOffenseRushingYards.headerText = 'Juoksu jaardia';
            colOffenseTotalYards.headerText = 'Yhteensä';
            colDefensePassingYards.headerText = 'Heitto jaardia';
            colDefenseRushingYards.headerText = 'Juoksu jaardia';
            colDefenseTotalYards.headerText = 'Yhteensä';
            colNetYards.headerText = 'Netto jaardia';
        }

        this.grid.refreshHeader();
    }

    refreshHeaderSmall() {
        var colTeamName = this.gridSmall.getColumnByField('team.teamNameShort');
        var colOffenseTotalYards = this.gridSmall.getColumnByField('offenseTotalYards');
        var colDefenseTotalYards = this.gridSmall.getColumnByField('defenseTotalYards');
        var colNetYards = this.gridSmall.getColumnByField('netYards');

        if (this._userService.currentLanguage() === 'en') {
            colTeamName.headerText = "Team";
            colOffenseTotalYards.headerText = 'Yhteensä';
            colDefenseTotalYards.headerText = 'Yhteensä';
            colNetYards.headerText = 'Netto jaardia';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            colTeamName.headerText = "Joukkue";
            colOffenseTotalYards.headerText = 'Takeaways';
            colDefenseTotalYards.headerText = 'Giveaways';
            colNetYards.headerText = 'Netto jaardia';
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
