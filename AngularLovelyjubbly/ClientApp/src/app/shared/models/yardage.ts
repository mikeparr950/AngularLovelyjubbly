import { ITournament } from './tournament';
import { ITeam } from './team';

export interface IYardage {
    yardageId: number;
    tournament: ITournament;
    team: ITeam;
    offensePassingYards: number;
    offenseRushingYards: number;
    offenseTotalYards: number;
    defensePassingYards: number;
    defenseRushingYards: number;
    defenseTotalYards: number;
    netYards: number;
}

export class Yardage implements IYardage {

    constructor(public yardageId: number, public tournament: ITournament, public team: ITeam, public offensePassingYards: number,
        public offenseRushingYards: number, public offenseTotalYards: number, public defensePassingYards: number,
        public defenseRushingYards: number, public defenseTotalYards: number, public netYards: number) {
    }
}
