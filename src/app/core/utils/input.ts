import { FormGroup } from '@angular/forms'

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
  return formGroup.controls[input].hasError(error)
}
