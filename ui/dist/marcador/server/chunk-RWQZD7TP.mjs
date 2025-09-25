import './polyfills.server.mjs';
import {
  BehaviorSubject,
  HttpClient,
  PLATFORM_ID,
  Router,
  catchError,
  isPlatformBrowser,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-UGOTWDUO.mjs";

// src/app/core/services/storage.service.ts
var StorageService = class _StorageService {
  platformId;
  constructor(platformId) {
    this.platformId = platformId;
  }
  getItem(key) {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }
  setItem(key, value) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }
  removeItem(key) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
  clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
  static \u0275fac = function StorageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StorageService)(\u0275\u0275inject(PLATFORM_ID));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StorageService, factory: _StorageService.\u0275fac, providedIn: "root" });
};

// src/environments/environment.ts
var environment = {
  production: false,
  apiUrl: "http://localhost:5235/api"
  // Corregir puerto para coincidir con el backend
};

// src/app/services/auth.service.ts
var AuthService = class _AuthService {
  http;
  router;
  storageService;
  platformId;
  TOKEN_KEY = "auth_token";
  USER_KEY = "user";
  apiUrl = environment.apiUrl;
  currentUserSubject;
  currentUser;
  tokenExpirationTimer;
  constructor(http, router, storageService, platformId) {
    this.http = http;
    this.router = router;
    this.storageService = storageService;
    this.platformId = platformId;
    const userJson = this.storageService.getItem(this.USER_KEY);
    this.currentUserSubject = new BehaviorSubject(userJson ? JSON.parse(userJson) : null);
    this.currentUser = this.currentUserSubject.asObservable();
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
  get currentUserValue() {
    return this.currentUserSubject.value;
  }
  /**
   * Obtiene el token de autenticación
   */
  getToken() {
    return this.storageService.getItem(this.TOKEN_KEY);
  }
  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated() {
    const token = this.getToken();
    if (!token)
      return false;
    const expiration = this.getTokenExpiration(token);
    return expiration > /* @__PURE__ */ new Date();
  }
  /**
   * Inicia sesión con las credenciales proporcionadas
   */
  login(username, password) {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password }, {
      withCredentials: true,
      // Importante para CORS con credenciales
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).pipe(tap((response) => {
      this.handleAuthentication(response);
    }), catchError(this.handleError));
  }
  /**
   * Cierra la sesión del usuario actual
   */
  logout() {
    this.storageService.removeItem(this.TOKEN_KEY);
    this.storageService.removeItem(this.USER_KEY);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }
  /**
   * Maneja la respuesta de autenticación exitosa
   */
  handleAuthentication(response) {
    if (response?.token) {
      this.storageService.setItem(this.TOKEN_KEY, response.token);
      const user = {
        id: response.userId,
        username: response.username || "",
        role: response.role
      };
      this.storageService.setItem(this.USER_KEY, JSON.stringify(user));
      this.currentUserSubject.next(user);
      const expirationDate = this.getTokenExpiration(response.token);
      this.setAutoLogout(expirationDate);
      return user;
    }
    throw new Error("No se recibi\xF3 un token v\xE1lido en la respuesta");
  }
  /**
   * Maneja los errores de las solicitudes HTTP
   */
  handleError(error) {
    let errorMessage = "Ocurri\xF3 un error inesperado";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = "Usuario o contrase\xF1a incorrectos";
      } else if (error.status === 0) {
        errorMessage = "No se pudo conectar con el servidor. Verifica tu conexi\xF3n a internet.";
      } else {
        errorMessage = `Error ${error.status}: ${error.error?.message || error.message}`;
      }
    }
    console.error("Error en la autenticaci\xF3n:", error);
    return throwError(() => new Error(errorMessage));
  }
  /**
   * Obtiene la fecha de expiración del token
   */
  getTokenExpiration(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return new Date(payload.exp * 1e3);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return /* @__PURE__ */ new Date(0);
    }
  }
  /**
   * Configura el cierre de sesión automático
   */
  setAutoLogout(expirationDate) {
    const now = /* @__PURE__ */ new Date();
    const expirationTime = expirationDate.getTime() - now.getTime();
    if (expirationTime > 0) {
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationTime);
    }
  }
  /**
   * Verifica si el usuario actual tiene un rol específico
   */
  hasRole(role) {
    const user = this.currentUserValue;
    return user?.role === role;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router), \u0275\u0275inject(StorageService), \u0275\u0275inject(PLATFORM_ID));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};

export {
  environment,
  StorageService,
  AuthService
};
//# sourceMappingURL=chunk-RWQZD7TP.mjs.map
