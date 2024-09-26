import { CommonModule } from '@angular/common'
import { Component, signal } from '@angular/core'
import {
  FormControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { ChipModule } from 'primeng/chip'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { MenuModule } from 'primeng/menu'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { TagModule } from 'primeng/tag'

import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { debounceTime, distinctUntilChanged, filter } from 'rxjs'
import { TitleComponent } from '../../components/title/title.component'
import { contactChannels } from '../../constants/contact-channels'
import { REGEX_NAME } from '../../constants/regexp'
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
    CheckboxModule,
    TagModule,
    AvatarModule,
    TitleComponent,
    DialogModule,
    ProgressSpinnerModule,
    LoadingComponent,
    AutoCompleteModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
  ],
})
export class ContactsComponent {
  showEditContact = false
  loading = false
  channels = contactChannels
  searchValue = signal('')
  selectedChannels: string[] = ['EMAIL']

  allContacts = this.contactService.getContacts()
  contactToEdit = {} as Contact

  contactsSearch = this.contactService.search(this.searchValue())

  inputValue = new FormControl<string>('')

  constructor(
    private contactService: ContactService,
    private formBuilder: NonNullableFormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.inputValue.valueChanges
      .pipe(
        filter(searchValue => searchValue !== null),
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(searchValue => {
        this.searchValue.set(searchValue || '')
      })
  }

  protected contactToEditForm = this.formBuilder.group({
    name: ['', [V.required, V.pattern(REGEX_NAME)]],
    channel: [Channel.EMAIL],
    identify: ['', [V.required, V.email, V.min(4), V.max(255)]],
  })

  makeSearch() {
    const searchRes = this.contactsSearch

    if (searchRes && 'data' in searchRes) {
      console.log('request do search')

      return searchRes().data
    }

    console.log('returning all contacts')

    return this.allContacts().data
  }

  onEdit(contact: Contact) {
    this.showEditContact = true
    this.contactToEdit = contact

    this.contactToEditForm.patchValue({
      name: this.contactToEdit.name,
      identify: this.contactToEdit.identify,
    })
  }

  onSave() {
    if (!this.contactToEditForm.invalid && !this.contactToEditForm.pristine) {
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
                this.allContacts().refetch()
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
  }

  onDelete(id: string) {
    this.confirmationService.confirm({
      header: 'Apagar esse contato?',
      message: 'Não será possível desfazer essa ação.',
      accept: () => {
        this.contactService.delete(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Feito',
              detail: 'Contato foi apagado',
            })
            this.showEditContact = false
            this.loading = false
            this.allContacts().refetch()
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

  search(value: string) {
    return
  }
}
