export interface IFormation {
    formationId: number;
    formationName: string;
}

export class Formation implements IFormation {

    constructor(public formationId: number, public formationName: string) {
    }
}
