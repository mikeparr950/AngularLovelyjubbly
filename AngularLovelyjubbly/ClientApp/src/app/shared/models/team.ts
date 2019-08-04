import { ICoach } from './coach';
import { IDivision } from './division';

export interface ITeam {
    teamId: number;
    teamName: string;
    teamNameShort: string;
    coach: ICoach;
    division: IDivision;
    cheerleaderImage?: string;
    coachImage?: string;
    headerImage?: string;
    logoImage?: string;
    hex: string;
    r: number;
    g: number;
    b: number;
}

export class Team implements ITeam {

    constructor(public teamId: number = 0,
        public teamName: string = '',
        public teamNameShort: string = '',
        public coach: ICoach = null,
        public division: IDivision = null,
        public cheerleaderImage?: string,
        public coachImage?: string,
        public headerImage?: string,
        public logoImage?: string,
        public hex: string = '',
        public r: number = null,
        public g: number = null,
        public b: number = null) {
    }
}
