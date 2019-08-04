export interface ITournament {
    tournamentId: number;
    tournamentName: string;
    seasonId: number;
}

export class Tournament implements ITournament {

    constructor(public tournamentId: number, public tournamentName: string, public seasonId: number) {
    }
}
