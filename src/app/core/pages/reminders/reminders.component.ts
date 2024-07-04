import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

import { AccordionModule } from 'primeng/accordion'
import { MenuItem } from 'primeng/api'
import { TabMenuModule } from 'primeng/tabmenu'

import { TitleComponent } from '../../components/title/title.component'
@Component({
  standalone: true,
  selector: 'gl-reminders',
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss',
  imports: [CommonModule, TitleComponent, TabMenuModule, AccordionModule],
})
export class RemindersComponent {
  items: MenuItem[] = [
    { label: 'Hoje' },
    { label: 'Agendados' },
    { label: 'Todos' },
  ]

  activeItem = this.items[0]
}
