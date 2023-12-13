import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
@Component({
  selector: 'gl-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  user = this.formBuilder.nonNullable.group({
    email: ['', [V.required, V.email]],
    password: ['', [V.required, V.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$')]],
  })

  onSubmit() {
    if (this.user.valid) {
      console.log(this.user.value)
    } else {
      console.log('Preencha um valor válido!')
    }
  }

  constructor(private formBuilder: FormBuilder) {}
}
