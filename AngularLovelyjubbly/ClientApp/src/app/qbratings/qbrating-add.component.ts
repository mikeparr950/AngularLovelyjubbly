import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; /** Router used to route using code */
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { finalize } from 'rxjs/operators';

import { QBRating } from '../shared/models/qbrating';
import { QBRatingService } from '../shared/services/qbrating.service';
import { ITournament, Tournament } from '../shared/models/tournament';
import { TournamentService } from '../shared/services/tournament.service';
import { ITeam, Team } from '../shared/models/team';
import { TeamService } from '../shared/services/team.service';
import { Coach } from '../shared/models/coach';
import { Division } from '../shared/models/division';
import { UserService } from '../shared/services/user.service';

@Component({
    templateUrl: '../qbratings/qbrating-add.component.html'
})

export class QBRatingAddComponent implements OnInit {
    pageTitle = 'QB Rating Add';
    qbratingForm: FormGroup; /** root form group */
    errorMessage: string;
    private isLocalStorageAvailable = false;
    tournaments: ITournament[];
    teams: ITeam[];
    qbrating: QBRating = new QBRating(); /** data model */
    isRequesting: boolean;

    color = 'primary';
    mode = 'indeterminate';
    spinnerValue = 0;

    constructor(private qbratingService: QBRatingService, private router: Router, private fb: FormBuilder,
        public tournamentService: TournamentService, public teamService: TeamService, public snackBar: MatSnackBar,
        public _userService: UserService) {
    }

    ngOnInit(): void {

        /** formBuilder creates a form model from configuration */
        this.qbratingForm = this.fb.group({
            tournament: ['', Validators.required],
            team: ['', Validators.required],
            completion: ['', [Validators.required, Validators.pattern(new RegExp(/^(?:[1-9]\d?|0)(?:\.\d{1})?$/))]], /** 0.0 - 99.9 */
            gain: ['', [Validators.required, Validators.pattern(new RegExp(/^(?:[1-9]\d?|0)(?:\.\d{1})?$/))]], /** 0.0 - 99.9 */
            touchdown: ['', [Validators.required, Validators.pattern(new RegExp(/^(?:[1-9]\d?|0)(?:\.\d{1})?$/))]], /** 0.0 - 99.9 */
            interception: ['', [Validators.required, Validators.pattern(new RegExp(/^(?:[1-9]\d?|0)(?:\.\d{1})?$/))]] /** 0.0 - 99.9 */
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

    calculateQBRating(): string {
        var rating = this.qbratingService.calculateQBRating(this.qbratingForm.get('completion').value, this.qbratingForm.get('gain').value,
            this.qbratingForm.get('touchdown').value, this.qbratingForm.get('interception').value);
        return rating;
    }

    save() {
        this.isRequesting = true;
        console.log(this.qbratingForm.value);
        this.qbratingService.addQBRating(this.qbratingForm.value).pipe(
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
                        this.snackBar.open('QB Rating added', '', config);
                    }
                    else if (this._userService.currentLanguage() === 'fi') {
                        this.snackBar.open('QB:n luokitus lisätty', '', config);
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
        this.qbratingForm.reset();
        this.router.navigate(['/QBRatings']);
    }

    onBack(): void {
        this.router.navigate(['/QBRatings']);
    }
}
