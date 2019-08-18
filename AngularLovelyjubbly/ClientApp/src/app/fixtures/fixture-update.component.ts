import { Component, OnInit, OnDestroy } from '@angular/core';
/** ActivatedRoute used to get passed parameter, Router used to route using code */
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

//import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { IFixture, Fixture } from '../shared/models/fixture';
import { FixtureService } from '../shared/services/fixture.service';
import { ITournament, Tournament } from '../shared/models/tournament';
import { TournamentService } from '../shared/services/tournament.service';
import { IWeek, Week } from '../shared/models/week';
import { WeekService } from '../shared/services/week.service';
import { ITeam, Team } from '../shared/models/team';
import { TeamService } from '../shared/services/team.service';
import { Coach } from '../shared/models/coach';
import { Division } from '../shared/models/division';
import { UserService } from '../shared/services/user.service';
import { LogService } from '../shared/utils/log.service';

import { NumberValidators } from '../shared/validators/number.validator';

@Component({
    templateUrl: '../fixtures/fixture-update.component.html'
})

export class FixtureUpdateComponent implements OnInit, OnDestroy {
    pageTitle = 'Fixture Update';
    fixtureForm: FormGroup; /** root form group */
    errorMessage: string;
    isRequesting: boolean;
    tournaments: ITournament[];
    weeks: IWeek[];
    awayTeams: ITeam[];
    homeTeams: ITeam[];
    fixture: Fixture = new Fixture(); /** data model */
    selectedId: number;
    private sub: Subscription;

    constructor(private fb: FormBuilder, private _route: ActivatedRoute, private _router: Router,
        private fixtureService: FixtureService, public tournamentService: TournamentService, public weekService: WeekService,
        public teamService: TeamService, public snackBar: MatSnackBar, public _userService: UserService,
        private _logService: LogService) {
        this._logService.log(this._route.snapshot.params['id']); /** param name here must match name specified in path */
    }

    ngOnInit(): void {

        /** formBuilder creates a form model from configuration */
        this.fixtureForm = this.fb.group({
            fixtureId: 0,
            tournament: ['', Validators.required],
            week: ['', Validators.required],
            awayTeam: ['', Validators.required],
            awayTeamScore: ['', [NumberValidators.range(0, 80)]],
            homeTeam: ['', Validators.required],
            homeTeamScore: ['', [NumberValidators.range(0, 80)]],
            isOvertime: [false]
        });

        this.sub = this._route.params.subscribe(
            params => {
                this.selectedId = +params['id'];

                this.tournamentService.getTournaments()
                    .subscribe(tournaments => {
                        this.tournaments = new Array<Tournament>();

                        for (const t in tournaments) {
                            if (tournaments.hasOwnProperty(t)) {
                                this.tournaments.push(new Tournament(tournaments[t].tournamentId, tournaments[t].tournamentName, tournaments[t].seasonId));
                            }
                        }

                        this.weekService.getWeeks()
                            .subscribe(weeks => {
                                this.weeks = new Array<Week>();

                                for (const w in weeks) {
                                    if (weeks.hasOwnProperty(w)) {
                                        this.weeks.push(new Week(weeks[w].weekId, weeks[w].weekNumber));
                                    }
                                }

                                this.teamService.getTeams()
                                    .subscribe(teams => {
                                        this.awayTeams = new Array<Team>();
                                        this.homeTeams = new Array<Team>();

                                        for (const t in teams) {
                                            if (teams.hasOwnProperty(t)) {
                                                this.awayTeams.push(new Team(teams[t].teamId, teams[t].teamName, teams[t].teamNameShort, new Coach(teams[t].coach.coachId,
                                                    teams[t].coach.coachName, teams[t].coach.coachNameShort),
                                                    new Division(teams[t].division.divisionId, teams[t].division.divisionName), teams[t].cheerleaderImage,
                                                    teams[t].coachImage, teams[t].headerImage, teams[t].logoImage, teams[t].hex, teams[t].r, teams[t].g,
                                                    teams[t].b));

                                                this.homeTeams.push(new Team(teams[t].teamId, teams[t].teamName, teams[t].teamNameShort, new Coach(teams[t].coach.coachId,
                                                    teams[t].coach.coachName, teams[t].coach.coachNameShort),
                                                    new Division(teams[t].division.divisionId, teams[t].division.divisionName), teams[t].cheerleaderImage,
                                                    teams[t].coachImage, teams[t].headerImage, teams[t].logoImage, teams[t].hex, teams[t].r, teams[t].g,
                                                    teams[t].b));
                                            }
                                        }

                                        /**load coaches and divisions before executing this code*/
                                        this.fixtureService.getFixture(this.selectedId).subscribe(
                                            (fixture: IFixture) => this.onFixtureRetrieved(fixture),
                                            (error: any) => this.errorMessage = <any>error
                                        );
                                    },
                                        error => this.errorMessage = <any>error);
                            },
                                error => this.errorMessage = <any>error);
                    },
                        error => this.errorMessage = <any>error);
            });
    }

    onFixtureRetrieved(fixture: IFixture): void {
        if (this.fixtureForm) {
            this.fixtureForm.reset();
        }
        this.fixture = fixture;

        const selectedTournament = this.tournaments.filter(function (element, index) {
            return (element.tournamentId === fixture.tournament.tournamentId);
        });
        this.fixture.tournament = selectedTournament[0];

        const selectedWeek = this.weeks.filter(function (element, index) {
            return (element.weekId === fixture.week.weekId);
        });
        this.fixture.week = selectedWeek[0];

        const selectedAwayTeam = this.awayTeams.filter(function (element, index) {
            return (element.teamId === fixture.awayTeam.teamId);
        });
        this.fixture.awayTeam = selectedAwayTeam[0];

        const selectedHomeTeam = this.homeTeams.filter(function (element, index) {
            return (element.teamId === fixture.homeTeam.teamId);
        });
        this.fixture.homeTeam = selectedHomeTeam[0];

        // Update the data on the form
        this.fixtureForm.patchValue({
            fixtureId: this.selectedId,
            tournament: this.fixture.tournament,
            week: this.fixture.week,
            awayTeam: this.fixture.awayTeam,
            awayTeamScore: this.fixture.awayTeamScore,
            homeTeam: this.fixture.homeTeam,
            homeTeamScore: this.fixture.homeTeamScore,
            isOvertime: this.fixture.isOvertime
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    save() {
        this.isRequesting = true;
        this._logService.logObject(this.fixtureForm.value);
        this.fixtureService.updateFixture(this.fixtureForm.value).pipe(
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
                        this.snackBar.open('Fixture updated', '', config);
                    }
                    else if (this._userService.currentLanguage() === 'fi') {
                        this.snackBar.open('Peli päivitetty', '', config);
                    }

                    this.onSaveComplete();
                },
                err => {
                    this._logService.logObject('error:' + err);
                    let config = new MatSnackBarConfig();
                    config.politeness = 'assertive';
                    config.duration = 4000;
                    config.panelClass = ['snack-bar-warning'];
                    let snackBarRef = this.snackBar.open(err.json(), '', config);
                }
            )
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.fixtureForm.reset();
        this._router.navigate(['/Fixtures']);
    }

    onBack(): void {
        this._router.navigate(['/Fixtures']);
    }
}
