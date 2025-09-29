import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private auth: AuthService) {}

  /**
   * Verifica si el usuario actual puede crear contenido
   */
  canCreate(): boolean {
    return this.auth.isAdmin();
  }

  /**
   * Verifica si el usuario actual puede editar contenido
   */
  canEdit(): boolean {
    return this.auth.isAdmin();
  }

  /**
   * Verifica si el usuario actual puede eliminar contenido
   */
  canDelete(): boolean {
    return this.auth.isAdmin();
  }

  /**
   * Verifica si el usuario actual puede gestionar usuarios
   */
  canManageUsers(): boolean {
    return this.auth.isAdmin();
  }

  /**
   * Verifica si el usuario actual puede ver contenido (todos pueden ver)
   */
  canView(): boolean {
    return this.auth.isAuthenticated();
  }

  /**
   * Verifica si el usuario actual puede controlar partidos (solo admin)
   */
  canControlGames(): boolean {
    return this.auth.isAdmin();
  }

  /**
   * Obtiene el rol del usuario actual
   */
  getUserRole(): string {
    return this.auth.getUser()?.role || 'User';
  }

  /**
   * Verifica si el usuario es administrador
   */
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
