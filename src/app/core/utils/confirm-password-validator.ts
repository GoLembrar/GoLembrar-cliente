import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const passwordConfirmationValidator: ValidatorFn = (
  control: AbstractControl<any, any>
): ValidationErrors | null => {
  const password =
    control.get('password')?.value || control.get('newPassword')?.value
  const confirmPassword = control.get('confirmPassword')?.value

  if (password && confirmPassword && password !== confirmPassword) {
    control.get('confirmPassword')?.setErrors({ passwordMismatch: true })
  } else {
    const { passwordMismatch, ...otherErrors } =
      control.get('confirmPassword')?.errors || {}

    control
      .get('confirmPassword')
      ?.setErrors(Object.keys(otherErrors).length !== 0 ? otherErrors : null)
  }

  return password && confirmPassword && password !== confirmPassword
    ? { passwordMismatch: true }
    : null
}
