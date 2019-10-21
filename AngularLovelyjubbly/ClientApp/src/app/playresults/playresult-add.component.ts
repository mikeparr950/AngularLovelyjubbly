import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; /** Router used to route using code */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { finalize } from 'rxjs/operators';

import { PlayResult } from '../shared/models/playresult';
import { PlayResultService } from '../shared/services/playresult.service';
import { IFormation, Formation } from '../shared/models/formation';
import { FormationService } from '../shared/services/formation.service';
import { IOffensivePlay, OffensivePlay } from '../shared/models/offensiveplay';
import { OffensivePlayService } from '../shared/services/offensiveplay.service';
import { IDefensivePlay, DefensivePlay } from '../shared/models/defensiveplay';
import { DefensivePlayService } from '../shared/services/defensiveplay.service';
import { UserService } from '../shared/services/user.service';
import { LogService } from '../shared/utils/log.service';

import { NumberValidators } from '../shared/validators/number.validator';
import { FormatObject } from '@syncfusion/ej2-calendars';

@Component({
    templateUrl: '../playresults/playresult-add.component.html'
})

export class PlayResultAddComponent implements OnInit {
    playResultForm: FormGroup; /** root form group */
    playResult: PlayResult = new PlayResult(); /** data model */
    errorMessage: string;
    isRequesting: boolean;
    formations: IFormation[];
    offensivePlays: IOffensivePlay[];
    defensivePlays: IDefensivePlay[];

    color = 'primary';
    mode = 'indeterminate';
    spinnerValue = 0;

    constructor(private playResultService: PlayResultService, private router: Router, private fb: FormBuilder,
        public offensivePlayService: OffensivePlayService, public defensivePlayService: DefensivePlayService,
        public snackBar: MatSnackBar, public _userService: UserService, public formationService: FormationService, 
        private _logService: LogService) {
    }

    ngOnInit(): void {

        /** formBuilder creates a form model from configuration */
        this.playResultForm = this.fb.group({
            formation: ['', Validators.required],
            offensivePlay: ['', Validators.required],
            defensivePlay: ['', Validators.required], 
            yards: ['', [Validators.required, NumberValidators.range(-20, 100)]],
            isOffensivePenalty: [false],
            isDefensivePenalty: [false],
            isSack: [false],
            isFumble: [false],
            isInterception: [false],
            returnYards: ['0', [Validators.required, NumberValidators.range(0, 110)]],
        });

        this.formationService.getFormations()
            .subscribe(formations => {
                this.formations = new Array<Formation>();

                for (const f in formations) {
                    if (formations.hasOwnProperty(f)) {
                        this.formations.push(new Formation(formations[f].formationId, formations[f].formationName));
                    }
                }
            },
                error => this.errorMessage = <any>error);

        this.offensivePlayService.getOffensivePlays()
            .subscribe(offensivePlays => {
                this.offensivePlays = new Array<OffensivePlay>();

                for (const o in offensivePlays) {
                    if (offensivePlays.hasOwnProperty(o)) {
                        this.offensivePlays.push(new OffensivePlay(offensivePlays[o].offensivePlayId, offensivePlays[o].offensivePlayName));
                    }
                }
            },
                error => this.errorMessage = <any>error);

        this.defensivePlayService.getDefensivePlays()
            .subscribe(defensivePlays => {
                this.defensivePlays = new Array<DefensivePlay>();

                for (const d in defensivePlays) {
                    if (defensivePlays.hasOwnProperty(d)) {
                        this.defensivePlays.push(new DefensivePlay(defensivePlays[d].defensivePlayId, defensivePlays[d].defensivePlayName));
                    }
                }
            },
                error => this.errorMessage = <any>error);
    }

    save() {
        this.isRequesting = true;
        this._logService.logObject(this.playResultForm.value);
        this.playResultService.addPlayResult(this.playResultForm.value).pipe(
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

                    //if (this._userService.currentLanguage() === 'en') {
                        this.snackBar.open('Play Result added', '', config);
                    //}
                    //else if (this._userService.currentLanguage() === 'fi') {
                    //    this.snackBar.open('Peli lisätty', '', config);
                    //}

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
        this.playResultForm.reset();
        this.router.navigate(['/PlayResults']);
    }

    onBack(): void {
        this.router.navigate(['/PlayResults']);
    }
}
