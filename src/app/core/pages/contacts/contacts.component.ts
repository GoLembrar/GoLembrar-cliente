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
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { ConfirmationService, MessageService } from 'primeng/api'
import { InputTextModule } from 'primeng/inputtext'
import { TitleComponent } from '../../components/title/title.component'
import { contactChannels } from '../../constants/contact-channels'
import { Contact, EditContact } from '../../models/contact'
import { Channel } from '../../models/enums/channels'
import { ContactService } from '../../services/contact/contact.service'
import { LoadingComponent } from './loading/loading.component'

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
    ProgressSpinnerModule,
    LoadingComponent,
  ],
})
export class ContactsComponent {
  showEditContact = false
  loading = false

  contactToEdit = {} as Contact

  contacts = this.contactService.getContacts()

  channels = contactChannels

  constructor(
    private contactService: ContactService,
    private formBuilder: NonNullableFormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  protected contactToEditForm = this.formBuilder.group({
    name: ['', [V.required, V.min(2), V.max(255)]],
    channel: [Channel.EMAIL],
    identify: ['', [V.required, V.email, V.min(2), V.max(255)]],
  })

  onEdit(contact: Contact) {
    this.showEditContact = true
    this.contactToEdit = contact

    this.contactToEditForm.patchValue({
      name: this.contactToEdit.name,
      identify: this.contactToEdit.identify,
    })
  }

  onSave() {
    this.confirmationService.confirm({
      header: 'Salvar edição?',
      message: 'Confirmar edição de contato?',
      accept: () => {
        if (
          this.contactToEdit.name ===
            this.contactToEditForm.controls.name.value &&
          this.contactToEdit.identify ===
            this.contactToEditForm.controls.identify.value
        ) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Contato foi atualizado',
          })
          this.showEditContact = false
          return
        }

        this.loading = true

        this.contactService
          .edit(
            this.contactToEditForm.value as EditContact,
            this.contactToEdit.id
          )
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Contato foi atualizado',
              })
              this.showEditContact = false
              this.loading = false
              this.contacts().refetch()
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao atualizar contato',
              })
              this.loading = false
            },
          })
      },
    })
  }

  onDelete() {
    console.log(this.contactToEdit)

    this.confirmationService.confirm({
      header: 'Apagar esse contato?',
      message: 'Não será possível desfazer essa ação.',
      accept: () => {
        this.contactService.delete(this.contactToEdit.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Feito',
              detail: 'Contato foi apagado',
            })
            this.showEditContact = false
            this.loading = false
            this.contacts().refetch()
          },
          error: () => {
            this.loading = false
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao apagar contato',
            })
          },
        })
      },
    })
  }
}
