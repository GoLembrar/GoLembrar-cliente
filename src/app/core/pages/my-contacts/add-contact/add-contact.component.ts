import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { MenuItem } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext'
import { TreeSelectModule } from 'primeng/treeselect'
import { AddContactService } from 'src/app/core/services/add-contact/add-contact.service'

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
  protected indentifier: FormGroup = this.formBuilder.group({
    name: ['', [V.required]],
    platform: ['', [V.required]],
    identifiy: ['', [V.required]],
  })

  platforms: MenuItem[] = [
    { name: 'Email', icon: 'pi pi-envelope' },
    { name: 'WhatsApp', icon: 'pi pi-whatsapp', disabled: true },
    { name: 'Discord', icon: 'pi pi-discord', disabled: true },
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
    this.contact.createContact(this.indentifier.value).subscribe({
      next: value => {
        console.log(value)
      },
      error: err => {
        console.error(err)
      },
    })
  }

  constructor(
    private formBuilder: FormBuilder,
    private contact: AddContactService
  ) {}
}
