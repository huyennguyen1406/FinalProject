import {FormGroup} from '@angular/forms';

// tslint:disable-next-line:typedef
export function ConfirmedValidator(newPassword: string, confirmPassword: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[newPassword];
    const matchingControl = formGroup.controls[confirmPassword];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
