import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators as V,
  ValidatorFn,
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { REGEX_PASSWORD } from 'src/app/core/constants/regexp'
import { User } from 'src/app/core/models/user.model'
import { AuthService } from 'src/app/core/services/auth.service'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Subscription } from 'rxjs'
import { CardModule } from 'primeng/card'
import { InputMaskModule } from 'primeng/inputmask'

@Component({
  selector: 'gl-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    InputMaskModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  protected submitting = false

  private subscription = new Subscription()

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.ifIsAuthLogin()
  }

  protected account = this.formBuilder.group(
    {
      email: ['', [V.required, V.email]],
      password: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
      confirmPassword: ['', [V.required]],
      phone: ['', [V.required]],
    },
    {
      validators: this.comparatePassword(),
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
      this.account.get(input)?.invalid &&
      (this.account.get(input)?.dirty || this.account.get(input)?.touched)
    )
  }

  getInputError(input: string, error: string) {
    return this.account.get(input)?.hasError(error)
  }

  getRequestError(): string | null {
    return this.authService.messageError
  }

  postUser(): void {
    this.submitting = true
    this.account.controls.confirmPassword.disable()

    this.subscription = this.authService
      .register(this.account.value as User)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Cadastrado com sucesso',
            detail: 'Faça login na sua conta',
          })
          this.router.navigate(['/login'])
        },
        error: () => {
          this.submitting = false
          this.authService.loading(false)
          this.account.controls.confirmPassword.enable()
        },
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
