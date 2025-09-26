import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';
import { DisplayPageComponent } from './pages/display-page.component';
import { ResultsPageComponent } from './pages/results-page.component'; 
import { LoginPageComponent } from './pages/login-page.component';
import { PlayerFormPageComponent } from './pages/player-form-page.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [authGuard] }, // tablero de control (protegido)
  { path: 'login', component: LoginPageComponent },
  { path: 'display/:id', component: DisplayPageComponent },   // tablero público 
  { path: 'results', component: ResultsPageComponent },       // página de resultados
  { path: 'players/new', component: PlayerFormPageComponent, canActivate: [authGuard] }, // formulario de jugador (protegido)
  { path: '**', redirectTo: '' }
];
