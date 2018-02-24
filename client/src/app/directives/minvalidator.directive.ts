import { Directive, Input } from '@angular/core';
import {NG_VALIDATORS, FormControl, AbstractControl, ValidatorFn} from '@angular/forms';
import { TreeError } from '@angular/compiler';

let min=0;

function validatenumber() : ValidatorFn {
  return (c: AbstractControl) => {
    let isValid = c.value>=min;
    if(isValid) {
        return null;
    } else {
        return {
            minval: {
                valid: false
            }
        };
  }
}
}
@Directive({
  selector: '[minval][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinvalidatorDirective, multi: true }
  ]
})
export class MinvalidatorDirective {
  @Input('minval') set min(value: number){
    min=value;
  }

  validator: ValidatorFn;
  
  constructor() {
    this.validator = validatenumber();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
}