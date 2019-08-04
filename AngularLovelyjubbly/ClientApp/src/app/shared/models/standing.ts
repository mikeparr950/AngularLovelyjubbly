import { ITeam } from './team';

export interface IStanding {
    team: ITeam;
    won: number;
    lost: number;
    tied: number;
    pointsFor: number;
    pointsAgainst: number;
    pointsDifference: number;
}

export class Standing implements IStanding {

    constructor(public team: ITeam, public won: number, public lost: number, public tied: number,
        public pointsFor: number, public pointsAgainst: number, public pointsDifference: number) {
    }
}
