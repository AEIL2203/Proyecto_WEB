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
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="user-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="white"/>
            <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="white"/>
          </svg>
        </div>
        <h2>INICIAR SESIÓN</h2>
      </div>

      <form (ngSubmit)="onSubmit()" #f="ngForm" class="login-form">
        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#5DADE2"/>
              <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#5DADE2"/>
            </svg>
          </div>
          <input 
            type="text" 
            name="user" 
            [(ngModel)]="userName" 
            placeholder="Usuario" 
            required 
            class="form-input"
          />
        </div>

        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15S10.9 13 12 13S14 13.9 14 15S13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9S15.1 4.29 15.1 6V8Z" fill="#5DADE2"/>
            </svg>
          </div>
          <input 
            type="password" 
            name="pass" 
            [(ngModel)]="password" 
            placeholder="Contraseña" 
            required 
            class="form-input"
          />
        </div>

        <div class="remember-me">
          <input type="checkbox" id="remember" />
          <label for="remember">Recordarme</label>
        </div>

        <div *ngIf="error" class="error-message">{{ error }}</div>

        <button type="submit" [disabled]="loading" class="login-btn">
          {{ loading ? 'INICIANDO SESIÓN...' : 'INICIAR SESIÓN' }}
        </button>

        <div class="forgot-password">
          <a href="#" (click)="goToRegister(); $event.preventDefault()">Crear cuenta</a>
        </div>
      </form>
    </div>
  </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .login-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .user-icon {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }

    .login-header h2 {
      color: white;
      font-size: 28px;
      font-weight: 300;
      margin: 0;
      letter-spacing: 2px;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .input-group {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
    }

    .form-input {
      width: 100%;
      padding: 15px 15px 15px 50px;
      border: none;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      box-sizing: border-box;
      outline: none;
      transition: all 0.3s ease;
    }

    .form-input:focus {
      background: white;
      box-shadow: 0 0 0 2px rgba(93, 173, 226, 0.5);
    }

    .form-input::placeholder {
      color: #999;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
      font-size: 14px;
    }

    .remember-me input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }

    .error-message {
      background: rgba(220, 53, 69, 0.9);
      color: white;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      text-align: center;
    }

    .login-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 15px;
      border-radius: 25px;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .login-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .forgot-password {
      text-align: center;
      margin-top: 10px;
    }

    .forgot-password a {
      color: white;
      text-decoration: none;
      font-size: 14px;
      opacity: 0.8;
      transition: opacity 0.3s ease;
    }

    .forgot-password a:hover {
      opacity: 1;
      text-decoration: underline;
    }
  `]
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
        this.router.navigateByUrl('/welcome');
      },
      error: () => {
        this.loading = false;
        this.error = 'Credenciales inválidas';
      }
    });
  }

  goToRegister() {
    console.log('Botón clickeado - Navegando a registro...');
    try {
      this.router.navigateByUrl('/register').then(success => {
        console.log('Navegación exitosa:', success);
      }).catch(error => {
        console.error('Error en navegación:', error);
      });
    } catch (error) {
      console.error('Error al intentar navegar:', error);
    }
  }
}
