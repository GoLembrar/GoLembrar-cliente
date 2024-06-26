import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { MessageService } from 'primeng/api'
import { APP_ROUTES } from './app.routes'
import { authInterceptor } from './core/interceptors/auth/auth.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
    ]),
  ],
}
