import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';
import { DisplayPageComponent } from './pages/display-page.component';
import { ResultsPageComponent } from './pages/results-page.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './core/pages/unauthorized/unauthorized.component';

export const routes: Routes = [
  // Public routes
  { 
    path: 'login', 
    component: LoginComponent,
    title: 'Iniciar Sesión | Marcador de Baloncesto'
  },
  { 
    path: 'unauthorized', 
    component: UnauthorizedComponent,
    title: 'No Autorizado | Marcador de Baloncesto'
  },
  // Public display route (no authentication required)
  { 
    path: 'display/:id', 
    component: DisplayPageComponent,
    title: 'Marcador en Vivo | Marcador de Baloncesto'
  },
  // Protected routes (require authentication)
  { 
    path: '', 
    component: HomePageComponent,
    canActivate: [authGuard],
    title: 'Inicio | Marcador de Baloncesto'
  },
  { 
    path: 'admin', 
    canActivate: [authGuard],
    data: { role: 'Admin' },
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { 
    path: 'results', 
    component: ResultsPageComponent,
    canActivate: [authGuard],
    title: 'Resultados | Marcador de Baloncesto'
  },
  // Fallback route - Redirect to home
  { 
    path: '**', 
    redirectTo: '' 
  }
];
