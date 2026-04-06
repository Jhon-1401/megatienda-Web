import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {providePrimeNG} from 'primeng/config';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/Nora';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Nora, // aquí seleccionas Lara
        options: {
          darkModeSelector: '.app-dark' // opcional
        }
      }
    })
// 👈 ESTA LÍNEA SOLUCIONA TODO
  ]
};
