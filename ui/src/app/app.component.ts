import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

// Core components
import { GlobalLoadingComponent } from './core/components/global-loading/global-loading.component';

// Shared components
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastNotificationsComponent } from './widgets/toast-notifications.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    ToastNotificationsComponent,
    GlobalLoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Marcador de Baloncesto';
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Scroll to top on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}
