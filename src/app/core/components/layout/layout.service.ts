import { Injectable } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class LayoutService {
  constructor(private authService: AuthService) {}

  avatarMenu: MenuItem[] = [
    {
      label: 'Meu perfil',
      icon: 'pi pi-user',
      routerLink: '/settings/profile',
    },
    {
      label: 'Configurações',
      icon: 'pi pi-cog',
      routerLink: '/settings',
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
