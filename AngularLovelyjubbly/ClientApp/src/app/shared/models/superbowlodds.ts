import { ITournament } from './tournament';
import { ITeam } from './team';

export interface ISuperbowlOdds {
    superbowlOddsId: number;
    tournament: ITournament;
    team: ITeam;
    odds: number;
}

export class SuperbowlOdds implements ISuperbowlOdds {

    constructor(public superbowlOddsId: number, public tournament: ITournament,
        public team: ITeam, public odds: number) {
    }
}
