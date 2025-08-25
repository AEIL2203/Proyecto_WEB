import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { NotificationService, ToastNotification } from '../services/notification.service';

@Component({
  selector: 'app-toast-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let notification of notifications$ | async; trackBy: trackByFn"
        class="toast"
        [ngClass]="'toast-' + notification.type"
        (click)="removeNotification(notification.id)">
        <div class="toast-content">
          <div class="toast-icon">
            <span [ngSwitch]="notification.type">
              <span *ngSwitchCase="'success'">✅</span>
              <span *ngSwitchCase="'info'">ℹ️</span>
              <span *ngSwitchCase="'warning'">⚠️</span>
              <span *ngSwitchCase="'error'">❌</span>
            </span>
          </div>
          <div class="toast-message">{{ notification.message }}</div>
          <div class="toast-close">×</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 400px;
      pointer-events: none;
    }

    .toast {
      background: rgba(0, 0, 0, 0.9);
      border-radius: 8px;
      margin-bottom: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      animation: slideIn 0.3s ease-out forwards;
      pointer-events: all;
      cursor: pointer;
      border-left: 4px solid;
      backdrop-filter: blur(10px);
    }

    .toast-success {
      border-left-color: #10b981;
      background: rgba(16, 185, 129, 0.1);
    }

    .toast-info {
      border-left-color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
    }

    .toast-warning {
      border-left-color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
    }

    .toast-error {
      border-left-color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    .toast-content {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      gap: 12px;
    }

    .toast-icon {
      font-size: 18px;
      flex-shrink: 0;
    }

    .toast-message {
      flex: 1;
      color: white;
      font-size: 14px;
      line-height: 1.4;
      font-weight: 500;
    }

    .toast-close {
      color: rgba(255, 255, 255, 0.6);
      font-size: 20px;
      font-weight: bold;
      flex-shrink: 0;
      transition: color 0.2s;
    }

    .toast:hover .toast-close {
      color: white;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast.removing {
      animation: slideOut 0.3s ease-in forwards;
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `]
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
