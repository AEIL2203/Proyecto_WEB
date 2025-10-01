import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  
  console.log('🛡️ AdminGuard: Verificando acceso...');
  
  // Permitir navegación en SSR
  if (!isPlatformBrowser(platformId)) {
    console.log('🛡️ AdminGuard: SSR detectado, permitiendo navegación');
    return true;
  }

  // Verificar login
  const isAuthenticated = auth.isAuthenticated();
  console.log('🛡️ AdminGuard: ¿Autenticado?', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('🛡️ AdminGuard: No autenticado, redirigiendo a login');
    router.navigate(['/login']);
    return false;
  }

  // Verificar rol admin
  const user = auth.getUser();
  console.log('🛡️ AdminGuard: Usuario actual:', user);
  
  if (user?.role !== 'Admin') {
    console.log('🛡️ AdminGuard: No es admin, redirigiendo al home');
    // Redirigir si no es admin
    router.navigate(['/']);
    return false;
  }

  console.log('🛡️ AdminGuard: Acceso permitido - Usuario es admin');
  return true;
};
