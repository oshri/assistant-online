import { FormControl, Validator } from '@angular/forms';

export class DocValidators{

  static matchName(name: string){
    return (control: FormControl) => {
      if (control.value && !control.value.match(name)) {
          return { matchName: true };
      } else {
        return null
      }
    };
  }

}

