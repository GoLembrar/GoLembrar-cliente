import { Injectable } from '@angular/core'

import { MenuItem } from 'primeng/api'

import { AuthService } from '../../services/auth.service'

@Injectable()
export class LayoutService {
  constructor(private authService: AuthService) {}

  avatarMenu: MenuItem[] = [
    {
      label: 'Meu perfil',
      icon: 'pi pi-user',
      routerLink: '/ajustes/meu-perfil',
    },
    {
      label: 'Ajustes',
      icon: 'pi pi-cog',
      routerLink: '/ajustes',
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.logout()
      },
    },
  ]
}
