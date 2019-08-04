import { ITournament } from './tournament';
import { IWeek } from './week';
import { ITeam } from './team';

export interface IFixtureList {
    fixtureId: number;
    tournament: ITournament;
    week: IWeek;
    opponent: ITeam;
    score: string;
}

export class FixtureList implements IFixtureList {

    constructor(public fixtureId: number, public tournament: ITournament, public week: IWeek,
        public opponent: ITeam, public score: string) {
    }
}