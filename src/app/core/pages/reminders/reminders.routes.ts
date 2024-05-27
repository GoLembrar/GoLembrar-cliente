import { Route } from '@angular/router'
import { RemindersComponent } from './reminders.component'
import { NewReminderComponent } from './children/new-reminder/new-reminder.component'

export const REMINDERS_ROUTES: Route[] = [
  {
    path: '',
    component: RemindersComponent,
  },
  {
    path: 'new',
    component: NewReminderComponent,
  },
]
