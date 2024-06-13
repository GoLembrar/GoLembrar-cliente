import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { fromEvent } from 'rxjs'

import { ConfirmationService } from 'primeng/api'
import { AvatarModule } from 'primeng/avatar'
import { AvatarGroupModule } from 'primeng/avatargroup'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { MenuModule } from 'primeng/menu'
import { SidebarModule } from 'primeng/sidebar'

import { NoConnectionService } from '../../services/no-connection/no-connection.service'
import { LayoutService } from './layout.service'

@Component({
  standalone: true,
  selector: 'gl-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [LayoutService, ConfirmationService],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    ConfirmDialogModule,
  ],
})
export class LayoutComponent implements OnInit {
  isSidebarOpen = false
  isMobile = false
  avatarMenu = this.layoutService.avatarMenu

  constructor(
    private layoutService: LayoutService,
    private noConnectionService: NoConnectionService
  ) {
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

  onClickMenuOption() {
    if (this.isMobile) this.isSidebarOpen = false
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }
}
