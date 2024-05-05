import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MenuItem } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { InputTextModule } from 'primeng/inputtext'
import { Contact } from 'src/app/core/models/contact'
import { AddContactService } from 'src/app/core/services/add-contact/add-contact.service'

@Component({
  selector: 'gl-contact',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(
    private contactService: AddContactService,
    private formBuilder: FormBuilder
  ) {
    this.contact = history.state
  }

  contact: Contact = history.state

  platforms: MenuItem[] = [
    { name: 'Email', icon: 'pi pi-envelope' },
    { name: 'WhatsApp', icon: 'pi pi-whatsapp', disabled: true },
    { name: 'Discord', icon: 'pi pi-discord', disabled: true },
    { name: 'Telegram', icon: 'pi pi-telegram', disabled: true },
  ]

  protected indentifier: FormGroup = this.formBuilder.group({
    name: [this.contact.name],
    platform: ['Email'],
    identifiy: [this.contact.identifiy],
  })

  edit() {
    this.contactService
      .editContact(this.indentifier.value, this.contact.id)
      .subscribe({
        next: value => console.log(value),
        error: err => console.log(err),
      })
  }
}
