import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthUser {
  userName: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = '/api/auth';
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';

  private readonly isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  private user$ = new BehaviorSubject<AuthUser | null>(null);

  constructor(private http: HttpClient) {
    // Initialize only in browser to avoid SSR localStorage access
    if (this.isBrowser) {
      this.user$.next(this.loadUser());
    }
  }

  login(userName: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, { userName, password }).pipe(
      tap((resp) => {
        if (this.isBrowser) {
          localStorage.setItem(this.tokenKey, resp.token);
          localStorage.setItem(this.userKey, JSON.stringify(resp.user));
        }
        this.user$.next(resp.user);
      })
    );
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.user$.next(null);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): AuthUser | null {
    return this.user$.value;
  }

  userChanges(): Observable<AuthUser | null> {
    return this.user$.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private loadUser(): AuthUser | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}
