import { Route } from '@angular/router'
import { AddContactComponent } from './add-contact/add-contact.component'
import { ContactsComponent } from './contacts.component'

export const MY_CONTACTS_ROUTES: Route[] = [
  { path: '', component: ContactsComponent },
  { path: 'add', component: AddContactComponent },
]
