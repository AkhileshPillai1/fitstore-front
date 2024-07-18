import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[0-9]*$/.test(control.value);
      return valid ? null : { numeric: true };
    };
  }