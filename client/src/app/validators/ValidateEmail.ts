import { AbstractControl } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { map } from "rxjs/operators";

export class ValidateEmail {
  static createValidator(registerService: RegisterService) {
    return (control: AbstractControl) => {
      return registerService.findByEmail(control.value).pipe(map(res => {

        if(res.length !== 0){
          return ({emailTaken: true});
        } else {
          return (null);
        }

      }));
    }
  }
}