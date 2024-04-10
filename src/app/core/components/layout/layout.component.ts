import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { fromEvent } from 'rxjs'

import { SidebarModule } from 'primeng/sidebar'
import { ButtonModule } from 'primeng/button'
import { AvatarModule } from 'primeng/avatar'
import { AvatarGroupModule } from 'primeng/avatargroup'
import { MenuModule } from 'primeng/menu'

import { AuthService } from '../../services/auth.service'
import { LayoutService } from './layout.service'

@Component({
  standalone: true,
  selector: 'gl-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [LayoutService],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
  ],
})
export class LayoutComponent {
  isSidebarOpen = false
  isMobile = false
  avatarMenu = this.layoutService.avatarMenu
  actionButtons = this.layoutService.actionsButtons

  constructor(private layoutService: LayoutService, private router: Router) {
    if (window.innerWidth > 768) {
      this.isSidebarOpen = true
    } else {
      this.isMobile = true
    }

    fromEvent(window, 'resize').subscribe({
      next: () => {
        if (window.innerWidth < 768) {
          this.isMobile = true
          this.isSidebarOpen = false
        } else {
          this.isMobile = false
          this.isSidebarOpen = true
        }
      },
    })
  }
  onClickMenu() {
    if (this.isMobile) this.isSidebarOpen = false
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }
}
