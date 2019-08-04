import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ScoreService } from '../../../shared/services/score.service';
import { IScore } from '../../models/score';

@Component({
    selector: 'app-score-ticker',
    templateUrl: 'score-ticker.component.html'
})

export class ScoreTickerComponent {

    /**properties */
    errorMessage: string;
    scores: IScore[];

    constructor(public translate: TranslateService, private scoreService: ScoreService) {
        
    }

    ngOnInit(): void {
        this.scoreService.getScores()
            .subscribe(scores => this.scores = scores,
                error => this.errorMessage = <any>error);
    }
}
