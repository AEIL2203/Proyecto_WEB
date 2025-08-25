import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Game, Player, ApiService, FoulSummary } from '../services/api.service';
import { ClockService, ClockState } from '../services/clock.service';

// Pipe para convertir milisegundos a formato MM:SS
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'msToClock', standalone: true })
export class MsToClockPipe implements PipeTransform {
  transform(ms?: number): string {
    if (ms == null) return '00:00';
    const total = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(total / 60).toString().padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
}

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule, MsToClockPipe],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit, OnDestroy, OnChanges {
  @Input({ required: true }) game!: Game;
  @Input() showPlayerManagement = true;

  // Clock state (read-only)
  clockState$?: Observable<ClockState>;
  
  // Players (read-only)
  homePlayers: Player[] = [];
  awayPlayers: Player[] = [];
  
  // Fouls tracking (read-only)
  private foulSummary: FoulSummary = { team: [], players: [] };
  private subscriptions: Subscription[] = [];

  constructor(
    private clockService: ClockService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initializeClock();
    this.loadPlayers();
    this.loadFoulSummary();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['game'] && !changes['game'].firstChange) {
      this.initializeClock();
      this.loadPlayers();
      this.loadFoulSummary();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private initializeClock() {
    if (this.game?.gameId) {
      this.clockState$ = this.clockService.state$(this.game.gameId);
    }
  }

  private loadPlayers() {
    if (!this.game?.gameId) return;

    // Load home team players
    if (this.game.homeTeamId) {
      this.apiService.listPlayers(this.game.homeTeamId).subscribe({
        next: (players) => this.homePlayers = players,
        error: () => this.homePlayers = []
      });
    } else {
      // If no homeTeamId, try to get players by game
      this.apiService.listGamePlayers(this.game.gameId, 'HOME').subscribe({
        next: (players) => this.homePlayers = players,
        error: () => this.homePlayers = []
      });
    }

    // Load away team players
    if (this.game.awayTeamId) {
      this.apiService.listPlayers(this.game.awayTeamId).subscribe({
        next: (players) => this.awayPlayers = players,
        error: () => this.awayPlayers = []
      });
    } else {
      // If no awayTeamId, try to get players by game
      this.apiService.listGamePlayers(this.game.gameId, 'AWAY').subscribe({
        next: (players) => this.awayPlayers = players,
        error: () => this.awayPlayers = []
      });
    }
  }

  private loadFoulSummary() {
    if (!this.game?.gameId) return;

    this.apiService.getFoulSummary(this.game.gameId).subscribe({
      next: (summary) => this.foulSummary = summary,
      error: () => this.foulSummary = { team: [], players: [] }
    });
  }

  // Display-only method for showing player fouls
  getPlayerFouls(playerId: number): number {
    const currentQuarter = this.game.quarter;
    return this.foulSummary.players
      .filter(f => f.playerId === playerId && f.quarter === currentQuarter)
      .reduce((total, f) => total + f.fouls, 0);
  }

  // Get total team fouls for current quarter
  getTeamFouls(team: 'HOME' | 'AWAY'): number {
    const currentQuarter = this.game.quarter;
    return this.foulSummary.team
      .filter(f => f.team === team && f.quarter === currentQuarter)
      .reduce((total, f) => total + f.fouls, 0);
  }

  // Get total team fouls for entire game
  getTotalTeamFouls(team: 'HOME' | 'AWAY'): number {
    return this.foulSummary.team
      .filter(f => f.team === team)
      .reduce((total, f) => total + f.fouls, 0);
  }

  // Get quarter text for display (Q1-Q4, OT1, OT2, etc.)
  getQuarterText(): string {
    if (!this.game) return 'Q1';
    
    if (this.game.quarter <= 4) {
      return `Q${this.game.quarter}`;
    } else {
      const overtimeNum = this.game.quarter - 4;
      return `OT${overtimeNum}`;
    }
  }
}
