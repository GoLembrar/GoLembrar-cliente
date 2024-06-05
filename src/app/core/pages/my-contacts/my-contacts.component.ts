import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterModule } from '@angular/router'

import { MenuItem } from 'primeng/api'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { ChipModule } from 'primeng/chip'
import { TieredMenuModule } from 'primeng/tieredmenu'

import { Contact } from '../../models/contact'
import { ContactService } from '../../services/contact/contact.service'

@Component({
  selector: 'gl-my-contacts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ChipModule,
    ButtonModule,
    TieredMenuModule,
    AvatarModule,
  ],
  templateUrl: './my-contacts.component.html',
  styleUrl: './my-contacts.component.scss',
})
export class MyContactsComponent {
  constructor(private contactService: ContactService, private router: Router) {}

  myContacts$ = this.contactService.getContacts()

  editContact(contact: Contact) {
    this.router.navigateByUrl(`/my-contacts/contact/${contact.id}/edit`, {
      state: contact,
    })
  }

  avatarMenu: MenuItem[] = [
    {
      label: 'Email',
      icon: 'pi pi-envelope',
    },
    {
      label: 'Discord',
      icon: 'pi pi-discord',
      disabled: true,
    },
    {
      label: 'WhatsApp',
      icon: 'pi pi-whatsapp',
      disabled: true,
    },
    {
      label: 'Telegram',
      icon: 'pi pi-telegram',
      disabled: true,
    },
  ]
}
