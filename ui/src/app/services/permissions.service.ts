import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private auth: AuthService) {}

  // Puede crear contenido
  canCreate(): boolean {
    return this.auth.isAdmin();
  }

  // Puede editar contenido
  canEdit(): boolean {
    return this.auth.isAdmin();
  }

  // Puede eliminar contenido
  canDelete(): boolean {
    return this.auth.isAdmin();
  }

  // Puede gestionar usuarios
  canManageUsers(): boolean {
    return this.auth.isAdmin();
  }

  // Puede ver contenido
  canView(): boolean {
    return this.auth.isAuthenticated();
  }

  // Puede controlar partidos
  canControlGames(): boolean {
    return this.auth.isAdmin();
  }

  // Rol del usuario actual
  getUserRole(): string {
    return this.auth.getUser()?.role || 'User';
  }

  // Es administrador
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
