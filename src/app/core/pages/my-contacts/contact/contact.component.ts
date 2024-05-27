import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { MenuItem, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { InputTextModule } from 'primeng/inputtext'
import { Contact } from 'src/app/core/models/contact'
import { AddContactService } from 'src/app/core/services/contact/contact.service'

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
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
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
    identify: [this.contact.identify],
  })

  edit() {
    this.contactService
      .editContact(this.indentifier.value as Contact, this.contact.id)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Contato atualizado',
          })
          this.router.navigate(['/my-contacts'])
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro ao editar contato',
          })
        },
      })
  }

  delete() {
    this.contactService.deleteContact(this.contact.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Contato excluido',
        })
        this.router.navigate(['/my-contacts'])
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Erro ao excluir contato',
        })
      },
    })
  }
}
