import { CommonModule, Location } from '@angular/common'
import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { TooltipModule } from 'primeng/tooltip'

@Component({
  standalone: true,
  selector: 'gl-back-button',
  templateUrl: './back-button.component.html',
  imports: [CommonModule, ButtonModule, TooltipModule],
})
export class BackButtonComponent {
  constructor(public location: Location) {}
}
