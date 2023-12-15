import { Route } from '@angular/router'
import { RegisterComponent } from './core/pages/register/register.component'

export const APP_ROUTES: Route[] = [
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
]
