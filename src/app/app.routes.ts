import { Route } from '@angular/router'
import { LoginComponent } from './core/pages/login/login.component'
import { RegisterComponent } from './core/pages/register/register.component'
import { HomeComponent } from './core/pages/home/home.component'
import { LayoutComponent } from './core/components/layout/layout.component'
import { authGuard } from './core/guards/auth/auth.guard'
import { MyContactsComponent } from './core/pages/home/my-contacts/my-contacts.component'

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [{ path: '', component: HomeComponent }],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'my-contacts', component: MyContactsComponent},
  { path: '**', redirectTo: '' },
]
