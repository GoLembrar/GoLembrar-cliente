import { FormGroup, ValidatorFn } from '@angular/forms'

export function inputInvalid(input: string, formGroup: FormGroup<any>) {
  return (
    formGroup.controls[input].invalid &&
    (formGroup.controls[input].dirty || formGroup.controls[input].touched)
  )
}

export function getInputError(
  input: string,
  error: string,
  formGroup: FormGroup<any>
) {
  formGroup.controls[input].hasError('')
  return formGroup.controls[input].hasError(error)
}

export function comparatePassword(formGroup: FormGroup): ValidatorFn {
  return () => {
    const password = formGroup.get('password')
    const newPassword = formGroup.get('newPassword')
    const confirmNewPassword = formGroup.get('confirmNewPassword')

    if (!password || !newPassword || !confirmNewPassword) return null

    const errors = {
      passwordMismatch:
        newPassword.value !== confirmNewPassword.value ? true : null,
      sameAsOldPassword: password.value === newPassword.value ? true : null,
    }

    confirmNewPassword.setErrors(
      errors.passwordMismatch ? { passwordMismatch: true } : null
    )
    newPassword.setErrors(
      errors.sameAsOldPassword ? { sameAsOldPassword: true } : null
    )

    return null
  }
}
