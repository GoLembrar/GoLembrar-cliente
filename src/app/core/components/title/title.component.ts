import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  selector: 'gl-title',
  templateUrl: './title.component.html',
  imports: [CommonModule],
})
export class TitleComponent {
  @Input() label1 = ''
  @Input() label2 = ''
}
