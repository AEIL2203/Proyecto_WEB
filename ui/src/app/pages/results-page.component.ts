import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PlayerFoulsQPipe } from './ui.pipes';

import { ApiService, Game, GameDetail, Player, FoulSummary } from '../services/api.service';
import { TeamFoulsPipe, PlayerFoulsTotalPipe, IsBonusPipe } from './ui.pipes';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TeamFoulsPipe,
    PlayerFoulsTotalPipe,
    IsBonusPipe,
    PlayerFoulsQPipe,
  ],
  templateUrl: './results-page.component.html',
})
export class ResultsPageComponent {
  // Filtros de búsqueda
  q = '';
  statusFilter: 'ALL' | 'FINISHED' | 'IN_PROGRESS' | 'SCHEDULED' = 'FINISHED';

  // Datos del componente
  games: Game[] = [];
  filtered: Game[] = [];
  selected: GameDetail | null = null;
  homeRoster: Player[] = [];
  awayRoster: Player[] = [];
  foulSummary: FoulSummary | null = null;

  // Jugadores eliminados
  outSet = new Set<number>();

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.reload();

    // Cargar juego desde parámetro URL
    const idParam = this.route.snapshot.queryParamMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isNaN(id)) {
      // Carga directa del detalle
      this.api.getGame(id).subscribe(d => {
        this.selected = d;
        this.loadAuxFor(d.game.gameId);
      });
    }
  }

  // Listado y filtros
  reload() {
    this.api.listGames().subscribe((g) => {
      this.games = g;
      this.applyFilters();
    });
  }

  applyFilters() {
    const q = this.q.trim().toLowerCase();
    this.filtered = this.games.filter((x) => {
      const okS = this.statusFilter === 'ALL' || x.status === this.statusFilter;
      const txt = `${x.homeTeam} ${x.awayTeam}`.toLowerCase();
      const okQ = !q || txt.includes(q);
      return okS && okQ;
    });
  }

  // Detalle del juego
  view(game: Game | number) {
    const gameId = typeof game === 'number' ? game : game.gameId;
    forkJoin({
      detail: this.api.getGame(gameId),
      home: this.api.listGamePlayers(gameId, 'HOME'),
      away: this.api.listGamePlayers(gameId, 'AWAY'),
      summary: this.api.getFoulSummary(gameId),
    }).subscribe(({ detail, home, away, summary }) => {
      // Ordenar eventos por fecha
      detail.events = [...detail.events].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      this.selected = detail;
      this.homeRoster = home;
      this.awayRoster = away;
      this.foulSummary = summary;
      this.computeOuts();
    });
  }

  // Carga rosters y resumen del juego seleccionado
  private loadAuxFor(gameId: number) {
    forkJoin({
      home: this.api.listGamePlayers(gameId, 'HOME'),
      away: this.api.listGamePlayers(gameId, 'AWAY'),
      summary: this.api.getFoulSummary(gameId),
    }).subscribe(({ home, away, summary }) => {
      this.homeRoster = home;
      this.awayRoster = away;
      this.foulSummary = summary;
      this.computeOuts();
    });
  }

  // Marca jugadores eliminados por faltas
  private computeOuts() {
    this.outSet.clear();
    if (!this.selected) return;

    // Jugadores descalificados por eventos
    for (const e of this.selected.events) {
      if ((e.eventType === 'FOUL_OUT' || e.eventType === 'DISQUALIFIED') && e.playerId != null) {
        this.outSet.add(e.playerId);
      }
    }

    // Jugadores con 5+ faltas personales
    const rows = this.foulSummary?.players ?? [];
    const countByPlayer = new Map<number, number>();
    for (const r of rows) {
      const prev = countByPlayer.get(r.playerId) ?? 0;
      countByPlayer.set(r.playerId, prev + (r.fouls ?? 0));
    }
    for (const [pid, total] of countByPlayer) {
      if (total >= 5) this.outSet.add(pid);
    }
  }
}
