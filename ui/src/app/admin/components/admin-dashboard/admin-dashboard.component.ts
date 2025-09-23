import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active text-white" routerLink="/admin" routerLinkActive="active">
                  <i class="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" routerLink="users" routerLinkActive="active">
                  <i class="bi bi-people me-2"></i>
                  Usuarios
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" routerLink="teams" routerLinkActive="active">
                  <i class="bi bi-people-fill me-2"></i>
                  Equipos
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" routerLink="games" routerLinkActive="active">
                  <i class="bi bi-calendar3 me-2"></i>
                  Partidos
                </a>
              </li>
              <li class="nav-item mt-4">
                <a class="nav-link text-white" routerLink="/" routerLinkActive="active">
                  <i class="bi bi-arrow-left-circle me-2"></i>
                  Volver a la Aplicación
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Main content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Panel de Administración</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group me-2">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  <i class="bi bi-download me-1"></i>
                  Exportar
                </button>
              </div>
              <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <i class="bi bi-calendar3 me-1"></i>
                Esta semana
              </button>
            </div>
          </div>

          <!-- Dashboard Content -->
          <div class="row">
            <div class="col-md-4 mb-4">
              <div class="card text-white bg-primary">
                <div class="card-body">
                  <h5 class="card-title">Usuarios Registrados</h5>
                  <h2 class="card-text">1,234</h2>
                  <p class="card-text"><small>+15% desde el mes pasado</small></p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card text-white bg-success">
                <div class="card-body">
                  <h5 class="card-title">Partidos Activos</h5>
                  <h2 class="card-text">12</h2>
                  <p class="card-text"><small>+2 desde ayer</small></p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card text-white bg-warning">
                <div class="card-body">
                  <h5 class="card-title">Equipos Registrados</h5>
                  <h2 class="card-text">48</h2>
                  <p class="card-text"><small>+3 este mes</small></p>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Actividad Reciente</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Usuario</th>
                      <th>Acción</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>usuario&#64;ejemplo.com</td>
                      <td>Inició sesión</td>
                      <td>Hace 2 minutos</td>
                      <td><span class="badge bg-success">Completado</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>admin&#64;ejemplo.com</td>
                      <td>Actualizó configuración</td>
                      <td>Hace 15 minutos</td>
                      <td><span class="badge bg-success">Completado</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>usuario2&#64;ejemplo.com</td>
                      <td>Registro fallido</td>
                      <td>Hace 1 hora</td>
                      <td><span class="badge bg-danger">Fallido</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Router outlet for child routes -->
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      padding: 48px 0 0;
      box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }

    .sidebar .nav-link {
      font-weight: 500;
      color: #adb5bd;
    }

    .sidebar .nav-link:hover {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .sidebar .nav-link.active {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.2);
    }

    .sidebar .nav-link i {
      margin-right: 4px;
      color: #6c757d;
    }

    .sidebar .nav-link.active i {
      color: #fff;
    }

    main {
      padding-top: 1rem;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Verificar permisos de administrador
    if (!this.authService.hasRole('Admin')) {
      // Redirigir a la página de no autorizado
      // this.router.navigate(['/unauthorized']);
    }
  }
}
