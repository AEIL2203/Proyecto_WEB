import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../widgets/navigation-bar.component';
import { SectionHeaderComponent } from '../widgets/section-header.component';
import { AuthService, AuthUser } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-tournament-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavigationBarComponent,
    SectionHeaderComponent
  ],
  templateUrl: './tournament-page.component.html'
})
export class TournamentPageComponent {
  // Propiedades básicas para la página de torneo
  activeSection = 'tournament';
  
  // Control de tabs
  activeTab = 'create'; // 'create' o 'view'
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifications: NotificationService
  ) {
    // Inicialización básica
  }

  // Método para manejar cambios de sección desde la barra de navegación
  onSectionChange(section: string) {
    this.activeSection = section;
  }

  // Métodos para mantener consistencia con otras páginas
  getCurrentUser(): AuthUser | null {
    return this.authService.getUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'Admin';
  }

  logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.notifications.showSuccess('👋 Sesión cerrada correctamente', 3000);
      this.router.navigate(['/login']);
    }
  }

  // Método para cambiar de tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
    const tabNames = {
      'create': 'Crear Torneo',
      'view': 'Ver Torneos'
    };
    const tabName = tabNames[tab as keyof typeof tabNames];
    if (tabName) {
      this.notifications.showInfo(`📍 Pestaña activa: ${tabName}`, 2000);
    }
  }
}
