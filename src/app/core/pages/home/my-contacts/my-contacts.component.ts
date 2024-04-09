import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'gl-my-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-contacts.component.html',
  styleUrl: './my-contacts.component.scss',
})
export class MyContactsComponent {
  constructor() {}
}
