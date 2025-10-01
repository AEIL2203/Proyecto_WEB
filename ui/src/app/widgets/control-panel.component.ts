import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Game, Player } from '../services/api.service';
import { AudioService } from '../services/audio.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-panel.component.html',
})
export class ControlPanelComponent implements OnChanges {
  @Input({ required: true }) game!: Game;
  @Output() changed = new EventEmitter<void>();

  // Jugadores de cada equipo en el partido
  homePlayers: any[] = [];
  awayPlayers: any[] = [];

  // Jugador seleccionado para registrar faltas
  selHomePlayerId?: number;
  selAwayPlayerId?: number;

  // Faltas por equipo en el cuarto actual
  teamFouls = { home: 0, away: 0 };
  // Faltas acumuladas por jugador
  private playerFouls = new Map<number, number>();

  constructor(private api: ApiService, private audio: AudioService, private notifications: NotificationService) {}

  ngOnChanges(ch: SimpleChanges) {
    if (!this.game) return;
    // Cargar jugadores de ambos equipos
    this.api.listGamePlayers(this.game.gameId, 'HOME').subscribe(p => (this.homePlayers = p));
    this.api.listGamePlayers(this.game.gameId, 'AWAY').subscribe(p => (this.awayPlayers = p));
    // Actualizar conteo de faltas
    this.refreshFouls();
  }

  private refresh() { this.changed.emit(); }

  private refreshFouls() {
    if (!this.game) return;
    this.api.getFoulSummary(this.game.gameId).subscribe(s => {
      const q = this.game.quarter;
      const th = s.team.find(r => r.quarter === q && r.team === 'HOME')?.fouls ?? 0;
      const ta = s.team.find(r => r.quarter === q && r.team === 'AWAY')?.fouls ?? 0;
      this.teamFouls = { home: th, away: ta };

      // Actualizar mapa de faltas por jugador
      this.playerFouls.clear();
      for (const row of s.players) {
        const prev = this.playerFouls.get(row.playerId) ?? 0;
        this.playerFouls.set(row.playerId, prev + (row.fouls ?? 0));
      }
    });
  }

  disabledScore() { return this.game?.status !== 'IN_PROGRESS'; }

  canAdvance(): boolean {
    if (!this.game || this.game.status !== 'IN_PROGRESS') return false;
    
    // Cuartos 1-3: siempre se puede avanzar
    if (this.game.quarter < 4) return true;
    
    // Cuarto 4+: solo si hay empate (fuerza tiempo extra)
    return this.game.homeScore === this.game.awayScore;
  }

  getAdvanceButtonText(): string {
    if (!this.game) return 'Advance';
    
    if (this.game.quarter < 4) {
      return `Q${this.game.quarter + 1}`;
    } else {
      const overtimeNum = this.game.quarter - 3;
      return `OT${overtimeNum}`;
    }
  }

  getQuarterText(): string {
    if (!this.game) return 'Q1';
    
    if (this.game.quarter <= 4) {
      return `Q${this.game.quarter}`;
    } else {
      const overtimeNum = this.game.quarter - 4;
      return `OT${overtimeNum}`;
    }
  }

  start()   { this.api.start(this.game.gameId).subscribe(() => this.refresh()); }
  advance() { 
    // Siguiente cuarto
    const nextQuarter = this.game.quarter + 1;
    const isOvertimeStart = nextQuarter >= 5;

    this.api.advance(this.game.gameId).subscribe(() => { 
      this.refresh(); 
      this.refreshFouls(); 
      // Reproducir sonido apropiado
      if (isOvertimeStart) {
        this.audio.playOvertimeStart();
        alert('Inicia Tiempo Extra');
      } else {
        this.audio.playQuarterEndWhistle();
      }
    }); 
  }
  finish()  { this.api.finish(this.game.gameId).subscribe(() => { 
    this.refresh(); 
    this.refreshFouls(); 
    this.audio.playGameEnd();
    const msg = `🏁 Partido finalizado: ${this.game.homeTeam} ${this.game.homeScore} - ${this.game.awayScore} ${this.game.awayTeam}`;
    this.notifications.showSuccess(msg, 6000);
  }); }
  undo()    { this.api.undo(this.game.gameId).subscribe(() => { this.refresh(); this.refreshFouls(); }); }

