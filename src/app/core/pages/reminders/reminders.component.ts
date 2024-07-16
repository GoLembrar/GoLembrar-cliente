import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'

import { AccordionModule } from 'primeng/accordion'
import { ConfirmationService, MenuItem } from 'primeng/api'
import { TabMenuModule } from 'primeng/tabmenu'
import { TagModule } from 'primeng/tag'

import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
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
    ButtonModule,
  ],
})
export class RemindersComponent {
  private reminderService = inject(ReminderService)
  private confirmationService = inject(ConfirmationService)
  private router = inject(Router)

  showDialog = true
  reminders = this.reminderService.findAll()

  items: MenuItem[] = [
    { label: 'Hoje' },
    { label: 'Agendados' },
    { label: 'Todos' },
  ]

  activeItem = this.items[0]

  onEdit(id: number) {
    this.router.navigateByUrl(`/edit/${id}`)
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      header: 'Excluir lembrete?',
      message: 'Deseja excluir esse lembrete?',
      accept: () => {
        console.log(id)
      },
    })
  }
}
