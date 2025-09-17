import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withJsonpSupport, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Interceptors
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

// Environment
import { environment } from '../environments/environment';

// Routes
import { routes } from './app.routes';

// Base application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    // Router configuration
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated(transitionInfo) {
          console.log('View transition started:', transitionInfo);
        },
      })
    ),
    
    // HTTP client configuration
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withJsonpSupport()
    ),
    
    // HTTP interceptors
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    
    // Client hydration for SSR
    provideClientHydration(
      withNoHttpTransferCache()
    ),
    
    // Browser animations
    provideAnimations(),
    
    // Form modules
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule
    ),
    
    // Environment-specific providers
    ...(environment.production ? [
      // Production-specific providers go here
    ] : [
      // Development-specific providers go here
    ])
  ]
};
