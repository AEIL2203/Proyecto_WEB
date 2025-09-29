import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';
import { DisplayPageComponent } from './pages/display-page.component';
import { ResultsPageComponent } from './pages/results-page.component'; 
import { LoginPageComponent } from './pages/login-page.component';
import { PlayerFormPageComponent } from './pages/player-form-page.component';
import { authGuard } from './services/auth.guard';
import { adminGuard } from './services/admin.guard';
import { RegisterUserPageComponent } from './pages/register-user-page.component';
import { UserListPageComponent } from './pages/user-list-page.component';
import { WelcomePageComponent } from './pages/welcome-page.component';
import { ControlPageComponent } from './pages/control-page.component';
import { TournamentPageComponent } from './pages/tournament-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [authGuard] }, // tablero de control (protegido)
  { path: 'welcome', component: WelcomePageComponent, canActivate: [authGuard] }, // pantalla de bienvenida (protegido)
  { path: 'tournament', component: TournamentPageComponent, canActivate: [authGuard] }, // página de torneos (protegido)
  { path: 'controls/:id', component: ControlPageComponent, canActivate: [authGuard] }, // página dedicada de controles (protegido)
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterUserPageComponent }, // registro público
  { path: 'admin/users', component: UserListPageComponent, canActivate: [adminGuard] }, // lista de usuarios (solo admin)
  { path: 'admin/register-user', component: RegisterUserPageComponent, canActivate: [adminGuard] }, // solo administradores
  { path: 'display/:id', component: DisplayPageComponent },   // tablero público 
  { path: 'results', component: ResultsPageComponent },       // página de resultados
  { path: 'players/new', component: PlayerFormPageComponent, canActivate: [authGuard] }, // formulario de jugador (protegido)
  { path: '**', redirectTo: '' }
];
