import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { IScore, Score } from '../models/score';
import { Week } from '../models/week';

@Injectable({
    providedIn: 'root',
})
export class ScoreService {

    private _scoreUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._scoreUrl = this._configService.getApiURI() + "/scores";
    }

    getScores(): Observable<IScore[]> {
        return this._httpClient.get<IScore[]>(this._scoreUrl).pipe(
            map((sc: IScore[]) => {
                const scores = new Array<Score>();
                for (const i in sc) {
                    if (sc.hasOwnProperty(i)) {
                        scores.push(new Score(sc[i].scoreId, sc[i].scoreDescription,
                            new Week(sc[i].week.weekId, sc[i].week.weekNumber)));
                    }
                }
                return scores;
            }),
            tap(data => this._logService.log('All Scores: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }

    //getScores(): Observable<IScore[]> {
    //    const scores = new Array<Score>();
    //    scores.push(new Score(1, 'NY Jets 23 Miami 0', new Week(16, '16')));
    //    scores.push(new Score(2, 'Indianapolis 23 New England 38', new Week(16, '16')));
    //    scores.push(new Score(3, 'Houston 31 Cleveland 19', new Week(16, '16')));
    //    scores.push(new Score(4, 'Pittsburgh 31 Cincinnati 23', new Week(16, '16')));
    //    scores.push(new Score(5, 'San Diego 27 Denver 14', new Week(16, '16')));
    //    scores.push(new Score(6, 'Kansas City 26 Oakland 9', new Week(16, '16')));
    //    scores.push(new Score(7, 'Philadelphia 13 Arizona 0', new Week(16, '16')));
    //    scores.push(new Score(8, 'Washington 20 NY Giants 26 (OT)', new Week(16, '16')));
    //    scores.push(new Score(9, 'Green Bay 20 Detroit 7', new Week(16, '16')));
    //    scores.push(new Score(10, 'Tampa Bay 22 Minnesota 41', new Week(16, '16')));
    //    scores.push(new Score(11, 'Carolina 3 Atlanta 6', new Week(16, '16')));
    //    scores.push(new Score(12, 'San Francisco 13 New Orleans 19 (OT)', new Week(16, '16')));
    //    return of(scores);
    //}
}
