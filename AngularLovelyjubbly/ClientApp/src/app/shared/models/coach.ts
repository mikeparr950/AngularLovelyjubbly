export interface ICoach {
    coachId: number;
    coachName: string;
    coachNameShort: string;
}

export class Coach implements ICoach {

    constructor(public coachId: number, public coachName: string, public coachNameShort: string) {
    }
}
