export interface IOffensivePlay {
    offensivePlayId: number;
    offensivePlayName: string;
}

export class OffensivePlay implements IOffensivePlay {

    constructor(public offensivePlayId: number, public offensivePlayName: string) {
    }
}
