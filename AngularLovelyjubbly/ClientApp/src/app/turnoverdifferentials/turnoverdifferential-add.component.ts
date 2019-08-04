import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; /** Router used to route using code */
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { finalize } from 'rxjs/operators';

import { ITurnoverDifferential, TurnoverDifferential } from '../shared/models/turnoverdifferential';
import { TurnoverDifferentialService } from '../shared/services/turnoverdifferential.service';
import { ITournament, Tournament } from '../shared/models/tournament';
import { TournamentService } from '../shared/services/tournament.service';
import { ITeam, Team } from '../shared/models/team';
import { TeamService } from '../shared/services/team.service';
import { ICoach, Coach } from '../shared/models/coach';
import { IDivision, Division } from '../shared/models/division';
import { UserService } from '../shared/services/user.service';

import { NumberValidators } from '../shared/validators/number.validator';

@Component({
    templateUrl: '../turnoverdifferentials/turnoverdifferential-add.component.html'
})

export class TurnoverDifferentialAddComponent implements OnInit {
    pageTitle = 'Turnover Differential Add';
    turnoverdifferentialForm: FormGroup; /** root form group */
    errorMessage: string;
    private isLocalStorageAvailable = false;
    tournaments: ITournament[];
    teams: ITeam[];
    turnoverdifferential: TurnoverDifferential = new TurnoverDifferential(); /** data model */
    isRequesting: boolean;

    color = 'primary';
    mode = 'indeterminate';
    spinnerValue = 0;

    constructor(private turnoverDifferentialService: TurnoverDifferentialService, private router: Router, private fb: FormBuilder,
        public tournamentService: TournamentService, public teamService: TeamService, public snackBar: MatSnackBar,
        public _userService: UserService) {
    }

    ngOnInit(): void {

        /** formBuilder creates a form model from configuration */
        this.turnoverdifferentialForm = this.fb.group({
            tournament: ['', Validators.required],
            team: ['', Validators.required],
            fumbleTakeaways: ['', [Validators.required, Validators.pattern(new RegExp(/^([0-9]|[1-4][0-9]|50)$/))]], /** 0 - 50 */
            interceptionTakeaways: ['', [Validators.required, Validators.pattern(new RegExp(/^([0-9]|[1-4][0-9]|50)$/))]], /** 0 - 50 */
            fumbleGiveaways: ['', [Validators.required, Validators.pattern(new RegExp(/^([0-9]|[1-4][0-9]|50)$/))]], /** 0 - 50 */
            interceptionGiveaways: ['', [Validators.required, Validators.pattern(new RegExp(/^([0-9]|[1-4][0-9]|50)$/))]], /** 0 - 50 */
        });

        this.tournamentService.getTournaments()
            .subscribe(tournaments => {
                this.tournaments = new Array<Tournament>();

                for (const t in tournaments) {
                    if (tournaments.hasOwnProperty(t)) {
                        this.tournaments.push(new Tournament(tournaments[t].tournamentId, tournaments[t].tournamentName, tournaments[t].seasonId));
                    }
                }
            },
                error => this.errorMessage = <any>error);

        this.teamService.getTeams()
            .subscribe(teams => {
                this.teams = new Array<Team>();

                for (const t in teams) {
                    if (teams.hasOwnProperty(t)) {
                        this.teams.push(new Team(teams[t].teamId, teams[t].teamName, teams[t].teamNameShort, new Coach(teams[t].coach.coachId,
                            teams[t].coach.coachName, teams[t].coach.coachNameShort),
                            new Division(teams[t].division.divisionId, teams[t].division.divisionName), teams[t].cheerleaderImage,
                            teams[t].coachImage, teams[t].headerImage, teams[t].logoImage, teams[t].hex, teams[t].r, teams[t].g,
                            teams[t].b));
                    }
                }
            },
                error => this.errorMessage = <any>error);
    }

    calculateTurnoverDifferential(): number {
        var turnoverDifferential = this.turnoverDifferentialService.calculateTurnoverDifferential
            (this.turnoverdifferentialForm.get('fumbleTakeaways').value, this.turnoverdifferentialForm.get('interceptionTakeaways').value,
                this.turnoverdifferentialForm.get('fumbleGiveaways').value, this.turnoverdifferentialForm.get('interceptionGiveaways').value);
        return turnoverDifferential;
    }

    save() {
        this.isRequesting = true;
        console.log(this.turnoverdifferentialForm.value);
        this.turnoverDifferentialService.addTurnoverDifferential(this.turnoverdifferentialForm.value).pipe(
            finalize(() => {
                this.isRequesting = false
            })
        )
            .subscribe(
                data => {
                    console.log('success:', data);
                    let config = new MatSnackBarConfig();
                    config.politeness = 'assertive';
                    config.duration = 4000;
                    config.panelClass = ['snack-bar-success'];

                    if (this._userService.currentLanguage() === 'en') {
                        this.snackBar.open('Turnover Differential added', '', config);
                    }
                    else if (this._userService.currentLanguage() === 'fi') {
                        this.snackBar.open('Turnover Differential lisätty', '', config);
                    }

                    this.onSaveComplete();
                },
                err => {
                    console.log('error:', err);
                    let config = new MatSnackBarConfig();
                    config.politeness = 'assertive';
                    config.duration = 4000;
                    config.panelClass = ['snack-bar-warning'];
                    let snackBarRef = this.snackBar.open(err, '', config);
                });
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.turnoverdifferentialForm.reset();
        this.router.navigate(['/TurnoverDifferentials']);
    }

    onBack(): void {
        this.router.navigate(['/TurnoverDifferentials']);
    }
}
