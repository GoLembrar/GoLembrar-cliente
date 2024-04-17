import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Validators as V } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { passwordConfirmationValidator } from '../../utils'
import { ActivatedRoute, Router } from '@angular/router'
import { REGEX_PASSWORD } from '../../constants'

@Component({
  selector: 'gl-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  protected password: FormGroup = {} as FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.password = this.formBuilder.group(
      {
        currentPassword: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
        newPassword: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
        confirmPassword: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
      },
      { validator: passwordConfirmationValidator } as AbstractControlOptions
    )
  }

  public goBack() {
    this.router.navigate(['../my-profile'], { relativeTo: this.route })
  }
}
