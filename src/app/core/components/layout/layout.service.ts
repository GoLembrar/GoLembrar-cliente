import { Injectable } from '@angular/core'

import { MenuItem } from 'primeng/api'

import { AuthService } from '../../services/auth.service'
import { Layout } from '../../models/layout'

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
      label: 'Configurações',
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
  actionsButtons: Layout[] = [
    {
      label: 'Hoje',
      icon: ' pi pi-calendar',
      outlined: true,
      severity: 'warning',
    },
    {
      label: 'Todos',
      icon: ' pi pi-inbox',
      outlined: true,
      severity: 'secondary',
    },
    {
      label: 'Agendados',
      icon: ' pi pi-clock',
      outlined: false,
      severity: 'danger',
    },
    {
      label: 'Novo',
      icon: ' pi pi-plus-circle',
      outlined: false,
      severity: 'success',
    },
  ]
}
