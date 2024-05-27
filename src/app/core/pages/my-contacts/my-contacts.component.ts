import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { ChipModule } from 'primeng/chip'
import { Contact } from '../../models/contact'
import { AddContactService } from '../../services/contact/contact.service'

@Component({
  selector: 'gl-my-contacts',
  standalone: true,
  imports: [CommonModule, RouterModule, ChipModule, ButtonModule],
  templateUrl: './my-contacts.component.html',
  styleUrl: './my-contacts.component.scss',
})
export class MyContactsComponent {
  constructor(
    private contactService: AddContactService,
    private router: Router
  ) {}

  myContacts$ = this.contactService.getContacts()

  addContact() {
    this.router.navigate(['/my-contacts/add'])
  }

  editContact(contact: Contact) {
    this.router.navigateByUrl(`/my-contacts/contact/${contact.id}/edit`, {
      state: contact,
    })
  }
}
