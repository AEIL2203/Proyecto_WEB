import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AdminTeamRosterComponent } from '../widgets/admin-team-roster.component';
import { NavigationBarComponent } from '../widgets/navigation-bar.component';
import { SectionHeaderComponent } from '../widgets/section-header.component';
import { ApiService, Game, GameDetail, Team } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { ScoreboardComponent } from '../widgets/scoreboard.component';
import { ControlPanelComponent } from '../widgets/control-panel.component';
import { ClockComponent } from '../widgets/clock.component';
import { TeamRosterComponent } from '../widgets/team-roster.component';
import { AuthService } from '../services/auth.service';
import { ClockService } from '../services/clock.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavigationBarComponent,
    SectionHeaderComponent,
    ScoreboardComponent,
    ControlPanelComponent,
    ClockComponent,
    TeamRosterComponent,
    AdminTeamRosterComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  // filtros / estado
  q = '';
  creating = false;
  advancing = false;
  
  // Control de secciones de navegación
  activeSection = 'games';

  // NUEVO: nombre del equipo a crear
  newTeamName = '';
  private teamNameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;

  // Duración del cuarto seleccionada (en milisegundos)
  selectedQuarterMs = 720000; // Default 12 min

  // datos
  teams: Team[] = [];
  games: Game[] = [];
  detail: GameDetail | null = null;

  // Control de vista de detalles
  viewMode: 'scoreboard' | 'controls' | null = null;

  constructor(
    private api: ApiService, 
    private notifications: NotificationService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private clock: ClockService
  ) {
    this.reloadAll();
  }

  ngOnInit(): void {
    // Permite abrir directamente vistas desde URL: ?id=123&mode=controls|scoreboard
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      // Cambiar sección si se solicita: ?section=teams|games|players
      const section = (params.get('section') || '').toLowerCase();
      if (section === 'teams' || section === 'games' || section === 'players') {
        this.activeSection = section;
      }

      const idStr = params.get('id');
      const mode = params.get('mode');
      const id = idStr ? +idStr : NaN;
      if (!isNaN(id) && id > 0 && mode) {
        if (mode === 'controls') {
          this.viewControls(id);
        } else if (mode === 'scoreboard') {
          this.viewScoreboard(id);
        }
      }
    });
  }

  isTeamNameValid(value: string): boolean {
    const v = (value ?? '').trim();
    if (!v) return false;
    return this.teamNameRegex.test(v);
  }

  // Manejar cambio de sección desde la barra de navegación
  onSectionChange(section: string) {
    this.activeSection = section;
  }

  // Métodos para verificar permisos
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  getCurrentUser() {
    return this.auth.getUser();
  }

  logout() {
    this.auth.logout();
    // La navegación la manejará el guard automáticamente
  }

  // ===== API wrappers (lógica mínima) =====
  reloadAll() {
    this.api.listTeams().subscribe((t: Team[]) => (this.teams = t));
    this.reloadGames();
  }

  reloadGames() {
    this.api.listGames().subscribe((g: Game[]) => (this.games = g));
  }

  view(id: number) {
    this.api.getGame(id).subscribe((d: GameDetail) => (this.detail = d));
  }

  createGame(homeTeamId: number, awayTeamId: number) {
    if (!homeTeamId || !awayTeamId) return;
    if (homeTeamId === awayTeamId) {
      this.notifications.showWarning('No se puede jugar con el mismo equipo.');
      return;
    }
    this.creating = true;
    
    // Obtener nombres de los equipos para la notificación
    const homeTeam = this.teams.find(t => t.teamId === homeTeamId);
    const awayTeam = this.teams.find(t => t.teamId === awayTeamId);
    
    this.api.pairGame(homeTeamId, awayTeamId, this.selectedQuarterMs).subscribe({
      next: ({ gameId }: { gameId: number }) => {
        this.reloadGames();
        // Mostrar notificación de éxito con nombres de equipos
        if (homeTeam && awayTeam) {
          this.notifications.showSuccess(
            `🏀 Enfrentamiento creado: ${homeTeam.name} vs ${awayTeam.name}`,
            5000
          );
        }
        // Si el usuario seleccionó 10 segundos, forzar el reloj del servidor a 10s
        if (this.selectedQuarterMs === 10000) {
          this.clock.resetForNewQuarter(gameId, 10000);
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
      case 10000: return '10 segundos';
      case 30000: return '30 segundos';
      case 300000: return '5 minutos';
      case 600000: return '10 minutos';
      case 720000: return '12 minutos';
      default: return '12 minutos';
    }
  }

  createTeam() {
    const name = this.newTeamName.trim();
    if (!name) return;
    if (!this.isTeamNameValid(name)) return;

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

  // Nuevos métodos para las vistas de partidos
  viewScoreboard(gameId: number) {
    this.viewMode = 'scoreboard';
    this.api.getGame(gameId).subscribe((d: GameDetail) => {
      this.detail = d;
      this.notifications.showInfo(`📊 Mostrando marcador: ${d.game.homeTeam} vs ${d.game.awayTeam}`, 3000);
    });
  }

  viewControls(gameId: number) {
    this.viewMode = 'controls';
    this.api.getGame(gameId).subscribe((d: GameDetail) => {
      this.detail = d;
      this.notifications.showInfo(`🎮 Panel de control activado: ${d.game.homeTeam} vs ${d.game.awayTeam}`, 3000);
    });
  }

  closeDetail() {
    this.detail = null;
    this.viewMode = null;
    this.notifications.showInfo('📋 Volviendo a la lista de partidos', 2000);
  }
}