import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from '../widgets/navigation-bar.component';
import { SectionHeaderComponent } from '../widgets/section-header.component';
import { AuthService, AuthUser } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { ApiService, Tournament, CreateTournament } from '../services/api.service';

@Component({
  selector: 'app-tournament-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavigationBarComponent,
    SectionHeaderComponent
  ],
  templateUrl: './tournament-page.component.html'
})
export class TournamentPageComponent implements OnInit {
  // Estado de la página
  activeSection = 'tournament';
  
  // Pestaña activa
  activeTab = 'create'; // 'create' o 'view'
  
  // Datos de torneos
  tournaments: Tournament[] = [];
  loading = false;
  
  // Nuevo torneo
  newTournament: CreateTournament = {
    nombreTorneo: '',
    descripcion: '',
    numeroEquipos: 8,
    estado: 'PROGRAMADO'
  };
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifications: NotificationService,
    private apiService: ApiService
  ) {
    // Constructor
  }

  ngOnInit() {
    this.loadTournaments();
  }

  // Usuario
  getCurrentUser(): AuthUser | null {
    return this.authService.getUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'Admin';
  }


  // Cambiar pestaña
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
    
    // Cargar datos al ver torneos
    if (tab === 'view') {
      this.loadTournaments();
    }
  }

  // Cargar torneos
  loadTournaments() {
    this.loading = true;
    this.apiService.getTournaments().subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar torneos:', error);
        this.notifications.showError('Error al cargar los torneos', 3000);
        this.loading = false;
      }
    });
  }

  // Crear torneo
  createTournament() {
    if (!this.newTournament.nombreTorneo.trim()) {
      this.notifications.showError('El nombre del torneo es obligatorio', 3000);
      return;
    }

    this.loading = true;
    this.apiService.createTournament(this.newTournament).subscribe({
      next: (tournament) => {
        this.notifications.showSuccess(`🏆 Torneo "${tournament.nombreTorneo}" creado exitosamente`, 3000);
        this.resetForm();
        this.loadTournaments();
        this.setActiveTab('view');
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al crear torneo:', error);
        this.notifications.showError('Error al crear el torneo', 3000);
        this.loading = false;
      }
    });
  }

  // Limpiar formulario
  resetForm() {
    this.newTournament = {
      nombreTorneo: '',
      descripcion: '',
      numeroEquipos: 8,
      estado: 'PROGRAMADO'
    };
  }

  // Eliminar torneo
  deleteTournament(tournament: Tournament) {
    if (confirm(`¿Estás seguro de que deseas eliminar el torneo "${tournament.nombreTorneo}"?`)) {
      this.loading = true;
      this.apiService.deleteTournament(tournament.idTorneo).subscribe({
        next: () => {
          this.notifications.showSuccess(`🗑️ Torneo "${tournament.nombreTorneo}" eliminado`, 3000);
          this.loadTournaments();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al eliminar torneo:', error);
          this.notifications.showError('Error al eliminar el torneo', 3000);
          this.loading = false;
        }
      });
    }
  }

  // Optimización de lista
  trackByTournamentId(index: number, tournament: Tournament): number {
    return tournament.idTorneo;
  }

  // Texto del estado
  getStatusText(estado: string): string {
    const statusMap: { [key: string]: string } = {
      'PROGRAMADO': 'Programado',
      'EN_PROGRESO': 'En Progreso',
      'FINALIZADO': 'Finalizado',
      'CANCELADO': 'Cancelado'
    };
    return statusMap[estado] || estado;
  }
}
