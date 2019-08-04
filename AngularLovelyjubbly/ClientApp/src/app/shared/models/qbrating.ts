import { ITournament } from './tournament';
import { ITeam } from './team';

export interface IQBRating {
    qbRatingId: number;
    tournament: ITournament;
    tournamentShort: number;
    team: ITeam;
    completion: number;
    gain: number;
    touchdown: number;
    interception: number;
    rating: number;
}

export class QBRating implements IQBRating {

    constructor(public qbRatingId: number = 0,
        public tournament: ITournament = null,
        public tournamentShort: number = null,
        public team: ITeam = null,
        public completion: number = null,
        public gain: number = null,
        public touchdown: number = null,
        public interception: number = null,
        public rating: number = null) {
    }
}
