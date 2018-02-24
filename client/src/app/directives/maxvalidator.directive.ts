import { Directive, Input } from '@angular/core';
import {NG_VALIDATORS, FormControl, AbstractControl, ValidatorFn} from '@angular/forms';
import { TreeError } from '@angular/compiler';

let max=100;

function validatenumber() : ValidatorFn {
  return (c: AbstractControl) => {
    let isValid = c.value<=max;
    if(isValid) {
        return null;
    } else {
        return {
            maxval: {
                valid: false
            }
        };
  }
}
}
@Directive({
  selector: '[maxval][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MaxvalidatorDirective, multi: true }
  ]
})
export class MaxvalidatorDirective {
  @Input('maxval') set max(value: number){
    max=value;
  }

  validator: ValidatorFn;
  
  constructor() {
    this.validator = validatenumber();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
}