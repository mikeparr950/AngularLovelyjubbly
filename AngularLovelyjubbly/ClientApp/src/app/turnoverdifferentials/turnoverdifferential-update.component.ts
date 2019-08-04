import { Component, OnInit, OnDestroy } from '@angular/core';
/** ActivatedRoute used to get passed parameter, Router used to route using code */
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

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
    templateUrl: '../turnoverdifferentials/turnoverdifferential-update.component.html'
})

export class TurnoverDifferentialUpdateComponent implements OnInit, OnDestroy {
    pageTitle = 'Turnover Differential Update';
    turnoverdifferentialForm: FormGroup; /** root form group */
    errorMessage: string;
    private isLocalStorageAvailable = false;
    tournaments: ITournament[];
    teams: ITeam[];
    turnoverdifferential: TurnoverDifferential = new TurnoverDifferential(); /** data model */
    isRequesting: boolean;
    selectedId: number;
    private sub: Subscription;

    constructor(private fb: FormBuilder, private _route: ActivatedRoute, private _router: Router,
        private turnoverDifferentialService: TurnoverDifferentialService, public tournamentService: TournamentService,
        public teamService: TeamService, public snackBar: MatSnackBar, public _userService: UserService) {
        console.log(this._route.snapshot.params['id']); /** param name here must match name specified in path */
    }

    ngOnInit(): void {

        /** formBuilder creates a form model from configuration */
        this.turnoverdifferentialForm = this.fb.group({
            turnoverDifferentialId: 0,
            tournament: ['', Validators.required],
            team: ['', Validators.required],
            fumbleTakeaways: ['', [Validators.required, Validators.pattern(new RegExp(/^([0-9]|[1-4][0-9]|50)$/))]], /** 0 - 50 */
            interceptionTakeaways: ['', [Validators.required, Validators.pattern(new RegExp(/^([0-9]|[1-4][0-9]|50)$/))]], /** 0 - 50 */
            fumbleGiveaways: ['', [Validators.required, Validators.pattern(new RegExp(/^([0-9]|[1-4][0-9]|50)$/))]], /** 0 - 50 */
            interceptionGiveaways: ['', [Validators.required, Validators.pattern(new RegExp(/^([0-9]|[1-4][0-9]|50)$/))]], /** 0 - 50 */
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

                                /**load teams and tournaments before executing this code*/
                                this.turnoverDifferentialService.getTurnoverDifferential(this.selectedId).subscribe(
                                    (turnoverdifferential: ITurnoverDifferential) => this.onTurnoverDifferentialRetrieved(turnoverdifferential),
                                    (error: any) => this.errorMessage = <any>error
                                );
                            },
                                error => this.errorMessage = <any>error);
                    },
                        error => this.errorMessage = <any>error);
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onTurnoverDifferentialRetrieved(turnoverdifferential: ITurnoverDifferential): void {
        if (this.turnoverdifferentialForm) {
            this.turnoverdifferentialForm.reset();
        }
        this.turnoverdifferential = turnoverdifferential;

        const selectedTournament = this.tournaments.filter(function (element, index) {
            return (element.tournamentId === turnoverdifferential.tournament.tournamentId);
        });
        this.turnoverdifferential.tournament = selectedTournament[0];

        const selectedTeam = this.teams.filter(function (element, index) {
            return (element.teamId === turnoverdifferential.team.teamId);
        });
        this.turnoverdifferential.team = selectedTeam[0];

        // Update the data on the form
        this.turnoverdifferentialForm.patchValue({
            turnoverDifferentialId: this.selectedId,
            tournament: this.turnoverdifferential.tournament,
            team: this.turnoverdifferential.team,
            fumbleTakeaways: this.turnoverdifferential.fumbleTakeaways,
            interceptionTakeaways: this.turnoverdifferential.interceptionTakeaways,
            fumbleGiveaways: this.turnoverdifferential.fumbleGiveaways,
            interceptionGiveaways: this.turnoverdifferential.interceptionGiveaways
        });
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
        this.turnoverDifferentialService.updateTurnoverDifferential(this.turnoverdifferentialForm.value).pipe(
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
                        this.snackBar.open('Turnover Differential updated', '', config);
                    }
                    else if (this._userService.currentLanguage() === 'fi') {
                        this.snackBar.open('Turnover Differential päivitetty', '', config);
                    }

                    this.onSaveComplete();
                },
                err => {
                    console.log('error:', err);
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
        this.turnoverdifferentialForm.reset();
        this._router.navigate(['/TurnoverDifferentials']);
    }

    onBack(): void {
        this._router.navigate(['/TurnoverDifferentials']);
    }
}
