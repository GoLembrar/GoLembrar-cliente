import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Contact } from 'src/app/core/models/contact'

@Component({
  selector: 'gl-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contact: Contact

  constructor() {
    this.contact = history.state
  }
}
