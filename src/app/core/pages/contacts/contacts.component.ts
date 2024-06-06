import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterModule } from '@angular/router'

import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { ChipModule } from 'primeng/chip'
import { DialogModule } from 'primeng/dialog'
import { MenuModule } from 'primeng/menu'

import { TitleComponent } from '../../components/title/title.component'
import { contactPlatforms } from '../../constants/contact-platforms'
import { ContactService } from '../../services/contact/contact.service'

@Component({
  standalone: true,
  selector: 'gl-my-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ChipModule,
    ButtonModule,
    MenuModule,
    AvatarModule,
    TitleComponent,
    DialogModule,
  ],
})
export class ContactsComponent {
  showEditContact = true

  contacts$ = this.contactService.getContacts()

  platforms = contactPlatforms

  constructor(private contactService: ContactService, private router: Router) {}

  onEdit(id: string) {
    // this.router.navigateByUrl(`contacts/edit/${id}`)
    this.showEditContact = true
  }
}
