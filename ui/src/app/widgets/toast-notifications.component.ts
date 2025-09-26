import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { NotificationService, ToastNotification } from '../services/notification.service';

@Component({
  selector: 'app-toast-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notifications.component.html',
  styleUrls: ['./toast-notifications.component.css']
})
export class ToastNotificationsComponent implements OnInit, OnDestroy {
  notifications$: Observable<ToastNotification[]>;
  private subscription?: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.getNotifications();
  }

  ngOnInit(): void {
    // Opcional: suscribirse para lógica adicional si es necesario
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  removeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }

  trackByFn(index: number, item: ToastNotification): string {
    return item.id;
  }
}
