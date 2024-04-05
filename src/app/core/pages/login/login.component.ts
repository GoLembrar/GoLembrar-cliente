import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'

import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { CardModule } from 'primeng/card'

import { REGEX_PASSWORD } from '../../constants/regexp'
import { UserLogin } from '../../models/user.model'
import { AuthService } from '../../services/auth.service'
import { Subscription } from 'rxjs'
import { MessageService } from 'primeng/api'

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
    email: ['', [V.required, V.email]],
    password: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
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
      this.authService.login(this.account.value as UserLogin).subscribe({
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
