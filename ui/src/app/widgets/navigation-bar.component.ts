import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <!-- Logo/Brand -->
        <div class="navbar-brand">
          <h2>🏀 Marcador de Baloncesto</h2>
          <span class="navbar-subtitle">Panel de Administración</span>
        </div>

        <!-- Navigation Menu -->
        <div class="navbar-menu">
          <button 
            class="nav-item" 
            [class.active]="activeSection === 'teams'"
            (click)="setActiveSection('teams')">
            <span class="nav-icon">👥</span>
            <span class="nav-text">Crear Equipo</span>
          </button>

          <button 
            class="nav-item" 
            [class.active]="activeSection === 'games'"
            (click)="setActiveSection('games')">
            <span class="nav-icon">🏀</span>
            <span class="nav-text">Crear Partidos</span>
          </button>

          <button 
            class="nav-item" 
            [class.active]="activeSection === 'players'"
            (click)="setActiveSection('players')">
            <span class="nav-icon">⚽</span>
            <span class="nav-text">Gestionar Jugadores</span>
          </button>
        </div>

        <!-- User Menu -->
        <div class="navbar-user">
          <div class="user-info" *ngIf="user">
            <span class="user-name">{{ user.userName }}</span>
            <span class="user-role">{{ user.role }}</span>
          </div>
          
          <button class="logout-btn" (click)="logout()" title="Cerrar Sesión">
            <span class="logout-icon">🚪</span>
            <span class="logout-text">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
      gap: 2rem;
    }

    .navbar-brand {
      display: flex;
      flex-direction: column;
      color: white;
    }

    .navbar-brand h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .navbar-subtitle {
      font-size: 0.875rem;
      opacity: 0.8;
      font-weight: 400;
    }

    .navbar-menu {
      display: flex;
      gap: 0.5rem;
      flex: 1;
      justify-content: center;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.75rem;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .nav-item.active {
      background: rgba(255, 255, 255, 0.25);
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .nav-icon {
      font-size: 1.25rem;
    }

    .nav-text {
      font-size: 0.95rem;
      white-space: nowrap;
    }

    .navbar-user {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      color: white;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.95rem;
    }

    .user-role {
      font-size: 0.8rem;
      opacity: 0.8;
      background: rgba(255, 255, 255, 0.15);
      padding: 0.125rem 0.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: rgba(239, 68, 68, 0.8);
      border: 1px solid rgba(239, 68, 68, 0.6);
      border-radius: 0.75rem;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }

    .logout-btn:hover {
      background: rgba(239, 68, 68, 0.9);
      border-color: rgba(239, 68, 68, 0.8);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
    }

    .logout-icon {
      font-size: 1.1rem;
    }

    .logout-text {
      font-size: 0.9rem;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .navbar-container {
        padding: 1rem;
        gap: 1rem;
      }
      
      .navbar-brand h2 {
        font-size: 1.25rem;
      }
      
      .nav-text, .logout-text {
        display: none;
      }
      
      .nav-item, .logout-btn {
        padding: 0.75rem;
      }
    }

    @media (max-width: 768px) {
      .navbar-container {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }
      
      .navbar-menu {
        width: 100%;
        justify-content: space-around;
      }
      
      .navbar-user {
        width: 100%;
        justify-content: space-between;
      }
      
      .nav-text, .logout-text {
        display: inline;
        font-size: 0.85rem;
      }
    }
  `]
})
export class NavigationBarComponent {
  @Output() sectionChange = new EventEmitter<string>();
  
  activeSection = 'games'; // Sección activa por defecto
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
    
    // Mostrar notificación de cambio de sección
    const sectionNames = {
      'teams': 'Crear Equipo',
      'games': 'Crear Partidos', 
      'players': 'Gestionar Jugadores'
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
