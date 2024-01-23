import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideClientHydration(), provideRouter(APP_ROUTES),
    importProvidersFrom([
      BrowserModule, 
      BrowserAnimationsModule,
      HttpClientModule
    ])
  ],
}
