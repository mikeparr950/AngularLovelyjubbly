import { Component, OnInit, OnDestroy } from '@angular/core';
/** ActivatedRoute used to get passed parameter, Router used to route using code */
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { ITeam, Team } from '../shared/models/team';
import { ICoach, Coach } from '../shared/models/coach';
import { CoachService } from '../shared/services/coach.service';
import { IDivision, Division } from '../shared/models/division';
import { DivisionService } from '../shared/services/division.service';
import { TeamService } from '../shared/services/team.service';
import { UserService } from '../shared/services/user.service';

import { NumberValidators } from '../shared/validators/number.validator';

@Component({
    templateUrl: '../teams/team-update.component.html'
})

export class TeamUpdateComponent implements OnInit, OnDestroy {
    pageTitle = 'Team Update';
    teamForm: FormGroup; /** root form group */
    team: Team = new Team(); /** data model */
    errorMessage: string;
    isRequesting: boolean;
    selectedId: number;
    coaches: ICoach[];
    divisions: IDivision[];
    private sub: Subscription;

    constructor(private fb: FormBuilder, private _route: ActivatedRoute, private _router: Router,
        public _coachService: CoachService, public _divisionService: DivisionService, public _teamService: TeamService,
        public snackBar: MatSnackBar, public _userService: UserService) {
        console.log(this._route.snapshot.params['id']); /** param name here must match name specified in path */
    }

    ngOnInit(): void {

        /** formBuilder creates a form model from configuration */
        this.teamForm = this.fb.group({
            teamId: 0,
            teamName: ['', [Validators.required, Validators.maxLength(75)]],
            teamNameShort: ['', [Validators.required, Validators.maxLength(15)]],
            cheerleaderImage: '',
            coachImage: '',
            headerImage: '',
            division: ['', Validators.required],
            coach: ['', Validators.required],
            logoImage: '',
            hex: ['', [Validators.required, Validators.pattern('^#([a-f0-9]{6})$')]],
            r: [0, [Validators.required, NumberValidators.range(0, 255)]],
            g: [0, [Validators.required, NumberValidators.range(0, 255)]],
            b: [0, [Validators.required, NumberValidators.range(0, 255)]]
        });

        this.sub = this._route.params.subscribe(
            params => {
                this.selectedId = +params['id'];

                this._divisionService.getDivisions()
                    .subscribe(divisions => {
                        this.divisions = new Array<Division>();

                        for (const d in divisions) {
                            if (divisions.hasOwnProperty(d)) {
                                this.divisions.push(new Division(divisions[d].divisionId, divisions[d].divisionName));
                            }
                        }

                        this._coachService.getCoaches()
                            .subscribe(coaches => {
                                this.coaches = new Array<Coach>();

                                for (const c in coaches) {
                                    if (coaches.hasOwnProperty(c)) {
                                        this.coaches.push(new Coach(coaches[c].coachId, coaches[c].coachName, coaches[c].coachNameShort));
                                    }
                                }

                                /**load coaches and divisions before executing this code*/
                                this._teamService.getTeam(this.selectedId).subscribe(
                                    (team: ITeam) => this.onTeamRetrieved(team),
                                    (error: any) => this.errorMessage = <any>error
                                );
                            },
                                error => this.errorMessage = <any>error);
                    },
                        error => this.errorMessage = <any>error);
            });
    }

    onTeamRetrieved(team: ITeam): void {
        if (this.teamForm) {
            this.teamForm.reset();
        }
        this.team = team;

        const selectedDivision = this.divisions.filter(function (element, index) {
            return (element.divisionId === team.division.divisionId);
        });
        this.team.division = selectedDivision[0];

        const selectedCoach = this.coaches.filter(function (element, index) {
            return (element.coachId === team.coach.coachId);
        });
        this.team.coach = selectedCoach[0];

        // Update the data on the form
        this.teamForm.patchValue({
            teamId: this.selectedId,
            teamName: this.team.teamName,
            teamNameShort: this.team.teamNameShort,
            cheerleaderImage: this.team.cheerleaderImage,
            coachImage: this.team.coachImage,
            headerImage: this.team.headerImage,
            division: this.team.division,
            coach: this.team.coach,
            logoImage: this.team.logoImage,
            hex: this.team.hex,
            r: this.team.r,
            g: this.team.g,
            b: this.team.b
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    save() {
        this.isRequesting = true;
        console.log(this.teamForm.value);
        this._teamService.updateTeam(this.teamForm.value).pipe(
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
                        this.snackBar.open('Team updated', '', config);
                    }
                    else if (this._userService.currentLanguage() === 'fi') {
                        this.snackBar.open('Joukkue päivitetty', '', config);
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
        this.teamForm.reset();
        this._router.navigate(['/Teams']);
    }

    onBack(): void {
        this._router.navigate(['/Teams']);
    }
}
