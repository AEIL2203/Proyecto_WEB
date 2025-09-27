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
  
  // En SSR (no navegador), permitir navegación; el cliente aplicará el guard correctamente
  if (!isPlatformBrowser(platformId)) {
    console.log('🛡️ AdminGuard: SSR detectado, permitiendo navegación');
    return true;
  }

  // Verificar si está autenticado
  const isAuthenticated = auth.isAuthenticated();
  console.log('🛡️ AdminGuard: ¿Autenticado?', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('🛡️ AdminGuard: No autenticado, redirigiendo a login');
    router.navigate(['/login']);
    return false;
  }

  // Verificar si es administrador
  const user = auth.getUser();
  console.log('🛡️ AdminGuard: Usuario actual:', user);
  
  if (user?.role !== 'Admin') {
    console.log('🛡️ AdminGuard: No es admin, redirigiendo al home');
    // Redirigir al home si no es admin
    router.navigate(['/']);
    return false;
  }

  console.log('🛡️ AdminGuard: Acceso permitido - Usuario es admin');
  return true;
};
