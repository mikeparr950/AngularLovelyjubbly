import { Component, OnInit, OnDestroy } from '@angular/core';
/** ActivatedRoute used to get passed parameter, Router used to route using code */
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

//import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { IQBRating, QBRating } from '../shared/models/qbrating';
import { QBRatingService } from '../shared/services/qbrating.service';
import { ITournament, Tournament } from '../shared/models/tournament';
import { TournamentService } from '../shared/services/tournament.service';
import { ITeam, Team } from '../shared/models/team';
import { TeamService } from '../shared/services/team.service';
import { ICoach, Coach } from '../shared/models/coach';
import { IDivision, Division } from '../shared/models/division';
import { UserService } from '../shared/services/user.service';

import { NumberValidators } from '../shared/validators/number.validator';

@Component({
    templateUrl: '../qbratings/qbrating-update.component.html'
})

export class QBRatingUpdateComponent implements OnInit, OnDestroy {
    pageTitle = 'QB Rating Update';
    qbratingForm: FormGroup; /** root form group */
    errorMessage: string;
    isRequesting: boolean;
    tournaments: ITournament[];
    teams: ITeam[];
    qbrating: QBRating = new QBRating(); /** data model */
    selectedId: number;
    private sub: Subscription;

    constructor(private fb: FormBuilder, private _route: ActivatedRoute, private _router: Router,
        private qbratingService: QBRatingService, public tournamentService: TournamentService,
        public teamService: TeamService, public snackBar: MatSnackBar, public _userService: UserService) {
        console.log(this._route.snapshot.params['id']); /** param name here must match name specified in path */
    }

    ngOnInit(): void {

        /** formBuilder creates a form model from configuration */
        this.qbratingForm = this.fb.group({
            qbRatingId: 0,
            tournament: ['', Validators.required],
            team: ['', Validators.required],
            completion: ['', [Validators.required, Validators.pattern(new RegExp(/^(?:[1-9]\d?|0)(?:\.\d{1})?$/))]], /** 0.0 - 99.9 */
            gain: ['', [Validators.required, Validators.pattern(new RegExp(/^(?:[1-9]\d?|0)(?:\.\d{1})?$/))]], /** 0.0 - 99.9 */
            touchdown: ['', [Validators.required, Validators.pattern(new RegExp(/^(?:[1-9]\d?|0)(?:\.\d{1})?$/))]], /** 0.0 - 99.9 */
            interception: ['', [Validators.required, Validators.pattern(new RegExp(/^(?:[1-9]\d?|0)(?:\.\d{1})?$/))]] /** 0.0 - 99.9 */
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
                                this.qbratingService.getQBRating(this.selectedId).subscribe(
                                    (qbrating: IQBRating) => this.onQBRatingRetrieved(qbrating),
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

    onQBRatingRetrieved(qbrating: IQBRating): void {
        if (this.qbratingForm) {
            this.qbratingForm.reset();
        }
        this.qbrating = qbrating;

        const selectedTournament = this.tournaments.filter(function (element, index) {
            return (element.tournamentId === qbrating.tournament.tournamentId);
        });
        this.qbrating.tournament = selectedTournament[0];

        const selectedTeam = this.teams.filter(function (element, index) {
            return (element.teamId === qbrating.team.teamId);
        });
        this.qbrating.team = selectedTeam[0];

        // Update the data on the form
        this.qbratingForm.patchValue({
            qbRatingId: this.selectedId,
            tournament: this.qbrating.tournament,
            team: this.qbrating.team,
            completion: this.qbrating.completion,
            gain: this.qbrating.gain,
            touchdown: this.qbrating.touchdown,
            interception: this.qbrating.interception
        });
    }

    calculateQBRating(): string {
        var rating = this.qbratingService.calculateQBRating(this.qbratingForm.get('completion').value, this.qbratingForm.get('gain').value,
            this.qbratingForm.get('touchdown').value, this.qbratingForm.get('interception').value);
        return rating;
    }

    save() {
        this.isRequesting = true;
        console.log(this.qbratingForm.value);
        this.qbratingService.updateQBRating(this.qbratingForm.value).pipe(
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
                        this.snackBar.open('QB Rating updated', '', config);
                    }
                    else if (this._userService.currentLanguage() === 'fi') {
                        this.snackBar.open('QB:n luokitus päivitetty', '', config);
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
        this.qbratingForm.reset();
        this._router.navigate(['/QBRatings']);
    }

    onBack(): void {
        this._router.navigate(['/QBRatings']);
    }
}
