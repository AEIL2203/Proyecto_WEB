import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container" style="max-width:420px;margin:40px auto;">
    <h2>Acceso administrador</h2>

    <form (ngSubmit)="onSubmit()" #f="ngForm">
      <div class="form-group" style="margin-bottom:12px;">
        <label>Usuario</label>
        <input class="form-control" name="user" [(ngModel)]="userName" required />
      </div>
      <div class="form-group" style="margin-bottom:16px;">
        <label>Contraseña</label>
        <input class="form-control" name="pass" [(ngModel)]="password" type="password" required />
      </div>

      <div *ngIf="error" style="color:#c00;margin-bottom:12px;">{{ error }}</div>

      <button class="btn btn-primary" [disabled]="loading">{{ loading ? 'Ingresando…' : 'Ingresar' }}</button>
    </form>
  </div>
  `
})
export class LoginPageComponent {
  userName = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    if (!this.userName || !this.password) { this.error = 'Complete usuario y contraseña'; return; }
    this.loading = true;
    this.auth.login(this.userName, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.loading = false;
        this.error = 'Credenciales inválidas';
      }
    });
  }
}
