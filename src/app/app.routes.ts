import { Route } from '@angular/router'
import { LayoutComponent } from './core/components/layout/layout.component'
import { authGuard } from './core/guards/auth/auth.guard'
import { HomeComponent } from './core/pages/home/home.component'
import { NoConnectionComponent } from './core/pages/no-connection/no-connection.component'
import { LoginComponent } from './core/pages/user-account/login/login.component'
import { RegisterComponent } from './core/pages/user-account/register/register.component'

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'my-contacts',
        loadChildren: () =>
          import('./core/pages/my-contacts/my-contacts.routes').then(
            r => r.MY_CONTACTS_ROUTES
          ),
      },
      {
        path: 'reminders',
        loadChildren: () =>
          import('./core/pages/reminders/reminders.routes').then(
            r => r.REMINDERS_ROUTES
          ),
      },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'no-connection', component: NoConnectionComponent },
  { path: '**', redirectTo: '' },
]
