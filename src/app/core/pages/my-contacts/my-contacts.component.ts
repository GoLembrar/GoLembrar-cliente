import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'gl-my-contacts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-contacts.component.html',
  styleUrl: './my-contacts.component.scss',
})
export class MyContactsComponent {
  constructor() {}
}
