import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    title: 'Panel de Administración | Marcador de Baloncesto',
    children: [
      // Aquí puedes agregar rutas hijas del panel de administración
      // Por ejemplo: gestión de usuarios, equipos, partidos, etc.
      // { path: 'users', component: UsersComponent, title: 'Usuarios' },
      // { path: 'teams', component: TeamsComponent, title: 'Equipos' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];
