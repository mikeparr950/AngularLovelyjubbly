import { ITournament } from './tournament';
import { IWeek } from './week';
import { ITeam } from './team';

export interface IFixture {
    fixtureId: number;
    tournament: ITournament;
    tournamentShort: number;
    week: IWeek;
    homeTeam: ITeam;
    homeTeamScore?: number;
    awayTeam: ITeam;
    awayTeamScore?: number;
    isOvertime: boolean;
}

export class Fixture implements IFixture {

    constructor(public fixtureId: number = 0,
        public tournament: ITournament = null,
        public tournamentShort: number = null,
        public week: IWeek = null,
        public homeTeam: ITeam = null,
        public homeTeamScore?: number,
        public awayTeam: ITeam = null,
        public awayTeamScore?: number,
        public isOvertime: boolean = false) {
    }
}
