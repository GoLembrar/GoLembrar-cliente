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
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { ToastModule } from 'primeng/toast'
import { REGEX_PASSWORD, REGEX_PHONE } from '../../constants/regexp'
import { User } from '../../models/user.model'
import { AuthService } from '../../services/auth.service'
import { LoadingService } from '../../services/loading.service'
import { RouterModule } from '@angular/router'
@Component({
  selector: 'gl-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
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
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {}

  user = this.formBuilder.group(
    {
      email: ['', [V.required, V.email]],
      password: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
      confirmPassword: ['', [V.required]],
      phone: ['', [V.required, V.pattern(REGEX_PHONE)]],
    },
    {
      validator: this.comparatePassword(),
    }
  )

  load = false
  loading = this.loadingService.loading$.subscribe(
    isLoading => (this.load = isLoading)
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

  getRequestError(): string | null {
    return this.authService.messageError
  }

  postUser(): void {
    const user: User = {
      email: this.user.value.email!,
      password: this.user.value.password!,
      phone: this.user.value.phone!,
    }
    this.authService.register(user).subscribe({
      next: success => {
        this.messageService.add({
          severity: 'success',
          summary: 'Cadastro realizado com sucesso',
          detail: 'Via MessageService',
        })
        this.authService.navigateLogin()
        this.loadingService.setLoading(false)
      },
      error: err => {
        this.authService.loading(false)
        this.authService.handleError(err)
      },
    })
  }
}
