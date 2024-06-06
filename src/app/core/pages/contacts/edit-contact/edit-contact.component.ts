import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { InputTextModule } from 'primeng/inputtext'
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { contactPlatforms } from 'src/app/core/constants/contact-platforms'
import { Contact } from 'src/app/core/models/contact'
import { ContactService } from 'src/app/core/services/contact/contact.service'

@Component({
  selector: 'gl-contact',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    TitleComponent,
  ],
  templateUrl: './edit-contact.component.html',
})
export class EditContactComponent {
  contact = {} as Contact

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  platforms = contactPlatforms

  protected contactToEdit: FormGroup = this.formBuilder.group({
    name: ['', [V.required, V.min(2), V.max(255)]],
    platform: ['EMAIL', V.required],
    identify: ['', [V.required, V.email, V.min(2), V.max(255)]],
  })

  public edit(): void {
    // this.contactService
    //   .editContact(this.contactToEdit.value as Contact)
    //   .subscribe({
    //     next: (): void => {
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Success',
    //         detail: 'Contato atualizado',
    //       })
    //       this.router.navigate(['/my-contacts'])
    //     },
    //     error: (): void => {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: 'Erro ao editar contato',
    //       })
    //     },
    //   })
  }

  delete(): void {
    this.contactService.deleteContact(this.contact.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Contato excluído',
        })
        this.router.navigate(['/my-contacts'])
      },
      error: (): void => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Erro ao excluir contato',
        })
      },
    })
  }
}
