import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  username: string | null = null;
  userRole: string | null = null;
  private authSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateAuthState();
    
    // Suscribirse a los cambios de autenticación
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user) {
        this.username = user.username;
        this.userRole = user.role;
      } else {
        this.username = null;
        this.userRole = null;
      }
    });
  }

  ngOnDestroy() {
    // Limpiar la suscripción
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateAuthState() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      const user = this.authService.currentUserValue;
      this.username = user?.username || null;
      this.userRole = user?.role || null;
    } else {
      this.username = null;
      this.userRole = null;
    }
  }
  
  logout() {
    this.authService.logout();
    this.updateAuthState();
    this.router.navigate(['/login']);
  }
}
