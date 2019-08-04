import { ITournament } from './tournament';
import { ITeam } from './team';

export interface ITurnoverDifferential {
    turnoverDifferentialId: number;
    tournament: ITournament;
    tournamentShort: number;
    team: ITeam;
    fumbleTakeaways: number;
    interceptionTakeaways: number;
    totalTakeaways: number;
    fumbleGiveaways: number;
    interceptionGiveaways: number;
    totalGiveaways: number;
    turnoverDifferential: number;
}

export class TurnoverDifferential implements ITurnoverDifferential {

    constructor(public turnoverDifferentialId: number = 0,
        public tournament: ITournament = null,
        public tournamentShort: number = null,
        public team: ITeam = null,
        public fumbleTakeaways: number = null,
        public interceptionTakeaways: number = null,
        public totalTakeaways: number = null,
        public fumbleGiveaways: number = null,
        public interceptionGiveaways: number = null,
        public totalGiveaways: number = null,
        public turnoverDifferential: number = null) {
    }
}
