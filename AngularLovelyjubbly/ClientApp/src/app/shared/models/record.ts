import { ISeason } from './season';
import { ITeam } from './team';
import { ICoach } from './coach';
import { IRecordCategory } from './recordcategory';
import { IWeek } from './week';

export interface IRecord {
    recordId: number;
    recordCategory: IRecordCategory;
    team: ITeam;
    coach: ICoach;
    season: ISeason;
    rank: number;
    recordAmount: number;
    recordImage: string;
    week: IWeek;
    comments: string;
}

export class Record implements IRecord {

    constructor(public recordId: number = 0,
        public recordCategory: IRecordCategory = null,
        public team: ITeam = null,
        public coach: ICoach = null,
        public season: ISeason = null,
        public rank: number = null,
        public recordAmount: number = null,
        public recordImage: string,
        public week: IWeek = null,
        public comments: string) {
    }
}
