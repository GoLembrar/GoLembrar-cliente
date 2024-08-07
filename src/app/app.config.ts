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
import { provideQueryDevTools } from '@ngneat/query-devtools'
import { MessageService } from 'primeng/api'

import { environment } from 'src/environments/environment.development'
import { APP_ROUTES } from './app.routes'
import { authInterceptor } from './core/interceptors/auth/auth.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    environment.production ? [] : provideQueryDevTools(),
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
