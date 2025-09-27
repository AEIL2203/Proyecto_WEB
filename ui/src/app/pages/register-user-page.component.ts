import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  standalone: true,
  selector: 'app-register-user-page',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <div class="user-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white"/>
          </svg>
        </div>
        <h2>REGISTRARSE</h2>
      </div>

      <form (ngSubmit)="onSubmit()" #f="ngForm" class="register-form">
        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#5DADE2"/>
              <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#5DADE2"/>
            </svg>
          </div>
          <input 
            type="text" 
            name="userName" 
            [(ngModel)]="userName" 
            placeholder="Usuario" 
            required 
            class="form-input"
          />
        </div>

        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#5DADE2"/>
            </svg>
          </div>
          <input 
            type="email" 
            name="email" 
            [(ngModel)]="email" 
            placeholder="Correo electrónico" 
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
            name="password" 
            [(ngModel)]="password" 
            placeholder="Contraseña" 
            required 
            minlength="6"
            class="form-input"
          />
        </div>

        <div class="input-group">
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#5DADE2"/>
            </svg>
          </div>
          <select name="role" [(ngModel)]="role" class="form-select">
            <option value="User">Usuario</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        <div *ngIf="error" class="error-message">{{ error }}</div>
        <div *ngIf="success" class="success-message">
          ¡Usuario creado exitosamente! Redirigiendo al login en {{ countdown }} segundos...
        </div>

        <button type="submit" [disabled]="loading" class="register-btn">
          {{ loading ? 'CREANDO CUENTA...' : 'CREAR CUENTA' }}
        </button>

        <div class="login-link">
          <a href="#" (click)="goHome(); $event.preventDefault()">¿Ya tienes una cuenta? Inicia sesión aquí</a>
        </div>
      </form>
    </div>
  </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .register-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      width: 100%;
      max-width: 450px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .register-header {
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

    .register-header h2 {
      color: white;
      font-size: 28px;
      font-weight: 300;
      margin: 0;
      letter-spacing: 2px;
    }

    .register-form {
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

    .form-input, .form-select {
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

    .form-input:focus, .form-select:focus {
      background: white;
      box-shadow: 0 0 0 2px rgba(93, 173, 226, 0.5);
    }

    .form-input::placeholder {
      color: #999;
    }

    .form-select {
      cursor: pointer;
    }

    .error-message {
      background: rgba(220, 53, 69, 0.9);
      color: white;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      text-align: center;
    }

    .success-message {
      background: rgba(40, 167, 69, 0.9);
      color: white;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      text-align: center;
    }

    .register-btn {
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

    .register-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .register-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .login-link {
      text-align: center;
      margin-top: 10px;
    }

    .login-link a {
      color: white;
      text-decoration: none;
      font-size: 14px;
      opacity: 0.8;
      transition: opacity 0.3s ease;
    }

    .login-link a:hover {
      opacity: 1;
      text-decoration: underline;
    }
  `]
})
export class RegisterUserPageComponent implements OnInit {
  userName = '';
  email = '';
  password = '';
  role: 'User' | 'Admin' = 'User';
  loading = false;
  error = '';
  success = false;
  createdId: number | null = null;
  countdown = 3;
  isPublicRegistration = false;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Detectar si es registro público o de administrador
    this.isPublicRegistration = this.router.url === '/register';
    
    // Si es registro público, forzar rol de Usuario
    if (this.isPublicRegistration) {
      this.role = 'User';
    }
  }

  onSubmit() {
    this.error = '';
    this.success = false;
    this.createdId = null;

    if (!this.userName || !this.password) {
      this.error = 'Usuario y contraseña son requeridos';
      return;
    }

    this.loading = true;
    const payload = { userName: this.userName, password: this.password, email: this.email || undefined, role: this.role };
    this.api.createUser(payload).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.success = true;
        this.createdId = response.userId || response.id;
        
        // Iniciar countdown y redirección
        this.startCountdownAndRedirect();
        
        // Limpiar formulario
        this.userName = '';
        this.email = '';
        this.password = '';
        this.role = 'User';
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Error al crear usuario';
      }
    });
  }

  startCountdownAndRedirect() {
    this.countdown = 3;
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  goHome() {
    // Si es registro público, ir al login. Si es admin, ir al home
    if (this.isPublicRegistration) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
