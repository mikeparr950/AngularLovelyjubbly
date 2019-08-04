import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ConfigService } from '../utils/config.service';
import { CommonService } from '../utils/common.service';
import { LogService } from '../utils/log.service';
import { IRecord, Record } from '../models/record';
import { RecordCategory } from '../models/recordcategory';
import { Team } from '../models/team';
import { Coach } from '../models/coach';
import { Season } from '../models/season';
import { Week } from '../models/week';

@Injectable({
    providedIn: 'root',
})
export class RecordService {

    private _recordUrl;

    constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _commonService: CommonService,
        private _logService: LogService) {
        this._recordUrl = this._configService.getApiURI() + "/records";
    }

    getRecords(): Observable<IRecord[]> {
        return this._httpClient.get<IRecord[]>(this._recordUrl).pipe(
            map((records: IRecord[]) => {
                const r = new Array<Record>();
                for (const i in records) {
                    if (records.hasOwnProperty(i)) {
                        r.push(new Record(records[i].recordId,
                            new RecordCategory
                                (records[i].recordCategory.recordCategoryId, records[i].recordCategory.recordCategoryName,
                                    records[i].recordCategory.isPerSeason),
                            new Team
                                (records[i].team.teamId, records[i].team.teamName, records[i].team.teamNameShort, null, null, null, null,
                                    null, null, null, null, null, null),
                            new Coach(records[i].coach.coachId, records[i].coach.coachName, records[i].coach.coachNameShort),
                            new Season(records[i].season.seasonId, records[i].season.seasonName), records[i].rank, records[i].recordAmount,
                            records[i].recordImage,
                            (records[i].week === null) ? null : new Week(records[i].week.weekId, records[i].week.weekNumber),
                            records[i].comments));
                    }
                }
                return r;
            }),
            tap(data => this._logService.log('All Records: ' + JSON.stringify(data))),
            catchError(this._commonService.errorHandler));  /** catch error */
    }
}
