import { Route } from '@angular/router'
import { NewReminderComponent } from './children/new-reminder/new-reminder.component'
import { EditReminderComponent } from './edit-reminder/edit-reminder.component'
import { RemindersComponent } from './reminders.component'

export const REMINDERS_ROUTES: Route[] = [
  {
    path: '',
    component: RemindersComponent,
  },
  {
    path: 'new',
    component: NewReminderComponent,
  },
  {
    path: 'edit/:id',
    component: EditReminderComponent,
  },
]
