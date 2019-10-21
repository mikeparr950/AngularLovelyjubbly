export class PlayResult {
    constructor(playResultId = 0, formation = null, offensivePlay = null, defensivePlay = null, yards = 0, isOffensivePenalty = false, isDefensivePenalty = false, isSack = false, isFumble = false, isInterception = false, returnYards = 0) {
        this.playResultId = playResultId;
        this.formation = formation;
        this.offensivePlay = offensivePlay;
        this.defensivePlay = defensivePlay;
        this.yards = yards;
        this.isOffensivePenalty = isOffensivePenalty;
        this.isDefensivePenalty = isDefensivePenalty;
        this.isSack = isSack;
        this.isFumble = isFumble;
        this.isInterception = isInterception;
        this.returnYards = returnYards;
    }
}
//# sourceMappingURL=playresult.js.map