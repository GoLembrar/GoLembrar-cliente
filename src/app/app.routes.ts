import { Route } from '@angular/router'
import { LoginComponent } from './core/pages/login/login.component'
import { RegisterComponent } from './core/pages/register/register.component'

export const APP_ROUTES: Route[] = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' },
]
