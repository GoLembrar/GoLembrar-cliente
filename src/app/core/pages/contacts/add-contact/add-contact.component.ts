import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { MessageService } from 'primeng/api'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext'
import { TreeSelectModule } from 'primeng/treeselect'
import { BackButtonComponent } from 'src/app/core/components/back-button/back-button.component'
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { contactChannels } from 'src/app/core/constants/contact-channels'
import { REGEX_EMAIL, REGEX_NAME } from 'src/app/core/constants/regexp'
import { Contact } from 'src/app/core/models/contact'
import { Channel } from 'src/app/core/models/enums/channels'
import { ContactService } from 'src/app/core/services/contact/contact.service'
import { getInputError, inputInvalid } from 'src/app/core/utils/input'

@Component({
  selector: 'gl-profile',
  standalone: true,
  imports: [
    CommonModule,
    TreeSelectModule,
    InputMaskModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TitleComponent,
    AvatarModule,
    BackButtonComponent,
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent {
  protected loading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  protected newContact = this.formBuilder.group({
    name: ['', [V.required, V.pattern(REGEX_NAME)]],
    channel: [Channel.EMAIL, [V.required]],
    identify: ['', [V.required, V.pattern(REGEX_EMAIL)]],
  })

  channels = contactChannels

  inputInvalid(input: string): boolean {
    return inputInvalid(input, this.newContact)
  }
  getInputError(input: string, error: string): boolean {
    return getInputError(input, error, this.newContact)
  }

  onSubmit(): void {
    this.loading = true
    this.contactService
      .createContact(this.newContact.value as Contact)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Contato adicionado',
          })
          this.newContact.reset()
          this.newContact.controls.channel.setValue(Channel.EMAIL)
          this.loading = false
        },
        error: () => {
          this.loading = false
        },
      })
  }
}
