import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // No modificar solicitudes de autenticación
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  const token = authService.getToken();
  
  // Clonar la solicitud y agregar el encabezado de autorización si existe un token
  const authReq = token 
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    : req;

  // Manejar la respuesta y los errores
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejar errores de autenticación (401 Unauthorized)
      if (error.status === 401) {
        // Guardar la URL actual en el almacenamiento local antes de hacer logout
        const currentUrl = router.routerState.snapshot.url;
        if (currentUrl !== '/login') {
          localStorage.setItem('returnUrl', currentUrl);
        }
        
        authService.logout();
        router.navigate(['/login']);
      }
      
      // Reenviar el error para que otros manejadores puedan procesarlo
      return throwError(() => error);
    })
  );
};
