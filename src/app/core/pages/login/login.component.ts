import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators as V } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { REGEX_PASSWORD } from '../../constants/regexp'

@Component({
  selector: 'gl-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user = this.formBuilder.group({
    email: ['', [V.required, V.email]],
    password: ['', [V.required, V.pattern(REGEX_PASSWORD)]]
  })

  inputInvalid(input: string) {
    return this.user.get(input)?.invalid && (this.user.get(input)?.dirty || this.user.get(input)?.touched)
  }

  getInputError(input: string, error: string) {
    return this.user.get(input)?.hasError(error)
  }

  constructor(private formBuilder: FormBuilder){}
}
