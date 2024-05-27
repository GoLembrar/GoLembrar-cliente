import { Route } from '@angular/router'
import { AddContactComponent } from './add-contact/add-contact.component'
import { ContactComponent } from './contact/contact.component'
import { MyContactsComponent } from './my-contacts.component'

export const MY_CONTACTS_ROUTES: Route[] = [
  { path: '', component: MyContactsComponent },
  { path: 'add', component: AddContactComponent },
  { path: 'contact/:id/edit', component: ContactComponent },
]
