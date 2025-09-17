import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5 text-center">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header bg-danger text-white">
              <h1>Acceso No Autorizado</h1>
            </div>
            <div class="card-body">
              <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">¡Lo sentimos!</h4>
                <p>No tienes los permisos necesarios para acceder a esta página.</p>
                <hr>
                <p class="mb-0">
                  Por favor, contacta al administrador si crees que esto es un error o 
                  <a routerLink="/login" class="alert-link">inicia sesión</a> con una cuenta diferente.
                </p>
              </div>
              <button routerLink="/" class="btn btn-primary">
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      border: none;
    }
    .card-header {
      padding: 1.5rem;
    }
  `]
})
export class UnauthorizedComponent {}
