import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators as V } from '@angular/forms'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext'
import { TreeSelectModule } from 'primeng/treeselect'
import { BackButtonComponent } from 'src/app/core/components/back-button/back-button.component'
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { AuthService } from '../../../services/auth.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { UserService } from '../../../services/user/user.service'
import { UserEdit } from '../../../models/user.model'
import { Router } from '@angular/router'

@Component({
  selector: 'gl-profile',
  standalone: true,
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
    BackButtonComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected loading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.authService.getUserInfo().subscribe(({
      next: res => {
        this.profile.patchValue({
          name: res.name,
          email: res.email
        })
      }
    }))
  }

  protected profile = this.formBuilder.group({
    name: ['', [V.required]],
    email: ['', [V.required]]
  })

  onSubmit() {
    this.confirmationService.confirm({
      header: 'Salvar edição?',
      message: 'Confirmar edição do perfil?',
      accept: () => {
        this.userService.updateProfile(this.profile.value as UserEdit).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Perfil foi atualizado'
            })
            this.router.navigateByUrl('').then(() => location.reload())
          }
        })
      }
    })
  }
}
