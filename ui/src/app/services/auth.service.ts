import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from '../core/services/storage.service';
import { User } from '../models/user.model';

export interface LoginResponse {
  token: string;
  userId: number;
  role: string;
  expiration: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user';
  private readonly apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Inicializar el usuario desde el almacenamiento local
    const userJson = this.storageService.getItem(this.USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      userJson ? JSON.parse(userJson) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
    // Configurar el temporizador de expiración del token si existe un usuario
    if (this.currentUserValue) {
      const token = this.getToken();
      if (token) {
        this.setAutoLogout(this.getTokenExpiration(token));
      }
    }
  }

  /**
   * Obtiene el valor actual del usuario autenticado
   */
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtiene el token de autenticación
   */
  getToken(): string | null {
    return this.storageService.getItem(this.TOKEN_KEY);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Verificar si el token ha expirado
    const expiration = this.getTokenExpiration(token);
    return expiration > new Date();
  }

  /**
   * Inicia sesión con las credenciales proporcionadas
   */
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`, 
      { username, password },
      {
        withCredentials: true, // Importante para CORS con credenciales
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).pipe(
      tap(response => {
        this.handleAuthentication(response);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Cierra la sesión del usuario actual
   */
  logout(): void {
    // Limpiar el almacenamiento local
    this.storageService.removeItem(this.TOKEN_KEY);
    this.storageService.removeItem(this.USER_KEY);
    
    // Limpiar el temporizador de expiración
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
    
    // Emitir que el usuario ha cerrado sesión
    this.currentUserSubject.next(null);
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }

  /**
   * Maneja la respuesta de autenticación exitosa
   */
  private handleAuthentication(response: LoginResponse): User {
    if (response?.token) {
      // Guardar el token y el usuario
      this.storageService.setItem(this.TOKEN_KEY, response.token);
      
      const user: User = {
        id: response.userId,
        username: response.username || '',
        role: response.role
      };
      
      // Guardar el usuario en el almacenamiento
      this.storageService.setItem(this.USER_KEY, JSON.stringify(user));
      
      // Emitir el nuevo usuario
      this.currentUserSubject.next(user);
      
      // Configurar el temporizador de expiración
      const expirationDate = this.getTokenExpiration(response.token);
      this.setAutoLogout(expirationDate);
      
      return user;
    }
    
    throw new Error('No se recibió un token válido en la respuesta');
  }

  /**
   * Maneja los errores de las solicitudes HTTP
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      if (error.status === 401) {
        errorMessage = 'Usuario o contraseña incorrectos';
      } else if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      } else {
        errorMessage = `Error ${error.status}: ${error.error?.message || error.message}`;
      }
    }
    
    console.error('Error en la autenticación:', error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Obtiene la fecha de expiración del token
   */
  private getTokenExpiration(token: string): Date {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return new Date(0); // Fecha en el pasado
    }
  }

  /**
   * Configura el cierre de sesión automático
   */
  private setAutoLogout(expirationDate: Date): void {
    const now = new Date();
    const expirationTime = expirationDate.getTime() - now.getTime();
    
    if (expirationTime > 0) {
      // Limpiar cualquier temporizador existente
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      
      // Establecer un nuevo temporizador
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationTime);
    }
  }

  /**
   * Verifica si el usuario actual tiene un rol específico
   */
  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user?.role === role;
  }

}
