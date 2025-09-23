import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

/**
 * Interceptor to add authorization token to outgoing requests
 * and handle 401 Unauthorized responses
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Skip authentication for login and other public endpoints
  if (req.url.includes('/auth/') || 
      req.url.includes('/public/') ||
      req.url.includes('assets/')) {
    return next(req);
  }

  // Get the auth token from the service
  const token = authService.getToken();
  
  // Clone the request and add the authorization header
  const authReq = token 
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    : req;

  // Send the request and handle errors
  return next(authReq).pipe(
    catchError((error) => {
      // Handle 401 Unauthorized responses
      if (error.status === 401) {
        authService.logout();
        
        // Redirect to login with return URL
        const returnUrl = router.routerState.snapshot.url;
        router.navigate(['/login'], { 
          queryParams: { returnUrl: returnUrl === '/login' ? undefined : returnUrl }
        });
      }
      
      // Re-throw the error for other error handlers
      return throwError(() => error);
    })
  );
};
