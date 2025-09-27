import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterModule } from '@angular/router';

import { ApiService, GameDetail } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { ClockService } from '../services/clock.service';

import { NavigationBarComponent } from '../widgets/navigation-bar.component';
import { ScoreboardComponent } from '../widgets/scoreboard.component';
import { ControlPanelComponent } from '../widgets/control-panel.component';
import { ClockComponent } from '../widgets/clock.component';
import { TeamRosterComponent } from '../widgets/team-roster.component';

@Component({
  selector: 'app-control-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavigationBarComponent,
    ScoreboardComponent,
    ControlPanelComponent,
    ClockComponent,
    TeamRosterComponent,
  ],
  template: `
    <app-navigation-bar></app-navigation-bar>

    <div class="container" *ngIf="detail; else loadingTpl">
      <div style="padding: 12px 0;">
        <a [routerLink]="['/']" [queryParams]="{ section: 'games' }" class="btn btn-ghost">← Regresar a Crear Partidos</a>
      </div>
      <div class="card p-3" style="margin-top: 16px;">
        <div class="card-header" style="text-align:center; margin-bottom: 1rem;">
          <div class="card-title">🎮 Panel de Control</div>
          <div class="card-subtitle">{{ detail.game.homeTeam }} vs {{ detail.game.awayTeam }}</div>
        </div>

        <app-scoreboard [game]="detail.game"></app-scoreboard>

        <div class="mt-4" style="display:grid; justify-items:center;">
          <div style="width:100%; max-width:900px;">
            <app-control-panel [game]="detail.game" (changed)="reload()"></app-control-panel>
          </div>
        </div>

        <div class="mt-5 card p-3" style="margin-top: 1.25rem;">
          <app-clock
            [gameId]="detail.game.gameId"
            [status]="detail.game.status"
            [quarter]="detail.game.quarter"
            [showTeamFouls]="false"
            (expired)="onExpire()">
          </app-clock>
        </div>

        <div class="mt-5" style="display:grid; gap:1.25rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); margin-top: 1.25rem;">
          <div class="card p-3" style="min-width:0;">
            <app-team-roster [gameId]="detail.game.gameId" side="HOME"></app-team-roster>
          </div>
          <div class="card p-3" style="min-width:0;">
            <app-team-roster [gameId]="detail.game.gameId" side="AWAY"></app-team-roster>
          </div>
        </div>
      </div>
    </div>

    <ng-template #loadingTpl>
      <div class="container" style="padding: 24px;">Cargando…</div>
    </ng-template>
  `,
})
export class ControlPageComponent implements OnInit {
  detail: GameDetail | null = null;
  private gameId!: number;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private notifications: NotificationService,
    private clock: ClockService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((p: ParamMap) => {
      const idStr = p.get('id');
      const id = idStr ? +idStr : NaN;
      if (!isNaN(id) && id > 0) {
        this.gameId = id;
        this.reload();
        // Si llega quarterMs por query, forzar ese valor para asegurar vista correcta (p.ej., 10s)
        const qmsStr = this.route.snapshot.queryParamMap.get('quarterMs');
        const qms = qmsStr ? +qmsStr : NaN;
        if (!isNaN(qms) && qms > 0) {
          this.clock.resetForNewQuarter(this.gameId, qms);
        }
      }
    });
  }

  reload() {
    this.api.getGame(this.gameId).subscribe((d) => this.detail = d);
  }

  onExpire() {
    if (!this.detail) return;
    const g = this.detail.game;
    if (g.status === 'IN_PROGRESS' && g.quarter < 4) {
      this.api.advance(g.gameId).subscribe({
        next: () => this.reload(),
        error: () => this.notifications.showError('No se pudo avanzar de cuarto'),
      });
    }
  }
}
