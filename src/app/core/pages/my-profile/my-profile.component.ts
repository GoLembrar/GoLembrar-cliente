import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { REGEX_PHONE } from '../../constants'
import { PhoneMaskDirective } from '../../directives'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

@Component({
  selector: 'gl-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PhoneMaskDirective,
    NgxMaskDirective,
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
  providers: [provideNgxMask({})],
})
export class MyProfileComponent {
  public loading = false

  protected profile = this.formBuilder.group({
    email: ['', [V.required, V.email]],
    nome: ['', [V.required]],
    telefone: ['', [V.required, V.pattern(REGEX_PHONE)]],
  })

  constructor(private formBuilder: FormBuilder) {}

  public handleSubmit() {
    console.log(this.profile.value.telefone)
  }
}
