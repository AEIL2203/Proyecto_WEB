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

  /**
   * Obtiene el observable de notificaciones
   */
  getNotifications() {
    return this.notifications$.asObservable();
  }

  /**
   * Muestra una notificación de éxito
   */
  showSuccess(message: string, duration: number = 4000): void {
    this.addNotification(message, 'success', duration);
  }

  /**
   * Muestra una notificación informativa
   */
  showInfo(message: string, duration: number = 4000): void {
    this.addNotification(message, 'info', duration);
  }

  /**
   * Muestra una notificación de advertencia
   */
  showWarning(message: string, duration: number = 5000): void {
    this.addNotification(message, 'warning', duration);
  }

  /**
   * Muestra una notificación de error
   */
  showError(message: string, duration: number = 6000): void {
    this.addNotification(message, 'error', duration);
  }

  /**
   * Agrega una nueva notificación
   */
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

    // Auto-remover después del tiempo especificado
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, duration);
  }

  /**
   * Remueve una notificación por ID
   */
  removeNotification(id: string): void {
    const current = this.notifications$.value;
    const filtered = current.filter(n => n.id !== id);
    this.notifications$.next(filtered);
  }

  /**
   * Limpia todas las notificaciones
   */
  clearAll(): void {
    this.notifications$.next([]);
  }

  /**
   * Genera un ID único para la notificación
   */
  private generateId(): string {
    return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