  score(team:'HOME'|'AWAY', points:1|2|3) {
    this.api.score(this.game.gameId, team, points).subscribe(() => { 
      this.refresh();
      this.audio.playScore();
    });
  }

  foul(team:'HOME'|'AWAY') {
    const playerId = team === 'HOME' ? this.selHomePlayerId : this.selAwayPlayerId;
    // Guardar conteo previo para detectar bonus
    const prevTeamCount = team === 'HOME' ? this.teamFouls.home : this.teamFouls.away;
    this.api.foul(this.game.gameId, team, { playerId }).subscribe(() => {
      this.refresh();
      this.refreshFouls();
      // Notificar bonus de tiros libres
      setTimeout(() => {
        const newTeamCount = team === 'HOME' ? this.teamFouls.home : this.teamFouls.away;
        if (newTeamCount !== prevTeamCount && newTeamCount > 4) {
          const over = newTeamCount - 4;
          const shots = over === 1 ? 1 : 2; // Regla: 5ta falta = 1 TL, 6+ = 2 TL
          const rival = team === 'HOME' ? 'AWAY' : 'HOME';
          const rivalName = rival === 'HOME' ? this.game.homeTeam : this.game.awayTeam;
          const msg = shots === 1
            ? `🎯 ${rivalName}: +1 tiro libre por faltas acumuladas del rival`
            : `🎯 ${rivalName}: +2 tiros libres por faltas acumuladas del rival`;
          this.notifications.showInfo(msg, 6000);
        }
      }, 150);

      // Verificar eliminación por faltas
      if (playerId != null) {
        // Esperar actualización del resumen
        setTimeout(() => {
          const count = this.playerFouls.get(playerId) ?? 0;
          if (count >= 5) {
            const pool = team === 'HOME' ? this.homePlayers : this.awayPlayers;
            const p: Player | undefined = pool.find(x => x.playerId === playerId);
            // Limpiar selección del jugador eliminado
            if (team === 'HOME' && this.selHomePlayerId === playerId) this.selHomePlayerId = undefined;
            if (team === 'AWAY' && this.selAwayPlayerId === playerId) this.selAwayPlayerId = undefined;

            const tag = p ? (p.number ? `#${p.number} ${p.name}` : p.name) : `Jugador ${playerId}`;
            this.notifications.showWarning(`🚫 ${tag} quedó OUT por 5 faltas`, 6000);
          }
        }, 150);
      }
    });
  }

  removeFoul(team:'HOME'|'AWAY') {
    const playerId = team === 'HOME' ? this.selHomePlayerId : this.selAwayPlayerId;
    const prevCount = playerId != null ? (this.playerFouls.get(playerId) ?? 0) : undefined;
    const wasOut = prevCount != null ? prevCount >= 5 : false;
    this.api.removeFoul(this.game.gameId, team, { playerId }).subscribe(() => {
      this.refresh();
      this.refreshFouls();

      setTimeout(() => {
        if (playerId != null) {
          const now = this.playerFouls.get(playerId) ?? 0;
          const pool = team === 'HOME' ? this.homePlayers : this.awayPlayers;
          const p: Player | undefined = pool.find(x => x.playerId === playerId);
          const tag = p ? (p.number ? `#${p.number} ${p.name}` : p.name) : `Jugador ${playerId}`;
          this.notifications.showInfo(`➖ Se quitó una falta a ${tag} (ahora: ${now})`, 5000);
          if (wasOut && now < 5) {
            this.notifications.showSuccess(`✅ ${tag} vuelve a estar habilitado (<5 faltas)`, 6000);
          }
        }
      }, 150);
    });
  }

  removeScore(team:'HOME'|'AWAY') {
    this.api.removeScore(this.game.gameId, team).subscribe(() => this.refresh());
  }

  // Helpers para la interfaz
  // Jugador eliminado por faltas
  isPlayerOut(p: Player): boolean {
    const fouls = this.playerFouls.get(p.playerId) ?? 0;
    return fouls >= 5;
  }

  isSelectedPlayerOut(side: 'HOME'|'AWAY'): boolean {
    const pid = side === 'HOME' ? this.selHomePlayerId : this.selAwayPlayerId;
    if (!pid) return false;
    const pool = side === 'HOME' ? this.homePlayers : this.awayPlayers;
    const p: Player | undefined = pool.find(x => x.playerId === pid);
    return !!(p && this.isPlayerOut(p));
  }
}