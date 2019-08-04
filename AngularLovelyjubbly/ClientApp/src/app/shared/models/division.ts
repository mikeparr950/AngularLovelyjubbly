export interface IDivision {
    divisionId: number;
    divisionName: string;
}

export class Division implements IDivision {

    constructor(public divisionId: number, public divisionName: string) {
    }
}
