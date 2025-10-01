import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable, Subject, merge, filter, interval, startWith,
  switchMap, shareReplay, map, tap, catchError, of
} from 'rxjs';

export interface ClockState {
  running: boolean;
  remainingMs: number;
  quarterMs: number;
}

// DTO del backend
interface ClockStateDto {
  gameId: number;
  quarter: number;
  quarterMs: number;
  running: boolean;
  remainingMs: number;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ClockService {
  // Base URL para las peticiones del reloj
  private base = '/api';

  // Notifica cambios en el reloj para sincronizar vistas
  private clockChanged$ = new Subject<number>();

  constructor(private http: HttpClient) {}

  // Estado del reloj con polling automático y sincronización
  state$(gameId: number): Observable<ClockState> {
    return merge(
      interval(1000).pipe(startWith(0)),
      this.clockChanged$.pipe(filter(id => id === gameId))
    ).pipe(
      switchMap(() =>
        this.http.get<ClockStateDto>(`${this.base}/games/${gameId}/clock`).pipe(
          map(dto => ({
            running: dto.running,
            remainingMs: dto.remainingMs,
            quarterMs: dto.quarterMs
          })),
          // Mantiene el stream activo aunque falle la petición
          catchError(() => of<ClockState>({ running: false, remainingMs: 0, quarterMs: 0 }))
        )
      ),
      shareReplay(1)
    );
  }

  // Inicia o reanuda el reloj
  start(gameId: number) {
    this.http.post(`${this.base}/games/${gameId}/clock/start`, {})
      .pipe(tap(() => this.clockChanged$.next(gameId)))
      .subscribe({ error: () => {/* opcional: toast/log */} });
  }

  // Pausa el reloj
  pause(gameId: number) {
    this.http.post(`${this.base}/games/${gameId}/clock/pause`, {})
      .pipe(tap(() => this.clockChanged$.next(gameId)))
      .subscribe({ error: () => {/* opcional: toast/log */} });
  }

  // Reinicia el reloj
  resetForNewQuarter(gameId: number, quarterMs?: number) {
    const body = quarterMs ? { quarterMs } : {};
    this.http.post(`${this.base}/games/${gameId}/clock/reset`, body)
      .pipe(tap(() => this.clockChanged$.next(gameId)))
      .subscribe({ error: () => {/* opcional: toast/log */} });
  }

  stop(gameId: number) { this.pause(gameId); }
}
