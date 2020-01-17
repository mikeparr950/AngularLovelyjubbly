import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { GridComponent, ToolbarItems, ColumnModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

import { IQBRating, QBRating } from '../shared/models/qbrating';
import { QBRatingService } from '../shared/services/qbrating.service';
import { ITournament, Tournament } from '../shared/models/tournament';
import { ITeam, Team } from '../shared/models/team';
import { TeamService } from '../shared/services/team.service';
import { ISeason, Season } from '../shared/models/season';
import { SeasonService } from '../shared/services/season.service';

@Component({
    templateUrl: '../qbratings/qbrating-view.component.html',
})

export class QBRatingViewComponent implements OnInit {

    qbRatingViewForm: FormGroup; /** root form group */

    errorMessage: string;
    seasons: ISeason[];
    qbratings: IQBRating[];
    /** parameter passed to translate */
    selectedSeason: string = '';
    public sortOptions: Object;
    @ViewChild('grid') public grid: GridComponent;

    constructor(public _seasonService: SeasonService, private fb: FormBuilder, public _qbRatingService: QBRatingService) {
        this.sortOptions = {
            columns: [{ field: 'rating', direction: 'descending' }]
        };
    }

    ngOnInit(): void {

        this.qbRatingViewForm = this.fb.group({
            season: ['']
        });

        this._seasonService.getSeasons()
            .subscribe(seasons => {
                this.seasons = new Array<Season>();

                for (var s in seasons) {
                    this.seasons.push(new Season(seasons[s].seasonId, seasons[s].seasonName));
                }
            },
                error => this.errorMessage = <any>error);
    }

    changeQBRatingView(): void {
        const seasonControl = this.qbRatingViewForm.get('season');

        let obj = seasonControl.value;
        this.selectedSeason = obj.seasonName;
        console.log(obj.seasonName);

        /**clear previous*/
        this.qbratings = null;

        this._qbRatingService.getQBRatingsBySeasonName(this.selectedSeason)
            .subscribe(qbratings => this.qbratings = qbratings,
                error => this.errorMessage = <any>error);
    }

    changeLanguage() {
        console.log('language selector clicked');
        //this.grid.refresh();

        //this.refreshHeader();
        //this.refreshHeaderSmall();
    }
}
