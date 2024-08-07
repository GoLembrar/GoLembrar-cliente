import { Route } from '@angular/router'
import { EditReminderComponent } from './children/edit-reminder/edit-reminder.component'
import { NewReminderComponent } from './children/new-reminder/new-reminder.component'
import { ShowReminderComponent } from './children/show-reminder/show-reminder.component'
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
    path: 'show/:id',
    component: ShowReminderComponent,
  },
  {
    path: 'edit/:id',
    component: EditReminderComponent,
  },
]
