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
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { contactPlatforms } from 'src/app/core/constants/contact-platforms'
import { Contact } from 'src/app/core/models/contact'
import { ContactService } from 'src/app/core/services/contact/contact.service'
import { getInputError, inputInvalid } from 'src/app/core/utils/input'

@Component({
  selector: 'gl-add-contact',
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

  protected contact = this.formBuilder.group({
    name: ['', [V.required]],
    platform: ['EMAIL', [V.required]],
    identify: ['', [V.required, V.email]],
  })

  platforms = contactPlatforms

  inputInvalid(input: string): boolean {
    return inputInvalid(input, this.contact)
  }
  getInputError(input: string, error: string): boolean {
    return getInputError(input, error, this.contact)
  }

  onSubmit(): void {
    if (this.contact.valid) {
      this.loading = true
      this.contactService
        .createContact(this.contact.value as Contact)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Contato adicionado',
            })
            this.contact.reset()
            this.loading = false
          },
          error: () => {
            this.loading = false
          },
        })
    }
  }
}
