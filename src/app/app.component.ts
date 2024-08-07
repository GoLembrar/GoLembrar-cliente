import { CommonModule, registerLocaleData } from '@angular/common'
import localePt from '@angular/common/locales/pt'
import { Component, LOCALE_ID } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ToastModule } from 'primeng/toast'

@Component({
  standalone: true,
  selector: 'gl-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' }],
  imports: [RouterModule, CommonModule, ToastModule],
})
export class AppComponent {
  constructor() {
    registerLocaleData(localePt)
  }
}
