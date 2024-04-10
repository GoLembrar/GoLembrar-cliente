import { Route } from '@angular/router'
import { MyContactsComponent } from './my-contacts.component'
import { AddContactComponent } from './add-contact/add-contact.component'

export const MY_CONTACTS_ROUTES: Route[] = [
  { path: '', component: MyContactsComponent },
  { path: 'add', component: AddContactComponent },
]