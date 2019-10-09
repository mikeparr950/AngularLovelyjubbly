import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GridComponent, ToolbarItems, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { ITeam } from '../shared/models/team';
import { TeamService } from '../shared/services/team.service';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-team-list',
    /** with moduleId, can specify component relative paths rather than paths below */
    /** moduleId: module.id,
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css']  /** array */
    templateUrl: '../teams/team-list.component.html'
})
export class TeamListComponent implements OnInit {
    /**properties */
    pageTitle = 'Team List!';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage: string;
    public editSettings: EditSettingsModel;
    public toolbar: ToolbarItems[];
    public sortOptions: object;
    public pageSettings: any;
    @ViewChild('grid') public grid: GridComponent;

    /** array of any if we don't have a type specified */
    teams: ITeam[];

    /**constructor */
    /** inject services */
    constructor(public _teamService: TeamService, private _router: Router, public snackBar: MatSnackBar,
        public _userService: UserService) {
        this.editSettings = { allowAdding: true };
        this.toolbar = ['Add', 'ExcelExport'];
        this.sortOptions = { columns: [{ field: 'teamName', direction: 'Ascending' }] };
        this.pageSettings = { pageSize: 12 };
    }

    /**events */
    ngOnInit(): void {
        /** subscribe to observables
        let sub = x.subscribe(valueFn, errorFn, completeFn) */
        this.refreshTeamList();
    }

    /** delete team */
    clicked(e: any, test: any) {
        this._teamService.deleteTeam(test).subscribe(
            data => {
                console.log('success:', data);
                let config = new MatSnackBarConfig();
                config.politeness = 'assertive';
                config.duration = 4000;
                config.panelClass = ['snack-bar-success'];

                if (this._userService.currentLanguage() === 'en') {
                    this.snackBar.open('Team deleted', '', config);
                }
                else if (this._userService.currentLanguage() === 'fi') {
                    this.snackBar.open('Joukkue poistettu', '', config);
                }

                this.refreshTeamList();
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
        this.refreshTeamList();
    } 

    refreshTeamList() {
        this._teamService.getTeams()
            .subscribe(teams => this.teams = teams,
                error => this.errorMessage = <any>error);
    }

    refreshHeader() {
        var colId = this.grid.getColumnByField('teamId');
        var colTeamName = this.grid.getColumnByField('teamName');
        var colCoachName = this.grid.getColumnByField('coach.coachName');
        var colDivisionName = this.grid.getColumnByField('division.divisionName');

        if (this._userService.currentLanguage() === 'en') {
            colId.headerText = "Id";
            colTeamName.headerText = "Team Name";
            colCoachName.headerText = 'Coach Name';
            colDivisionName.headerText = 'Division Name';
        }
        else if (this._userService.currentLanguage() === 'fi') {
            colId.headerText = "Tunnus";
            colTeamName.headerText = "Joukkueen nimi";
            colCoachName.headerText = 'Valmentajan nimi';
            colDivisionName.headerText = 'Divisioonan nimi';
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
                this._router.navigate(['/Teams/Add']);
                break;

            //case 'Grid_pdfexport': // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
            //    this.grid.pdfExport();
            //    break;

            case 'Grid_excelexport': // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
                this.grid.excelExport();
                break;
        }
    }
}
