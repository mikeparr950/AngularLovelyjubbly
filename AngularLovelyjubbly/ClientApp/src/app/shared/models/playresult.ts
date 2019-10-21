import { IFormation } from './formation';
import { IOffensivePlay } from './offensiveplay';
import { IDefensivePlay } from './defensiveplay';

export interface IPlayResult {
    playResultId: number;
    formation: IFormation;
    offensivePlay: IOffensivePlay;
    defensivePlay: IDefensivePlay;
    yards: number;
    isOffensivePenalty: boolean;
    isDefensivePenalty: boolean;
    isSack: boolean;
    isFumble: boolean;
    isInterception: boolean;
    returnYards: number;
}

export class PlayResult implements IPlayResult {

    constructor(public playResultId: number = 0,
        public formation: IFormation = null,
        public offensivePlay: IOffensivePlay = null,
        public defensivePlay: IDefensivePlay = null,
        public yards: number = 0,
        public isOffensivePenalty: boolean = false,
        public isDefensivePenalty: boolean = false,
        public isSack: boolean = false,
        public isFumble: boolean = false,
        public isInterception: boolean = false,
        public returnYards: number = 0) {
    }
}
