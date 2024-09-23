import { CommonModule } from '@angular/common'
import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs'

import { ConfirmationService } from 'primeng/api'
import { AvatarModule } from 'primeng/avatar'
import { AvatarGroupModule } from 'primeng/avatargroup'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { MenuModule } from 'primeng/menu'
import { SidebarModule } from 'primeng/sidebar'

import {
  MOBILE_THRESHOLD,
  SIDEBAR_OPEN_THRESHOLD,
} from '../../constants/responsive'
import { AuthService } from '../../services/auth.service'
import { NoConnectionService } from '../../services/no-connection/no-connection.service'
import { NameAbbreviationPipe } from '../../utils/pipes/name-abbreviation/name-abbreviation.pipe'
import { LayoutService } from './layout.service'

@Component({
  standalone: true,
  selector: 'gl-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [ConfirmationService, LayoutService],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    ConfirmDialogModule,
    NameAbbreviationPipe,
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private noConnectionService = inject(NoConnectionService)
  private authService = inject(AuthService)
  private layoutService = inject(LayoutService)

  isSidebarOpen = false
  isMobile = false
  readonly avatarMenu = this.layoutService.avatarMenu
  readonly userInfo = this.authService.getUserInfo()
  private destroy$ = new Subject<void>()

  ngOnInit() {
    this.noConnectionService.isVerifyConnection()
    this.initializeLayout()
    this.setupResizeListener()
  }

  private initializeLayout() {
    const width = window.innerWidth
    this.isMobile = width < MOBILE_THRESHOLD
    this.isSidebarOpen = width >= SIDEBAR_OPEN_THRESHOLD
  }

  private setupResizeListener() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(170), takeUntil(this.destroy$))
      .subscribe(() => {
        this.handleResize()
      })
  }

  private handleResize() {
    const width = window.innerWidth

    this.isMobile = width < MOBILE_THRESHOLD

    if (this.isMobile) this.isSidebarOpen = false
    else if (!this.isMobile && !this.isMobile)
      this.isSidebarOpen = width >= SIDEBAR_OPEN_THRESHOLD
  }

  onClickMenuOption() {
    if (this.isMobile) this.isSidebarOpen = false
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
