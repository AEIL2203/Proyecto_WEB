import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminTeamRosterComponent } from '../widgets/admin-team-roster.component';
import { ApiService, Game, GameDetail, Team } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { ScoreboardComponent } from '../widgets/scoreboard.component';
import { ControlPanelComponent } from '../widgets/control-panel.component';
import { ClockComponent } from '../widgets/clock.component';
import { TeamRosterComponent } from '../widgets/team-roster.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ScoreboardComponent,
    ControlPanelComponent,
    ClockComponent,
    TeamRosterComponent,
    AdminTeamRosterComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  // filtros / estado
  q = '';
  creating = false;
  advancing = false;

  // NUEVO: nombre del equipo a crear
  newTeamName = '';

  // Duración del cuarto seleccionada (en milisegundos)
  selectedQuarterMs = 720000; // Default 12 min

  // datos
  teams: Team[] = [];
  games: Game[] = [];
  detail: GameDetail | null = null;

  constructor(private api: ApiService, private notifications: NotificationService) {
    this.reloadAll();
  }

  // ===== API wrappers (lógica mínima) =====
  reloadAll() {
    this.api.listTeams().subscribe((t) => (this.teams = t));
    this.reloadGames();
  }

  reloadGames() {
    this.api.listGames().subscribe((g) => (this.games = g));
  }

  view(id: number) {
    this.api.getGame(id).subscribe((d) => (this.detail = d));
  }

  createGame(homeTeamId: number, awayTeamId: number) {
    if (!homeTeamId || !awayTeamId || homeTeamId === awayTeamId) return;
    this.creating = true;
    
    // Obtener nombres de los equipos para la notificación
    const homeTeam = this.teams.find(t => t.teamId === homeTeamId);
    const awayTeam = this.teams.find(t => t.teamId === awayTeamId);
    
    this.api.pairGame(homeTeamId, awayTeamId, this.selectedQuarterMs).subscribe({
      next: ({ gameId }) => {
        this.reloadGames();
        // Mostrar notificación de éxito con nombres de equipos
        if (homeTeam && awayTeam) {
          this.notifications.showSuccess(
            `🏀 Enfrentamiento creado: ${homeTeam.name} vs ${awayTeam.name}`,
            5000
          );
        }
        //Abre el panel de control del partido recién creado
        this.view(gameId);
      },
      error: () => {
        this.notifications.showError('Error al crear el enfrentamiento');
      },
      complete: () => (this.creating = false),
    });
  }

  // Obtener texto descriptivo para la duración seleccionada
  getQuarterDurationText(): string {
    switch (this.selectedQuarterMs) {
      case 300000: return '5 minutos';
      case 600000: return '10 minutos';
      case 720000: return '12 minutos';
      default: return '12 minutos';
    }
  }

  createTeam() {
    const name = this.newTeamName.trim();
    if (!name) return;

    this.creating = true;
    this.api.createTeam(name).subscribe({
      next: () => {
        this.newTeamName = '';
        this.creating = false;
        this.reloadAll();
      },
      error: (err) => {
        console.error('Error creando equipo', err);
        this.creating = false;
      }
    });
  }

  // Hook desde <app-clock> cuando se agota el tiempo del cuarto
  onExpire() {
    const g = this.detail?.game;
    if (!g) return;
    if (g.status === 'IN_PROGRESS' && g.quarter < 4 && !this.advancing) {
      this.advancing = true;
      this.api.advance(g.gameId).subscribe({
        next: () => this.view(g.gameId),
        complete: () => (this.advancing = false),
      });
    }
  }
}