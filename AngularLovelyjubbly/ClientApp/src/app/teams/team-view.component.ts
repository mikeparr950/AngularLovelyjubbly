import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ITeam, Team } from '../shared/models/team';
import { TeamService } from '../shared/services/team.service';
import { IFixtureList, FixtureList } from '../shared/models/fixturelist';
import { FixtureService } from '../shared/services/fixture.service';
import { IRegularSeasonWins } from '../shared/models/regularseasonwins';
import { RegularSeasonWinsService } from '../shared/services/regularseasonwins.service';
import { Coach } from '../shared/models/coach';
import { Division } from '../shared/models/division';

@Component({
    templateUrl: '../teams/team-view.component.html',
})

export class TeamViewComponent implements OnInit {

    teamViewForm: FormGroup; /** root form group */

    errorMessage: string;
    teams: ITeam[];
    selectedTeam: string = '';
    regularSeasonWins: IRegularSeasonWins[];
    fixtures: IFixtureList[];
    seasons: Array<string> = new Array<string>();
    wins: Array<number> = new Array<number>();
    teamColors: Array<any> = new Array<any>();
    red: string;
    green: string;
    blue: string;
    headerImage: string = '';
    coachImage: string = '';
    cheerleaderImage: string = '';

    /**lineChart*/
    lineChartData: Array<any> = new Array<any>();
    lineChartLabels: Array<any> = new Array<any>();
    lineChartColors: Array<any> = new Array<any>();
    lineChartType: string;
    lineChartOptions: any;

    constructor(public _teamService: TeamService, private fb: FormBuilder, public _regularSeasonWinsService: RegularSeasonWinsService,
        public _fixtureService: FixtureService) {
        this.lineChartData = [{ data: this.wins, label: 'Regular Season Wins' }];
        this.lineChartLabels = this.seasons;
        this.lineChartType = 'line';
        this.lineChartOptions = {
            animation: false, responsive: true, scales: {
                yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: 16 } }]
            }
        };
    }

    ngOnInit(): void {

        this.teamViewForm = this.fb.group({
            team: ['']
        });

        this._teamService.getTeams()
            .subscribe(teams => {
                this.teams = new Array<Team>();

                for (const t in teams) {
                    if (teams.hasOwnProperty(t)) {
                        if (teams[t].division.divisionName !== 'None') {
                            this.teams.push(new Team(teams[t].teamId, teams[t].teamName, teams[t].teamNameShort, new Coach(teams[t].coach.coachId,
                                teams[t].coach.coachName, teams[t].coach.coachNameShort),
                                new Division(teams[t].division.divisionId, teams[t].division.divisionName), teams[t].cheerleaderImage,
                                teams[t].coachImage, teams[t].headerImage, teams[t].logoImage, teams[t].hex, teams[t].r, teams[t].g,
                                teams[t].b));
                        }
                    }
                }
            },
                error => this.errorMessage = <any>error);
    }

    changeTeamView(): void {
        const teamControl = this.teamViewForm.get('team');

        let obj = teamControl.value;
        this.selectedTeam = obj.teamName;
        console.log(obj.teamName);

        /**clear previous*/
        this.regularSeasonWins = null;

        while (this.seasons.length) {
            this.seasons.pop();
        }

        while (this.wins.length) {
            this.wins.pop();
        }

        this._teamService.getTeamByTeamName(this.selectedTeam)
            .subscribe(team => {

                this.headerImage = team.headerImage;
                this.coachImage = team.coachImage;
                this.cheerleaderImage = team.cheerleaderImage;

                this._fixtureService.getFixturesByTeamAndTournament(team.teamId, 21)
                    .subscribe(fixtures => {
                        this.fixtures = new Array<FixtureList>();

                        for (const f in fixtures) {
                            if (fixtures.hasOwnProperty(f)) {
                                this.fixtures.push(new FixtureList(fixtures[f].fixtureId, fixtures[f].tournament, fixtures[f].week,
                                    fixtures[f].opponent, fixtures[f].score));
                            }
                        }
                    },
                        error => this.errorMessage = <any>error);

                this._regularSeasonWinsService.getRegularSeasonWinsByTeamName(this.selectedTeam)
                    .subscribe(regularSeasonWins => {
                        if (regularSeasonWins.length > 0) {
                            this.regularSeasonWins = regularSeasonWins;
                            this.red = this.regularSeasonWins[0].team.r.toString();
                            this.green = this.regularSeasonWins[0].team.g.toString();
                            this.blue = this.regularSeasonWins[0].team.b.toString();

                            this.teamColors = [
                                {
                                    backgroundColor: "rgba(" + this.red + "," + this.green + "," + this.blue + ",0.2)",
                                    borderColor: "rgba(" + this.red + "," + this.green + "," + this.blue + ",1)",
                                    pointBackgroundColor: "rgba(" + this.red + "," + this.green + "," + this.blue + ",1)",
                                    pointBorderColor: '#fff',
                                    pointHoverBackgroundColor: '#fff',
                                    pointHoverBorderColor: "rgba(" + this.red + "," + this.green + "," + this.blue + ",0.8)"
                                }];

                            this.lineChartColors = this.teamColors;

                            for (var i in this.regularSeasonWins) {
                                this.wins.push(this.regularSeasonWins[i].wins);
                            }

                            for (var i in this.regularSeasonWins) {
                                this.seasons.push
                                    (this.regularSeasonWins[i].tournament.tournamentName.substr
                                        (this.regularSeasonWins[i].tournament.tournamentName.length - 4));
                            }
                        }
                    },
                        error => this.errorMessage = <any>error);
            },
                error => this.errorMessage = <any>error);
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
