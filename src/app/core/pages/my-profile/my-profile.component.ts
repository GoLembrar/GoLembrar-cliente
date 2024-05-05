import { Component } from '@angular/core'
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
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'gl-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PhoneMaskDirective,
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent {
  public loading = false

  protected profile = this.formBuilder.group({
    email: ['', [V.required, V.email]],
    name: ['', [V.required]],
    phone: ['', [V.required, V.pattern(REGEX_PHONE)]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserInfo()
  }

  public handleSubmit() {}

  public goToChangePassword() {
    this.router.navigate(['../change-password'], { relativeTo: this.route })
  }

  public getUserInfo() {
    this.loading = true
    this.userService.getUserInfo().subscribe({
      next: user => {
        this.profile.patchValue(user)
        this.loading = false
      },
      error: err => {
        this.loading = false
        console.error(err)
      },
    })
  }
}
