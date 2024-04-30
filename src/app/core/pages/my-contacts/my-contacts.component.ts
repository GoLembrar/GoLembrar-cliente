import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { ChipModule } from 'primeng/chip'
import { Contact } from '../../models/contact'
import { AddContactService } from '../../services/add-contact/add-contact.service'

@Component({
  selector: 'gl-my-contacts',
  standalone: true,
  imports: [CommonModule, RouterModule, ChipModule, ButtonModule],
  templateUrl: './my-contacts.component.html',
  styleUrl: './my-contacts.component.scss',
})
export class MyContactsComponent implements OnInit {
  constructor(
    private contactService: AddContactService,
    private router: Router
  ) {}

  myContacts: Contact[] = []

  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: value => (this.myContacts = value),
      error: err => console.log(err),
    })
  }

  editContact(contact: Contact) {
    this.router.navigateByUrl(`/my-contacts/contact/${contact.id}/edit`, {
      state: contact,
    })
  }
}
