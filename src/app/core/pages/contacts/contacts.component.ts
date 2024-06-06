import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { RouterModule } from '@angular/router'

import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { ChipModule } from 'primeng/chip'
import { DialogModule } from 'primeng/dialog'
import { MenuModule } from 'primeng/menu'

import { InputTextModule } from 'primeng/inputtext'
import { TitleComponent } from '../../components/title/title.component'
import { contactPlatforms } from '../../constants/contact-platforms'
import { Contact } from '../../models/contact'
import { ContactService } from '../../services/contact/contact.service'

@Component({
  standalone: true,
  selector: 'gl-my-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChipModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    AvatarModule,
    TitleComponent,
    DialogModule,
  ],
})
export class ContactsComponent {
  showEditContact = false
  savingEdition = false

  contactToEdit = {} as Contact

  contacts$ = this.contactService.getContacts()

  platforms = contactPlatforms

  constructor(
    private contactService: ContactService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  protected contactToEditForm = this.formBuilder.group({
    name: ['', [V.required, V.min(2), V.max(255)]],
    identify: ['', [V.required, V.email, V.min(2), V.max(255)]],
  })

  onEdit(contact: Contact) {
    this.showEditContact = true
    this.contactToEdit = contact

    this.contactToEditForm.setValue({
      name: this.contactToEdit.name,
      identify: this.contactToEdit.identify,
    })
  }
  onSaveEdition() {
    console.log(this.contactToEdit)
    this.showEditContact = false
  }
}
