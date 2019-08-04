import { Component } from '@angular/core';

@Component({
    templateUrl: '../main/main-seasonpredictions.component.html'
})

export class MainSeasonPredictionsComponent {
    public pageTitle: string = 'Season Predictions';
    selectIndexAfc: number;
    selectIndexNfc: number;

    constructor() {
        this.selectIndexAfc = 0;
        this.selectIndexNfc = 0;
    }
}
