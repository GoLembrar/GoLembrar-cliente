import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'

import { AccordionModule } from 'primeng/accordion'
import { MenuItem } from 'primeng/api'
import { TabMenuModule } from 'primeng/tabmenu'
import { TagModule } from 'primeng/tag'

import { TitleComponent } from '../../components/title/title.component'
import { ReminderService } from '../../services/reminder/reminder.service'
@Component({
  standalone: true,
  selector: 'gl-reminders',
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss',
  imports: [
    CommonModule,
    TitleComponent,
    TabMenuModule,
    AccordionModule,
    TagModule,
  ],
})
export class RemindersComponent {
  private reminderService = inject(ReminderService)

  reminders = this.reminderService.findAll()

  items: MenuItem[] = [
    { label: 'Hoje' },
    { label: 'Agendados' },
    { label: 'Todos' },
  ]

  activeItem = this.items[0]
}
