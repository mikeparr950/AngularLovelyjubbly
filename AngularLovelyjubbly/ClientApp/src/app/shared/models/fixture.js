export class Fixture {
    constructor(fixtureId = 0, tournament = null, tournamentShort = null, week = null, homeTeam = null, homeTeamScore, awayTeam = null, awayTeamScore, isOvertime = false) {
        this.fixtureId = fixtureId;
        this.tournament = tournament;
        this.tournamentShort = tournamentShort;
        this.week = week;
        this.homeTeam = homeTeam;
        this.homeTeamScore = homeTeamScore;
        this.awayTeam = awayTeam;
        this.awayTeamScore = awayTeamScore;
        this.isOvertime = isOvertime;
    }
}
//# sourceMappingURL=fixture.js.map