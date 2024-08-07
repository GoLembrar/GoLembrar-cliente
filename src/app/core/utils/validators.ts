import { FormGroup } from '@angular/forms'

export function markFormGroupTouched(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.controls[key]
    if (control instanceof FormGroup) {
      markFormGroupTouched(control)
    } else {
      control.markAsDirty()
    }
  })
}