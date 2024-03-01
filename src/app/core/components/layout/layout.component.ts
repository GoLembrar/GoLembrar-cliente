import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  standalone: true,
  selector: 'gl-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [CommonModule, RouterModule],
})
export class LayoutComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout()
  }
}
