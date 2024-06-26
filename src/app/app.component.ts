import { CommonModule, registerLocaleData } from '@angular/common'
import localePt from '@angular/common/locales/pt'
import { Component, Inject, LOCALE_ID, PLATFORM_ID } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ToastModule } from 'primeng/toast'

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, ToastModule],
  selector: 'gl-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' }],
})
export class AppComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.platformId = platformId
    registerLocaleData(localePt)
  }
}
