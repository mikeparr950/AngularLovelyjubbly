import { IWeek } from './week';

export interface IScore {
    scoreId: number;
    scoreDescription: string;
    week: IWeek;
}

export class Score implements IScore {

    constructor(public scoreId: number, public scoreDescription: string, public week: IWeek) {
    }
}
