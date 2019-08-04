import { ITournament } from './tournament';
import { IWeek } from './week';
import { ITeam } from './team';

export interface IPowerRanking {
    powerRankingId: number;
    tournament: ITournament;
    week: IWeek;
    team: ITeam;
    currentRanking: number;
    previousRanking: number;
    statusChangeImage: string;
}

export class PowerRanking implements IPowerRanking {

    constructor(public powerRankingId: number, public tournament: ITournament, public week: IWeek,
        public team: ITeam, public currentRanking: number, public previousRanking: number, public statusChangeImage: string) {
    }
}
