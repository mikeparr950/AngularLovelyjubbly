import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; /** Router used to route using code */
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { finalize } from 'rxjs/operators';

import { IFixture, Fixture } from '../shared/models/fixture';
import { FixtureService } from '../shared/services/fixture.service';
import { ITournament, Tournament } from '../shared/models/tournament';
import { TournamentService } from '../shared/services/tournament.service';
import { IWeek, Week } from '../shared/models/week';
import { WeekService } from '../shared/services/week.service';
import { ITeam, Team } from '../shared/models/team';
import { TeamService } from '../shared/services/team.service';
import { ICoach, Coach } from '../shared/models/coach';
import { IDivision, Division } from '../shared/models/division';
import { UserService } from '../shared/services/user.service';
import { LogService } from '../shared/utils/log.service';

import { NumberValidators } from '../shared/validators/number.validator';

@Component({
    templateUrl: '../fixtures/fixture-add.component.html'
})

export class FixtureAddComponent implements OnInit {
    pageTitle = 'Fixture Add';
    fixtureForm: FormGroup; /** root form group */
    fixture: Fixture = new Fixture(); /** data model */
    errorMessage: string;
    isRequesting: boolean;
    tournaments: ITournament[];
    weeks: IWeek[];
    awayTeams: ITeam[];
    homeTeams: ITeam[];

    color = 'primary';
    mode = 'indeterminate';
    spinnerValue = 0;

    constructor(private fixtureService: FixtureService, private router: Router, private fb: FormBuilder,
        public tournamentService: TournamentService, public weekService: WeekService,
        public teamService: TeamService, public snackBar: MatSnackBar, public _userService: UserService,
        private _logService: LogService) {
    }

    ngOnInit(): void {

        /** formBuilder creates a form model from configuration */
        this.fixtureForm = this.fb.group({
            tournament: ['', Validators.required],
            week: ['', Validators.required],
            awayTeam: ['', Validators.required],
            awayTeamScore: ['', [NumberValidators.range(0, 80)]],
            homeTeam: ['', Validators.required],
            homeTeamScore: ['', [NumberValidators.range(0, 80)]],
            isOvertime: [false]
        });

        this.tournamentService.getTournaments()
            .subscribe(tournaments => {
                this.tournaments = new Array<Tournament>();

                for (const t in tournaments) {
                    if (tournaments.hasOwnProperty(t)) {
                        this.tournaments.push(new Tournament(tournaments[t].tournamentId, tournaments[t].tournamentName,
                            tournaments[t].seasonId));
                    }
                }
            },
                error => this.errorMessage = <any>error);

        this.weekService.getWeeks()
            .subscribe(weeks => {
                this.weeks = new Array<Week>();

                for (const w in weeks) {
                    if (weeks.hasOwnProperty(w)) {
                        this.weeks.push(new Week(weeks[w].weekId, weeks[w].weekNumber));
                    }
                }
            },
                error => this.errorMessage = <any>error);

        this.teamService.getTeams()
            .subscribe(teams => {
                this.awayTeams = new Array<Team>();
                this.homeTeams = new Array<Team>();

                for (const t in teams) {
                    if (teams.hasOwnProperty(t)) {
                        this.awayTeams.push(new Team(teams[t].teamId, teams[t].teamName, teams[t].teamNameShort,
                            new Coach(teams[t].coach.coachId,
                            teams[t].coach.coachName, teams[t].coach.coachNameShort),
                            new Division(teams[t].division.divisionId, teams[t].division.divisionName), teams[t].cheerleaderImage,
                            teams[t].coachImage, teams[t].headerImage, teams[t].logoImage, teams[t].hex, teams[t].r, teams[t].g,
                            teams[t].b));

                        this.homeTeams.push(new Team(teams[t].teamId, teams[t].teamName, teams[t].teamNameShort,
                            new Coach(teams[t].coach.coachId,
                            teams[t].coach.coachName, teams[t].coach.coachNameShort),
                            new Division(teams[t].division.divisionId, teams[t].division.divisionName), teams[t].cheerleaderImage,
                            teams[t].coachImage, teams[t].headerImage, teams[t].logoImage, teams[t].hex, teams[t].r, teams[t].g,
                            teams[t].b));
                    }
                }
            },
                error => this.errorMessage = <any>error);
    }

    save() {
        this.isRequesting = true;
        this._logService.logObject(this.fixtureForm.value);
        this.fixtureService.addFixture(this.fixtureForm.value).pipe(
            finalize(() => {
                this.isRequesting = false
            })
        )
            .subscribe(
                data => {
                    this._logService.logObject('success:' + data);
                    let config = new MatSnackBarConfig();
                    config.politeness = 'assertive';
                    config.duration = 4000;
                    config.panelClass = ['snack-bar-success'];

                    if (this._userService.currentLanguage() === 'en') {
                        this.snackBar.open('Fixture added', '', config);
                    }
                    else if (this._userService.currentLanguage() === 'fi') {
                        this.snackBar.open('Peli lisätty', '', config);
                    }

                    this.onSaveComplete();
                },
                err => {
                    this._logService.logObject('error:' + err);
                    let config = new MatSnackBarConfig();
                    config.politeness = 'assertive';
                    config.duration = 4000;
                    config.panelClass = ['snack-bar-warning'];
                    let snackBarRef = this.snackBar.open(err, '', config);
                });
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.fixtureForm.reset();
        this.router.navigate(['/Fixtures']);
    }

    onBack(): void {
        this.router.navigate(['/Fixtures']);
    }
}
