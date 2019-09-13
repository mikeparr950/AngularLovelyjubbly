import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ISeason, Season } from '../shared/models/season';
import { SeasonService } from '../shared/services/season.service';

@Component({
    templateUrl: '../playoffhistory/playoffhistory-view.component.html',
})

export class PlayoffHistoryViewComponent implements OnInit {

    playoffHistoryViewForm: FormGroup; /** root form group */

    errorMessage: string;
    seasons: ISeason[];
    historyImageUrl: string;
    /** parameter passed to translate */
    selectedSeason = { value: '' };

    constructor(public _seasonService: SeasonService, private fb: FormBuilder) {
        this.historyImageUrl = null;
    }

    ngOnInit(): void {

        this.playoffHistoryViewForm = this.fb.group({
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

    changePlayoffHistoryView(): void {
        const seasonControl = this.playoffHistoryViewForm.get('season');

        let obj = seasonControl.value;
        this.selectedSeason = obj.seasonName;
        console.log(obj.seasonName);

        /**clear previous*/
        if (obj.seasonName === "2025" || obj.seasonName === "2024" || obj.seasonName === "2023" || obj.seasonName === "2022"
            || obj.seasonName === "2021" || obj.seasonName === "2020" || obj.seasonName === "2019" || obj.seasonName === "2018"
            || obj.seasonName === "2017" || obj.seasonName === "2016" || obj.seasonName === "2015" || obj.seasonName === "2014"
            || obj.seasonName === "2013" || obj.seasonName === "2012" || obj.seasonName === "2011" || obj.seasonName === "2010"
            || obj.seasonName === "2009" || obj.seasonName === "1994"
            || obj.seasonName === "1993" || obj.seasonName === "1992") {
            this.historyImageUrl =
                "https://angularlovelyjubbly.azurewebsites.net/assets/images/history/season" + obj.seasonName + ".png";
            this.selectedSeason = { value: obj.seasonName };
        }
        else {
            this.historyImageUrl = null;
            this.selectedSeason = { value: '' };
        }
    }
}
