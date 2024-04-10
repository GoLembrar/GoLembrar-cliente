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
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'gl-add-contact',
  standalone: true,
  imports: [
    CommonModule,
    TreeSelectModule,
    InputMaskModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './add-contact.component.html',
  providers: [NodeService],
})
export class AddContactComponent implements OnInit {
  nodes!: any[]

  formGroup!: FormGroup

  protected contact = this.formBuilder.group({
    name: ['', [V.required]],
    platform: ['', [V.required]],
    phone: ['', [V.required]],
  })

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
