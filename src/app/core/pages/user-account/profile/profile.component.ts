import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { Router } from '@angular/router'

import { ConfirmationService, MessageService } from 'primeng/api'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext'
import { TreeSelectModule } from 'primeng/treeselect'

import { DialogModule } from 'primeng/dialog'
import { PasswordModule } from 'primeng/password'
import { BackButtonComponent } from 'src/app/core/components/back-button/back-button.component'
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { REGEX_PASSWORD } from '../../../constants/regexp'
import { UserEdit } from '../../../models/user.model'
import { AuthService } from '../../../services/auth.service'
import { UserService } from '../../../services/user/user.service'
import {
  comparatePassword,
  getInputError,
  inputInvalid,
} from '../../../utils/input'
import { markFormGroupTouched } from '../../../utils/validators'

@Component({
  selector: 'gl-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    CommonModule,
    TreeSelectModule,
    InputMaskModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TitleComponent,
    AvatarModule,
    BackButtonComponent,
    DialogModule,
    PasswordModule,
  ],
})
export class ProfileComponent {
  protected loading: boolean = false
  showDialog = false

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.authService.getUserInfo().subscribe({
      next: res => {
        this.updateProfile.patchValue({
          name: res.name,
          email: res.email,
        })
      },
    })

    this.updatePassword.setValidators(comparatePassword(this.updatePassword))
  }

  protected updateProfile = this.formBuilder.group({
    name: ['', [V.required]],
    email: ['', [V.required, V.email]],
  })

  protected updatePassword = this.formBuilder.group({
    password: ['', [V.required, V.minLength(8)]],
    newPassword: ['', [V.required, V.pattern(REGEX_PASSWORD)]],
    confirmNewPassword: ['', [V.required]],
  })

  inputInvalid(input: string) {
    return inputInvalid(input, this.updatePassword)
  }

  getInputError(input: string, error: string) {
    return getInputError(input, error, this.updatePassword)
  }

  onUpdateProfile() {
    if (this.updateProfile.invalid)
      return markFormGroupTouched(this.updateProfile)

    this.confirmationService.confirm({
      header: 'Salvar edição?',
      message: 'Confirmar edição do perfil?',
      accept: () => {
        this.userService
          .updateProfile(this.updateProfile.value as UserEdit)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Perfil foi atualizado',
              })
              this.router.navigateByUrl('').then(() => location.reload())
            },
          })
      },
    })
  }

  onUpdatePassword() {
    if (this.updatePassword.invalid)
      return markFormGroupTouched(this.updatePassword)

    this.confirmationService.confirm({
      header: 'Salvar edição?',
      message: 'Confirmar troca de senha?',
      accept: () => {
        this.userService
          .updatePassword({
            password: this.updatePassword.controls.password.value,
            newPassword: this.updatePassword.controls.newPassword.value,
          })
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Senha trocada',
              })
              this.authService.logout()
            },
            error: () => {
              console.log()
            },
          })
      },
    })
  }
}
