import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  // En SSR (no navegador), permitir navegación; el cliente aplicará el guard correctamente
  if (!isPlatformBrowser(platformId)) return true;

  if (auth.isAuthenticated()) return true;
  router.navigate(['/login']);
  return false;
};
