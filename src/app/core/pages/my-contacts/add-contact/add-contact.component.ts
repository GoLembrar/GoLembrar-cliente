import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { MenuItem, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext'
import { TreeSelectModule } from 'primeng/treeselect'
import { Contact } from 'src/app/core/models/contact'
import { AddContactService } from 'src/app/core/services/contact/contact.service'

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
  ],
  templateUrl: './add-contact.component.html',
})
export class AddContactComponent {
  protected loading: boolean = false

  protected indentifier: FormGroup = this.formBuilder.group({
    name: ['', [V.required]],
    platform: ['', [V.required]],
    identify: ['', [V.required, V.email]],
  })

  platforms: MenuItem[] = [
    { name: 'Email', icon: 'pi pi-envelope' },
    { name: 'WhatsApp', icon: 'pi pi-whatsapp', disabled: true },
    { name: 'Discord', icon: 'pi pi-discord', disabled: true },
    { name: 'Telegram', icon: 'pi pi-telegram', disabled: true },
  ]

  inputInvalid(input: string) {
    return (
      this.indentifier.get(input)?.invalid &&
      (this.indentifier.get(input)?.dirty ||
        this.indentifier.get(input)?.touched)
    )
  }

  getInputError(input: string, error: string) {
    return this.indentifier.get(input)?.hasError(error)
  }

  onSubmit(): void {
    if (this.indentifier.valid) {
      this.loading = true
      this.contact.createContact(this.indentifier.value as Contact).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Contato adicionado',
          })
          this.indentifier.reset()
          this.loading = false
        },
        error: err => {
          this.loading = false
        },
      })
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private contact: AddContactService,
    private messageService: MessageService
  ) {}
}
