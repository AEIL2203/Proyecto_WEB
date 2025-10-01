import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// Configuración para comunicación con la API
import { provideClientHydration } from '@angular/platform-browser';

// Cliente HTTP con interceptor de autenticación
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';

// Soporte para animaciones
import { provideAnimations } from '@angular/platform-browser/animations';

// Módulo de formularios
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    importProvidersFrom(FormsModule),
  ],
};
