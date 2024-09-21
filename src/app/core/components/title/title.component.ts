import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'gl-title',
  templateUrl: './title.component.html',
  styleUrl: 'title.component.scss',
})
export class TitleComponent {
  @Input() label1 = ''
  @Input() label2 = ''
}
