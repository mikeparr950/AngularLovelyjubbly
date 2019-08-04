import { ITournament } from './tournament';
import { ITeam } from './team';

export interface IRegularSeasonWins {
    regularSeasonWinsId: number;
    tournament: ITournament;
    team: ITeam;
    wins: number;
}

export class RegularSeasonWins implements IRegularSeasonWins {

    constructor(public regularSeasonWinsId: number, public tournament: ITournament,
        public team: ITeam, public wins: number) {
    }
}
