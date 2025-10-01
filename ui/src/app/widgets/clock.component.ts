import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { ClockService, ClockState } from '../services/clock.service';
import { interval, Subscription } from 'rxjs';
import { ApiService, FoulSummary } from '../services/api.service';

@Pipe({ name: 'msToClock', standalone: true })
export class MsToClockPipe implements PipeTransform {
  transform(ms?: number): string {
    if (ms == null) return '--:--';
    const total = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(total / 60).toString().padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
}

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule, MsToClockPipe],
  templateUrl: './clock.component.html',
})
export class ClockComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) gameId!: number;
  @Input() status?: 'SCHEDULED' | 'IN_PROGRESS' | 'FINISHED';
  @Input() quarter?: number;
  @Input() showTeamFouls = true; 
  // Mostrar controles del reloj
  @Input() controls = true;
  // Modo de prueba con cuartos de 30 segundos
  @Input() testMode = false;

  @Output() expired = new EventEmitter<void>();

  vm$?: Observable<ClockState>;
  vmSnap?: ClockState;
  teamFoulsHome = 0;
  teamFoulsAway = 0;
  bonusHome = false;
  bonusAway = false;

  private prevRemaining = -1; // Estado previo para detectar expiración
  private prevRunning = false;
  busy = false;
  private foulsSub?: Subscription; 

  constructor(private clock: ClockService, private api: ApiService) {}

  ngOnChanges(ch: SimpleChanges): void {
    if (!this.gameId) return;

    // Recrear stream del reloj si cambia el juego
    if (!this.vm$ || (ch['gameId'] && !ch['gameId'].firstChange && ch['gameId'].previousValue !== ch['gameId'].currentValue)) {
      this.prevRemaining = -1;
      this.prevRunning = false;
      this.vm$ = this.clock.state$(this.gameId).pipe(
        map(s => {
          if (this.prevRunning && this.prevRemaining > 0 && s.remainingMs === 0) this.expired.emit();
          this.vmSnap = s;
          this.prevRunning = !!s.running;
          this.prevRemaining = s.remainingMs;
          return s;
        })
      );
    }

    // Sincronizar reloj con el estado del juego
    if (ch['status'] && !ch['status'].firstChange && ch['status'].previousValue !== ch['status'].currentValue) {
      if (this.status === 'IN_PROGRESS') this.clock.start(this.gameId);
      else this.clock.pause(this.gameId);
    }

    // Reiniciar reloj al cambiar de cuarto
    if (ch['quarter'] && !ch['quarter'].firstChange && ch['quarter'].previousValue !== ch['quarter'].currentValue) {
      const quarterMs = this.testMode ? 30000 : undefined;
      this.clock.resetForNewQuarter(this.gameId, quarterMs);
      if (this.status === 'IN_PROGRESS') this.clock.start(this.gameId);
    }
      if (ch['gameId'] || ch['status'] || ch['quarter']) {
      this.startFoulsPolling();
      }
  }

  ngOnDestroy(): void {
    this.foulsSub?.unsubscribe();
  }

  toggle() {
    if (this.busy || !this.gameId || this.status === 'FINISHED') return;
    this.busy = true;
    this.vmSnap?.running ? this.clock.pause(this.gameId) : this.clock.start(this.gameId);
    setTimeout(() => (this.busy = false), 150);
  }

  resetQuarter() {
    if (this.busy || !this.gameId) return;
    this.busy = true;
    // Usar 30 segundos en modo prueba
    const quarterMs = this.testMode ? 30000 : undefined;
    this.clock.resetForNewQuarter(this.gameId, quarterMs);
    setTimeout(() => (this.busy = false), 150);
  }
  // Iniciar seguimiento de faltas
private startFoulsPolling() {
  this.foulsSub?.unsubscribe();

  // Solo refrescar si no hay juego activo
  if (!this.gameId) return;

  // Actualizar inmediatamente
  this.refreshFouls();

  // Polling solo durante el juego
  if (this.status === 'IN_PROGRESS') {
    this.foulsSub = interval(2000).subscribe(() => this.refreshFouls());
  }
}

  // Actualizar conteo de faltas y bonus
  private refreshFouls() {
    if (!this.gameId) return;
    const curQ = this.quarter ?? 1;

    this.api.getFoulSummary(this.gameId).subscribe({
      next: (s: FoulSummary) => {
        const sumOf = (team: 'HOME'|'AWAY') =>
          (s.team ?? [])
            .filter(r => (r.team?.toString().toUpperCase() === team) && r.quarter === curQ)
            .reduce((a, r) => a + (r.fouls ?? 0), 0);

        this.teamFoulsHome = sumOf('HOME');
        this.teamFoulsAway = sumOf('AWAY');

        // Bonus a partir de la 5ta falta por cuarto
        this.bonusHome = this.teamFoulsHome >= 5;
        this.bonusAway = this.teamFoulsAway >= 5;
      },
      error: () => {
        // Mantener UI estable en caso de error
        this.teamFoulsHome = 0;
        this.teamFoulsAway = 0;
        this.bonusHome = this.bonusAway = false;
      }
    });
  }

}
