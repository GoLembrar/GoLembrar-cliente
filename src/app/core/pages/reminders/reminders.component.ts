import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { TitleComponent } from '../../components/title/title.component'

@Component({
  standalone: true,
  selector: 'gl-reminders',
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss',
  imports: [CommonModule, TitleComponent],
})
export class RemindersComponent {}
