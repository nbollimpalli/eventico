import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[validateMobile]',
  providers: [{provide: NG_VALIDATORS, useExisting: MobileValidatorDirective, multi: true}]
})
export class MobileValidatorDirective implements Validator{

   validate(c: FormControl): ValidationErrors {
     let len = 0;
     if(c.value)
     {
      len = c.value.length;
     }
     else
     {
      len = 0;
     }
     const isValidPhoneNumber =  (len == 10) ;
     const message = {
       'validateMobile': {
         'message': 'mobile number must have 10 digits'
       }
     };
     return isValidPhoneNumber ? null : message;
   }

}
