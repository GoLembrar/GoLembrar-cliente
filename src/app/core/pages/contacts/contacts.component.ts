import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterModule } from '@angular/router'

import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { ChipModule } from 'primeng/chip'

import { MenuModule } from 'primeng/menu'
import { TitleComponent } from '../../components/title/title.component'
import { contactPlatforms } from '../../constants/contact-platforms'
import { ContactService } from '../../services/contact/contact.service'

@Component({
  selector: 'gl-my-contacts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ChipModule,
    ButtonModule,
    MenuModule,
    AvatarModule,
    TitleComponent,
  ],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {
  constructor(private contactService: ContactService, private router: Router) {}

  contacts$ = this.contactService.getContacts()

  platforms = contactPlatforms

  onEdit(id: string) {
    this.router.navigateByUrl(`contacts/edit/${id}`)
  }
}
