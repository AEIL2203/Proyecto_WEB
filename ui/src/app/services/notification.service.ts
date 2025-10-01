import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<ToastNotification[]>([]);
  
  constructor() {}

  // Observable de notificaciones
  getNotifications() {
    return this.notifications$.asObservable();
  }

  // Muestra notificación de éxito
  showSuccess(message: string, duration: number = 4000): void {
    this.addNotification(message, 'success', duration);
  }

  // Muestra notificación informativa
  showInfo(message: string, duration: number = 4000): void {
    this.addNotification(message, 'info', duration);
  }

  // Muestra notificación de advertencia
  showWarning(message: string, duration: number = 5000): void {
    this.addNotification(message, 'warning', duration);
  }

  // Muestra notificación de error
  showError(message: string, duration: number = 6000): void {
    this.addNotification(message, 'error', duration);
  }

  // Agrega nueva notificación
  private addNotification(message: string, type: ToastNotification['type'], duration: number): void {
    const notification: ToastNotification = {
      id: this.generateId(),
      message,
      type,
      duration,
      timestamp: new Date()
    };

    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);

    // Remover automáticamente
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, duration);
  }

  // Remueve notificación por ID
  removeNotification(id: string): void {
    const current = this.notifications$.value;
    const filtered = current.filter(n => n.id !== id);
    this.notifications$.next(filtered);
  }

  // Limpia todas las notificaciones
  clearAll(): void {
    this.notifications$.next([]);
  }

  // Genera ID único
  private generateId(): string {
    return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
