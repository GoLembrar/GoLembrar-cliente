import { Route } from '@angular/router'
import { LayoutComponent } from './core/components/layout/layout.component'
import { authGuard } from './core/guards/auth/auth.guard'
import { NoConnectionComponent } from './core/pages/no-connection/no-connection.component'
import { LoginComponent } from './core/pages/user-account/login/login.component'
import { RegisterComponent } from './core/pages/user-account/register/register.component'

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/pages/reminders/reminders.routes').then(
            r => r.REMINDERS_ROUTES
          ),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./core/pages/contacts/contacts.routes').then(
            r => r.MY_CONTACTS_ROUTES
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./core/pages/user-account/profile/profile.component').then(
            c => c.ProfileComponent
          ),
      },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'no-connection', component: NoConnectionComponent },
  { path: '**', redirectTo: '' },
]
