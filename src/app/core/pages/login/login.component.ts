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
import { User } from '../../models/user.model'
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
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.getIsAuth()) {
      this.router.navigate(['/'])
    }
  }

  user = this.formBuilder.group({
    email: ['', [V.required, V.email]],
    password: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
  })

  load = false
  loading = this.loadingService.loading$.subscribe(
    isLoading => (this.load = isLoading)
  )

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
    return this.authService.messageError
  }

  postUser() {
    const user: User = {
      email: this.user.value.email!,
      password: this.user.value.password!,
    }
    this.authService.login(user).subscribe({
      next: bearer => {
        this.authService.setTokenLocalStorage(bearer)
        this.authService.navigateHome()
        this.authService.loading(false)
      },
      error: err => {
        this.authService.loading(false)
        this.authService.handleError(err)
      },
    })
  }
}
