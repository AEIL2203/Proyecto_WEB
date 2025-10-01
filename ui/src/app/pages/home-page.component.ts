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
import { PermissionsService } from '../services/permissions.service';

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
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  // Estado general
  q = '';
  creating = false;
  advancing = false;

  // Sección activa en la navegación
  activeSection = 'games';

  // Datos para crear nuevo equipo
  newTeamName = '';
  newTeamCity: string | null = null;
  
  private teamNameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;

  // Logo para el nuevo equipo
  newTeamLogoFile: File | null = null;
  newTeamLogoPreviewUrl: string | null = null;
  
  // Duración del cuarto en milisegundos
  selectedQuarterMs = 720000; // Default 12 min

  // Datos principales
  teams: Team[] = [];
  games: Game[] = [];
  detail: GameDetail | null = null;
  teamsQuery: string = '';
  
  // Edición de equipos
  editingTeamId: number | null = null;
  editTeamName: string = '';
  editTeamCity: string | null = null;
  editLogoFile: File | null = null;
  editLogoPreviewUrl: string | null = null;

  // Modo de vista del juego
  viewMode: 'scoreboard' | 'controls' | null = null;

  constructor(
    private api: ApiService,
    private notifications: NotificationService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private clock: ClockService,
    private permissions: PermissionsService,
  ) {
    this.reloadAll();
  }

  ngOnInit(): void {
    // Navegación por parámetros de URL
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      const section = (params.get('section') || '').toLowerCase();
      if (section === 'teams' || section === 'games' || section === 'players') {
        this.activeSection = section;
      }

      const idStr = params.get('id');
      const mode = params.get('mode');
      const id = idStr ? +idStr : NaN;
      if (!isNaN(id) && id > 0 && mode) {
        if (mode === 'controls') this.viewControls(id);
        else if (mode === 'scoreboard') this.viewScoreboard(id);
      }
    });
  }

  // Navegación y usuario
  onSectionChange(section: string) { this.activeSection = section; }
  isAdmin(): boolean { return this.auth.isAdmin(); }
  getCurrentUser() { return this.auth.getUser(); }
  logout() { this.auth.logout(); }

  // Permisos del usuario
  canCreate(): boolean { return this.permissions.canCreate(); }
  canEdit(): boolean { return this.permissions.canEdit(); }
  canDelete(): boolean { return this.permissions.canDelete(); }
  canControlGames(): boolean { return this.permissions.canControlGames(); }

  // Validación de datos
  isTeamNameValid(value: string): boolean {
    const v = (value ?? '').trim();
    if (!v) return false;
    return this.teamNameRegex.test(v);
  }

  // Utilidades para logos
  teamLogoUrl(teamId: number): string { return this.api.getTeamLogoUrl(teamId); }
  onTeamLogoError(ev: Event) {
    const img = ev.target as HTMLImageElement | null;
    if (img) img.style.display = 'none';
  }

  // Carga de datos
  reloadAll() {
    this.api.listTeams().subscribe((t: Team[]) => (this.teams = t));
    this.reloadGames();
  }
  // Lista de equipos filtrada y ordenada
  get filteredTeams(): Team[] {
    const q = (this.teamsQuery ?? '').trim().toLowerCase();
    const base = !q
      ? this.teams
      : this.teams.filter(t => t.name.toLowerCase().includes(q) || String(t.teamId).includes(q));
    return [...base].sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
  }
  reloadGames() {
    this.api.listGames().subscribe((g: Game[]) => (this.games = g));
  }

  view(id: number) {
    this.api.getGame(id).subscribe((d: GameDetail) => (this.detail = d));
  }

  // Crear partido entre equipos
  createGame(homeTeamId: number, awayTeamId: number) {
    if (!homeTeamId || !awayTeamId) return;
    if (homeTeamId === awayTeamId) {
      this.notifications.showWarning('No se puede jugar con el mismo equipo.');
      return;
    }
    this.creating = true;

    const homeTeam = this.teams.find(t => t.teamId === homeTeamId);
    const awayTeam = this.teams.find(t => t.teamId === awayTeamId);

    this.api.pairGame(homeTeamId, awayTeamId, this.selectedQuarterMs).subscribe({
      next: ({ gameId }: { gameId: number }) => {
        this.reloadGames();
        if (homeTeam && awayTeam) {
          this.notifications.showSuccess(`🏀 Enfrentamiento creado: ${homeTeam.name} vs ${awayTeam.name}`, 5000);
        }
        if (this.selectedQuarterMs === 10000) {
          this.clock.resetForNewQuarter(gameId, 10000);
        }
        this.view(gameId);
      },
      error: () => {
        this.notifications.showError('Error al crear el enfrentamiento');
      },
      complete: () => (this.creating = false),
    });
  }

  // Edición de equipos
  startEditTeam(t: Team) {
    this.editingTeamId = t.teamId;
    this.editTeamName = t.name;
    this.editTeamCity = (t as any).city ?? null;
    this.editLogoFile = null;
    if (this.editLogoPreviewUrl) { URL.revokeObjectURL(this.editLogoPreviewUrl); }
    this.editLogoPreviewUrl = null;
  }

  // Desactivar equipo
  deleteTeam(t: Team) {
    if (!t?.teamId) return;
    const name = t.name;
    const ok = confirm(`¿Desactivar el equipo "${name}"?\nNo aparecerá más en las listas.`);
    if (!ok) return;
    this.api.deleteTeam(t.teamId).subscribe({
      next: () => {
        this.notifications.showSuccess('Equipo desactivado');
        if (this.editingTeamId === t.teamId) this.cancelEditTeam();
        this.api.listTeams().subscribe((teams: Team[]) => (this.teams = teams));
      },
      error: () => this.notifications.showError('Error desactivando equipo')
    });
  }

  cancelEditTeam() {
    this.editingTeamId = null;
    this.editTeamName = '';
    this.editTeamCity = null;
    this.editLogoFile = null;
    if (this.editLogoPreviewUrl) { URL.revokeObjectURL(this.editLogoPreviewUrl); }
    this.editLogoPreviewUrl = null;
  }

  onEditLogoSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const isUnder5MB = file.size <= 5 * 1024 * 1024;
    if (!isImage || !isUnder5MB) {
      this.notifications.showWarning('El logo debe ser una imagen de hasta 5 MB.');
      return;
    }
    this.editLogoFile = file;
    if (this.editLogoPreviewUrl) URL.revokeObjectURL(this.editLogoPreviewUrl);
    this.editLogoPreviewUrl = URL.createObjectURL(file);
  }

  saveEditTeam() {
    const id = this.editingTeamId;
    if (!id) return;
    const name = (this.editTeamName ?? '').trim();
    if (!name || !this.isTeamNameValid(name)) {
      this.notifications.showWarning('Nombre inválido. Solo letras y espacios.');
      return;
    }
    const city = (this.editTeamCity ?? '').trim();
    const patch: any = {};
    const original = this.teams.find(x => x.teamId === id);
    if (!original) return;
    if (name !== original.name) patch.name = name;
    const origCity = (original as any).city ?? null;
    if ((city || null) !== origCity) patch.city = city || null;

    const finish = () => {
      this.notifications.showSuccess('Equipo actualizado');
      this.cancelEditTeam();
      this.api.listTeams().subscribe((t: Team[]) => (this.teams = t));
    };

    const patch$ = Object.keys(patch).length > 0
      ? this.api.updateTeam(id, patch)
      : null;

    if (patch$) {
      patch$.subscribe({
        next: () => {
          if (this.editLogoFile) {
            this.api.updateTeamLogo(id, this.editLogoFile).subscribe({ next: finish, error: () => this.notifications.showError('Error actualizando logo') });
          } else finish();
        },
        error: (e) => {
          if ((e?.status ?? 0) === 409) this.notifications.showError('Nombre duplicado');
          else this.notifications.showError('Error actualizando equipo');
        }
      });
    } else if (this.editLogoFile) {
      this.api.updateTeamLogo(id, this.editLogoFile).subscribe({ next: finish, error: () => this.notifications.showError('Error actualizando logo') });
    } else {
      this.cancelEditTeam();
    }
  }

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

  // ===== Vistas de partidos =====
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

  // ===== Drag & Drop logo =====
  onLogoFileSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) this.setNewTeamLogo(file);
  }

  onLogoDragOver(ev: DragEvent) { ev.preventDefault(); }
  onLogoDragLeave(ev: DragEvent) { ev.preventDefault(); }
  onLogoDrop(ev: DragEvent) {
    ev.preventDefault();
    const files = ev.dataTransfer?.files;
    if (files && files.length > 0) {
      this.setNewTeamLogo(files[0]);
    }
  }

  private setNewTeamLogo(file: File) {
    const isImage = file.type.startsWith('image/');
    const isUnder5MB = file.size <= 5 * 1024 * 1024;
    if (!isImage || !isUnder5MB) {
      this.notifications.showWarning('El logo debe ser una imagen de hasta 5 MB.');
      return;
    }
    this.newTeamLogoFile = file;
    if (this.newTeamLogoPreviewUrl) URL.revokeObjectURL(this.newTeamLogoPreviewUrl);
    this.newTeamLogoPreviewUrl = URL.createObjectURL(file);
  }

  clearNewTeamLogo() {
    this.newTeamLogoFile = null;
    if (this.newTeamLogoPreviewUrl) URL.revokeObjectURL(this.newTeamLogoPreviewUrl);
    this.newTeamLogoPreviewUrl = null;
  }

  createTeam() {
    const name = this.newTeamName.trim();
    if (!name) return;
    if (!this.isTeamNameValid(name)) return;

    this.creating = true;
    const hasLogo = !!this.newTeamLogoFile;
    const obs = hasLogo
      ? this.api.createTeamWithLogo(name, this.newTeamCity?.trim() || null, this.newTeamLogoFile)
      : this.api.createTeam({ name, city: this.newTeamCity?.trim() || null });
    obs.subscribe({
      next: () => {
        this.newTeamName = '';
        this.newTeamCity = null;
        this.clearNewTeamLogo();
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
  onExpire(): void {
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