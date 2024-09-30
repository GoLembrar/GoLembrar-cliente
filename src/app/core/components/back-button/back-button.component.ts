import { CommonModule, Location } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { TooltipModule } from 'primeng/tooltip'

@Component({
  standalone: true,
  selector: 'gl-back-button',
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
  imports: [CommonModule, ButtonModule, TooltipModule],
})
export class BackButtonComponent {
  readonly location = inject(Location)

  goBack() {
    this.location.back()
  }
}
