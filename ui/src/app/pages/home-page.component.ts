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
import { AudioService } from '../services/audio.service';
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
  // NUEVO: ciudad y logo del equipo
  newTeamCity = '';
  // Para opción 2 (logo en DB): guardamos el File y un preview local
  newTeamLogoFile: File | null = null;
  newTeamLogoPreviewUrl: string | null = null;
  dragging = false;

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
    private clock: ClockService,
    private audio: AudioService
  ) {
    this.reloadAll();
  }

  // ====== Manejo de drag & drop / selección de archivo para logo (PNG) ======
  onDragOver(e: DragEvent) { e.preventDefault(); this.dragging = true; }
  onDragLeave(e: DragEvent) { e.preventDefault(); this.dragging = false; }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragging = false;
    const file = e.dataTransfer?.files?.[0];
    if (file) this.setLogoFile(file);
  }

  onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) this.setLogoFile(file);
  }

  private setLogoFile(file: File) {
    if (file.type !== 'image/png') {
      this.notifications.showWarning('Solo se acepta PNG');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.notifications.showWarning('El PNG debe pesar <= 2MB');
      return;
    }
    // Guardar file y generar previsualización local
    if (this.newTeamLogoPreviewUrl) URL.revokeObjectURL(this.newTeamLogoPreviewUrl);
    this.newTeamLogoFile = file;
    this.newTeamLogoPreviewUrl = URL.createObjectURL(file);
  }
  
  ngOnInit(): void {
    // Inicialización básica; si necesitas restaurar la lógica de query params, la reimplementamos luego.
  }

  createTeam() {
    const name = this.newTeamName.trim();
    if (!name) return;
    if (!this.isTeamNameValid(name)) return;

    this.creating = true;
    const doReset = () => {
      this.newTeamName = '';
      this.newTeamCity = '';
      if (this.newTeamLogoPreviewUrl) {
        URL.revokeObjectURL(this.newTeamLogoPreviewUrl);
      }
      this.newTeamLogoPreviewUrl = null;
      this.newTeamLogoFile = null;
      this.creating = false;
      this.reloadAll();
    };

    // Si es admin y hay city/logo, usar endpoint admin con payload extendido
    if (this.isAdmin()) {
      // En opción 2 enviamos FormData con archivo directo a /api/admin/teams
      const city = this.newTeamCity.trim() || null;
      this.api.createTeamAdminForm(name, city, this.newTeamLogoFile).subscribe({
        next: () => doReset(),
        error: (err) => {
          console.error('Error creando equipo (admin)', err);
          this.creating = false;
        }
      });
      return;
    }

    // Público: crear solo con nombre
    this.api.createTeam(name).subscribe({
      next: () => doReset(),
      error: (err) => {
        console.error('Error creando equipo', err);
        this.creating = false;
      }
    });
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

  // ===== Métodos auxiliares requeridos por el template =====
  private reloadAll() {
    this.api.listTeams().subscribe(ts => (this.teams = ts));
    this.api.listGames().subscribe(gs => (this.games = gs));
  }

  isTeamNameValid(name: string): boolean {
    return this.teamNameRegex.test(name.trim());
  }

  isAdmin(): boolean { return this.auth.isAdmin(); }
  getCurrentUser() { return this.auth.getUser(); }
  logout() { this.auth.logout(); }

  onSectionChange(section: string) { this.activeSection = section; }

  // Crear partido: usando nombres a partir de los IDs seleccionados
  createGame(homeTeamId: number, awayTeamId: number) {
    const home = this.teams.find(t => t.teamId === homeTeamId)?.name;
    const away = this.teams.find(t => t.teamId === awayTeamId)?.name;
    if (!home || !away) { this.notifications.showWarning('Selecciona equipos válidos'); return; }
    this.creating = true;
    this.api.createGame(home, away, this.selectedQuarterMs).subscribe({
      next: ({ gameId }) => {
        this.notifications.showSuccess('Partido creado');
        this.view(gameId);
      },
      error: (err) => {
        console.error(err);
        this.notifications.showError('No se pudo crear el partido');
      },
      complete: () => { this.creating = false; this.reloadAll(); }
    });
  }

  view(gameId: number) {
    this.viewMode = 'controls';
    this.api.getGame(gameId).subscribe((d: GameDetail) => {
      this.detail = d;
    });
  }

  onExpire() {
    if (!this.detail) return;
    const id = this.detail.game.gameId;
    this.advancing = true;
    this.api.advance(id).subscribe({
      next: () => this.view(id),
      complete: () => (this.advancing = false)
    });
  }
}