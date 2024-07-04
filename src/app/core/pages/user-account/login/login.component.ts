import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { RouterModule } from '@angular/router'

import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'

import { MessageService } from 'primeng/api'
import { Subscription } from 'rxjs'
import { UserLogin } from 'src/app/core/models/user.model'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'gl-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  protected submitting = false
  private subscription = new Subscription()

  protected account = this.formBuilder.group({
    email: ['', [V.required, V.email, V.minLength(2), V.maxLength(60)]],
    password: ['', [V.required, V.minLength(6), V.maxLength(80)]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.authService.ifIsAuthLogin()
  }

  onSubmitForm() {
    if (this.account.valid) {
      this.submitting = true
      this.subscription = this.authService
        .login(this.account.value as UserLogin)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Fez login na conta',
            })
          },
          error: () => {
            this.submitting = false
          },
        })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
