import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, AuthUser } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  @Input() activeSection = 'games'; // Sección activa por defecto
  @Output() sectionChange = new EventEmitter<string>();
  
  user: AuthUser | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifications: NotificationService
  ) {
    // Suscribirse a cambios de usuario
    this.authService.userChanges().subscribe(user => {
      this.user = user;
    });
  }

  setActiveSection(section: string) {
    this.activeSection = section;
    this.sectionChange.emit(section);
    
    // Navegar a la ruta correspondiente
    if (section === 'tournaments') {
      this.router.navigate(['/tournaments']);
    } else {
      // Para otras secciones, usa el sistema de queryParams
      this.router.navigate(['/'], { queryParams: { section } });
    }
    
    // Mostrar notificación de cambio de sección
    const sectionNames = {
      'teams': 'Crear Equipo',
      'games': 'Crear Partidos', 
      'players': 'Gestionar Jugadores',
      'tournaments': 'Torneos'
    };
    
    const sectionName = sectionNames[section as keyof typeof sectionNames];
    if (sectionName) {
      this.notifications.showInfo(`📍 Sección activa: ${sectionName}`, 2000);
    }
  }

  logout() {
    // Mostrar confirmación
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.notifications.showSuccess('👋 Sesión cerrada correctamente', 3000);
      
      // Redirigir al login
      this.router.navigate(['/login']);
    }
  }
}
