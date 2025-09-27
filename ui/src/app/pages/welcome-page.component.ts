import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavigationBarComponent } from '../widgets/navigation-bar.component';
import { AuthService, AuthUser } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-welcome-page',
  imports: [CommonModule, RouterLink, NavigationBarComponent],
  template: `
    <app-navigation-bar></app-navigation-bar>

    <div class="welcome-container">
      <div class="welcome-card">
        <div class="emoji">👋</div>
        <h1>¡Bienvenido{{ user?.userName ? ',' : '' }} <strong>{{ user?.userName }}</strong>!</h1>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container { min-height: calc(100vh - 64px); display:flex; align-items:center; justify-content:center; padding: 24px; }
    .welcome-card { text-align:center; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); padding: 32px; border-radius: 16px; max-width: 560px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.12); }
    .emoji { font-size: 48px; margin-bottom: 8px; }
    h1 { margin: 0 0 8px; font-weight: 600; }
    .subtitle { opacity: .8; margin: 0 0 20px; }
    .quick-actions { display:flex; gap: 12px; justify-content:center; }
    .btn { padding: 10px 16px; border-radius: 999px; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); }
    .btn-primary { background: #2563eb; color: white; border-color: #2563eb; }
    .btn-ghost { color: inherit; }
  `]
})
export class WelcomePageComponent implements OnInit {
  user: AuthUser | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.auth.userChanges().subscribe(u => this.user = u);
  }
}
