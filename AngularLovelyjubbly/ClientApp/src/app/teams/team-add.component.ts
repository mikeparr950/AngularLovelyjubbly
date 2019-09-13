import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; /** Router used to route using code */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { finalize } from 'rxjs/operators';

import { Team } from '../shared/models/team';
import { ICoach, Coach } from '../shared/models/coach';
import { CoachService } from '../shared/services/coach.service';
import { IDivision, Division } from '../shared/models/division';
import { DivisionService } from '../shared/services/division.service';
import { TeamService } from '../shared/services/team.service';
import { UserService } from '../shared/services/user.service';

import { NumberValidators } from '../shared/validators/number.validator';

@Component({
    templateUrl: '../teams/team-add.component.html'
})

export class TeamAddComponent implements OnInit {
    pageTitle = 'Team Add';
    teamForm: FormGroup; /** root form group */
    team: Team = new Team(); /** data model */
    errorMessage: string;
    isRequesting: boolean;
    coaches: ICoach[];
    divisions: IDivision[];

    color = 'primary';
    mode = 'indeterminate';
    spinnerValue = 0;

    constructor(private fb: FormBuilder, private _router: Router, public _coachService: CoachService,
        public _divisionService: DivisionService, public _teamService: TeamService, public snackBar: MatSnackBar,
        public _userService: UserService) {
    }

    ngOnInit(): void {

        /** formBuilder creates a form model from configuration */
        this.teamForm = this.fb.group({
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

        this._coachService.getCoaches()
            .subscribe(coaches => {
                this.coaches = new Array<Coach>();

                for (const c in coaches) {
                    if (coaches.hasOwnProperty(c)) {
                        this.coaches.push(new Coach(coaches[c].coachId, coaches[c].coachName, coaches[c].coachNameShort));
                    }
                }
            },
                error => this.errorMessage = <any>error);

        this._divisionService.getDivisions()
            .subscribe(divisions => {
                this.divisions = new Array<Division>();

                for (const d in divisions) {
                    if (divisions.hasOwnProperty(d)) {
                        this.divisions.push(new Division(divisions[d].divisionId, divisions[d].divisionName));
                    }
                }
            },
                error => this.errorMessage = <any>error);
    }

    save() {
        this.isRequesting = true;
        console.log(this.teamForm.value);
        this._teamService.addTeam(this.teamForm.value).pipe(
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
                        this.snackBar.open('Team added', '', config);
                    }
                    else if (this._userService.currentLanguage() === 'fi') {
                        this.snackBar.open('Joukkue lisätty', '', config);
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
        this.teamForm.reset();
        this._router.navigate(['/Teams']);
    }

    onBack(): void {
        this._router.navigate(['/Teams']);
    }
}
