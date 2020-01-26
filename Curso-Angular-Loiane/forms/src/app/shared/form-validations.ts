import { FormArray, FormControl } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      /*const values = formArray.controls;
      let totalCheck = 0;
      for(let i=0;i < values.length; i++) {
        if (values[i].value) {
          totalCheck += 1;
        }
      }*/
      const totalCheck = formArray.controls
          .map(v => v.value)
          .reduce((total, current) => current ? total + current : total, 0);
      return totalCheck >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if ( cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido : true };
    }
  }
}
