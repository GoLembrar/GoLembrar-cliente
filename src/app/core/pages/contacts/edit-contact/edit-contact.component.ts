import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { InputTextModule } from 'primeng/inputtext'
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
  ],
  templateUrl: './edit-contact.component.html',
})
export class EditContactComponent implements OnInit {
  contact = {} as Contact

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contact = history.state
  }

  platforms = contactPlatforms

  protected indentifier: FormGroup = this.formBuilder.group({
    name: [this.contact.name],
    platform: ['Email'],
    identify: [this.contact.identify],
  })

  public edit(): void {
    this.contactService
      .editContact(this.indentifier.value as Contact, this.contact.id)
      .subscribe({
        next: (): void => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Contato atualizado',
          })
          this.router.navigate(['/my-contacts'])
        },
        error: (): void => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro ao editar contato',
          })
        },
      })
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
