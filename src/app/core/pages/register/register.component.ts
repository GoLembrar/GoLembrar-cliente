import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators as V } from '@angular/forms';

@Component({
  selector: 'gl-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  user = this.formBuilder.nonNullable.group({
    email: [null, [V.required, V.email]],
    password: [
      null,
      [V.required, V.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$')],
    ],
  })

  onSubmit() {
    if (this.user.valid) {
      console.log(this.user.value);
    } else {
      console.log('Preencha um valor válido!');
    }
  }

  constructor(private formBuilder: FormBuilder) {}
}
