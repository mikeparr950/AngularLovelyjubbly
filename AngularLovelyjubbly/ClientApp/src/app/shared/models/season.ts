export interface ISeason {
    seasonId: number;
    seasonName: string;
}

export class Season implements ISeason {

    constructor(public seasonId: number, public seasonName: string) {
    }
}
