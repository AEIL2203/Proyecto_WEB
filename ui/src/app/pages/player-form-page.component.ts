import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SectionHeaderComponent } from '../widgets/section-header.component';
import { ApiService, Team } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-player-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeaderComponent],
  templateUrl: './player-form-page.component.html',
})
export class PlayerFormPageComponent {
  teams: Team[] = [];

  model: {
    teamId: number | null;
    name: string;
    number?: number | null;
    position?: string | null;
    height?: number | null;      // pendiente soporte backend
    age?: number | null;         // pendiente soporte backend
    nationality?: string | null; // pendiente soporte backend
  } = {
    teamId: null,
    name: '',
    number: null,
    position: null,
    height: null,
    age: null,
    nationality: null,
  };

  saving = false;
  errorMsg = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationService,
  ) {
    this.api.listTeams().subscribe(ts => {
      this.teams = ts;
      // Prefijar equipo si viene en la URL
      const teamIdParam = this.route.snapshot.queryParamMap.get('teamId');
      if (teamIdParam) {
        const id = +teamIdParam;
        if (!isNaN(id) && id > 0) this.model.teamId = id;
      }
    });
  }

  trackTeam = (_: number, t: Team) => t.teamId;

  onSubmit() {
    if (!this.model.teamId) {
      this.errorMsg = 'Selecciona un equipo';
      return;
    }
    const name = (this.model.name ?? '').trim();
    if (!name) {
      this.errorMsg = 'El nombre es requerido';
      return;
    }
    // Validación de número si viene
    let num: number | undefined;
    if (this.model.number !== null && this.model.number !== undefined && (this.model.number as any) !== '') {
      if (!Number.isInteger(this.model.number) || (this.model.number as number) < 0 || (this.model.number as number) > 99) {
        this.errorMsg = 'El número debe ser entero entre 0 y 99';
        return;
      }
      num = this.model.number ?? undefined;
    }

    this.saving = true;
    this.errorMsg = '';
    this.api.createPlayer(this.model.teamId, {
      name,
      number: num,
      position: (this.model.position || undefined) as any,
    }).subscribe({
      next: () => {
        this.notifications.showSuccess('Jugador creado correctamente');
        // Nota: height, age, nationality quedan pendientes de backend
        this.router.navigate([''], { queryParams: { section: 'players' } });
      },
      error: (err) => {
        this.errorMsg = err?.error?.error || 'No se pudo crear el jugador.';
      },
      complete: () => (this.saving = false),
    });
  }

  goBack() {
    this.router.navigate([''], { queryParams: { section: 'players' } });
  }
}
