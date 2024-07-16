import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { BackButtonComponent } from 'src/app/core/components/back-button/back-button.component'
import { TitleComponent } from 'src/app/core/components/title/title.component'

@Component({
  standalone: true,
  selector: 'gl-show-reminder',
  templateUrl: './show-reminder.component.html',
  imports: [CommonModule, BackButtonComponent, TitleComponent],
})
export class ShowReminderComponent {}
