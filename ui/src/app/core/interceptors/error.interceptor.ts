import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ha ocurrido un error inesperado';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = this.handleBadRequest(error);
              break;
            case 401:
              return this.handleUnauthorized(error);
            case 403:
              return this.handleForbidden(error);
            case 404:
              errorMessage = 'Recurso no encontrado';
              this.router.navigate(['/not-found']);
              break;
            case 500:
              errorMessage = 'Error interno del servidor';
              break;
            case 0:
              errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
              break;
          }
        }

        // Log error to console in development
        if (!environment.production) {
          console.error('HTTP Error:', error);
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  private handleBadRequest(error: HttpErrorResponse): string {
    if (error.error?.errors) {
      // Handle validation errors
      const messages = [];
      for (const key in error.error.errors) {
        if (error.error.errors[key]) {
          messages.push(...error.error.errors[key]);
        }
      }
      return messages.join(' ');
    }
    
    return error.error?.message || 'Solicitud incorrecta';
  }

  private handleUnauthorized(error: HttpErrorResponse) {
    // Auto logout if 401 response returned from API
    this.authService.logout();
    
    // Redirect to login page with the return url
    const returnUrl = this.router.routerState.snapshot.url;
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: returnUrl === '/login' ? undefined : returnUrl }
    });
    
    return throwError(() => new Error(error.error?.message || 'No autorizado'));
  }

  private handleForbidden(error: HttpErrorResponse) {
    // Redirect to unauthorized page
    this.router.navigate(['/unauthorized']);
    
    return throwError(() => new Error(error.error?.message || 'Acceso denegado'));
  }
}
