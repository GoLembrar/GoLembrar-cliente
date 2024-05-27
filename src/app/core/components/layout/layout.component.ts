import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { fromEvent } from 'rxjs'

import { SidebarModule } from 'primeng/sidebar'
import { ButtonModule } from 'primeng/button'
import { AvatarModule } from 'primeng/avatar'
import { AvatarGroupModule } from 'primeng/avatargroup'
import { MenuModule } from 'primeng/menu'

import { LayoutService } from './layout.service'
import { NoConnectionService } from '../../services/no-connection/no-connection.service'

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
export class LayoutComponent implements OnInit {
  isSidebarOpen = false
  isMobile = false
  avatarMenu = this.layoutService.avatarMenu
  actionButtons = this.layoutService.actionsButtons

  constructor(
    private layoutService: LayoutService,
    private noConnectionService: NoConnectionService) {
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

  ngOnInit() {
    this.noConnectionService.isVerifyConnection()
  }

  onClickMenu() {
    if (this.isMobile) this.isSidebarOpen = false
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }
}
