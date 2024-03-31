import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
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
import { User, UserLogin } from '../../models/user.model'
import { AuthService } from '../../services/auth.service'
import { LoadingService } from '../../services/loading.service'

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
export class LoginComponent implements OnInit {
  protected submitting = false

  protected account = this.formBuilder.group({
    email: ['', [V.required, V.email]],
    password: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.ifIsAuthLogin()
  }

  onSubmitForm() {
    if (this.account.valid) {
      this.submitting = true
      this.authService.login(this.account.value as UserLogin).subscribe({
        error: () => {
          this.submitting = false
        },
      })
    }
  }
}
