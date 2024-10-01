import { Injectable } from '@angular/core'

import { ConfirmationService, MenuItem } from 'primeng/api'

import { AuthService } from '../../services/auth.service'

@Injectable()
export class LayoutService {
  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  avatarMenu: MenuItem[] = [
    {
      label: 'Meu perfil',
      icon: 'pi pi-user',
      routerLink: '/profile',
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.confirmationService.confirm({
          header: 'Sair da conta?',
          message: 'Deseja sair da sua conta?',
          accept: () => {
            this.authService.logout()
          },
        })
      },
    },
  ]
}
