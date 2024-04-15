import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms'
import { NodeService } from 'src/app/core/services/node.service'
import { TreeSelectModule } from 'primeng/treeselect'
import { CommonModule } from '@angular/common'
import { InputMaskModule } from 'primeng/inputmask'
import { Validators as V } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { REGEX_PHONE } from 'src/app/core/constants/regexp'
import { TreeNode } from 'primeng/api'

@Component({
  selector: 'gl-add-contact',
  standalone: true,
  imports: [
    CommonModule,
    TreeSelectModule,
    InputMaskModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './add-contact.component.html',
  providers: [NodeService],
})
export class AddContactComponent implements OnInit {
  nodes!: TreeNode[]

  formGroup!: FormGroup

  protected contact = this.formBuilder.group({
    name: ['', [V.required]],
    email: ['', [V.required, V.email]],
    platform: ['', [V.required]],
    phone: ['', [V.required, V.pattern(REGEX_PHONE)]],
  })

  inputInvalid(input: string) {
    return (
      this.contact.get(input)?.invalid &&
      (this.contact.get(input)?.dirty || this.contact.get(input)?.touched)
    )
  }

  getInputError(input: string, error: string) {
    return this.contact.get(input)?.hasError(error)
  }

  constructor(
    private nodeService: NodeService,
    private formBuilder: FormBuilder
  ) {
    this.nodeService.getFiles().then(files => (this.nodes = files))
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectedNodes: new FormControl(),
    })
  }
}
