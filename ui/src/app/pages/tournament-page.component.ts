import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { NavigationBarComponent } from '../widgets/navigation-bar.component';
import { SectionHeaderComponent } from '../widgets/section-header.component';

@Component({
  selector: 'app-tournament-page',
  standalone: true,
  imports: [CommonModule, RouterModule, SectionHeaderComponent, NavigationBarComponent],
  template: `
    <app-navigation-bar [activeSection]="'tournaments'"></app-navigation-bar>
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 20px;">
      <app-section-header 
        icon="🏆" 
        title="Gestión de Torneos" 
        description="Crea y gestiona los torneos de baloncesto">
      </app-section-header>

      <div class="card p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="mb-0">Lista de Torneos</h3>
          <button class="btn btn-primary" (click)="createNewTournament()">
            <i class="fas fa-plus me-2"></i>Nuevo Torneo
          </button>
        </div>

        <!-- Lista de torneos -->
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Equipos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let tournament of tournaments">
                <td>{{ tournament.name }}</td>
                <td>{{ tournament.startDate | date:'mediumDate' }}</td>
                <td>{{ tournament.endDate | date:'mediumDate' }}</td>
                <td>{{ tournament.teamCount }}</td>
                <td>
                  <span class="badge" [ngClass]="{
                    'bg-success': tournament.status === 'active',
                    'bg-secondary': tournament.status === 'pending',
                    'bg-danger': tournament.status === 'finished'
                  }">
                    {{ getStatusText(tournament.status) }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-2" (click)="viewTournament(tournament.id)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-secondary" (click)="editTournament(tournament.id)">
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
              <tr *ngIf="tournaments.length === 0">
                <td colspan="6" class="text-center py-4">
                  <p class="text-muted mb-3">No hay torneos registrados</p>
                  <button class="btn btn-primary" (click)="createNewTournament()">
                    <i class="fas fa-plus me-2"></i>Crear Primer Torneo
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      font-size: 0.8rem;
      padding: 0.35em 0.65em;
    }
    .table th {
      font-weight: 500;
      color: #495057;
    }
  `]
})
export class TournamentPageComponent implements OnInit, OnDestroy {
  tournaments: any[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private api: ApiService,
    private notifications: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadTournaments();
    
    // Escuchar cambios en la ruta para actualizar la sección activa
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params['section']) {
        // Actualizar la sección activa si es necesario
      }
    });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTournaments() {
    this.loading = true;
    // TODO: Implementar la carga de torneos desde el API
    // this.api.getTournaments().subscribe({
    //   next: (data) => this.tournaments = data,
    //   error: (err) => this.notifications.showError('Error al cargar torneos')
    // });
    
    // Datos de ejemplo temporal
    setTimeout(() => {
      this.tournaments = [
        { id: 1, name: 'Torneo Invierno 2023', startDate: '2023-11-01', endDate: '2023-12-15', teamCount: 8, status: 'finished' },
        { id: 2, name: 'Torneo Verano 2024', startDate: '2024-06-01', endDate: '2024-08-30', teamCount: 12, status: 'active' },
        { id: 3, name: 'Torneo Otoño 2024', startDate: '2024-09-15', endDate: '2024-11-30', teamCount: 10, status: 'pending' }
      ];
      this.loading = false;
    }, 500);
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'active': 'En Curso',
      'pending': 'Pendiente',
      'finished': 'Finalizado'
    };
    return statusMap[status] || status;
  }

  createNewTournament() {
    this.notifications.showInfo('Función para crear nuevo torneo');
    // TODO: Implementar lógica para crear nuevo torneo
  }

  viewTournament(id: number) {
    this.notifications.showInfo(`Viendo torneo #${id}`);
    // TODO: Implementar navegación a vista detallada
  }

  editTournament(id: number) {
    this.notifications.showInfo(`Editando torneo #${id}`);
    // TODO: Implementar lógica de edición
  }
}
