import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.currentUser.pipe(
    map(user => {
      // Si el usuario está autenticado, permitir el acceso
      if (user) {
        // Verificar si la ruta requiere un rol específico
        const requiredRole = route.data?.['role'];
        
        if (requiredRole && user.role !== requiredRole) {
          // Redirigir a la página de no autorizado si el rol no coincide
          return router.createUrlTree(['/unauthorized']);
        }
        
        return true;
      }
      
      // Si no está autenticado, redirigir al login con la URL de retorno
      return router.createUrlTree(['/login'], { 
        queryParams: { returnUrl: state.url } 
      });
    })
  );
};
