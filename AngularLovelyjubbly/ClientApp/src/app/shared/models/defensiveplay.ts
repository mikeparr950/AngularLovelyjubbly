export interface IDefensivePlay {
    defensivePlayId: number;
    defensivePlayName: string;
}

export class DefensivePlay implements IDefensivePlay {

    constructor(public defensivePlayId: number, public defensivePlayName: string) {
    }
}
