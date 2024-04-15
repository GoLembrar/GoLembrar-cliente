import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V
} from '@angular/forms'
import { MenuItem } from 'primeng/api'
import { DropdownModule } from 'primeng/dropdown'
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext'
import { TreeSelectModule } from 'primeng/treeselect'
import { REGEX_PHONE } from 'src/app/core/constants/regexp'

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
  ],
  templateUrl: './add-contact.component.html',
})
export class AddContactComponent {
  protected indentifier: FormGroup = this.formBuilder.group({
    name: ['', [V.required]],
    platform: ['', [V.required]],
    email: ['', [V.required, V.email]],
    phone: ['', [V.required, V.pattern(REGEX_PHONE)]],
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

  constructor(private formBuilder: FormBuilder) {}
}
