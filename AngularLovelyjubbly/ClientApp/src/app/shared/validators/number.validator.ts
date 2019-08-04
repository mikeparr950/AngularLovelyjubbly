import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

    /** if values are params (eg min and max), return validator function */
    /** wrap validation function in factory function */
    static range(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': true };
            }
            return null;
        };
    }
}