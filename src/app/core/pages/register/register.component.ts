import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
  ValidatorFn,
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { ToastModule } from 'primeng/toast'
import { REGEX_PASSWORD } from '../../constants/regexp'
import { authService } from '../../services/authService.service'
@Component({
  selector: 'gl-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private service: authService) {}

  user = this.formBuilder.group(
    {
      email: ['', [V.required, V.email]],
      password: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
      confirmPassword: ['', [V.required]],
    },
    {
      validator: this.comparatePassword(),
    }
  )

  comparatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password')
      const confirmPassword = control.get('confirmPassword')

      if (
        confirmPassword?.errors &&
        !confirmPassword.errors['passwordMismatch']
      ) {
        return null
      }

      if (
        password &&
        confirmPassword &&
        password.value !== confirmPassword.value
      ) {
        confirmPassword.setErrors({ passwordMismatch: true })
      } else {
        confirmPassword?.setErrors(null)
      }

      return null
    }
  }

  inputInvalid(input: string) {
    return (
      this.user.get(input)?.invalid &&
      (this.user.get(input)?.dirty || this.user.get(input)?.touched)
    )
  }

  getInputError(input: string, error: string) {
    return this.user.get(input)?.hasError(error)
  }

  getRequestError() {
    return this.service.messageError
  }

  postUser() {
    this.service.register({
      email: this.user.value.email,
      password: this.user.value.password,
    })
  }
}
