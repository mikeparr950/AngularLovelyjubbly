export interface IWeek {
    weekId: number;
    weekNumber: string;
}

export class Week implements IWeek {

    constructor(public weekId: number, public weekNumber: string) {
    }
}
