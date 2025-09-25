import './polyfills.server.mjs';
import {
  SERVER_CONTEXT,
  provideAnimations,
  provideServerRendering
} from "./chunk-HJ73G3U2.mjs";
import {
  AuthService,
  StorageService,
  environment
} from "./chunk-RWQZD7TP.mjs";
import {
  ActivatedRoute,
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectorRef,
  CommonModule,
  DatePipe,
  Directive,
  ElementRef,
  EventEmitter,
  HTTP_INTERCEPTORS,
  Host,
  HttpClient,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  LowerCasePipe,
  NavigationEnd,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  NgSwitch,
  NgSwitchCase,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  RuntimeError,
  Self,
  SkipSelf,
  SlicePipe,
  Subject,
  TitleCasePipe,
  Version,
  booleanAttribute,
  bootstrapApplication,
  catchError,
  computed,
  filter,
  finalize,
  forkJoin,
  forwardRef,
  from,
  getDOM,
  importProvidersFrom,
  inject,
  interval,
  isPromise,
  isSubscribable,
  map,
  merge,
  mergeApplicationConfig,
  of,
  provideClientHydration,
  provideHttpClient,
  provideRouter,
  setClassMetadata,
  shareReplay,
  signal,
  startWith,
  switchMap,
  tap,
  throwError,
  untracked,
  withComponentInputBinding,
  withInterceptors,
  withJsonpSupport,
  withNoHttpTransferCache,
  withViewTransitions,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UGOTWDUO.mjs";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-PTRYWQQD.mjs";

// src/app/core/components/loading-spinner/loading-spinner.component.ts
function LoadingSpinnerComponent_div_0_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.message);
  }
}
function LoadingSpinnerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "span", 4);
    \u0275\u0275text(4, "Cargando...");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, LoadingSpinnerComponent_div_0_p_5_Template, 2, 1, "p", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r0.message);
  }
}
var LoadingSpinnerComponent = class _LoadingSpinnerComponent {
  isLoading = false;
  message = "Cargando...";
  static \u0275fac = function LoadingSpinnerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingSpinnerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoadingSpinnerComponent, selectors: [["app-loading-spinner"]], inputs: { isLoading: "isLoading", message: "message" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "loading-overlay", 4, "ngIf"], [1, "loading-overlay"], [1, "spinner-container"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], ["class", "mt-2", 4, "ngIf"], [1, "mt-2"]], template: function LoadingSpinnerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, LoadingSpinnerComponent_div_0_Template, 6, 1, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.isLoading);
    }
  }, dependencies: [CommonModule, NgIf], styles: ["\n\n.loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 9999;\n}\n.spinner-container[_ngcontent-%COMP%] {\n  background: white;\n  padding: 2rem;\n  border-radius: 8px;\n  text-align: center;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n}\n/*# sourceMappingURL=loading-spinner.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoadingSpinnerComponent, { className: "LoadingSpinnerComponent", filePath: "src\\app\\core\\components\\loading-spinner\\loading-spinner.component.ts", lineNumber: 46 });
})();

// src/app/services/loading.service.ts
var LoadingService = class _LoadingService {
  loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();
  constructor() {
  }
  /**
   * Set the loading state
   * @param isLoading Whether the application is in a loading state
   */
  setLoading(isLoading) {
    if (this.loadingSubject.value !== isLoading) {
      setTimeout(() => {
        this.loadingSubject.next(isLoading);
      });
    }
  }
  /**
   * Get the current loading state
   * @returns The current loading state
   */
  getLoading() {
    return this.loadingSubject.value;
  }
  /**
   * Show loading indicator
   */
  show() {
    this.setLoading(true);
  }
  /**
   * Hide loading indicator
   */
  hide() {
    this.setLoading(false);
  }
  static \u0275fac = function LoadingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoadingService, factory: _LoadingService.\u0275fac, providedIn: "root" });
};

// src/app/core/components/global-loading/global-loading.component.ts
var GlobalLoadingComponent = class _GlobalLoadingComponent {
  loadingService;
  isLoading = false;
  constructor(loadingService) {
    this.loadingService = loadingService;
  }
  ngOnInit() {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
  static \u0275fac = function GlobalLoadingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GlobalLoadingComponent)(\u0275\u0275directiveInject(LoadingService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GlobalLoadingComponent, selectors: [["app-global-loading"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["message", "Cargando...", 3, "isLoading"]], template: function GlobalLoadingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-loading-spinner", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("isLoading", ctx.isLoading);
    }
  }, dependencies: [CommonModule, LoadingSpinnerComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GlobalLoadingComponent, { className: "GlobalLoadingComponent", filePath: "src\\app\\core\\components\\global-loading\\global-loading.component.ts", lineNumber: 17 });
})();

// src/app/components/navbar/navbar.component.ts
var _c0 = () => ["/"];
var _c1 = () => ({ exact: true });
var _c2 = () => ["/results"];
var _c3 = () => ["/login"];
function NavbarComponent_ul_14_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.userRole, " ");
  }
}
function NavbarComponent_ul_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ul", 11)(1, "li", 12)(2, "a", 13);
    \u0275\u0275element(3, "i", 14);
    \u0275\u0275text(4);
    \u0275\u0275template(5, NavbarComponent_ul_14_span_5_Template, 2, 1, "span", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "ul", 16)(7, "li")(8, "a", 17);
    \u0275\u0275text(9, "Mi perfil");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "li");
    \u0275\u0275element(11, "hr", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "li")(13, "a", 19);
    \u0275\u0275listener("click", function NavbarComponent_ul_14_Template_a_click_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.logout();
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275element(14, "i", 20);
    \u0275\u0275text(15, " Cerrar sesi\xF3n ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.username, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.userRole);
  }
}
function NavbarComponent_ul_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 11)(1, "li", 7)(2, "a", 9);
    \u0275\u0275element(3, "i", 22);
    \u0275\u0275text(4, " Iniciar sesi\xF3n ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(1, _c3));
  }
}
var NavbarComponent = class _NavbarComponent {
  authService;
  router;
  isAuthenticated = false;
  username = null;
  userRole = null;
  authSubscription = null;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    this.updateAuthState();
    this.authSubscription = this.authService.currentUser.subscribe((user) => {
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
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  updateAuthState() {
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
    this.router.navigate(["/login"]);
  }
  static \u0275fac = function NavbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NavbarComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NavbarComponent, selectors: [["app-navbar"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 10, consts: [[1, "navbar", "navbar-expand-lg", "navbar-dark", "bg-primary"], [1, "container-fluid"], [1, "navbar-brand", 3, "routerLink"], ["type", "button", "data-bs-toggle", "collapse", "data-bs-target", "#navbarNav", "aria-controls", "navbarNav", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "navbarNav", 1, "collapse", "navbar-collapse"], [1, "navbar-nav", "me-auto"], [1, "nav-item"], ["routerLinkActive", "active", 1, "nav-link", 3, "routerLink", "routerLinkActiveOptions"], ["routerLinkActive", "active", 1, "nav-link", 3, "routerLink"], ["class", "navbar-nav", 4, "ngIf"], [1, "navbar-nav"], [1, "nav-item", "dropdown"], ["href", "#", "id", "userDropdown", "role", "button", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle"], [1, "bi", "bi-person-circle", "me-1"], ["class", "badge bg-secondary ms-2", 4, "ngIf"], ["aria-labelledby", "userDropdown", 1, "dropdown-menu", "dropdown-menu-end"], ["href", "#", 1, "dropdown-item"], [1, "dropdown-divider"], ["href", "#", 1, "dropdown-item", "text-danger", 3, "click"], [1, "bi", "bi-box-arrow-right", "me-1"], [1, "badge", "bg-secondary", "ms-2"], [1, "bi", "bi-box-arrow-in-right", "me-1"]], template: function NavbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "nav", 0)(1, "div", 1)(2, "a", 2);
      \u0275\u0275text(3, "Marcador Baloncesto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275element(5, "span", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "ul", 6)(8, "li", 7)(9, "a", 8);
      \u0275\u0275text(10, " Inicio ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "li", 7)(12, "a", 9);
      \u0275\u0275text(13, " Resultados ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(14, NavbarComponent_ul_14_Template, 16, 2, "ul", 10)(15, NavbarComponent_ul_15_Template, 5, 2, "ul", 10);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(6, _c0));
      \u0275\u0275advance(7);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(7, _c0))("routerLinkActiveOptions", \u0275\u0275pureFunction0(8, _c1));
      \u0275\u0275advance(3);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(9, _c2));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isAuthenticated);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isAuthenticated);
    }
  }, dependencies: [CommonModule, NgIf, RouterLink, RouterLinkActive, RouterModule], styles: ["\n\n.navbar[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-bottom: 2rem;\n  padding: 0.5rem 1rem;\n}\n.navbar[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 1.5rem;\n  color: #fff;\n}\n.navbar[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%]:hover {\n  color: rgba(255, 255, 255, 0.9);\n}\n.navbar[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.85);\n  padding: 0.5rem 1rem;\n  font-weight: 500;\n  transition: color 0.2s;\n  display: flex;\n  align-items: center;\n}\n.navbar[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover, \n.navbar[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.navbar[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin-right: 0.3rem;\n}\n.navbar[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.5rem;\n  padding: 0.5rem 0;\n  margin-top: 0.5rem;\n}\n.navbar[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  padding: 0.5rem 1.5rem;\n  display: flex;\n  align-items: center;\n  transition: all 0.2s;\n}\n.navbar[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.navbar[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover, \n.navbar[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:focus {\n  background-color: #f8f9fa;\n  color: #0d6efd;\n}\n.navbar[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]   .dropdown-item.text-danger[_ngcontent-%COMP%]:hover {\n  color: #dc3545 !important;\n}\n.navbar[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]   .dropdown-divider[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n  border-top: 1px solid #eee;\n}\n.navbar[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 500;\n  padding: 0.25rem 0.5rem;\n  text-transform: capitalize;\n}\n@media (max-width: 991.98px) {\n  .navbar-collapse[_ngcontent-%COMP%] {\n    padding: 1rem 0;\n    margin-top: 0.5rem;\n    border-top: 1px solid rgba(255, 255, 255, 0.1);\n  }\n  .navbar-nav[_ngcontent-%COMP%] {\n    margin-top: 0.5rem;\n  }\n  .navbar-nav[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n    margin-bottom: 0.25rem;\n  }\n  .navbar-nav[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%] {\n    box-shadow: none;\n    border: 1px solid rgba(0, 0, 0, 0.05);\n    margin: 0.25rem 0 0 1rem;\n  }\n  .navbar-nav[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n    padding: 0.5rem 1rem;\n  }\n}\n/*# sourceMappingURL=navbar.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NavbarComponent, { className: "NavbarComponent", filePath: "src\\app\\components\\navbar\\navbar.component.ts", lineNumber: 14 });
})();

// src/app/services/notification.service.ts
var NotificationService = class _NotificationService {
  notifications$ = new BehaviorSubject([]);
  constructor() {
  }
  /**
   * Obtiene el observable de notificaciones
   */
  getNotifications() {
    return this.notifications$.asObservable();
  }
  /**
   * Muestra una notificación de éxito
   */
  showSuccess(message, duration = 4e3) {
    this.addNotification(message, "success", duration);
  }
  /**
   * Muestra una notificación informativa
   */
  showInfo(message, duration = 4e3) {
    this.addNotification(message, "info", duration);
  }
  /**
   * Muestra una notificación de advertencia
   */
  showWarning(message, duration = 5e3) {
    this.addNotification(message, "warning", duration);
  }
  /**
   * Muestra una notificación de error
   */
  showError(message, duration = 6e3) {
    this.addNotification(message, "error", duration);
  }
  /**
   * Agrega una nueva notificación
   */
  addNotification(message, type, duration) {
    const notification = {
      id: this.generateId(),
      message,
      type,
      duration,
      timestamp: /* @__PURE__ */ new Date()
    };
    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, duration);
  }
  /**
   * Remueve una notificación por ID
   */
  removeNotification(id) {
    const current = this.notifications$.value;
    const filtered = current.filter((n) => n.id !== id);
    this.notifications$.next(filtered);
  }
  /**
   * Limpia todas las notificaciones
   */
  clearAll() {
    this.notifications$.next([]);
  }
  /**
   * Genera un ID único para la notificación
   */
  generateId() {
    return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  static \u0275fac = function NotificationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
};

// src/app/widgets/toast-notifications.component.ts
function ToastNotificationsComponent_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2705");
    \u0275\u0275elementEnd();
  }
}
function ToastNotificationsComponent_div_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2139\uFE0F");
    \u0275\u0275elementEnd();
  }
}
function ToastNotificationsComponent_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
  }
}
function ToastNotificationsComponent_div_1_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u274C");
    \u0275\u0275elementEnd();
  }
}
function ToastNotificationsComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275listener("click", function ToastNotificationsComponent_div_1_Template_div_click_0_listener() {
      const notification_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeNotification(notification_r2.id));
    });
    \u0275\u0275elementStart(1, "div", 3)(2, "div", 4)(3, "span", 5);
    \u0275\u0275template(4, ToastNotificationsComponent_div_1_span_4_Template, 2, 0, "span", 6)(5, ToastNotificationsComponent_div_1_span_5_Template, 2, 0, "span", 6)(6, ToastNotificationsComponent_div_1_span_6_Template, 2, 0, "span", 6)(7, ToastNotificationsComponent_div_1_span_7_Template, 2, 0, "span", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 7);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 8);
    \u0275\u0275text(11, "\xD7");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const notification_r2 = ctx.$implicit;
    \u0275\u0275property("ngClass", "toast-" + notification_r2.type);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngSwitch", notification_r2.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "success");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "info");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "warning");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "error");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notification_r2.message);
  }
}
var ToastNotificationsComponent = class _ToastNotificationsComponent {
  notificationService;
  notifications$;
  subscription;
  constructor(notificationService) {
    this.notificationService = notificationService;
    this.notifications$ = this.notificationService.getNotifications();
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  removeNotification(id) {
    this.notificationService.removeNotification(id);
  }
  trackByFn(index, item) {
    return item.id;
  }
  static \u0275fac = function ToastNotificationsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastNotificationsComponent)(\u0275\u0275directiveInject(NotificationService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastNotificationsComponent, selectors: [["app-toast-notifications"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 4, consts: [[1, "toast-container"], ["class", "toast", 3, "ngClass", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "toast", 3, "click", "ngClass"], [1, "toast-content"], [1, "toast-icon"], [3, "ngSwitch"], [4, "ngSwitchCase"], [1, "toast-message"], [1, "toast-close"]], template: function ToastNotificationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, ToastNotificationsComponent_div_1_Template, 12, 7, "div", 1);
      \u0275\u0275pipe(2, "async");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", \u0275\u0275pipeBind1(2, 2, ctx.notifications$))("ngForTrackBy", ctx.trackByFn);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgSwitch, NgSwitchCase, AsyncPipe], styles: ["\n\n.toast-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  z-index: 1000;\n  max-width: 400px;\n  pointer-events: none;\n}\n.toast[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.9);\n  border-radius: 8px;\n  margin-bottom: 10px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n  transform: translateX(100%);\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease-out forwards;\n  pointer-events: all;\n  cursor: pointer;\n  border-left: 4px solid;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.toast-success[_ngcontent-%COMP%] {\n  border-left-color: #10b981;\n  background: rgba(16, 185, 129, 0.1);\n}\n.toast-info[_ngcontent-%COMP%] {\n  border-left-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.1);\n}\n.toast-warning[_ngcontent-%COMP%] {\n  border-left-color: #f59e0b;\n  background: rgba(245, 158, 11, 0.1);\n}\n.toast-error[_ngcontent-%COMP%] {\n  border-left-color: #ef4444;\n  background: rgba(239, 68, 68, 0.1);\n}\n.toast-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px 16px;\n  gap: 12px;\n}\n.toast-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.toast-message[_ngcontent-%COMP%] {\n  flex: 1;\n  color: white;\n  font-size: 14px;\n  line-height: 1.4;\n  font-weight: 500;\n}\n.toast-close[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.6);\n  font-size: 20px;\n  font-weight: bold;\n  flex-shrink: 0;\n  transition: color 0.2s;\n}\n.toast[_ngcontent-%COMP%]:hover   .toast-close[_ngcontent-%COMP%] {\n  color: white;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.toast.removing[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideOut 0.3s ease-in forwards;\n}\n@keyframes _ngcontent-%COMP%_slideOut {\n  from {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n}\n/*# sourceMappingURL=toast-notifications.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastNotificationsComponent, { className: "ToastNotificationsComponent", filePath: "src\\app\\widgets\\toast-notifications.component.ts", lineNumber: 134 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  router;
  title = "Marcador de Baloncesto";
  constructor(router) {
    this.router = router;
  }
  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 0, consts: [[1, "container", "py-4"]], template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-navbar");
      \u0275\u0275elementStart(1, "main", 0);
      \u0275\u0275element(2, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "app-toast-notifications");
    }
  }, dependencies: [
    RouterOutlet,
    NavbarComponent,
    ToastNotificationsComponent
  ] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 24 });
})();

// node_modules/@angular/forms/fesm2022/forms.mjs
var BaseControlValueAccessor = class _BaseControlValueAccessor {
  constructor(_renderer, _elementRef) {
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this.onChange = (_) => {
    };
    this.onTouched = () => {
    };
  }
  /**
   * Helper method that sets a property on a target element using the current Renderer
   * implementation.
   * @nodoc
   */
  setProperty(key, value) {
    this._renderer.setProperty(this._elementRef.nativeElement, key, value);
  }
  /**
   * Registers a function called when the control is touched.
   * @nodoc
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */
  registerOnChange(fn) {
    this.onChange = fn;
  }
  /**
   * Sets the "disabled" property on the range input element.
   * @nodoc
   */
  setDisabledState(isDisabled) {
    this.setProperty("disabled", isDisabled);
  }
  static {
    this.\u0275fac = function BaseControlValueAccessor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BaseControlValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _BaseControlValueAccessor
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseControlValueAccessor, [{
    type: Directive
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }], null);
})();
var BuiltInControlValueAccessor = class _BuiltInControlValueAccessor extends BaseControlValueAccessor {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275BuiltInControlValueAccessor_BaseFactory;
      return function BuiltInControlValueAccessor_Factory(__ngFactoryType__) {
        return (\u0275BuiltInControlValueAccessor_BaseFactory || (\u0275BuiltInControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_BuiltInControlValueAccessor)))(__ngFactoryType__ || _BuiltInControlValueAccessor);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _BuiltInControlValueAccessor,
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BuiltInControlValueAccessor, [{
    type: Directive
  }], null, null);
})();
var NG_VALUE_ACCESSOR = new InjectionToken(ngDevMode ? "NgValueAccessor" : "");
var CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxControlValueAccessor),
  multi: true
};
var CheckboxControlValueAccessor = class _CheckboxControlValueAccessor extends BuiltInControlValueAccessor {
  /**
   * Sets the "checked" property on the input element.
   * @nodoc
   */
  writeValue(value) {
    this.setProperty("checked", value);
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275CheckboxControlValueAccessor_BaseFactory;
      return function CheckboxControlValueAccessor_Factory(__ngFactoryType__) {
        return (\u0275CheckboxControlValueAccessor_BaseFactory || (\u0275CheckboxControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_CheckboxControlValueAccessor)))(__ngFactoryType__ || _CheckboxControlValueAccessor);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CheckboxControlValueAccessor,
      selectors: [["input", "type", "checkbox", "formControlName", ""], ["input", "type", "checkbox", "formControl", ""], ["input", "type", "checkbox", "ngModel", ""]],
      hostBindings: function CheckboxControlValueAccessor_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("change", function CheckboxControlValueAccessor_change_HostBindingHandler($event) {
            return ctx.onChange($event.target.checked);
          })("blur", function CheckboxControlValueAccessor_blur_HostBindingHandler() {
            return ctx.onTouched();
          });
        }
      },
      features: [\u0275\u0275ProvidersFeature([CHECKBOX_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]",
      host: {
        "(change)": "onChange($event.target.checked)",
        "(blur)": "onTouched()"
      },
      providers: [CHECKBOX_VALUE_ACCESSOR]
    }]
  }], null, null);
})();
var DEFAULT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DefaultValueAccessor),
  multi: true
};
function _isAndroid() {
  const userAgent = getDOM() ? getDOM().getUserAgent() : "";
  return /android (\d+)/.test(userAgent.toLowerCase());
}
var COMPOSITION_BUFFER_MODE = new InjectionToken(ngDevMode ? "CompositionEventMode" : "");
var DefaultValueAccessor = class _DefaultValueAccessor extends BaseControlValueAccessor {
  constructor(renderer, elementRef, _compositionMode) {
    super(renderer, elementRef);
    this._compositionMode = _compositionMode;
    this._composing = false;
    if (this._compositionMode == null) {
      this._compositionMode = !_isAndroid();
    }
  }
  /**
   * Sets the "value" property on the input element.
   * @nodoc
   */
  writeValue(value) {
    const normalizedValue = value == null ? "" : value;
    this.setProperty("value", normalizedValue);
  }
  /** @internal */
  _handleInput(value) {
    if (!this._compositionMode || this._compositionMode && !this._composing) {
      this.onChange(value);
    }
  }
  /** @internal */
  _compositionStart() {
    this._composing = true;
  }
  /** @internal */
  _compositionEnd(value) {
    this._composing = false;
    this._compositionMode && this.onChange(value);
  }
  static {
    this.\u0275fac = function DefaultValueAccessor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DefaultValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(COMPOSITION_BUFFER_MODE, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _DefaultValueAccessor,
      selectors: [["input", "formControlName", "", 3, "type", "checkbox"], ["textarea", "formControlName", ""], ["input", "formControl", "", 3, "type", "checkbox"], ["textarea", "formControl", ""], ["input", "ngModel", "", 3, "type", "checkbox"], ["textarea", "ngModel", ""], ["", "ngDefaultControl", ""]],
      hostBindings: function DefaultValueAccessor_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("input", function DefaultValueAccessor_input_HostBindingHandler($event) {
            return ctx._handleInput($event.target.value);
          })("blur", function DefaultValueAccessor_blur_HostBindingHandler() {
            return ctx.onTouched();
          })("compositionstart", function DefaultValueAccessor_compositionstart_HostBindingHandler() {
            return ctx._compositionStart();
          })("compositionend", function DefaultValueAccessor_compositionend_HostBindingHandler($event) {
            return ctx._compositionEnd($event.target.value);
          });
        }
      },
      features: [\u0275\u0275ProvidersFeature([DEFAULT_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]",
      // TODO: vsavkin replace the above selector with the one below it once
      // https://github.com/angular/angular/issues/3011 is implemented
      // selector: '[ngModel],[formControl],[formControlName]',
      host: {
        "(input)": "$any(this)._handleInput($event.target.value)",
        "(blur)": "onTouched()",
        "(compositionstart)": "$any(this)._compositionStart()",
        "(compositionend)": "$any(this)._compositionEnd($event.target.value)"
      },
      providers: [DEFAULT_VALUE_ACCESSOR]
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [COMPOSITION_BUFFER_MODE]
    }]
  }], null);
})();
function isEmptyInputValue(value) {
  return value == null || (typeof value === "string" || Array.isArray(value)) && value.length === 0;
}
function hasValidLength(value) {
  return value != null && typeof value.length === "number";
}
var NG_VALIDATORS = new InjectionToken(ngDevMode ? "NgValidators" : "");
var NG_ASYNC_VALIDATORS = new InjectionToken(ngDevMode ? "NgAsyncValidators" : "");
var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Validators = class {
  /**
   * @description
   * Validator that requires the control's value to be greater than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a minimum of 3
   *
   * ```typescript
   * const control = new FormControl(2, Validators.min(3));
   *
   * console.log(control.errors); // {min: {min: 3, actual: 2}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `min` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static min(min) {
    return minValidator(min);
  }
  /**
   * @description
   * Validator that requires the control's value to be less than or equal to the provided number.
   *
   * @usageNotes
   *
   * ### Validate against a maximum of 15
   *
   * ```typescript
   * const control = new FormControl(16, Validators.max(15));
   *
   * console.log(control.errors); // {max: {max: 15, actual: 16}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `max` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static max(max) {
    return maxValidator(max);
  }
  /**
   * @description
   * Validator that requires the control have a non-empty value.
   *
   * @usageNotes
   *
   * ### Validate that the field is non-empty
   *
   * ```typescript
   * const control = new FormControl('', Validators.required);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map with the `required` property
   * if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static required(control) {
    return requiredValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value be true. This validator is commonly
   * used for required checkboxes.
   *
   * @usageNotes
   *
   * ### Validate that the field value is true
   *
   * ```typescript
   * const control = new FormControl('some value', Validators.requiredTrue);
   *
   * console.log(control.errors); // {required: true}
   * ```
   *
   * @returns An error map that contains the `required` property
   * set to `true` if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static requiredTrue(control) {
    return requiredTrueValidator(control);
  }
  /**
   * @description
   * Validator that requires the control's value pass an email validation test.
   *
   * Tests the value using a [regular
   * expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
   * pattern suitable for common use cases. The pattern is based on the definition of a valid email
   * address in the [WHATWG HTML
   * specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
   * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
   * lengths of different parts of the address).
   *
   * The differences from the WHATWG version include:
   * - Disallow `local-part` (the part before the `@` symbol) to begin or end with a period (`.`).
   * - Disallow `local-part` to be longer than 64 characters.
   * - Disallow the whole address to be longer than 254 characters.
   *
   * If this pattern does not satisfy your business needs, you can use `Validators.pattern()` to
   * validate the value against a different pattern.
   *
   * @usageNotes
   *
   * ### Validate that the field matches a valid email pattern
   *
   * ```typescript
   * const control = new FormControl('bad@', Validators.email);
   *
   * console.log(control.errors); // {email: true}
   * ```
   *
   * @returns An error map with the `email` property
   * if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static email(control) {
    return emailValidator(control);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be greater than or equal
   * to the provided minimum length. This validator is also provided by default if you use the
   * the HTML5 `minlength` attribute. Note that the `minLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays. The
   * `minLength` validator logic is also not invoked for values when their `length` property is 0
   * (for example in case of an empty string or an empty array), to support optional controls. You
   * can use the standard `required` validator if empty values should not be considered valid.
   *
   * @usageNotes
   *
   * ### Validate that the field has a minimum of 3 characters
   *
   * ```typescript
   * const control = new FormControl('ng', Validators.minLength(3));
   *
   * console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
   * ```
   *
   * ```html
   * <input minlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `minlength` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static minLength(minLength) {
    return minLengthValidator(minLength);
  }
  /**
   * @description
   * Validator that requires the length of the control's value to be less than or equal
   * to the provided maximum length. This validator is also provided by default if you use the
   * the HTML5 `maxlength` attribute. Note that the `maxLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays.
   *
   * @usageNotes
   *
   * ### Validate that the field has maximum of 5 characters
   *
   * ```typescript
   * const control = new FormControl('Angular', Validators.maxLength(5));
   *
   * console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
   * ```
   *
   * ```html
   * <input maxlength="5">
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `maxlength` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static maxLength(maxLength) {
    return maxLengthValidator(maxLength);
  }
  /**
   * @description
   * Validator that requires the control's value to match a regex pattern. This validator is also
   * provided by default if you use the HTML5 `pattern` attribute.
   *
   * @usageNotes
   *
   * ### Validate that the field only contains letters or spaces
   *
   * ```typescript
   * const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));
   *
   * console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
   * ```
   *
   * ```html
   * <input pattern="[a-zA-Z ]*">
   * ```
   *
   * ### Pattern matching with the global or sticky flag
   *
   * `RegExp` objects created with the `g` or `y` flags that are passed into `Validators.pattern`
   * can produce different results on the same input when validations are run consecutively. This is
   * due to how the behavior of `RegExp.prototype.test` is
   * specified in [ECMA-262](https://tc39.es/ecma262/#sec-regexpbuiltinexec)
   * (`RegExp` preserves the index of the last match when the global or sticky flag is used).
   * Due to this behavior, it is recommended that when using
   * `Validators.pattern` you **do not** pass in a `RegExp` object with either the global or sticky
   * flag enabled.
   *
   * ```typescript
   * // Not recommended (since the `g` flag is used)
   * const controlOne = new FormControl('1', Validators.pattern(/foo/g));
   *
   * // Good
   * const controlTwo = new FormControl('1', Validators.pattern(/foo/));
   * ```
   *
   * @param pattern A regular expression to be used as is to test the values, or a string.
   * If a string is passed, the `^` character is prepended and the `$` character is
   * appended to the provided string (if not already present), and the resulting regular
   * expression is used to test the values.
   *
   * @returns A validator function that returns an error map with the
   * `pattern` property if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static pattern(pattern) {
    return patternValidator(pattern);
  }
  /**
   * @description
   * Validator that performs no operation.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static nullValidator(control) {
    return nullValidator(control);
  }
  static compose(validators) {
    return compose(validators);
  }
  /**
   * @description
   * Compose multiple async validators into a single function that returns the union
   * of the individual error objects for the provided control.
   *
   * @returns A validator function that returns an error map with the
   * merged error objects of the async validators if the validation check fails, otherwise `null`.
   *
   * @see {@link updateValueAndValidity()}
   *
   */
  static composeAsync(validators) {
    return composeAsync(validators);
  }
};
function minValidator(min) {
  return (control) => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value < min ? {
      "min": {
        "min": min,
        "actual": control.value
      }
    } : null;
  };
}
function maxValidator(max) {
  return (control) => {
    if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value > max ? {
      "max": {
        "max": max,
        "actual": control.value
      }
    } : null;
  };
}
function requiredValidator(control) {
  return isEmptyInputValue(control.value) ? {
    "required": true
  } : null;
}
function requiredTrueValidator(control) {
  return control.value === true ? null : {
    "required": true
  };
}
function emailValidator(control) {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return EMAIL_REGEXP.test(control.value) ? null : {
    "email": true
  };
}
function minLengthValidator(minLength) {
  return (control) => {
    if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
      return null;
    }
    return control.value.length < minLength ? {
      "minlength": {
        "requiredLength": minLength,
        "actualLength": control.value.length
      }
    } : null;
  };
}
function maxLengthValidator(maxLength) {
  return (control) => {
    return hasValidLength(control.value) && control.value.length > maxLength ? {
      "maxlength": {
        "requiredLength": maxLength,
        "actualLength": control.value.length
      }
    } : null;
  };
}
function patternValidator(pattern) {
  if (!pattern) return nullValidator;
  let regex;
  let regexStr;
  if (typeof pattern === "string") {
    regexStr = "";
    if (pattern.charAt(0) !== "^") regexStr += "^";
    regexStr += pattern;
    if (pattern.charAt(pattern.length - 1) !== "$") regexStr += "$";
    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }
  return (control) => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const value = control.value;
    return regex.test(value) ? null : {
      "pattern": {
        "requiredPattern": regexStr,
        "actualValue": value
      }
    };
  };
}
function nullValidator(control) {
  return null;
}
function isPresent(o) {
  return o != null;
}
function toObservable(value) {
  const obs = isPromise(value) ? from(value) : value;
  if ((typeof ngDevMode === "undefined" || ngDevMode) && !isSubscribable(obs)) {
    let errorMessage = `Expected async validator to return Promise or Observable.`;
    if (typeof value === "object") {
      errorMessage += " Are you using a synchronous validator where an async validator is expected?";
    }
    throw new RuntimeError(-1101, errorMessage);
  }
  return obs;
}
function mergeErrors(arrayOfErrors) {
  let res = {};
  arrayOfErrors.forEach((errors) => {
    res = errors != null ? __spreadValues(__spreadValues({}, res), errors) : res;
  });
  return Object.keys(res).length === 0 ? null : res;
}
function executeValidators(control, validators) {
  return validators.map((validator) => validator(control));
}
function isValidatorFn(validator) {
  return !validator.validate;
}
function normalizeValidators(validators) {
  return validators.map((validator) => {
    return isValidatorFn(validator) ? validator : (c) => validator.validate(c);
  });
}
function compose(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function(control) {
    return mergeErrors(executeValidators(control, presentValidators));
  };
}
function composeValidators(validators) {
  return validators != null ? compose(normalizeValidators(validators)) : null;
}
function composeAsync(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function(control) {
    const observables = executeValidators(control, presentValidators).map(toObservable);
    return forkJoin(observables).pipe(map(mergeErrors));
  };
}
function composeAsyncValidators(validators) {
  return validators != null ? composeAsync(normalizeValidators(validators)) : null;
}
function mergeValidators(controlValidators, dirValidator) {
  if (controlValidators === null) return [dirValidator];
  return Array.isArray(controlValidators) ? [...controlValidators, dirValidator] : [controlValidators, dirValidator];
}
function getControlValidators(control) {
  return control._rawValidators;
}
function getControlAsyncValidators(control) {
  return control._rawAsyncValidators;
}
function makeValidatorsArray(validators) {
  if (!validators) return [];
  return Array.isArray(validators) ? validators : [validators];
}
function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
function addValidators(validators, currentValidators) {
  const current = makeValidatorsArray(currentValidators);
  const validatorsToAdd = makeValidatorsArray(validators);
  validatorsToAdd.forEach((v) => {
    if (!hasValidator(current, v)) {
      current.push(v);
    }
  });
  return current;
}
function removeValidators(validators, currentValidators) {
  return makeValidatorsArray(currentValidators).filter((v) => !hasValidator(validators, v));
}
var AbstractControlDirective = class {
  constructor() {
    this._rawValidators = [];
    this._rawAsyncValidators = [];
    this._onDestroyCallbacks = [];
  }
  /**
   * @description
   * Reports the value of the control if it is present, otherwise null.
   */
  get value() {
    return this.control ? this.control.value : null;
  }
  /**
   * @description
   * Reports whether the control is valid. A control is considered valid if no
   * validation errors exist with the current value.
   * If the control is not present, null is returned.
   */
  get valid() {
    return this.control ? this.control.valid : null;
  }
  /**
   * @description
   * Reports whether the control is invalid, meaning that an error exists in the input value.
   * If the control is not present, null is returned.
   */
  get invalid() {
    return this.control ? this.control.invalid : null;
  }
  /**
   * @description
   * Reports whether a control is pending, meaning that async validation is occurring and
   * errors are not yet available for the input value. If the control is not present, null is
   * returned.
   */
  get pending() {
    return this.control ? this.control.pending : null;
  }
  /**
   * @description
   * Reports whether the control is disabled, meaning that the control is disabled
   * in the UI and is exempt from validation checks and excluded from aggregate
   * values of ancestor controls. If the control is not present, null is returned.
   */
  get disabled() {
    return this.control ? this.control.disabled : null;
  }
  /**
   * @description
   * Reports whether the control is enabled, meaning that the control is included in ancestor
   * calculations of validity or value. If the control is not present, null is returned.
   */
  get enabled() {
    return this.control ? this.control.enabled : null;
  }
  /**
   * @description
   * Reports the control's validation errors. If the control is not present, null is returned.
   */
  get errors() {
    return this.control ? this.control.errors : null;
  }
  /**
   * @description
   * Reports whether the control is pristine, meaning that the user has not yet changed
   * the value in the UI. If the control is not present, null is returned.
   */
  get pristine() {
    return this.control ? this.control.pristine : null;
  }
  /**
   * @description
   * Reports whether the control is dirty, meaning that the user has changed
   * the value in the UI. If the control is not present, null is returned.
   */
  get dirty() {
    return this.control ? this.control.dirty : null;
  }
  /**
   * @description
   * Reports whether the control is touched, meaning that the user has triggered
   * a `blur` event on it. If the control is not present, null is returned.
   */
  get touched() {
    return this.control ? this.control.touched : null;
  }
  /**
   * @description
   * Reports the validation status of the control. Possible values include:
   * 'VALID', 'INVALID', 'DISABLED', and 'PENDING'.
   * If the control is not present, null is returned.
   */
  get status() {
    return this.control ? this.control.status : null;
  }
  /**
   * @description
   * Reports whether the control is untouched, meaning that the user has not yet triggered
   * a `blur` event on it. If the control is not present, null is returned.
   */
  get untouched() {
    return this.control ? this.control.untouched : null;
  }
  /**
   * @description
   * Returns a multicasting observable that emits a validation status whenever it is
   * calculated for the control. If the control is not present, null is returned.
   */
  get statusChanges() {
    return this.control ? this.control.statusChanges : null;
  }
  /**
   * @description
   * Returns a multicasting observable of value changes for the control that emits every time the
   * value of the control changes in the UI or programmatically.
   * If the control is not present, null is returned.
   */
  get valueChanges() {
    return this.control ? this.control.valueChanges : null;
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */
  get path() {
    return null;
  }
  /**
   * Sets synchronous validators for this directive.
   * @internal
   */
  _setValidators(validators) {
    this._rawValidators = validators || [];
    this._composedValidatorFn = composeValidators(this._rawValidators);
  }
  /**
   * Sets asynchronous validators for this directive.
   * @internal
   */
  _setAsyncValidators(validators) {
    this._rawAsyncValidators = validators || [];
    this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
  }
  /**
   * @description
   * Synchronous validator function composed of all the synchronous validators registered with this
   * directive.
   */
  get validator() {
    return this._composedValidatorFn || null;
  }
  /**
   * @description
   * Asynchronous validator function composed of all the asynchronous validators registered with
   * this directive.
   */
  get asyncValidator() {
    return this._composedAsyncValidatorFn || null;
  }
  /**
   * Internal function to register callbacks that should be invoked
   * when directive instance is being destroyed.
   * @internal
   */
  _registerOnDestroy(fn) {
    this._onDestroyCallbacks.push(fn);
  }
  /**
   * Internal function to invoke all registered "on destroy" callbacks.
   * Note: calling this function also clears the list of callbacks.
   * @internal
   */
  _invokeOnDestroyCallbacks() {
    this._onDestroyCallbacks.forEach((fn) => fn());
    this._onDestroyCallbacks = [];
  }
  /**
   * @description
   * Resets the control with the provided value if the control is present.
   */
  reset(value = void 0) {
    if (this.control) this.control.reset(value);
  }
  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   */
  hasError(errorCode, path) {
    return this.control ? this.control.hasError(errorCode, path) : false;
  }
  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   */
  getError(errorCode, path) {
    return this.control ? this.control.getError(errorCode, path) : null;
  }
};
var ControlContainer = class extends AbstractControlDirective {
  /**
   * @description
   * The top-level form directive for the control.
   */
  get formDirective() {
    return null;
  }
  /**
   * @description
   * The path to this group.
   */
  get path() {
    return null;
  }
};
var NgControl = class extends AbstractControlDirective {
  constructor() {
    super(...arguments);
    this._parent = null;
    this.name = null;
    this.valueAccessor = null;
  }
};
var AbstractControlStatus = class {
  constructor(cd) {
    this._cd = cd;
  }
  get isTouched() {
    this._cd?.control?._touched?.();
    return !!this._cd?.control?.touched;
  }
  get isUntouched() {
    return !!this._cd?.control?.untouched;
  }
  get isPristine() {
    this._cd?.control?._pristine?.();
    return !!this._cd?.control?.pristine;
  }
  get isDirty() {
    return !!this._cd?.control?.dirty;
  }
  get isValid() {
    this._cd?.control?._status?.();
    return !!this._cd?.control?.valid;
  }
  get isInvalid() {
    return !!this._cd?.control?.invalid;
  }
  get isPending() {
    return !!this._cd?.control?.pending;
  }
  get isSubmitted() {
    this._cd?._submitted?.();
    return !!this._cd?.submitted;
  }
};
var ngControlStatusHost = {
  "[class.ng-untouched]": "isUntouched",
  "[class.ng-touched]": "isTouched",
  "[class.ng-pristine]": "isPristine",
  "[class.ng-dirty]": "isDirty",
  "[class.ng-valid]": "isValid",
  "[class.ng-invalid]": "isInvalid",
  "[class.ng-pending]": "isPending"
};
var ngGroupStatusHost = __spreadProps(__spreadValues({}, ngControlStatusHost), {
  "[class.ng-submitted]": "isSubmitted"
});
var NgControlStatus = class _NgControlStatus extends AbstractControlStatus {
  constructor(cd) {
    super(cd);
  }
  static {
    this.\u0275fac = function NgControlStatus_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgControlStatus)(\u0275\u0275directiveInject(NgControl, 2));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _NgControlStatus,
      selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
      hostVars: 14,
      hostBindings: function NgControlStatus_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending);
        }
      },
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgControlStatus, [{
    type: Directive,
    args: [{
      selector: "[formControlName],[ngModel],[formControl]",
      host: ngControlStatusHost
    }]
  }], () => [{
    type: NgControl,
    decorators: [{
      type: Self
    }]
  }], null);
})();
var NgControlStatusGroup = class _NgControlStatusGroup extends AbstractControlStatus {
  constructor(cd) {
    super(cd);
  }
  static {
    this.\u0275fac = function NgControlStatusGroup_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgControlStatusGroup)(\u0275\u0275directiveInject(ControlContainer, 10));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _NgControlStatusGroup,
      selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
      hostVars: 16,
      hostBindings: function NgControlStatusGroup_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending)("ng-submitted", ctx.isSubmitted);
        }
      },
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgControlStatusGroup, [{
    type: Directive,
    args: [{
      selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]",
      host: ngGroupStatusHost
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }]
  }], null);
})();
var formControlNameExample = `
  <div [formGroup]="myGroup">
    <input formControlName="firstName">
  </div>

  In your class:

  this.myGroup = new FormGroup({
      firstName: new FormControl()
  });`;
var formGroupNameExample = `
  <div [formGroup]="myGroup">
      <div formGroupName="person">
        <input formControlName="firstName">
      </div>
  </div>

  In your class:

  this.myGroup = new FormGroup({
      person: new FormGroup({ firstName: new FormControl() })
  });`;
var formArrayNameExample = `
  <div [formGroup]="myGroup">
    <div formArrayName="cities">
      <div *ngFor="let city of cityArray.controls; index as i">
        <input [formControlName]="i">
      </div>
    </div>
  </div>

  In your class:

  this.cityArray = new FormArray([new FormControl('SF')]);
  this.myGroup = new FormGroup({
    cities: this.cityArray
  });`;
var ngModelGroupExample = `
  <form>
      <div ngModelGroup="person">
        <input [(ngModel)]="person.name" name="firstName">
      </div>
  </form>`;
var ngModelWithFormGroupExample = `
  <div [formGroup]="myGroup">
      <input formControlName="firstName">
      <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">
  </div>
`;
function controlParentException(nameOrIndex) {
  return new RuntimeError(1050, `formControlName must be used with a parent formGroup directive. You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      ${describeFormControl(nameOrIndex)}

    Example:

    ${formControlNameExample}`);
}
function describeFormControl(nameOrIndex) {
  if (nameOrIndex == null || nameOrIndex === "") {
    return "";
  }
  const valueType = typeof nameOrIndex === "string" ? "name" : "index";
  return `Affected Form Control ${valueType}: "${nameOrIndex}"`;
}
function ngModelGroupException() {
  return new RuntimeError(1051, `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
      that also have a "form" prefix: formGroupName, formArrayName, or formGroup.

      Option 1:  Update the parent to be formGroupName (reactive form strategy)

      ${formGroupNameExample}

      Option 2: Use ngModel instead of formControlName (template-driven strategy)

      ${ngModelGroupExample}`);
}
function missingFormException() {
  return new RuntimeError(1052, `formGroup expects a FormGroup instance. Please pass one in.

      Example:

      ${formControlNameExample}`);
}
function groupParentException() {
  return new RuntimeError(1053, `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
    directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formGroupNameExample}`);
}
function arrayParentException() {
  return new RuntimeError(1054, `formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      Example:

      ${formArrayNameExample}`);
}
var disabledAttrWarning = `
  It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
  when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
  you. We recommend using this approach to avoid 'changed after checked' errors.

  Example:
  // Specify the \`disabled\` property at control creation time:
  form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });

  // Controls can also be enabled/disabled after creation:
  form.get('first')?.enable();
  form.get('last')?.disable();
`;
var asyncValidatorsDroppedWithOptsWarning = `
  It looks like you're constructing using a FormControl with both an options argument and an
  async validators argument. Mixing these arguments will cause your async validators to be dropped.
  You should either put all your validators in the options object, or in separate validators
  arguments. For example:

  // Using validators arguments
  fc = new FormControl(42, Validators.required, myAsyncValidator);

  // Using AbstractControlOptions
  fc = new FormControl(42, {validators: Validators.required, asyncValidators: myAV});

  // Do NOT mix them: async validators will be dropped!
  fc = new FormControl(42, {validators: Validators.required}, /* Oops! */ myAsyncValidator);
`;
function ngModelWarning(directiveName) {
  return `
  It looks like you're using ngModel on the same form field as ${directiveName}.
  Support for using the ngModel input property and ngModelChange event with
  reactive form directives has been deprecated in Angular v6 and will be removed
  in a future version of Angular.

  For more information on this, see our API docs here:
  https://angular.io/api/forms/${directiveName === "formControl" ? "FormControlDirective" : "FormControlName"}#use-with-ngmodel
  `;
}
function describeKey(isFormGroup, key) {
  return isFormGroup ? `with name: '${key}'` : `at index: ${key}`;
}
function noControlsError(isFormGroup) {
  return `
    There are no form controls registered with this ${isFormGroup ? "group" : "array"} yet. If you're using ngModel,
    you may want to check next tick (e.g. use setTimeout).
  `;
}
function missingControlError(isFormGroup, key) {
  return `Cannot find form control ${describeKey(isFormGroup, key)}`;
}
function missingControlValueError(isFormGroup, key) {
  return `Must supply a value for form control ${describeKey(isFormGroup, key)}`;
}
var VALID = "VALID";
var INVALID = "INVALID";
var PENDING = "PENDING";
var DISABLED = "DISABLED";
var ControlEvent = class {
};
var ValueChangeEvent = class extends ControlEvent {
  constructor(value, source) {
    super();
    this.value = value;
    this.source = source;
  }
};
var PristineChangeEvent = class extends ControlEvent {
  constructor(pristine, source) {
    super();
    this.pristine = pristine;
    this.source = source;
  }
};
var TouchedChangeEvent = class extends ControlEvent {
  constructor(touched, source) {
    super();
    this.touched = touched;
    this.source = source;
  }
};
var StatusChangeEvent = class extends ControlEvent {
  constructor(status, source) {
    super();
    this.status = status;
    this.source = source;
  }
};
var FormSubmittedEvent = class extends ControlEvent {
  constructor(source) {
    super();
    this.source = source;
  }
};
var FormResetEvent = class extends ControlEvent {
  constructor(source) {
    super();
    this.source = source;
  }
};
function pickValidators(validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
}
function coerceToValidator(validator) {
  return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}
function pickAsyncValidators(asyncValidator, validatorOrOpts) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (isOptionsObj(validatorOrOpts) && asyncValidator) {
      console.warn(asyncValidatorsDroppedWithOptsWarning);
    }
  }
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
}
function coerceToAsyncValidator(asyncValidator) {
  return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
}
function isOptionsObj(validatorOrOpts) {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === "object";
}
function assertControlPresent(parent, isGroup, key) {
  const controls = parent.controls;
  const collection = isGroup ? Object.keys(controls) : controls;
  if (!collection.length) {
    throw new RuntimeError(1e3, typeof ngDevMode === "undefined" || ngDevMode ? noControlsError(isGroup) : "");
  }
  if (!controls[key]) {
    throw new RuntimeError(1001, typeof ngDevMode === "undefined" || ngDevMode ? missingControlError(isGroup, key) : "");
  }
}
function assertAllValuesPresent(control, isGroup, value) {
  control._forEachChild((_, key) => {
    if (value[key] === void 0) {
      throw new RuntimeError(1002, typeof ngDevMode === "undefined" || ngDevMode ? missingControlValueError(isGroup, key) : "");
    }
  });
}
var AbstractControl = class {
  /**
   * Initialize the AbstractControl instance.
   *
   * @param validators The function or array of functions that is used to determine the validity of
   *     this control synchronously.
   * @param asyncValidators The function or array of functions that is used to determine validity of
   *     this control asynchronously.
   */
  constructor(validators, asyncValidators) {
    this._pendingDirty = false;
    this._hasOwnPendingAsyncValidator = null;
    this._pendingTouched = false;
    this._onCollectionChange = () => {
    };
    this._parent = null;
    this._status = computed(() => this.statusReactive());
    this.statusReactive = signal(void 0);
    this._pristine = computed(() => this.pristineReactive());
    this.pristineReactive = signal(true);
    this._touched = computed(() => this.touchedReactive());
    this.touchedReactive = signal(false);
    this._events = new Subject();
    this.events = this._events.asObservable();
    this._onDisabledChange = [];
    this._assignValidators(validators);
    this._assignAsyncValidators(asyncValidators);
  }
  /**
   * Returns the function that is used to determine the validity of this control synchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */
  get validator() {
    return this._composedValidatorFn;
  }
  set validator(validatorFn) {
    this._rawValidators = this._composedValidatorFn = validatorFn;
  }
  /**
   * Returns the function that is used to determine the validity of this control asynchronously.
   * If multiple validators have been added, this will be a single composed function.
   * See `Validators.compose()` for additional information.
   */
  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }
  set asyncValidator(asyncValidatorFn) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
  }
  /**
   * The parent control.
   */
  get parent() {
    return this._parent;
  }
  /**
   * The validation status of the control.
   *
   * @see {@link FormControlStatus}
   *
   * These status values are mutually exclusive, so a control cannot be
   * both valid AND invalid or invalid AND disabled.
   */
  get status() {
    return untracked(this.statusReactive);
  }
  set status(v) {
    untracked(() => this.statusReactive.set(v));
  }
  /**
   * A control is `valid` when its `status` is `VALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control has passed all of its validation tests,
   * false otherwise.
   */
  get valid() {
    return this.status === VALID;
  }
  /**
   * A control is `invalid` when its `status` is `INVALID`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control has failed one or more of its validation checks,
   * false otherwise.
   */
  get invalid() {
    return this.status === INVALID;
  }
  /**
   * A control is `pending` when its `status` is `PENDING`.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if this control is in the process of conducting a validation check,
   * false otherwise.
   */
  get pending() {
    return this.status == PENDING;
  }
  /**
   * A control is `disabled` when its `status` is `DISABLED`.
   *
   * Disabled controls are exempt from validation checks and
   * are not included in the aggregate value of their ancestor
   * controls.
   *
   * @see {@link AbstractControl.status}
   *
   * @returns True if the control is disabled, false otherwise.
   */
  get disabled() {
    return this.status === DISABLED;
  }
  /**
   * A control is `enabled` as long as its `status` is not `DISABLED`.
   *
   * @returns True if the control has any status other than 'DISABLED',
   * false if the status is 'DISABLED'.
   *
   * @see {@link AbstractControl.status}
   *
   */
  get enabled() {
    return this.status !== DISABLED;
  }
  /**
   * A control is `pristine` if the user has not yet changed
   * the value in the UI.
   *
   * @returns True if the user has not yet changed the value in the UI; compare `dirty`.
   * Programmatic changes to a control's value do not mark it dirty.
   */
  get pristine() {
    return untracked(this.pristineReactive);
  }
  set pristine(v) {
    untracked(() => this.pristineReactive.set(v));
  }
  /**
   * A control is `dirty` if the user has changed the value
   * in the UI.
   *
   * @returns True if the user has changed the value of this control in the UI; compare `pristine`.
   * Programmatic changes to a control's value do not mark it dirty.
   */
  get dirty() {
    return !this.pristine;
  }
  /**
   * True if the control is marked as `touched`.
   *
   * A control is marked `touched` once the user has triggered
   * a `blur` event on it.
   */
  get touched() {
    return untracked(this.touchedReactive);
  }
  set touched(v) {
    untracked(() => this.touchedReactive.set(v));
  }
  /**
   * True if the control has not been marked as touched
   *
   * A control is `untouched` if the user has not yet triggered
   * a `blur` event on it.
   */
  get untouched() {
    return !this.touched;
  }
  /**
   * Reports the update strategy of the `AbstractControl` (meaning
   * the event on which the control updates itself).
   * Possible values: `'change'` | `'blur'` | `'submit'`
   * Default value: `'change'`
   */
  get updateOn() {
    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change";
  }
  /**
   * Sets the synchronous validators that are active on this control.  Calling
   * this overwrites any existing synchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addValidators()` method instead.
   */
  setValidators(validators) {
    this._assignValidators(validators);
  }
  /**
   * Sets the asynchronous validators that are active on this control. Calling this
   * overwrites any existing asynchronous validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * If you want to add a new validator without affecting existing ones, consider
   * using `addAsyncValidators()` method instead.
   */
  setAsyncValidators(validators) {
    this._assignAsyncValidators(validators);
  }
  /**
   * Add a synchronous validator or validators to this control, without affecting other validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect. If duplicate validator functions
   * are present in the `validators` array, only the first instance would be added to a form
   * control.
   *
   * @param validators The new validator function or functions to add to this control.
   */
  addValidators(validators) {
    this.setValidators(addValidators(validators, this._rawValidators));
  }
  /**
   * Add an asynchronous validator or validators to this control, without affecting other
   * validators.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * Adding a validator that already exists will have no effect.
   *
   * @param validators The new asynchronous validator function or functions to add to this control.
   */
  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Remove a synchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found,
   * it is ignored.
   *
   * @usageNotes
   *
   * ### Reference to a ValidatorFn
   *
   * ```
   * // Reference to the RequiredValidator
   * const ctrl = new FormControl<string | null>('', Validators.required);
   * ctrl.removeValidators(Validators.required);
   *
   * // Reference to anonymous function inside MinValidator
   * const minValidator = Validators.min(3);
   * const ctrl = new FormControl<string | null>('', minValidator);
   * expect(ctrl.hasValidator(minValidator)).toEqual(true)
   * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
   *
   * ctrl.removeValidators(minValidator);
   * ```
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The validator or validators to remove.
   */
  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._rawValidators));
  }
  /**
   * Remove an asynchronous validator from this control, without affecting other validators.
   * Validators are compared by function reference; you must pass a reference to the exact same
   * validator function as the one that was originally set. If a provided validator is not found, it
   * is ignored.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   * @param validators The asynchronous validator or validators to remove.
   */
  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._rawAsyncValidators));
  }
  /**
   * Check whether a synchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @usageNotes
   *
   * ### Reference to a ValidatorFn
   *
   * ```
   * // Reference to the RequiredValidator
   * const ctrl = new FormControl<number | null>(0, Validators.required);
   * expect(ctrl.hasValidator(Validators.required)).toEqual(true)
   *
   * // Reference to anonymous function inside MinValidator
   * const minValidator = Validators.min(3);
   * const ctrl = new FormControl<number | null>(0, minValidator);
   * expect(ctrl.hasValidator(minValidator)).toEqual(true)
   * expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
   * ```
   *
   * @param validator The validator to check for presence. Compared by function reference.
   * @returns Whether the provided validator was found on this control.
   */
  hasValidator(validator) {
    return hasValidator(this._rawValidators, validator);
  }
  /**
   * Check whether an asynchronous validator function is present on this control. The provided
   * validator must be a reference to the exact same function that was provided.
   *
   * @param validator The asynchronous validator to check for presence. Compared by function
   *     reference.
   * @returns Whether the provided asynchronous validator was found on this control.
   */
  hasAsyncValidator(validator) {
    return hasValidator(this._rawAsyncValidators, validator);
  }
  /**
   * Empties out the synchronous validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  clearValidators() {
    this.validator = null;
  }
  /**
   * Empties out the async validator list.
   *
   * When you add or remove a validator at run time, you must call
   * `updateValueAndValidity()` for the new validation to take effect.
   *
   */
  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  markAsTouched(opts = {}) {
    const changed = this.touched === false;
    this.touched = true;
    const sourceControl = opts.sourceControl ?? this;
    if (this._parent && !opts.onlySelf) {
      this._parent.markAsTouched(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new TouchedChangeEvent(true, sourceControl));
    }
  }
  /**
   * Marks the control and all its descendant controls as `touched`.
   * @see {@link markAsTouched()}
   *
   * @param opts Configuration options that determine how the control propagates changes
   * and emits events after marking is applied.
   * * `emitEvent`: When true or not supplied (the default), the `events`
   * observable emits a `TouchedChangeEvent` with the `touched` property being `true`.
   * When false, no events are emitted.
   */
  markAllAsTouched(opts = {}) {
    this.markAsTouched({
      onlySelf: true,
      emitEvent: opts.emitEvent,
      sourceControl: this
    });
    this._forEachChild((control) => control.markAllAsTouched(opts));
  }
  markAsUntouched(opts = {}) {
    const changed = this.touched === true;
    this.touched = false;
    this._pendingTouched = false;
    const sourceControl = opts.sourceControl ?? this;
    this._forEachChild((control) => {
      control.markAsUntouched({
        onlySelf: true,
        emitEvent: opts.emitEvent,
        sourceControl
      });
    });
    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts, sourceControl);
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new TouchedChangeEvent(false, sourceControl));
    }
  }
  markAsDirty(opts = {}) {
    const changed = this.pristine === true;
    this.pristine = false;
    const sourceControl = opts.sourceControl ?? this;
    if (this._parent && !opts.onlySelf) {
      this._parent.markAsDirty(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new PristineChangeEvent(false, sourceControl));
    }
  }
  markAsPristine(opts = {}) {
    const changed = this.pristine === false;
    this.pristine = true;
    this._pendingDirty = false;
    const sourceControl = opts.sourceControl ?? this;
    this._forEachChild((control) => {
      control.markAsPristine({
        onlySelf: true,
        emitEvent: opts.emitEvent
      });
    });
    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts, sourceControl);
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new PristineChangeEvent(true, sourceControl));
    }
  }
  markAsPending(opts = {}) {
    this.status = PENDING;
    const sourceControl = opts.sourceControl ?? this;
    if (opts.emitEvent !== false) {
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.statusChanges.emit(this.status);
    }
    if (this._parent && !opts.onlySelf) {
      this._parent.markAsPending(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
  }
  disable(opts = {}) {
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = DISABLED;
    this.errors = null;
    this._forEachChild((control) => {
      control.disable(__spreadProps(__spreadValues({}, opts), {
        onlySelf: true
      }));
    });
    this._updateValue();
    const sourceControl = opts.sourceControl ?? this;
    if (opts.emitEvent !== false) {
      this._events.next(new ValueChangeEvent(this.value, sourceControl));
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    this._updateAncestors(__spreadProps(__spreadValues({}, opts), {
      skipPristineCheck
    }), this);
    this._onDisabledChange.forEach((changeFn) => changeFn(true));
  }
  /**
   * Enables the control. This means the control is included in validation checks and
   * the aggregate value of its parent. Its status recalculates based on its value and
   * its validators.
   *
   * By default, if the control has children, all children are enabled.
   *
   * @see {@link AbstractControl.status}
   *
   * @param opts Configure options that control how the control propagates changes and
   * emits events when marked as untouched
   * * `onlySelf`: When true, mark only this control. When false or not supplied,
   * marks all direct ancestors. Default is false.
   * * `emitEvent`: When true or not supplied (the default), the `statusChanges`,
   * `valueChanges` and `events`
   * observables emit events with the latest status and value when the control is enabled.
   * When false, no events are emitted.
   */
  enable(opts = {}) {
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = VALID;
    this._forEachChild((control) => {
      control.enable(__spreadProps(__spreadValues({}, opts), {
        onlySelf: true
      }));
    });
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
    this._updateAncestors(__spreadProps(__spreadValues({}, opts), {
      skipPristineCheck
    }), this);
    this._onDisabledChange.forEach((changeFn) => changeFn(false));
  }
  _updateAncestors(opts, sourceControl) {
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts);
      if (!opts.skipPristineCheck) {
        this._parent._updatePristine({}, sourceControl);
      }
      this._parent._updateTouched({}, sourceControl);
    }
  }
  /**
   * Sets the parent of the control
   *
   * @param parent The new parent.
   */
  setParent(parent) {
    this._parent = parent;
  }
  /**
   * The raw value of this control. For most control implementations, the raw value will include
   * disabled children.
   */
  getRawValue() {
    return this.value;
  }
  updateValueAndValidity(opts = {}) {
    this._setInitialStatus();
    this._updateValue();
    if (this.enabled) {
      const shouldHaveEmitted = this._cancelExistingSubscription();
      this.errors = this._runValidator();
      this.status = this._calculateStatus();
      if (this.status === VALID || this.status === PENDING) {
        this._runAsyncValidator(shouldHaveEmitted, opts.emitEvent);
      }
    }
    const sourceControl = opts.sourceControl ?? this;
    if (opts.emitEvent !== false) {
      this._events.next(new ValueChangeEvent(this.value, sourceControl));
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
  }
  /** @internal */
  _updateTreeValidity(opts = {
    emitEvent: true
  }) {
    this._forEachChild((ctrl) => ctrl._updateTreeValidity(opts));
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
  }
  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? DISABLED : VALID;
  }
  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }
  _runAsyncValidator(shouldHaveEmitted, emitEvent) {
    if (this.asyncValidator) {
      this.status = PENDING;
      this._hasOwnPendingAsyncValidator = {
        emitEvent: emitEvent !== false
      };
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription = obs.subscribe((errors) => {
        this._hasOwnPendingAsyncValidator = null;
        this.setErrors(errors, {
          emitEvent,
          shouldHaveEmitted
        });
      });
    }
  }
  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      const shouldHaveEmitted = this._hasOwnPendingAsyncValidator?.emitEvent ?? false;
      this._hasOwnPendingAsyncValidator = null;
      return shouldHaveEmitted;
    }
    return false;
  }
  setErrors(errors, opts = {}) {
    this.errors = errors;
    this._updateControlsErrors(opts.emitEvent !== false, this, opts.shouldHaveEmitted);
  }
  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control. If a string is provided, passing it as a string literal will result in improved type
   * information. Likewise, if an array is provided, passing it `as const` will cause improved type
   * information to be available.
   *
   * @usageNotes
   * ### Retrieve a nested control
   *
   * For example, to get a `name` control nested within a `person` sub-group:
   *
   * * `this.form.get('person.name');`
   *
   * -OR-
   *
   * * `this.form.get(['person', 'name'] as const);` // `as const` gives improved typings
   *
   * ### Retrieve a control in a FormArray
   *
   * When accessing an element inside a FormArray, you can use an element index.
   * For example, to get a `price` control from the first element in an `items` array you can use:
   *
   * * `this.form.get('items.0.price');`
   *
   * -OR-
   *
   * * `this.form.get(['items', 0, 'price']);`
   */
  get(path) {
    let currPath = path;
    if (currPath == null) return null;
    if (!Array.isArray(currPath)) currPath = currPath.split(".");
    if (currPath.length === 0) return null;
    return currPath.reduce((control, name) => control && control._find(name), this);
  }
  /**
   * @description
   * Reports error data for the control with the given path.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * @returns error data for that particular error. If the control or error is not present,
   * null is returned.
   */
  getError(errorCode, path) {
    const control = path ? this.get(path) : this;
    return control && control.errors ? control.errors[errorCode] : null;
  }
  /**
   * @description
   * Reports whether the control with the given path has the error specified.
   *
   * @param errorCode The code of the error to check
   * @param path A list of control names that designates how to move from the current control
   * to the control that should be queried for errors.
   *
   * @usageNotes
   * For example, for the following `FormGroup`:
   *
   * ```
   * form = new FormGroup({
   *   address: new FormGroup({ street: new FormControl() })
   * });
   * ```
   *
   * The path to the 'street' control from the root form would be 'address' -> 'street'.
   *
   * It can be provided to this method in one of two formats:
   *
   * 1. An array of string control names, e.g. `['address', 'street']`
   * 1. A period-delimited list of control names in one string, e.g. `'address.street'`
   *
   * If no path is given, this method checks for the error on the current control.
   *
   * @returns whether the given error is present in the control at the given path.
   *
   * If the control is not present, false is returned.
   */
  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  /**
   * Retrieves the top-level ancestor of this control.
   */
  get root() {
    let x = this;
    while (x._parent) {
      x = x._parent;
    }
    return x;
  }
  /** @internal */
  _updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted) {
    this.status = this._calculateStatus();
    if (emitEvent) {
      this.statusChanges.emit(this.status);
    }
    if (emitEvent || shouldHaveEmitted) {
      this._events.next(new StatusChangeEvent(this.status, changedControl));
    }
    if (this._parent) {
      this._parent._updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted);
    }
  }
  /** @internal */
  _initObservables() {
    this.valueChanges = new EventEmitter();
    this.statusChanges = new EventEmitter();
  }
  _calculateStatus() {
    if (this._allControlsDisabled()) return DISABLED;
    if (this.errors) return INVALID;
    if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING)) return PENDING;
    if (this._anyControlsHaveStatus(INVALID)) return INVALID;
    return VALID;
  }
  /** @internal */
  _anyControlsHaveStatus(status) {
    return this._anyControls((control) => control.status === status);
  }
  /** @internal */
  _anyControlsDirty() {
    return this._anyControls((control) => control.dirty);
  }
  /** @internal */
  _anyControlsTouched() {
    return this._anyControls((control) => control.touched);
  }
  /** @internal */
  _updatePristine(opts, changedControl) {
    const newPristine = !this._anyControlsDirty();
    const changed = this.pristine !== newPristine;
    this.pristine = newPristine;
    if (this._parent && !opts.onlySelf) {
      this._parent._updatePristine(opts, changedControl);
    }
    if (changed) {
      this._events.next(new PristineChangeEvent(this.pristine, changedControl));
    }
  }
  /** @internal */
  _updateTouched(opts = {}, changedControl) {
    this.touched = this._anyControlsTouched();
    this._events.next(new TouchedChangeEvent(this.touched, changedControl));
    if (this._parent && !opts.onlySelf) {
      this._parent._updateTouched(opts, changedControl);
    }
  }
  /** @internal */
  _registerOnCollectionChange(fn) {
    this._onCollectionChange = fn;
  }
  /** @internal */
  _setUpdateStrategy(opts) {
    if (isOptionsObj(opts) && opts.updateOn != null) {
      this._updateOn = opts.updateOn;
    }
  }
  /**
   * Check to see if parent has been marked artificially dirty.
   *
   * @internal
   */
  _parentMarkedDirty(onlySelf) {
    const parentDirty = this._parent && this._parent.dirty;
    return !onlySelf && !!parentDirty && !this._parent._anyControlsDirty();
  }
  /** @internal */
  _find(name) {
    return null;
  }
  /**
   * Internal implementation of the `setValidators` method. Needs to be separated out into a
   * different method, because it is called in the constructor and it can break cases where
   * a control is extended.
   */
  _assignValidators(validators) {
    this._rawValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedValidatorFn = coerceToValidator(this._rawValidators);
  }
  /**
   * Internal implementation of the `setAsyncValidators` method. Needs to be separated out into a
   * different method, because it is called in the constructor and it can break cases where
   * a control is extended.
   */
  _assignAsyncValidators(validators) {
    this._rawAsyncValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
  }
};
var FormGroup = class extends AbstractControl {
  /**
   * Creates a new `FormGroup` instance.
   *
   * @param controls A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    (typeof ngDevMode === "undefined" || ngDevMode) && validateFormGroupControls(controls);
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`. The status should be broadcasted via the `statusChanges` observable,
      // so we set `emitEvent` to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  registerControl(name, control) {
    if (this.controls[name]) return this.controls[name];
    this.controls[name] = control;
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
    return control;
  }
  addControl(name, control, options = {}) {
    this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  /**
   * Remove a control from this group. In a strongly-typed group, required controls cannot be
   * removed.
   *
   * This method also updates the value and validity of the control.
   *
   * @param name The control name to remove from the collection
   * @param options Specifies whether this FormGroup instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */
  removeControl(name, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {
    });
    delete this.controls[name];
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  setControl(name, control, options = {}) {
    if (this.controls[name]) this.controls[name]._registerOnCollectionChange(() => {
    });
    delete this.controls[name];
    if (control) this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  contains(controlName) {
    return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled;
  }
  /**
   * Sets the value of the `FormGroup`. It accepts an object that matches
   * the structure of the group, with control names as keys.
   *
   * @usageNotes
   * ### Set the complete value for the form group
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl(),
   *   last: new FormControl()
   * });
   *
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.setValue({first: 'Nancy', last: 'Drew'});
   * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
   * ```
   *
   * @throws When strict checks fail, such as setting the value of a control
   * that doesn't exist or if you exclude a value of a control that does exist.
   *
   * @param value The new value for the control that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes
   * and emits events after the value changes.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   */
  setValue(value, options = {}) {
    assertAllValuesPresent(this, true, value);
    Object.keys(value).forEach((name) => {
      assertControlPresent(this, true, name);
      this.controls[name].setValue(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormGroup`. It accepts an object with control
   * names as keys, and does its best to match the values to the correct controls
   * in the group.
   *
   * It accepts both super-sets and sub-sets of the group without throwing an error.
   *
   * @usageNotes
   * ### Patch the value for a form group
   *
   * ```
   * const form = new FormGroup({
   *    first: new FormControl(),
   *    last: new FormControl()
   * });
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.patchValue({first: 'Nancy'});
   * console.log(form.value);   // {first: 'Nancy', last: null}
   * ```
   *
   * @param value The object that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is patched.
   * * `onlySelf`: When true, each change only affects this control and not its parent. Default is
   * true.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control value
   * is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */
  patchValue(value, options = {}) {
    if (value == null) return;
    Object.keys(value).forEach((name) => {
      const control = this.controls[name];
      if (control) {
        control.patchValue(
          /* Guaranteed to be present, due to the outer forEach. */
          value[name],
          {
            onlySelf: true,
            emitEvent: options.emitEvent
          }
        );
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormGroup`, marks all descendants `pristine` and `untouched` and sets
   * the value of all descendants to their default values, or null if no defaults were provided.
   *
   * You reset to a specific form state by passing in a map of states
   * that matches the structure of your form, with control names as keys. The state
   * is a standalone value or a form state object with both a value and a disabled
   * status.
   *
   * @param value Resets the control with an initial value,
   * or an object that defines the initial value and disabled state.
   *
   * @param options Configuration options that determine how the control propagates changes
   * and emits events when the group is reset.
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default is
   * false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   *
   * @usageNotes
   *
   * ### Reset the form group values
   *
   * ```ts
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * console.log(form.value);  // {first: 'first name', last: 'last name'}
   *
   * form.reset({ first: 'name', last: 'last name' });
   *
   * console.log(form.value);  // {first: 'name', last: 'last name'}
   * ```
   *
   * ### Reset the form group values and disabled status
   *
   * ```
   * const form = new FormGroup({
   *   first: new FormControl('first name'),
   *   last: new FormControl('last name')
   * });
   *
   * form.reset({
   *   first: {value: 'name', disabled: true},
   *   last: 'last'
   * });
   *
   * console.log(form.value);  // {last: 'last'}
   * console.log(form.get('first').status);  // 'DISABLED'
   * ```
   */
  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value ? value[name] : null, {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this._updatePristine(options, this);
    this._updateTouched(options, this);
    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the `FormGroup`, including any disabled controls.
   *
   * Retrieves all values regardless of disabled status.
   */
  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control.getRawValue();
      return acc;
    });
  }
  /** @internal */
  _syncPendingControls() {
    let subtreeUpdated = this._reduceChildren(false, (updated, child) => {
      return child._syncPendingControls() ? true : updated;
    });
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  /** @internal */
  _forEachChild(cb) {
    Object.keys(this.controls).forEach((key) => {
      const control = this.controls[key];
      control && cb(control, key);
    });
  }
  /** @internal */
  _setUpControls() {
    this._forEachChild((control) => {
      control.setParent(this);
      control._registerOnCollectionChange(this._onCollectionChange);
    });
  }
  /** @internal */
  _updateValue() {
    this.value = this._reduceValue();
  }
  /** @internal */
  _anyControls(condition) {
    for (const [controlName, control] of Object.entries(this.controls)) {
      if (this.contains(controlName) && condition(control)) {
        return true;
      }
    }
    return false;
  }
  /** @internal */
  _reduceValue() {
    let acc = {};
    return this._reduceChildren(acc, (acc2, control, name) => {
      if (control.enabled || this.disabled) {
        acc2[name] = control.value;
      }
      return acc2;
    });
  }
  /** @internal */
  _reduceChildren(initValue, fn) {
    let res = initValue;
    this._forEachChild((control, name) => {
      res = fn(res, control, name);
    });
    return res;
  }
  /** @internal */
  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false;
      }
    }
    return Object.keys(this.controls).length > 0 || this.disabled;
  }
  /** @internal */
  _find(name) {
    return this.controls.hasOwnProperty(name) ? this.controls[name] : null;
  }
};
function validateFormGroupControls(controls) {
  const invalidKeys = Object.keys(controls).filter((key) => key.includes("."));
  if (invalidKeys.length > 0) {
    console.warn(`FormGroup keys cannot include \`.\`, please replace the keys for: ${invalidKeys.join(",")}.`);
  }
}
var FormRecord = class extends FormGroup {
};
var CALL_SET_DISABLED_STATE = new InjectionToken("CallSetDisabledState", {
  providedIn: "root",
  factory: () => setDisabledStateDefault
});
var setDisabledStateDefault = "always";
function controlPath(name, parent) {
  return [...parent.path, name];
}
function setUpControl(control, dir, callSetDisabledState = setDisabledStateDefault) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (!control) _throwError(dir, "Cannot find control with");
    if (!dir.valueAccessor) _throwMissingValueAccessorError(dir);
  }
  setUpValidators(control, dir);
  dir.valueAccessor.writeValue(control.value);
  if (control.disabled || callSetDisabledState === "always") {
    dir.valueAccessor.setDisabledState?.(control.disabled);
  }
  setUpViewChangePipeline(control, dir);
  setUpModelChangePipeline(control, dir);
  setUpBlurPipeline(control, dir);
  setUpDisabledChangeHandler(control, dir);
}
function cleanUpControl(control, dir, validateControlPresenceOnChange = true) {
  const noop = () => {
    if (validateControlPresenceOnChange && (typeof ngDevMode === "undefined" || ngDevMode)) {
      _noControlError(dir);
    }
  };
  if (dir.valueAccessor) {
    dir.valueAccessor.registerOnChange(noop);
    dir.valueAccessor.registerOnTouched(noop);
  }
  cleanUpValidators(control, dir);
  if (control) {
    dir._invokeOnDestroyCallbacks();
    control._registerOnCollectionChange(() => {
    });
  }
}
function registerOnValidatorChange(validators, onChange) {
  validators.forEach((validator) => {
    if (validator.registerOnValidatorChange) validator.registerOnValidatorChange(onChange);
  });
}
function setUpDisabledChangeHandler(control, dir) {
  if (dir.valueAccessor.setDisabledState) {
    const onDisabledChange = (isDisabled) => {
      dir.valueAccessor.setDisabledState(isDisabled);
    };
    control.registerOnDisabledChange(onDisabledChange);
    dir._registerOnDestroy(() => {
      control._unregisterOnDisabledChange(onDisabledChange);
    });
  }
}
function setUpValidators(control, dir) {
  const validators = getControlValidators(control);
  if (dir.validator !== null) {
    control.setValidators(mergeValidators(validators, dir.validator));
  } else if (typeof validators === "function") {
    control.setValidators([validators]);
  }
  const asyncValidators = getControlAsyncValidators(control);
  if (dir.asyncValidator !== null) {
    control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
  } else if (typeof asyncValidators === "function") {
    control.setAsyncValidators([asyncValidators]);
  }
  const onValidatorChange = () => control.updateValueAndValidity();
  registerOnValidatorChange(dir._rawValidators, onValidatorChange);
  registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
}
function cleanUpValidators(control, dir) {
  let isControlUpdated = false;
  if (control !== null) {
    if (dir.validator !== null) {
      const validators = getControlValidators(control);
      if (Array.isArray(validators) && validators.length > 0) {
        const updatedValidators = validators.filter((validator) => validator !== dir.validator);
        if (updatedValidators.length !== validators.length) {
          isControlUpdated = true;
          control.setValidators(updatedValidators);
        }
      }
    }
    if (dir.asyncValidator !== null) {
      const asyncValidators = getControlAsyncValidators(control);
      if (Array.isArray(asyncValidators) && asyncValidators.length > 0) {
        const updatedAsyncValidators = asyncValidators.filter((asyncValidator) => asyncValidator !== dir.asyncValidator);
        if (updatedAsyncValidators.length !== asyncValidators.length) {
          isControlUpdated = true;
          control.setAsyncValidators(updatedAsyncValidators);
        }
      }
    }
  }
  const noop = () => {
  };
  registerOnValidatorChange(dir._rawValidators, noop);
  registerOnValidatorChange(dir._rawAsyncValidators, noop);
  return isControlUpdated;
}
function setUpViewChangePipeline(control, dir) {
  dir.valueAccessor.registerOnChange((newValue) => {
    control._pendingValue = newValue;
    control._pendingChange = true;
    control._pendingDirty = true;
    if (control.updateOn === "change") updateControl(control, dir);
  });
}
function setUpBlurPipeline(control, dir) {
  dir.valueAccessor.registerOnTouched(() => {
    control._pendingTouched = true;
    if (control.updateOn === "blur" && control._pendingChange) updateControl(control, dir);
    if (control.updateOn !== "submit") control.markAsTouched();
  });
}
function updateControl(control, dir) {
  if (control._pendingDirty) control.markAsDirty();
  control.setValue(control._pendingValue, {
    emitModelToViewChange: false
  });
  dir.viewToModelUpdate(control._pendingValue);
  control._pendingChange = false;
}
function setUpModelChangePipeline(control, dir) {
  const onChange = (newValue, emitModelEvent) => {
    dir.valueAccessor.writeValue(newValue);
    if (emitModelEvent) dir.viewToModelUpdate(newValue);
  };
  control.registerOnChange(onChange);
  dir._registerOnDestroy(() => {
    control._unregisterOnChange(onChange);
  });
}
function setUpFormContainer(control, dir) {
  if (control == null && (typeof ngDevMode === "undefined" || ngDevMode)) _throwError(dir, "Cannot find control with");
  setUpValidators(control, dir);
}
function cleanUpFormContainer(control, dir) {
  return cleanUpValidators(control, dir);
}
function _noControlError(dir) {
  return _throwError(dir, "There is no FormControl instance attached to form control element with");
}
function _throwError(dir, message) {
  const messageEnd = _describeControlLocation(dir);
  throw new Error(`${message} ${messageEnd}`);
}
function _describeControlLocation(dir) {
  const path = dir.path;
  if (path && path.length > 1) return `path: '${path.join(" -> ")}'`;
  if (path?.[0]) return `name: '${path}'`;
  return "unspecified name attribute";
}
function _throwMissingValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new RuntimeError(-1203, `No value accessor for form control ${loc}.`);
}
function _throwInvalidValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new RuntimeError(1200, `Value accessor was not provided as an array for form control with ${loc}. Check that the \`NG_VALUE_ACCESSOR\` token is configured as a \`multi: true\` provider.`);
}
function isPropertyUpdated(changes, viewModel) {
  if (!changes.hasOwnProperty("model")) return false;
  const change = changes["model"];
  if (change.isFirstChange()) return true;
  return !Object.is(viewModel, change.currentValue);
}
function isBuiltInAccessor(valueAccessor) {
  return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
}
function syncPendingControls(form, directives) {
  form._syncPendingControls();
  directives.forEach((dir) => {
    const control = dir.control;
    if (control.updateOn === "submit" && control._pendingChange) {
      dir.viewToModelUpdate(control._pendingValue);
      control._pendingChange = false;
    }
  });
}
function selectValueAccessor(dir, valueAccessors) {
  if (!valueAccessors) return null;
  if (!Array.isArray(valueAccessors) && (typeof ngDevMode === "undefined" || ngDevMode)) _throwInvalidValueAccessorError(dir);
  let defaultAccessor = void 0;
  let builtinAccessor = void 0;
  let customAccessor = void 0;
  valueAccessors.forEach((v) => {
    if (v.constructor === DefaultValueAccessor) {
      defaultAccessor = v;
    } else if (isBuiltInAccessor(v)) {
      if (builtinAccessor && (typeof ngDevMode === "undefined" || ngDevMode)) _throwError(dir, "More than one built-in value accessor matches form control with");
      builtinAccessor = v;
    } else {
      if (customAccessor && (typeof ngDevMode === "undefined" || ngDevMode)) _throwError(dir, "More than one custom value accessor matches form control with");
      customAccessor = v;
    }
  });
  if (customAccessor) return customAccessor;
  if (builtinAccessor) return builtinAccessor;
  if (defaultAccessor) return defaultAccessor;
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    _throwError(dir, "No valid value accessor for form control with");
  }
  return null;
}
function removeListItem$1(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
function _ngModelWarning(name, type, instance, warningConfig) {
  if (warningConfig === "never") return;
  if ((warningConfig === null || warningConfig === "once") && !type._ngModelWarningSentOnce || warningConfig === "always" && !instance._ngModelWarningSent) {
    console.warn(ngModelWarning(name));
    type._ngModelWarningSentOnce = true;
    instance._ngModelWarningSent = true;
  }
}
var formDirectiveProvider$1 = {
  provide: ControlContainer,
  useExisting: forwardRef(() => NgForm)
};
var resolvedPromise$1 = (() => Promise.resolve())();
var NgForm = class _NgForm extends ControlContainer {
  /**
   * @description
   * Returns whether the form submission has been triggered.
   */
  get submitted() {
    return untracked(this.submittedReactive);
  }
  constructor(validators, asyncValidators, callSetDisabledState) {
    super();
    this.callSetDisabledState = callSetDisabledState;
    this._submitted = computed(() => this.submittedReactive());
    this.submittedReactive = signal(false);
    this._directives = /* @__PURE__ */ new Set();
    this.ngSubmit = new EventEmitter();
    this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
  }
  /** @nodoc */
  ngAfterViewInit() {
    this._setUpdateStrategy();
  }
  /**
   * @description
   * The directive instance.
   */
  get formDirective() {
    return this;
  }
  /**
   * @description
   * The internal `FormGroup` instance.
   */
  get control() {
    return this.form;
  }
  /**
   * @description
   * Returns an array representing the path to this group. Because this directive
   * always lives at the top level of a form, it is always an empty array.
   */
  get path() {
    return [];
  }
  /**
   * @description
   * Returns a map of the controls in this group.
   */
  get controls() {
    return this.form.controls;
  }
  /**
   * @description
   * Method that sets up the control directive in this group, re-calculates its value
   * and validity, and adds the instance to the internal list of directives.
   *
   * @param dir The `NgModel` directive instance.
   */
  addControl(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      dir.control = container.registerControl(dir.name, dir.control);
      setUpControl(dir.control, dir, this.callSetDisabledState);
      dir.control.updateValueAndValidity({
        emitEvent: false
      });
      this._directives.add(dir);
    });
  }
  /**
   * @description
   * Retrieves the `FormControl` instance from the provided `NgModel` directive.
   *
   * @param dir The `NgModel` directive instance.
   */
  getControl(dir) {
    return this.form.get(dir.path);
  }
  /**
   * @description
   * Removes the `NgModel` instance from the internal list of directives
   *
   * @param dir The `NgModel` directive instance.
   */
  removeControl(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      if (container) {
        container.removeControl(dir.name);
      }
      this._directives.delete(dir);
    });
  }
  /**
   * @description
   * Adds a new `NgModelGroup` directive instance to the form.
   *
   * @param dir The `NgModelGroup` directive instance.
   */
  addFormGroup(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      const group = new FormGroup({});
      setUpFormContainer(group, dir);
      container.registerControl(dir.name, group);
      group.updateValueAndValidity({
        emitEvent: false
      });
    });
  }
  /**
   * @description
   * Removes the `NgModelGroup` directive instance from the form.
   *
   * @param dir The `NgModelGroup` directive instance.
   */
  removeFormGroup(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      if (container) {
        container.removeControl(dir.name);
      }
    });
  }
  /**
   * @description
   * Retrieves the `FormGroup` for a provided `NgModelGroup` directive instance
   *
   * @param dir The `NgModelGroup` directive instance.
   */
  getFormGroup(dir) {
    return this.form.get(dir.path);
  }
  /**
   * Sets the new value for the provided `NgControl` directive.
   *
   * @param dir The `NgControl` directive instance.
   * @param value The new value for the directive's control.
   */
  updateModel(dir, value) {
    resolvedPromise$1.then(() => {
      const ctrl = this.form.get(dir.path);
      ctrl.setValue(value);
    });
  }
  /**
   * @description
   * Sets the value for this `FormGroup`.
   *
   * @param value The new value
   */
  setValue(value) {
    this.control.setValue(value);
  }
  /**
   * @description
   * Method called when the "submit" event is triggered on the form.
   * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
   *
   * @param $event The "submit" event object
   */
  onSubmit($event) {
    this.submittedReactive.set(true);
    syncPendingControls(this.form, this._directives);
    this.ngSubmit.emit($event);
    return $event?.target?.method === "dialog";
  }
  /**
   * @description
   * Method called when the "reset" event is triggered on the form.
   */
  onReset() {
    this.resetForm();
  }
  /**
   * @description
   * Resets the form to an initial value and resets its submitted status.
   *
   * @param value The new value for the form.
   */
  resetForm(value = void 0) {
    this.form.reset(value);
    this.submittedReactive.set(false);
  }
  _setUpdateStrategy() {
    if (this.options && this.options.updateOn != null) {
      this.form._updateOn = this.options.updateOn;
    }
  }
  _findContainer(path) {
    path.pop();
    return path.length ? this.form.get(path) : this.form;
  }
  static {
    this.\u0275fac = function NgForm_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgForm)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _NgForm,
      selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
      hostBindings: function NgForm_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("submit", function NgForm_submit_HostBindingHandler($event) {
            return ctx.onSubmit($event);
          })("reset", function NgForm_reset_HostBindingHandler() {
            return ctx.onReset();
          });
        }
      },
      inputs: {
        options: [0, "ngFormOptions", "options"]
      },
      outputs: {
        ngSubmit: "ngSubmit"
      },
      exportAs: ["ngForm"],
      features: [\u0275\u0275ProvidersFeature([formDirectiveProvider$1]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgForm, [{
    type: Directive,
    args: [{
      selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]",
      providers: [formDirectiveProvider$1],
      host: {
        "(submit)": "onSubmit($event)",
        "(reset)": "onReset()"
      },
      outputs: ["ngSubmit"],
      exportAs: "ngForm"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], {
    options: [{
      type: Input,
      args: ["ngFormOptions"]
    }]
  });
})();
function removeListItem(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
function isFormControlState(formState) {
  return typeof formState === "object" && formState !== null && Object.keys(formState).length === 2 && "value" in formState && "disabled" in formState;
}
var FormControl = class FormControl2 extends AbstractControl {
  constructor(formState = null, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.defaultValue = null;
    this._onChange = [];
    this._pendingChange = false;
    this._applyFormState(formState);
    this._setUpdateStrategy(validatorOrOpts);
    this._initObservables();
    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set
      // `emitEvent` to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
    if (isOptionsObj(validatorOrOpts) && (validatorOrOpts.nonNullable || validatorOrOpts.initialValueIsDefault)) {
      if (isFormControlState(formState)) {
        this.defaultValue = formState.value;
      } else {
        this.defaultValue = formState;
      }
    }
  }
  setValue(value, options = {}) {
    this.value = this._pendingValue = value;
    if (this._onChange.length && options.emitModelToViewChange !== false) {
      this._onChange.forEach((changeFn) => changeFn(this.value, options.emitViewToModelChange !== false));
    }
    this.updateValueAndValidity(options);
  }
  patchValue(value, options = {}) {
    this.setValue(value, options);
  }
  reset(formState = this.defaultValue, options = {}) {
    this._applyFormState(formState);
    this.markAsPristine(options);
    this.markAsUntouched(options);
    this.setValue(this.value, options);
    this._pendingChange = false;
  }
  /**  @internal */
  _updateValue() {
  }
  /**  @internal */
  _anyControls(condition) {
    return false;
  }
  /**  @internal */
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(fn) {
    this._onChange.push(fn);
  }
  /** @internal */
  _unregisterOnChange(fn) {
    removeListItem(this._onChange, fn);
  }
  registerOnDisabledChange(fn) {
    this._onDisabledChange.push(fn);
  }
  /** @internal */
  _unregisterOnDisabledChange(fn) {
    removeListItem(this._onDisabledChange, fn);
  }
  /** @internal */
  _forEachChild(cb) {
  }
  /** @internal */
  _syncPendingControls() {
    if (this.updateOn === "submit") {
      if (this._pendingDirty) this.markAsDirty();
      if (this._pendingTouched) this.markAsTouched();
      if (this._pendingChange) {
        this.setValue(this._pendingValue, {
          onlySelf: true,
          emitModelToViewChange: false
        });
        return true;
      }
    }
    return false;
  }
  _applyFormState(formState) {
    if (isFormControlState(formState)) {
      this.value = this._pendingValue = formState.value;
      formState.disabled ? this.disable({
        onlySelf: true,
        emitEvent: false
      }) : this.enable({
        onlySelf: true,
        emitEvent: false
      });
    } else {
      this.value = this._pendingValue = formState;
    }
  }
};
var isFormControl = (control) => control instanceof FormControl;
var AbstractFormGroupDirective = class _AbstractFormGroupDirective extends ControlContainer {
  /** @nodoc */
  ngOnInit() {
    this._checkParentType();
    this.formDirective.addFormGroup(this);
  }
  /** @nodoc */
  ngOnDestroy() {
    if (this.formDirective) {
      this.formDirective.removeFormGroup(this);
    }
  }
  /**
   * @description
   * The `FormGroup` bound to this directive.
   */
  get control() {
    return this.formDirective.getFormGroup(this);
  }
  /**
   * @description
   * The path to this group from the top-level directive.
   */
  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  /**
   * @description
   * The top-level directive for this group if present, otherwise null.
   */
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  /** @internal */
  _checkParentType() {
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275AbstractFormGroupDirective_BaseFactory;
      return function AbstractFormGroupDirective_Factory(__ngFactoryType__) {
        return (\u0275AbstractFormGroupDirective_BaseFactory || (\u0275AbstractFormGroupDirective_BaseFactory = \u0275\u0275getInheritedFactory(_AbstractFormGroupDirective)))(__ngFactoryType__ || _AbstractFormGroupDirective);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _AbstractFormGroupDirective,
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractFormGroupDirective, [{
    type: Directive
  }], null, null);
})();
function modelParentException() {
  return new RuntimeError(1350, `
    ngModel cannot be used to register form controls with a parent formGroup directive.  Try using
    formGroup's partner directive "formControlName" instead.  Example:

    ${formControlNameExample}

    Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:

    Example:

    ${ngModelWithFormGroupExample}`);
}
function formGroupNameException() {
  return new RuntimeError(1351, `
    ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.

    Option 1: Use formControlName instead of ngModel (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):

    ${ngModelGroupExample}`);
}
function missingNameException() {
  return new RuntimeError(1352, `If ngModel is used within a form tag, either the name attribute must be set or the form
    control must be defined as 'standalone' in ngModelOptions.

    Example 1: <input [(ngModel)]="person.firstName" name="first">
    Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">`);
}
function modelGroupParentException() {
  return new RuntimeError(1353, `
    ngModelGroup cannot be used with a parent formGroup directive.

    Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):

    ${ngModelGroupExample}`);
}
var modelGroupProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => NgModelGroup)
};
var NgModelGroup = class _NgModelGroup extends AbstractFormGroupDirective {
  constructor(parent, validators, asyncValidators) {
    super();
    this.name = "";
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  /** @internal */
  _checkParentType() {
    if (!(this._parent instanceof _NgModelGroup) && !(this._parent instanceof NgForm) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw modelGroupParentException();
    }
  }
  static {
    this.\u0275fac = function NgModelGroup_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgModelGroup)(\u0275\u0275directiveInject(ControlContainer, 5), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _NgModelGroup,
      selectors: [["", "ngModelGroup", ""]],
      inputs: {
        name: [0, "ngModelGroup", "name"]
      },
      exportAs: ["ngModelGroup"],
      features: [\u0275\u0275ProvidersFeature([modelGroupProvider]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgModelGroup, [{
    type: Directive,
    args: [{
      selector: "[ngModelGroup]",
      providers: [modelGroupProvider],
      exportAs: "ngModelGroup"
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }], {
    name: [{
      type: Input,
      args: ["ngModelGroup"]
    }]
  });
})();
var formControlBinding$1 = {
  provide: NgControl,
  useExisting: forwardRef(() => NgModel)
};
var resolvedPromise = (() => Promise.resolve())();
var NgModel = class _NgModel extends NgControl {
  constructor(parent, validators, asyncValidators, valueAccessors, _changeDetectorRef, callSetDisabledState) {
    super();
    this._changeDetectorRef = _changeDetectorRef;
    this.callSetDisabledState = callSetDisabledState;
    this.control = new FormControl();
    this._registered = false;
    this.name = "";
    this.update = new EventEmitter();
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }
  /** @nodoc */
  ngOnChanges(changes) {
    this._checkForErrors();
    if (!this._registered || "name" in changes) {
      if (this._registered) {
        this._checkName();
        if (this.formDirective) {
          const oldName = changes["name"].previousValue;
          this.formDirective.removeControl({
            name: oldName,
            path: this._getPath(oldName)
          });
        }
      }
      this._setUpControl();
    }
    if ("isDisabled" in changes) {
      this._updateDisabled(changes);
    }
    if (isPropertyUpdated(changes, this.viewModel)) {
      this._updateValue(this.model);
      this.viewModel = this.model;
    }
  }
  /** @nodoc */
  ngOnDestroy() {
    this.formDirective && this.formDirective.removeControl(this);
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */
  get path() {
    return this._getPath(this.name);
  }
  /**
   * @description
   * The top-level directive for this control if present, otherwise null.
   */
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  /**
   * @description
   * Sets the new value for the view model and emits an `ngModelChange` event.
   *
   * @param newValue The new value emitted by `ngModelChange`.
   */
  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  _setUpControl() {
    this._setUpdateStrategy();
    this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
    this._registered = true;
  }
  _setUpdateStrategy() {
    if (this.options && this.options.updateOn != null) {
      this.control._updateOn = this.options.updateOn;
    }
  }
  _isStandalone() {
    return !this._parent || !!(this.options && this.options.standalone);
  }
  _setUpStandalone() {
    setUpControl(this.control, this, this.callSetDisabledState);
    this.control.updateValueAndValidity({
      emitEvent: false
    });
  }
  _checkForErrors() {
    if (!this._isStandalone()) {
      this._checkParentType();
    }
    this._checkName();
  }
  _checkParentType() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!(this._parent instanceof NgModelGroup) && this._parent instanceof AbstractFormGroupDirective) {
        throw formGroupNameException();
      } else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
        throw modelParentException();
      }
    }
  }
  _checkName() {
    if (this.options && this.options.name) this.name = this.options.name;
    if (!this._isStandalone() && !this.name && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw missingNameException();
    }
  }
  _updateValue(value) {
    resolvedPromise.then(() => {
      this.control.setValue(value, {
        emitViewToModelChange: false
      });
      this._changeDetectorRef?.markForCheck();
    });
  }
  _updateDisabled(changes) {
    const disabledValue = changes["isDisabled"].currentValue;
    const isDisabled = disabledValue !== 0 && booleanAttribute(disabledValue);
    resolvedPromise.then(() => {
      if (isDisabled && !this.control.disabled) {
        this.control.disable();
      } else if (!isDisabled && this.control.disabled) {
        this.control.enable();
      }
      this._changeDetectorRef?.markForCheck();
    });
  }
  _getPath(controlName) {
    return this._parent ? controlPath(controlName, this._parent) : [controlName];
  }
  static {
    this.\u0275fac = function NgModel_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgModel)(\u0275\u0275directiveInject(ControlContainer, 9), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(ChangeDetectorRef, 8), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _NgModel,
      selectors: [["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]],
      inputs: {
        name: "name",
        isDisabled: [0, "disabled", "isDisabled"],
        model: [0, "ngModel", "model"],
        options: [0, "ngModelOptions", "options"]
      },
      outputs: {
        update: "ngModelChange"
      },
      exportAs: ["ngModel"],
      features: [\u0275\u0275ProvidersFeature([formControlBinding$1]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgModel, [{
    type: Directive,
    args: [{
      selector: "[ngModel]:not([formControlName]):not([formControl])",
      providers: [formControlBinding$1],
      exportAs: "ngModel"
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALUE_ACCESSOR]
    }]
  }, {
    type: ChangeDetectorRef,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ChangeDetectorRef]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], {
    name: [{
      type: Input
    }],
    isDisabled: [{
      type: Input,
      args: ["disabled"]
    }],
    model: [{
      type: Input,
      args: ["ngModel"]
    }],
    options: [{
      type: Input,
      args: ["ngModelOptions"]
    }],
    update: [{
      type: Output,
      args: ["ngModelChange"]
    }]
  });
})();
var \u0275NgNoValidate = class _\u0275NgNoValidate {
  static {
    this.\u0275fac = function \u0275NgNoValidate_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _\u0275NgNoValidate)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _\u0275NgNoValidate,
      selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
      hostAttrs: ["novalidate", ""]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(\u0275NgNoValidate, [{
    type: Directive,
    args: [{
      selector: "form:not([ngNoForm]):not([ngNativeValidate])",
      host: {
        "novalidate": ""
      }
    }]
  }], null, null);
})();
var NUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberValueAccessor),
  multi: true
};
var NumberValueAccessor = class _NumberValueAccessor extends BuiltInControlValueAccessor {
  /**
   * Sets the "value" property on the input element.
   * @nodoc
   */
  writeValue(value) {
    const normalizedValue = value == null ? "" : value;
    this.setProperty("value", normalizedValue);
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */
  registerOnChange(fn) {
    this.onChange = (value) => {
      fn(value == "" ? null : parseFloat(value));
    };
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275NumberValueAccessor_BaseFactory;
      return function NumberValueAccessor_Factory(__ngFactoryType__) {
        return (\u0275NumberValueAccessor_BaseFactory || (\u0275NumberValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_NumberValueAccessor)))(__ngFactoryType__ || _NumberValueAccessor);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _NumberValueAccessor,
      selectors: [["input", "type", "number", "formControlName", ""], ["input", "type", "number", "formControl", ""], ["input", "type", "number", "ngModel", ""]],
      hostBindings: function NumberValueAccessor_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("input", function NumberValueAccessor_input_HostBindingHandler($event) {
            return ctx.onChange($event.target.value);
          })("blur", function NumberValueAccessor_blur_HostBindingHandler() {
            return ctx.onTouched();
          });
        }
      },
      features: [\u0275\u0275ProvidersFeature([NUMBER_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumberValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]",
      host: {
        "(input)": "onChange($event.target.value)",
        "(blur)": "onTouched()"
      },
      providers: [NUMBER_VALUE_ACCESSOR]
    }]
  }], null, null);
})();
var RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioControlValueAccessor),
  multi: true
};
function throwNameError() {
  throw new RuntimeError(1202, `
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <input type="radio" formControlName="food" name="food">
    `);
}
var RadioControlRegistry = class _RadioControlRegistry {
  constructor() {
    this._accessors = [];
  }
  /**
   * @description
   * Adds a control to the internal registry. For internal use only.
   */
  add(control, accessor) {
    this._accessors.push([control, accessor]);
  }
  /**
   * @description
   * Removes a control from the internal registry. For internal use only.
   */
  remove(accessor) {
    for (let i = this._accessors.length - 1; i >= 0; --i) {
      if (this._accessors[i][1] === accessor) {
        this._accessors.splice(i, 1);
        return;
      }
    }
  }
  /**
   * @description
   * Selects a radio button. For internal use only.
   */
  select(accessor) {
    this._accessors.forEach((c) => {
      if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
        c[1].fireUncheck(accessor.value);
      }
    });
  }
  _isSameGroup(controlPair, accessor) {
    if (!controlPair[0].control) return false;
    return controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name;
  }
  static {
    this.\u0275fac = function RadioControlRegistry_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RadioControlRegistry)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _RadioControlRegistry,
      factory: _RadioControlRegistry.\u0275fac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioControlRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var RadioControlValueAccessor = class _RadioControlValueAccessor extends BuiltInControlValueAccessor {
  constructor(renderer, elementRef, _registry, _injector) {
    super(renderer, elementRef);
    this._registry = _registry;
    this._injector = _injector;
    this.setDisabledStateFired = false;
    this.onChange = () => {
    };
    this.callSetDisabledState = inject(CALL_SET_DISABLED_STATE, {
      optional: true
    }) ?? setDisabledStateDefault;
  }
  /** @nodoc */
  ngOnInit() {
    this._control = this._injector.get(NgControl);
    this._checkName();
    this._registry.add(this._control, this);
  }
  /** @nodoc */
  ngOnDestroy() {
    this._registry.remove(this);
  }
  /**
   * Sets the "checked" property value on the radio input element.
   * @nodoc
   */
  writeValue(value) {
    this._state = value === this.value;
    this.setProperty("checked", this._state);
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */
  registerOnChange(fn) {
    this._fn = fn;
    this.onChange = () => {
      fn(this.value);
      this._registry.select(this);
    };
  }
  /** @nodoc */
  setDisabledState(isDisabled) {
    if (this.setDisabledStateFired || isDisabled || this.callSetDisabledState === "whenDisabledForLegacyCode") {
      this.setProperty("disabled", isDisabled);
    }
    this.setDisabledStateFired = true;
  }
  /**
   * Sets the "value" on the radio input element and unchecks it.
   *
   * @param value
   */
  fireUncheck(value) {
    this.writeValue(value);
  }
  _checkName() {
    if (this.name && this.formControlName && this.name !== this.formControlName && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throwNameError();
    }
    if (!this.name && this.formControlName) this.name = this.formControlName;
  }
  static {
    this.\u0275fac = function RadioControlValueAccessor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RadioControlValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(RadioControlRegistry), \u0275\u0275directiveInject(Injector));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _RadioControlValueAccessor,
      selectors: [["input", "type", "radio", "formControlName", ""], ["input", "type", "radio", "formControl", ""], ["input", "type", "radio", "ngModel", ""]],
      hostBindings: function RadioControlValueAccessor_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("change", function RadioControlValueAccessor_change_HostBindingHandler() {
            return ctx.onChange();
          })("blur", function RadioControlValueAccessor_blur_HostBindingHandler() {
            return ctx.onTouched();
          });
        }
      },
      inputs: {
        name: "name",
        formControlName: "formControlName",
        value: "value"
      },
      features: [\u0275\u0275ProvidersFeature([RADIO_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]",
      host: {
        "(change)": "onChange()",
        "(blur)": "onTouched()"
      },
      providers: [RADIO_VALUE_ACCESSOR]
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: RadioControlRegistry
  }, {
    type: Injector
  }], {
    name: [{
      type: Input
    }],
    formControlName: [{
      type: Input
    }],
    value: [{
      type: Input
    }]
  });
})();
var RANGE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RangeValueAccessor),
  multi: true
};
var RangeValueAccessor = class _RangeValueAccessor extends BuiltInControlValueAccessor {
  /**
   * Sets the "value" property on the input element.
   * @nodoc
   */
  writeValue(value) {
    this.setProperty("value", parseFloat(value));
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */
  registerOnChange(fn) {
    this.onChange = (value) => {
      fn(value == "" ? null : parseFloat(value));
    };
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275RangeValueAccessor_BaseFactory;
      return function RangeValueAccessor_Factory(__ngFactoryType__) {
        return (\u0275RangeValueAccessor_BaseFactory || (\u0275RangeValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_RangeValueAccessor)))(__ngFactoryType__ || _RangeValueAccessor);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _RangeValueAccessor,
      selectors: [["input", "type", "range", "formControlName", ""], ["input", "type", "range", "formControl", ""], ["input", "type", "range", "ngModel", ""]],
      hostBindings: function RangeValueAccessor_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("change", function RangeValueAccessor_change_HostBindingHandler($event) {
            return ctx.onChange($event.target.value);
          })("input", function RangeValueAccessor_input_HostBindingHandler($event) {
            return ctx.onChange($event.target.value);
          })("blur", function RangeValueAccessor_blur_HostBindingHandler() {
            return ctx.onTouched();
          });
        }
      },
      features: [\u0275\u0275ProvidersFeature([RANGE_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RangeValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]",
      host: {
        "(change)": "onChange($event.target.value)",
        "(input)": "onChange($event.target.value)",
        "(blur)": "onTouched()"
      },
      providers: [RANGE_VALUE_ACCESSOR]
    }]
  }], null, null);
})();
var NG_MODEL_WITH_FORM_CONTROL_WARNING = new InjectionToken(ngDevMode ? "NgModelWithFormControlWarning" : "");
var formControlBinding = {
  provide: NgControl,
  useExisting: forwardRef(() => FormControlDirective)
};
var FormControlDirective = class _FormControlDirective extends NgControl {
  /**
   * @description
   * Triggers a warning in dev mode that this input should not be used with reactive forms.
   */
  set isDisabled(isDisabled) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.warn(disabledAttrWarning);
    }
  }
  static {
    this._ngModelWarningSentOnce = false;
  }
  constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig, callSetDisabledState) {
    super();
    this._ngModelWarningConfig = _ngModelWarningConfig;
    this.callSetDisabledState = callSetDisabledState;
    this.update = new EventEmitter();
    this._ngModelWarningSent = false;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }
  /** @nodoc */
  ngOnChanges(changes) {
    if (this._isControlChanged(changes)) {
      const previousForm = changes["form"].previousValue;
      if (previousForm) {
        cleanUpControl(
          previousForm,
          this,
          /* validateControlPresenceOnChange */
          false
        );
      }
      setUpControl(this.form, this, this.callSetDisabledState);
      this.form.updateValueAndValidity({
        emitEvent: false
      });
    }
    if (isPropertyUpdated(changes, this.viewModel)) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        _ngModelWarning("formControl", _FormControlDirective, this, this._ngModelWarningConfig);
      }
      this.form.setValue(this.model);
      this.viewModel = this.model;
    }
  }
  /** @nodoc */
  ngOnDestroy() {
    if (this.form) {
      cleanUpControl(
        this.form,
        this,
        /* validateControlPresenceOnChange */
        false
      );
    }
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */
  get path() {
    return [];
  }
  /**
   * @description
   * The `FormControl` bound to this directive.
   */
  get control() {
    return this.form;
  }
  /**
   * @description
   * Sets the new value for the view model and emits an `ngModelChange` event.
   *
   * @param newValue The new value for the view model.
   */
  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  _isControlChanged(changes) {
    return changes.hasOwnProperty("form");
  }
  static {
    this.\u0275fac = function FormControlDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormControlDirective)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(NG_MODEL_WITH_FORM_CONTROL_WARNING, 8), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _FormControlDirective,
      selectors: [["", "formControl", ""]],
      inputs: {
        form: [0, "formControl", "form"],
        isDisabled: [0, "disabled", "isDisabled"],
        model: [0, "ngModel", "model"]
      },
      outputs: {
        update: "ngModelChange"
      },
      exportAs: ["ngForm"],
      features: [\u0275\u0275ProvidersFeature([formControlBinding]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormControlDirective, [{
    type: Directive,
    args: [{
      selector: "[formControl]",
      providers: [formControlBinding],
      exportAs: "ngForm"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALUE_ACCESSOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], {
    form: [{
      type: Input,
      args: ["formControl"]
    }],
    isDisabled: [{
      type: Input,
      args: ["disabled"]
    }],
    model: [{
      type: Input,
      args: ["ngModel"]
    }],
    update: [{
      type: Output,
      args: ["ngModelChange"]
    }]
  });
})();
var formDirectiveProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormGroupDirective)
};
var FormGroupDirective = class _FormGroupDirective extends ControlContainer {
  /**
   * @description
   * Reports whether the form submission has been triggered.
   */
  get submitted() {
    return untracked(this._submittedReactive);
  }
  // TODO(atscott): Remove once invalid API usage is cleaned up internally
  set submitted(value) {
    this._submittedReactive.set(value);
  }
  constructor(validators, asyncValidators, callSetDisabledState) {
    super();
    this.callSetDisabledState = callSetDisabledState;
    this._submitted = computed(() => this._submittedReactive());
    this._submittedReactive = signal(false);
    this._onCollectionChange = () => this._updateDomValue();
    this.directives = [];
    this.form = null;
    this.ngSubmit = new EventEmitter();
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  /** @nodoc */
  ngOnChanges(changes) {
    this._checkFormPresent();
    if (changes.hasOwnProperty("form")) {
      this._updateValidators();
      this._updateDomValue();
      this._updateRegistrations();
      this._oldForm = this.form;
    }
  }
  /** @nodoc */
  ngOnDestroy() {
    if (this.form) {
      cleanUpValidators(this.form, this);
      if (this.form._onCollectionChange === this._onCollectionChange) {
        this.form._registerOnCollectionChange(() => {
        });
      }
    }
  }
  /**
   * @description
   * Returns this directive's instance.
   */
  get formDirective() {
    return this;
  }
  /**
   * @description
   * Returns the `FormGroup` bound to this directive.
   */
  get control() {
    return this.form;
  }
  /**
   * @description
   * Returns an array representing the path to this group. Because this directive
   * always lives at the top level of a form, it always an empty array.
   */
  get path() {
    return [];
  }
  /**
   * @description
   * Method that sets up the control directive in this group, re-calculates its value
   * and validity, and adds the instance to the internal list of directives.
   *
   * @param dir The `FormControlName` directive instance.
   */
  addControl(dir) {
    const ctrl = this.form.get(dir.path);
    setUpControl(ctrl, dir, this.callSetDisabledState);
    ctrl.updateValueAndValidity({
      emitEvent: false
    });
    this.directives.push(dir);
    return ctrl;
  }
  /**
   * @description
   * Retrieves the `FormControl` instance from the provided `FormControlName` directive
   *
   * @param dir The `FormControlName` directive instance.
   */
  getControl(dir) {
    return this.form.get(dir.path);
  }
  /**
   * @description
   * Removes the `FormControlName` instance from the internal list of directives
   *
   * @param dir The `FormControlName` directive instance.
   */
  removeControl(dir) {
    cleanUpControl(
      dir.control || null,
      dir,
      /* validateControlPresenceOnChange */
      false
    );
    removeListItem$1(this.directives, dir);
  }
  /**
   * Adds a new `FormGroupName` directive instance to the form.
   *
   * @param dir The `FormGroupName` directive instance.
   */
  addFormGroup(dir) {
    this._setUpFormContainer(dir);
  }
  /**
   * Performs the necessary cleanup when a `FormGroupName` directive instance is removed from the
   * view.
   *
   * @param dir The `FormGroupName` directive instance.
   */
  removeFormGroup(dir) {
    this._cleanUpFormContainer(dir);
  }
  /**
   * @description
   * Retrieves the `FormGroup` for a provided `FormGroupName` directive instance
   *
   * @param dir The `FormGroupName` directive instance.
   */
  getFormGroup(dir) {
    return this.form.get(dir.path);
  }
  /**
   * Performs the necessary setup when a `FormArrayName` directive instance is added to the view.
   *
   * @param dir The `FormArrayName` directive instance.
   */
  addFormArray(dir) {
    this._setUpFormContainer(dir);
  }
  /**
   * Performs the necessary cleanup when a `FormArrayName` directive instance is removed from the
   * view.
   *
   * @param dir The `FormArrayName` directive instance.
   */
  removeFormArray(dir) {
    this._cleanUpFormContainer(dir);
  }
  /**
   * @description
   * Retrieves the `FormArray` for a provided `FormArrayName` directive instance.
   *
   * @param dir The `FormArrayName` directive instance.
   */
  getFormArray(dir) {
    return this.form.get(dir.path);
  }
  /**
   * Sets the new value for the provided `FormControlName` directive.
   *
   * @param dir The `FormControlName` directive instance.
   * @param value The new value for the directive's control.
   */
  updateModel(dir, value) {
    const ctrl = this.form.get(dir.path);
    ctrl.setValue(value);
  }
  /**
   * @description
   * Method called with the "submit" event is triggered on the form.
   * Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.
   *
   * @param $event The "submit" event object
   */
  onSubmit($event) {
    this._submittedReactive.set(true);
    syncPendingControls(this.form, this.directives);
    this.ngSubmit.emit($event);
    this.form._events.next(new FormSubmittedEvent(this.control));
    return $event?.target?.method === "dialog";
  }
  /**
   * @description
   * Method called when the "reset" event is triggered on the form.
   */
  onReset() {
    this.resetForm();
  }
  /**
   * @description
   * Resets the form to an initial value and resets its submitted status.
   *
   * @param value The new value for the form.
   */
  resetForm(value = void 0) {
    this.form.reset(value);
    this._submittedReactive.set(false);
    this.form._events.next(new FormResetEvent(this.form));
  }
  /** @internal */
  _updateDomValue() {
    this.directives.forEach((dir) => {
      const oldCtrl = dir.control;
      const newCtrl = this.form.get(dir.path);
      if (oldCtrl !== newCtrl) {
        cleanUpControl(oldCtrl || null, dir);
        if (isFormControl(newCtrl)) {
          setUpControl(newCtrl, dir, this.callSetDisabledState);
          dir.control = newCtrl;
        }
      }
    });
    this.form._updateTreeValidity({
      emitEvent: false
    });
  }
  _setUpFormContainer(dir) {
    const ctrl = this.form.get(dir.path);
    setUpFormContainer(ctrl, dir);
    ctrl.updateValueAndValidity({
      emitEvent: false
    });
  }
  _cleanUpFormContainer(dir) {
    if (this.form) {
      const ctrl = this.form.get(dir.path);
      if (ctrl) {
        const isControlUpdated = cleanUpFormContainer(ctrl, dir);
        if (isControlUpdated) {
          ctrl.updateValueAndValidity({
            emitEvent: false
          });
        }
      }
    }
  }
  _updateRegistrations() {
    this.form._registerOnCollectionChange(this._onCollectionChange);
    if (this._oldForm) {
      this._oldForm._registerOnCollectionChange(() => {
      });
    }
  }
  _updateValidators() {
    setUpValidators(this.form, this);
    if (this._oldForm) {
      cleanUpValidators(this._oldForm, this);
    }
  }
  _checkFormPresent() {
    if (!this.form && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw missingFormException();
    }
  }
  static {
    this.\u0275fac = function FormGroupDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormGroupDirective)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _FormGroupDirective,
      selectors: [["", "formGroup", ""]],
      hostBindings: function FormGroupDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("submit", function FormGroupDirective_submit_HostBindingHandler($event) {
            return ctx.onSubmit($event);
          })("reset", function FormGroupDirective_reset_HostBindingHandler() {
            return ctx.onReset();
          });
        }
      },
      inputs: {
        form: [0, "formGroup", "form"]
      },
      outputs: {
        ngSubmit: "ngSubmit"
      },
      exportAs: ["ngForm"],
      features: [\u0275\u0275ProvidersFeature([formDirectiveProvider]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormGroupDirective, [{
    type: Directive,
    args: [{
      selector: "[formGroup]",
      providers: [formDirectiveProvider],
      host: {
        "(submit)": "onSubmit($event)",
        "(reset)": "onReset()"
      },
      exportAs: "ngForm"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], {
    form: [{
      type: Input,
      args: ["formGroup"]
    }],
    ngSubmit: [{
      type: Output
    }]
  });
})();
var formGroupNameProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormGroupName)
};
var FormGroupName = class _FormGroupName extends AbstractFormGroupDirective {
  constructor(parent, validators, asyncValidators) {
    super();
    this.name = null;
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  /** @internal */
  _checkParentType() {
    if (_hasInvalidParent(this._parent) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw groupParentException();
    }
  }
  static {
    this.\u0275fac = function FormGroupName_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormGroupName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _FormGroupName,
      selectors: [["", "formGroupName", ""]],
      inputs: {
        name: [0, "formGroupName", "name"]
      },
      features: [\u0275\u0275ProvidersFeature([formGroupNameProvider]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormGroupName, [{
    type: Directive,
    args: [{
      selector: "[formGroupName]",
      providers: [formGroupNameProvider]
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }], {
    name: [{
      type: Input,
      args: ["formGroupName"]
    }]
  });
})();
var formArrayNameProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormArrayName)
};
var FormArrayName = class _FormArrayName extends ControlContainer {
  constructor(parent, validators, asyncValidators) {
    super();
    this.name = null;
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  /**
   * A lifecycle method called when the directive's inputs are initialized. For internal use only.
   * @throws If the directive does not have a valid parent.
   * @nodoc
   */
  ngOnInit() {
    this._checkParentType();
    this.formDirective.addFormArray(this);
  }
  /**
   * A lifecycle method called before the directive's instance is destroyed. For internal use only.
   * @nodoc
   */
  ngOnDestroy() {
    if (this.formDirective) {
      this.formDirective.removeFormArray(this);
    }
  }
  /**
   * @description
   * The `FormArray` bound to this directive.
   */
  get control() {
    return this.formDirective.getFormArray(this);
  }
  /**
   * @description
   * The top-level directive for this group if present, otherwise null.
   */
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */
  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  _checkParentType() {
    if (_hasInvalidParent(this._parent) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw arrayParentException();
    }
  }
  static {
    this.\u0275fac = function FormArrayName_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormArrayName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _FormArrayName,
      selectors: [["", "formArrayName", ""]],
      inputs: {
        name: [0, "formArrayName", "name"]
      },
      features: [\u0275\u0275ProvidersFeature([formArrayNameProvider]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormArrayName, [{
    type: Directive,
    args: [{
      selector: "[formArrayName]",
      providers: [formArrayNameProvider]
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }], {
    name: [{
      type: Input,
      args: ["formArrayName"]
    }]
  });
})();
function _hasInvalidParent(parent) {
  return !(parent instanceof FormGroupName) && !(parent instanceof FormGroupDirective) && !(parent instanceof FormArrayName);
}
var controlNameBinding = {
  provide: NgControl,
  useExisting: forwardRef(() => FormControlName)
};
var FormControlName = class _FormControlName extends NgControl {
  /**
   * @description
   * Triggers a warning in dev mode that this input should not be used with reactive forms.
   */
  set isDisabled(isDisabled) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.warn(disabledAttrWarning);
    }
  }
  static {
    this._ngModelWarningSentOnce = false;
  }
  constructor(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
    super();
    this._ngModelWarningConfig = _ngModelWarningConfig;
    this._added = false;
    this.name = null;
    this.update = new EventEmitter();
    this._ngModelWarningSent = false;
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
    this.valueAccessor = selectValueAccessor(this, valueAccessors);
  }
  /** @nodoc */
  ngOnChanges(changes) {
    if (!this._added) this._setUpControl();
    if (isPropertyUpdated(changes, this.viewModel)) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        _ngModelWarning("formControlName", _FormControlName, this, this._ngModelWarningConfig);
      }
      this.viewModel = this.model;
      this.formDirective.updateModel(this, this.model);
    }
  }
  /** @nodoc */
  ngOnDestroy() {
    if (this.formDirective) {
      this.formDirective.removeControl(this);
    }
  }
  /**
   * @description
   * Sets the new value for the view model and emits an `ngModelChange` event.
   *
   * @param newValue The new value for the view model.
   */
  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  /**
   * @description
   * Returns an array that represents the path from the top-level form to this control.
   * Each index is the string name of the control on that level.
   */
  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  /**
   * @description
   * The top-level directive for this group if present, otherwise null.
   */
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  _checkParentType() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!(this._parent instanceof FormGroupName) && this._parent instanceof AbstractFormGroupDirective) {
        throw ngModelGroupException();
      } else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) && !(this._parent instanceof FormArrayName)) {
        throw controlParentException(this.name);
      }
    }
  }
  _setUpControl() {
    this._checkParentType();
    this.control = this.formDirective.addControl(this);
    this._added = true;
  }
  static {
    this.\u0275fac = function FormControlName_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormControlName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(NG_MODEL_WITH_FORM_CONTROL_WARNING, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _FormControlName,
      selectors: [["", "formControlName", ""]],
      inputs: {
        name: [0, "formControlName", "name"],
        isDisabled: [0, "disabled", "isDisabled"],
        model: [0, "ngModel", "model"]
      },
      outputs: {
        update: "ngModelChange"
      },
      features: [\u0275\u0275ProvidersFeature([controlNameBinding]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormControlName, [{
    type: Directive,
    args: [{
      selector: "[formControlName]",
      providers: [controlNameBinding]
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALUE_ACCESSOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
    }]
  }], {
    name: [{
      type: Input,
      args: ["formControlName"]
    }],
    isDisabled: [{
      type: Input,
      args: ["disabled"]
    }],
    model: [{
      type: Input,
      args: ["ngModel"]
    }],
    update: [{
      type: Output,
      args: ["ngModelChange"]
    }]
  });
})();
var SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectControlValueAccessor),
  multi: true
};
function _buildValueString$1(id, value) {
  if (id == null) return `${value}`;
  if (value && typeof value === "object") value = "Object";
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId$1(valueString) {
  return valueString.split(":")[0];
}
var SelectControlValueAccessor = class _SelectControlValueAccessor extends BuiltInControlValueAccessor {
  constructor() {
    super(...arguments);
    this._optionMap = /* @__PURE__ */ new Map();
    this._idCounter = 0;
    this._compareWith = Object.is;
  }
  /**
   * @description
   * Tracks the option comparison algorithm for tracking identities when
   * checking for changes.
   */
  set compareWith(fn) {
    if (typeof fn !== "function" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw new RuntimeError(1201, `compareWith must be a function, but received ${JSON.stringify(fn)}`);
    }
    this._compareWith = fn;
  }
  /**
   * Sets the "value" property on the select element.
   * @nodoc
   */
  writeValue(value) {
    this.value = value;
    const id = this._getOptionId(value);
    const valueString = _buildValueString$1(id, value);
    this.setProperty("value", valueString);
  }
  /**
   * Registers a function called when the control value changes.
   * @nodoc
   */
  registerOnChange(fn) {
    this.onChange = (valueString) => {
      this.value = this._getOptionValue(valueString);
      fn(this.value);
    };
  }
  /** @internal */
  _registerOption() {
    return (this._idCounter++).toString();
  }
  /** @internal */
  _getOptionId(value) {
    for (const id of this._optionMap.keys()) {
      if (this._compareWith(this._optionMap.get(id), value)) return id;
    }
    return null;
  }
  /** @internal */
  _getOptionValue(valueString) {
    const id = _extractId$1(valueString);
    return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275SelectControlValueAccessor_BaseFactory;
      return function SelectControlValueAccessor_Factory(__ngFactoryType__) {
        return (\u0275SelectControlValueAccessor_BaseFactory || (\u0275SelectControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_SelectControlValueAccessor)))(__ngFactoryType__ || _SelectControlValueAccessor);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _SelectControlValueAccessor,
      selectors: [["select", "formControlName", "", 3, "multiple", ""], ["select", "formControl", "", 3, "multiple", ""], ["select", "ngModel", "", 3, "multiple", ""]],
      hostBindings: function SelectControlValueAccessor_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("change", function SelectControlValueAccessor_change_HostBindingHandler($event) {
            return ctx.onChange($event.target.value);
          })("blur", function SelectControlValueAccessor_blur_HostBindingHandler() {
            return ctx.onTouched();
          });
        }
      },
      inputs: {
        compareWith: "compareWith"
      },
      features: [\u0275\u0275ProvidersFeature([SELECT_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]",
      host: {
        "(change)": "onChange($event.target.value)",
        "(blur)": "onTouched()"
      },
      providers: [SELECT_VALUE_ACCESSOR]
    }]
  }], null, {
    compareWith: [{
      type: Input
    }]
  });
})();
var NgSelectOption = class _NgSelectOption {
  constructor(_element, _renderer, _select) {
    this._element = _element;
    this._renderer = _renderer;
    this._select = _select;
    if (this._select) this.id = this._select._registerOption();
  }
  /**
   * @description
   * Tracks the value bound to the option element. Unlike the value binding,
   * ngValue supports binding to objects.
   */
  set ngValue(value) {
    if (this._select == null) return;
    this._select._optionMap.set(this.id, value);
    this._setElementValue(_buildValueString$1(this.id, value));
    this._select.writeValue(this._select.value);
  }
  /**
   * @description
   * Tracks simple string values bound to the option element.
   * For objects, use the `ngValue` input binding.
   */
  set value(value) {
    this._setElementValue(value);
    if (this._select) this._select.writeValue(this._select.value);
  }
  /** @internal */
  _setElementValue(value) {
    this._renderer.setProperty(this._element.nativeElement, "value", value);
  }
  /** @nodoc */
  ngOnDestroy() {
    if (this._select) {
      this._select._optionMap.delete(this.id);
      this._select.writeValue(this._select.value);
    }
  }
  static {
    this.\u0275fac = function NgSelectOption_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgSelectOption)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(SelectControlValueAccessor, 9));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _NgSelectOption,
      selectors: [["option"]],
      inputs: {
        ngValue: "ngValue",
        value: "value"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgSelectOption, [{
    type: Directive,
    args: [{
      selector: "option"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: SelectControlValueAccessor,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }], {
    ngValue: [{
      type: Input,
      args: ["ngValue"]
    }],
    value: [{
      type: Input,
      args: ["value"]
    }]
  });
})();
var SELECT_MULTIPLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectMultipleControlValueAccessor),
  multi: true
};
function _buildValueString(id, value) {
  if (id == null) return `${value}`;
  if (typeof value === "string") value = `'${value}'`;
  if (value && typeof value === "object") value = "Object";
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId(valueString) {
  return valueString.split(":")[0];
}
var SelectMultipleControlValueAccessor = class _SelectMultipleControlValueAccessor extends BuiltInControlValueAccessor {
  constructor() {
    super(...arguments);
    this._optionMap = /* @__PURE__ */ new Map();
    this._idCounter = 0;
    this._compareWith = Object.is;
  }
  /**
   * @description
   * Tracks the option comparison algorithm for tracking identities when
   * checking for changes.
   */
  set compareWith(fn) {
    if (typeof fn !== "function" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw new RuntimeError(1201, `compareWith must be a function, but received ${JSON.stringify(fn)}`);
    }
    this._compareWith = fn;
  }
  /**
   * Sets the "value" property on one or of more of the select's options.
   * @nodoc
   */
  writeValue(value) {
    this.value = value;
    let optionSelectedStateSetter;
    if (Array.isArray(value)) {
      const ids = value.map((v) => this._getOptionId(v));
      optionSelectedStateSetter = (opt, o) => {
        opt._setSelected(ids.indexOf(o.toString()) > -1);
      };
    } else {
      optionSelectedStateSetter = (opt, o) => {
        opt._setSelected(false);
      };
    }
    this._optionMap.forEach(optionSelectedStateSetter);
  }
  /**
   * Registers a function called when the control value changes
   * and writes an array of the selected options.
   * @nodoc
   */
  registerOnChange(fn) {
    this.onChange = (element) => {
      const selected = [];
      const selectedOptions = element.selectedOptions;
      if (selectedOptions !== void 0) {
        const options = selectedOptions;
        for (let i = 0; i < options.length; i++) {
          const opt = options[i];
          const val = this._getOptionValue(opt.value);
          selected.push(val);
        }
      } else {
        const options = element.options;
        for (let i = 0; i < options.length; i++) {
          const opt = options[i];
          if (opt.selected) {
            const val = this._getOptionValue(opt.value);
            selected.push(val);
          }
        }
      }
      this.value = selected;
      fn(selected);
    };
  }
  /** @internal */
  _registerOption(value) {
    const id = (this._idCounter++).toString();
    this._optionMap.set(id, value);
    return id;
  }
  /** @internal */
  _getOptionId(value) {
    for (const id of this._optionMap.keys()) {
      if (this._compareWith(this._optionMap.get(id)._value, value)) return id;
    }
    return null;
  }
  /** @internal */
  _getOptionValue(valueString) {
    const id = _extractId(valueString);
    return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275SelectMultipleControlValueAccessor_BaseFactory;
      return function SelectMultipleControlValueAccessor_Factory(__ngFactoryType__) {
        return (\u0275SelectMultipleControlValueAccessor_BaseFactory || (\u0275SelectMultipleControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_SelectMultipleControlValueAccessor)))(__ngFactoryType__ || _SelectMultipleControlValueAccessor);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _SelectMultipleControlValueAccessor,
      selectors: [["select", "multiple", "", "formControlName", ""], ["select", "multiple", "", "formControl", ""], ["select", "multiple", "", "ngModel", ""]],
      hostBindings: function SelectMultipleControlValueAccessor_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("change", function SelectMultipleControlValueAccessor_change_HostBindingHandler($event) {
            return ctx.onChange($event.target);
          })("blur", function SelectMultipleControlValueAccessor_blur_HostBindingHandler() {
            return ctx.onTouched();
          });
        }
      },
      inputs: {
        compareWith: "compareWith"
      },
      features: [\u0275\u0275ProvidersFeature([SELECT_MULTIPLE_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectMultipleControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]",
      host: {
        "(change)": "onChange($event.target)",
        "(blur)": "onTouched()"
      },
      providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
    }]
  }], null, {
    compareWith: [{
      type: Input
    }]
  });
})();
var \u0275NgSelectMultipleOption = class _\u0275NgSelectMultipleOption {
  constructor(_element, _renderer, _select) {
    this._element = _element;
    this._renderer = _renderer;
    this._select = _select;
    if (this._select) {
      this.id = this._select._registerOption(this);
    }
  }
  /**
   * @description
   * Tracks the value bound to the option element. Unlike the value binding,
   * ngValue supports binding to objects.
   */
  set ngValue(value) {
    if (this._select == null) return;
    this._value = value;
    this._setElementValue(_buildValueString(this.id, value));
    this._select.writeValue(this._select.value);
  }
  /**
   * @description
   * Tracks simple string values bound to the option element.
   * For objects, use the `ngValue` input binding.
   */
  set value(value) {
    if (this._select) {
      this._value = value;
      this._setElementValue(_buildValueString(this.id, value));
      this._select.writeValue(this._select.value);
    } else {
      this._setElementValue(value);
    }
  }
  /** @internal */
  _setElementValue(value) {
    this._renderer.setProperty(this._element.nativeElement, "value", value);
  }
  /** @internal */
  _setSelected(selected) {
    this._renderer.setProperty(this._element.nativeElement, "selected", selected);
  }
  /** @nodoc */
  ngOnDestroy() {
    if (this._select) {
      this._select._optionMap.delete(this.id);
      this._select.writeValue(this._select.value);
    }
  }
  static {
    this.\u0275fac = function \u0275NgSelectMultipleOption_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _\u0275NgSelectMultipleOption)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(SelectMultipleControlValueAccessor, 9));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _\u0275NgSelectMultipleOption,
      selectors: [["option"]],
      inputs: {
        ngValue: "ngValue",
        value: "value"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(\u0275NgSelectMultipleOption, [{
    type: Directive,
    args: [{
      selector: "option"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: SelectMultipleControlValueAccessor,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }], {
    ngValue: [{
      type: Input,
      args: ["ngValue"]
    }],
    value: [{
      type: Input,
      args: ["value"]
    }]
  });
})();
function toInteger(value) {
  return typeof value === "number" ? value : parseInt(value, 10);
}
function toFloat(value) {
  return typeof value === "number" ? value : parseFloat(value);
}
var AbstractValidatorDirective = class _AbstractValidatorDirective {
  constructor() {
    this._validator = nullValidator;
  }
  /** @nodoc */
  ngOnChanges(changes) {
    if (this.inputName in changes) {
      const input = this.normalizeInput(changes[this.inputName].currentValue);
      this._enabled = this.enabled(input);
      this._validator = this._enabled ? this.createValidator(input) : nullValidator;
      if (this._onChange) {
        this._onChange();
      }
    }
  }
  /** @nodoc */
  validate(control) {
    return this._validator(control);
  }
  /** @nodoc */
  registerOnValidatorChange(fn) {
    this._onChange = fn;
  }
  /**
   * @description
   * Determines whether this validator should be active or not based on an input.
   * Base class implementation checks whether an input is defined (if the value is different from
   * `null` and `undefined`). Validator classes that extend this base class can override this
   * function with the logic specific to a particular validator directive.
   */
  enabled(input) {
    return input != null;
  }
  static {
    this.\u0275fac = function AbstractValidatorDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AbstractValidatorDirective)();
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _AbstractValidatorDirective,
      features: [\u0275\u0275NgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractValidatorDirective, [{
    type: Directive
  }], null, null);
})();
var MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator),
  multi: true
};
var MaxValidator = class _MaxValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    this.inputName = "max";
    this.normalizeInput = (input) => toFloat(input);
    this.createValidator = (max) => maxValidator(max);
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MaxValidator_BaseFactory;
      return function MaxValidator_Factory(__ngFactoryType__) {
        return (\u0275MaxValidator_BaseFactory || (\u0275MaxValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MaxValidator)))(__ngFactoryType__ || _MaxValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MaxValidator,
      selectors: [["input", "type", "number", "max", "", "formControlName", ""], ["input", "type", "number", "max", "", "formControl", ""], ["input", "type", "number", "max", "", "ngModel", ""]],
      hostVars: 1,
      hostBindings: function MaxValidator_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("max", ctx._enabled ? ctx.max : null);
        }
      },
      inputs: {
        max: "max"
      },
      features: [\u0275\u0275ProvidersFeature([MAX_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaxValidator, [{
    type: Directive,
    args: [{
      selector: "input[type=number][max][formControlName],input[type=number][max][formControl],input[type=number][max][ngModel]",
      providers: [MAX_VALIDATOR],
      host: {
        "[attr.max]": "_enabled ? max : null"
      }
    }]
  }], null, {
    max: [{
      type: Input
    }]
  });
})();
var MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator),
  multi: true
};
var MinValidator = class _MinValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    this.inputName = "min";
    this.normalizeInput = (input) => toFloat(input);
    this.createValidator = (min) => minValidator(min);
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MinValidator_BaseFactory;
      return function MinValidator_Factory(__ngFactoryType__) {
        return (\u0275MinValidator_BaseFactory || (\u0275MinValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MinValidator)))(__ngFactoryType__ || _MinValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MinValidator,
      selectors: [["input", "type", "number", "min", "", "formControlName", ""], ["input", "type", "number", "min", "", "formControl", ""], ["input", "type", "number", "min", "", "ngModel", ""]],
      hostVars: 1,
      hostBindings: function MinValidator_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("min", ctx._enabled ? ctx.min : null);
        }
      },
      inputs: {
        min: "min"
      },
      features: [\u0275\u0275ProvidersFeature([MIN_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MinValidator, [{
    type: Directive,
    args: [{
      selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]",
      providers: [MIN_VALIDATOR],
      host: {
        "[attr.min]": "_enabled ? min : null"
      }
    }]
  }], null, {
    min: [{
      type: Input
    }]
  });
})();
var REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RequiredValidator),
  multi: true
};
var CHECKBOX_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CheckboxRequiredValidator),
  multi: true
};
var RequiredValidator = class _RequiredValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    this.inputName = "required";
    this.normalizeInput = booleanAttribute;
    this.createValidator = (input) => requiredValidator;
  }
  /** @nodoc */
  enabled(input) {
    return input;
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275RequiredValidator_BaseFactory;
      return function RequiredValidator_Factory(__ngFactoryType__) {
        return (\u0275RequiredValidator_BaseFactory || (\u0275RequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_RequiredValidator)))(__ngFactoryType__ || _RequiredValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _RequiredValidator,
      selectors: [["", "required", "", "formControlName", "", 3, "type", "checkbox"], ["", "required", "", "formControl", "", 3, "type", "checkbox"], ["", "required", "", "ngModel", "", 3, "type", "checkbox"]],
      hostVars: 1,
      hostBindings: function RequiredValidator_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("required", ctx._enabled ? "" : null);
        }
      },
      inputs: {
        required: "required"
      },
      features: [\u0275\u0275ProvidersFeature([REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RequiredValidator, [{
    type: Directive,
    args: [{
      selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]",
      providers: [REQUIRED_VALIDATOR],
      host: {
        "[attr.required]": '_enabled ? "" : null'
      }
    }]
  }], null, {
    required: [{
      type: Input
    }]
  });
})();
var CheckboxRequiredValidator = class _CheckboxRequiredValidator extends RequiredValidator {
  constructor() {
    super(...arguments);
    this.createValidator = (input) => requiredTrueValidator;
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275CheckboxRequiredValidator_BaseFactory;
      return function CheckboxRequiredValidator_Factory(__ngFactoryType__) {
        return (\u0275CheckboxRequiredValidator_BaseFactory || (\u0275CheckboxRequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_CheckboxRequiredValidator)))(__ngFactoryType__ || _CheckboxRequiredValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CheckboxRequiredValidator,
      selectors: [["input", "type", "checkbox", "required", "", "formControlName", ""], ["input", "type", "checkbox", "required", "", "formControl", ""], ["input", "type", "checkbox", "required", "", "ngModel", ""]],
      hostVars: 1,
      hostBindings: function CheckboxRequiredValidator_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("required", ctx._enabled ? "" : null);
        }
      },
      features: [\u0275\u0275ProvidersFeature([CHECKBOX_REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxRequiredValidator, [{
    type: Directive,
    args: [{
      selector: "input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]",
      providers: [CHECKBOX_REQUIRED_VALIDATOR],
      host: {
        "[attr.required]": '_enabled ? "" : null'
      }
    }]
  }], null, null);
})();
var EMAIL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmailValidator),
  multi: true
};
var EmailValidator = class _EmailValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    this.inputName = "email";
    this.normalizeInput = booleanAttribute;
    this.createValidator = (input) => emailValidator;
  }
  /** @nodoc */
  enabled(input) {
    return input;
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275EmailValidator_BaseFactory;
      return function EmailValidator_Factory(__ngFactoryType__) {
        return (\u0275EmailValidator_BaseFactory || (\u0275EmailValidator_BaseFactory = \u0275\u0275getInheritedFactory(_EmailValidator)))(__ngFactoryType__ || _EmailValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _EmailValidator,
      selectors: [["", "email", "", "formControlName", ""], ["", "email", "", "formControl", ""], ["", "email", "", "ngModel", ""]],
      inputs: {
        email: "email"
      },
      features: [\u0275\u0275ProvidersFeature([EMAIL_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailValidator, [{
    type: Directive,
    args: [{
      selector: "[email][formControlName],[email][formControl],[email][ngModel]",
      providers: [EMAIL_VALIDATOR]
    }]
  }], null, {
    email: [{
      type: Input
    }]
  });
})();
var MIN_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinLengthValidator),
  multi: true
};
var MinLengthValidator = class _MinLengthValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    this.inputName = "minlength";
    this.normalizeInput = (input) => toInteger(input);
    this.createValidator = (minlength) => minLengthValidator(minlength);
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MinLengthValidator_BaseFactory;
      return function MinLengthValidator_Factory(__ngFactoryType__) {
        return (\u0275MinLengthValidator_BaseFactory || (\u0275MinLengthValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MinLengthValidator)))(__ngFactoryType__ || _MinLengthValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MinLengthValidator,
      selectors: [["", "minlength", "", "formControlName", ""], ["", "minlength", "", "formControl", ""], ["", "minlength", "", "ngModel", ""]],
      hostVars: 1,
      hostBindings: function MinLengthValidator_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("minlength", ctx._enabled ? ctx.minlength : null);
        }
      },
      inputs: {
        minlength: "minlength"
      },
      features: [\u0275\u0275ProvidersFeature([MIN_LENGTH_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MinLengthValidator, [{
    type: Directive,
    args: [{
      selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]",
      providers: [MIN_LENGTH_VALIDATOR],
      host: {
        "[attr.minlength]": "_enabled ? minlength : null"
      }
    }]
  }], null, {
    minlength: [{
      type: Input
    }]
  });
})();
var MAX_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxLengthValidator),
  multi: true
};
var MaxLengthValidator = class _MaxLengthValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    this.inputName = "maxlength";
    this.normalizeInput = (input) => toInteger(input);
    this.createValidator = (maxlength) => maxLengthValidator(maxlength);
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MaxLengthValidator_BaseFactory;
      return function MaxLengthValidator_Factory(__ngFactoryType__) {
        return (\u0275MaxLengthValidator_BaseFactory || (\u0275MaxLengthValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MaxLengthValidator)))(__ngFactoryType__ || _MaxLengthValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MaxLengthValidator,
      selectors: [["", "maxlength", "", "formControlName", ""], ["", "maxlength", "", "formControl", ""], ["", "maxlength", "", "ngModel", ""]],
      hostVars: 1,
      hostBindings: function MaxLengthValidator_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("maxlength", ctx._enabled ? ctx.maxlength : null);
        }
      },
      inputs: {
        maxlength: "maxlength"
      },
      features: [\u0275\u0275ProvidersFeature([MAX_LENGTH_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaxLengthValidator, [{
    type: Directive,
    args: [{
      selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]",
      providers: [MAX_LENGTH_VALIDATOR],
      host: {
        "[attr.maxlength]": "_enabled ? maxlength : null"
      }
    }]
  }], null, {
    maxlength: [{
      type: Input
    }]
  });
})();
var PATTERN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PatternValidator),
  multi: true
};
var PatternValidator = class _PatternValidator extends AbstractValidatorDirective {
  constructor() {
    super(...arguments);
    this.inputName = "pattern";
    this.normalizeInput = (input) => input;
    this.createValidator = (input) => patternValidator(input);
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275PatternValidator_BaseFactory;
      return function PatternValidator_Factory(__ngFactoryType__) {
        return (\u0275PatternValidator_BaseFactory || (\u0275PatternValidator_BaseFactory = \u0275\u0275getInheritedFactory(_PatternValidator)))(__ngFactoryType__ || _PatternValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _PatternValidator,
      selectors: [["", "pattern", "", "formControlName", ""], ["", "pattern", "", "formControl", ""], ["", "pattern", "", "ngModel", ""]],
      hostVars: 1,
      hostBindings: function PatternValidator_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("pattern", ctx._enabled ? ctx.pattern : null);
        }
      },
      inputs: {
        pattern: "pattern"
      },
      features: [\u0275\u0275ProvidersFeature([PATTERN_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatternValidator, [{
    type: Directive,
    args: [{
      selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]",
      providers: [PATTERN_VALIDATOR],
      host: {
        "[attr.pattern]": "_enabled ? pattern : null"
      }
    }]
  }], null, {
    pattern: [{
      type: Input
    }]
  });
})();
var SHARED_FORM_DIRECTIVES = [\u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator];
var TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
var REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
var \u0275InternalFormsSharedModule = class _\u0275InternalFormsSharedModule {
  static {
    this.\u0275fac = function \u0275InternalFormsSharedModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _\u0275InternalFormsSharedModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _\u0275InternalFormsSharedModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(\u0275InternalFormsSharedModule, [{
    type: NgModule,
    args: [{
      declarations: SHARED_FORM_DIRECTIVES,
      exports: SHARED_FORM_DIRECTIVES
    }]
  }], null, null);
})();
var FormArray = class extends AbstractControl {
  /**
   * Creates a new `FormArray` instance.
   *
   * @param controls An array of child controls. Each child control is given an index
   * where it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      // If `asyncValidator` is present, it will trigger control status change from `PENDING` to
      // `VALID` or `INVALID`.
      // The status should be broadcasted via the `statusChanges` observable, so we set `emitEvent`
      // to `true` to allow that during the control creation process.
      emitEvent: !!this.asyncValidator
    });
  }
  /**
   * Get the `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to retrieve the control. If `index` is negative, it will wrap
   *     around from the back, and if index is greatly negative (less than `-length`), the result is
   * undefined. This behavior is the same as `Array.at(index)`.
   */
  at(index) {
    return this.controls[this._adjustIndex(index)];
  }
  /**
   * Insert a new `AbstractControl` at the end of the array.
   *
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is added.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */
  push(control, options = {}) {
    this.controls.push(control);
    this._registerControl(control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  /**
   * Insert a new `AbstractControl` at the given `index` in the array.
   *
   * @param index Index in the array to insert the control. If `index` is negative, wraps around
   *     from the back. If `index` is greatly negative (less than `-length`), prepends to the array.
   * This behavior is the same as `Array.splice(index, 0, control)`.
   * @param control Form control to be inserted
   * @param options Specifies whether this FormArray instance should emit events after a new
   *     control is inserted.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * inserted. When false, no events are emitted.
   */
  insert(index, control, options = {}) {
    this.controls.splice(index, 0, control);
    this._registerControl(control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Remove the control at the given `index` in the array.
   *
   * @param index Index in the array to remove the control.  If `index` is negative, wraps around
   *     from the back. If `index` is greatly negative (less than `-length`), removes the first
   *     element. This behavior is the same as `Array.splice(index, 1)`.
   * @param options Specifies whether this FormArray instance should emit events after a
   *     control is removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * removed. When false, no events are emitted.
   */
  removeAt(index, options = {}) {
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0) adjustedIndex = 0;
    if (this.controls[adjustedIndex]) this.controls[adjustedIndex]._registerOnCollectionChange(() => {
    });
    this.controls.splice(adjustedIndex, 1);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Replace an existing control.
   *
   * @param index Index in the array to replace the control. If `index` is negative, wraps around
   *     from the back. If `index` is greatly negative (less than `-length`), replaces the first
   *     element. This behavior is the same as `Array.splice(index, 1, control)`.
   * @param control The `AbstractControl` control to replace the existing control
   * @param options Specifies whether this FormArray instance should emit events after an
   *     existing control is replaced with a new one.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control is
   * replaced with a new one. When false, no events are emitted.
   */
  setControl(index, control, options = {}) {
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0) adjustedIndex = 0;
    if (this.controls[adjustedIndex]) this.controls[adjustedIndex]._registerOnCollectionChange(() => {
    });
    this.controls.splice(adjustedIndex, 1);
    if (control) {
      this.controls.splice(adjustedIndex, 0, control);
      this._registerControl(control);
    }
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  /**
   * Length of the control array.
   */
  get length() {
    return this.controls.length;
  }
  /**
   * Sets the value of the `FormArray`. It accepts an array that matches
   * the structure of the control.
   *
   * This method performs strict checks, and throws an error if you try
   * to set the value of a control that doesn't exist or if you exclude the
   * value of a control.
   *
   * @usageNotes
   * ### Set the values for the controls in the form array
   *
   * ```
   * const arr = new FormArray([
   *   new FormControl(),
   *   new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.setValue(['Nancy', 'Drew']);
   * console.log(arr.value);   // ['Nancy', 'Drew']
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control value is updated.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  setValue(value, options = {}) {
    assertAllValuesPresent(this, false, value);
    value.forEach((newValue, index) => {
      assertControlPresent(this, false, index);
      this.at(index).setValue(newValue, {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Patches the value of the `FormArray`. It accepts an array that matches the
   * structure of the control, and does its best to match the values to the correct
   * controls in the group.
   *
   * It accepts both super-sets and sub-sets of the array without throwing an error.
   *
   * @usageNotes
   * ### Patch the values for controls in a form array
   *
   * ```
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.value);   // [null, null]
   *
   * arr.patchValue(['Nancy']);
   * console.log(arr.value);   // ['Nancy', null]
   * ```
   *
   * @param value Array of latest values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control
   * value is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */
  patchValue(value, options = {}) {
    if (value == null) return;
    value.forEach((newValue, index) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  /**
   * Resets the `FormArray` and all descendants are marked `pristine` and `untouched`, and the
   * value of all descendants to null or null maps.
   *
   * You reset to a specific form state by passing in an array of states
   * that matches the structure of the control. The state is a standalone value
   * or a form state object with both a value and a disabled status.
   *
   * @usageNotes
   * ### Reset the values in a form array
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * arr.reset(['name', 'last name']);
   *
   * console.log(arr.value);  // ['name', 'last name']
   * ```
   *
   * ### Reset the values in a form array and the disabled status for the first control
   *
   * ```
   * arr.reset([
   *   {value: 'name', disabled: true},
   *   'last'
   * ]);
   *
   * console.log(arr.value);  // ['last']
   * console.log(arr.at(0).status);  // 'DISABLED'
   * ```
   *
   * @param value Array of values for the controls
   * @param options Configure options that determine how the control propagates changes and
   * emits events after the value changes
   *
   * * `onlySelf`: When true, each change only affects this control, and not its parent. Default
   * is false.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges`
   * observables emit events with the latest status and value when the control is reset.
   * When false, no events are emitted.
   * The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
   * updateValueAndValidity} method.
   */
  reset(value = [], options = {}) {
    this._forEachChild((control, index) => {
      control.reset(value[index], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this._updatePristine(options, this);
    this._updateTouched(options, this);
    this.updateValueAndValidity(options);
  }
  /**
   * The aggregate value of the array, including any disabled controls.
   *
   * Reports all values regardless of disabled status.
   */
  getRawValue() {
    return this.controls.map((control) => control.getRawValue());
  }
  /**
   * Remove all controls in the `FormArray`.
   *
   * @param options Specifies whether this FormArray instance should emit events after all
   *     controls are removed.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when all controls
   * in this FormArray instance are removed. When false, no events are emitted.
   *
   * @usageNotes
   * ### Remove all elements from a FormArray
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   * console.log(arr.length);  // 2
   *
   * arr.clear();
   * console.log(arr.length);  // 0
   * ```
   *
   * It's a simpler and more efficient alternative to removing all elements one by one:
   *
   * ```ts
   * const arr = new FormArray([
   *    new FormControl(),
   *    new FormControl()
   * ]);
   *
   * while (arr.length) {
   *    arr.removeAt(0);
   * }
   * ```
   */
  clear(options = {}) {
    if (this.controls.length < 1) return;
    this._forEachChild((control) => control._registerOnCollectionChange(() => {
    }));
    this.controls.splice(0);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  /**
   * Adjusts a negative index by summing it with the length of the array. For very negative
   * indices, the result may remain negative.
   * @internal
   */
  _adjustIndex(index) {
    return index < 0 ? index + this.length : index;
  }
  /** @internal */
  _syncPendingControls() {
    let subtreeUpdated = this.controls.reduce((updated, child) => {
      return child._syncPendingControls() ? true : updated;
    }, false);
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  /** @internal */
  _forEachChild(cb) {
    this.controls.forEach((control, index) => {
      cb(control, index);
    });
  }
  /** @internal */
  _updateValue() {
    this.value = this.controls.filter((control) => control.enabled || this.disabled).map((control) => control.value);
  }
  /** @internal */
  _anyControls(condition) {
    return this.controls.some((control) => control.enabled && condition(control));
  }
  /** @internal */
  _setUpControls() {
    this._forEachChild((control) => this._registerControl(control));
  }
  /** @internal */
  _allControlsDisabled() {
    for (const control of this.controls) {
      if (control.enabled) return false;
    }
    return this.controls.length > 0 || this.disabled;
  }
  _registerControl(control) {
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
  }
  /** @internal */
  _find(name) {
    return this.at(name) ?? null;
  }
};
function isAbstractControlOptions(options) {
  return !!options && (options.asyncValidators !== void 0 || options.validators !== void 0 || options.updateOn !== void 0);
}
var FormBuilder = class _FormBuilder {
  constructor() {
    this.useNonNullable = false;
  }
  /**
   * @description
   * Returns a FormBuilder in which automatically constructed `FormControl` elements
   * have `{nonNullable: true}` and are non-nullable.
   *
   * **Constructing non-nullable controls**
   *
   * When constructing a control, it will be non-nullable, and will reset to its initial value.
   *
   * ```ts
   * let nnfb = new FormBuilder().nonNullable;
   * let name = nnfb.control('Alex'); // FormControl<string>
   * name.reset();
   * console.log(name); // 'Alex'
   * ```
   *
   * **Constructing non-nullable groups or arrays**
   *
   * When constructing a group or array, all automatically created inner controls will be
   * non-nullable, and will reset to their initial values.
   *
   * ```ts
   * let nnfb = new FormBuilder().nonNullable;
   * let name = nnfb.group({who: 'Alex'}); // FormGroup<{who: FormControl<string>}>
   * name.reset();
   * console.log(name); // {who: 'Alex'}
   * ```
   * **Constructing *nullable* fields on groups or arrays**
   *
   * It is still possible to have a nullable field. In particular, any `FormControl` which is
   * *already* constructed will not be altered. For example:
   *
   * ```ts
   * let nnfb = new FormBuilder().nonNullable;
   * // FormGroup<{who: FormControl<string|null>}>
   * let name = nnfb.group({who: new FormControl('Alex')});
   * name.reset(); console.log(name); // {who: null}
   * ```
   *
   * Because the inner control is constructed explicitly by the caller, the builder has
   * no control over how it is created, and cannot exclude the `null`.
   */
  get nonNullable() {
    const nnfb = new _FormBuilder();
    nnfb.useNonNullable = true;
    return nnfb;
  }
  group(controls, options = null) {
    const reducedControls = this._reduceControls(controls);
    let newOptions = {};
    if (isAbstractControlOptions(options)) {
      newOptions = options;
    } else if (options !== null) {
      newOptions.validators = options.validator;
      newOptions.asyncValidators = options.asyncValidator;
    }
    return new FormGroup(reducedControls, newOptions);
  }
  /**
   * @description
   * Constructs a new `FormRecord` instance. Accepts a single generic argument, which is an object
   * containing all the keys and corresponding inner control types.
   *
   * @param controls A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param options Configuration options object for the `FormRecord`. The object should have the
   * `AbstractControlOptions` type and might contain the following fields:
   * * `validators`: A synchronous validator function, or an array of validator functions.
   * * `asyncValidators`: A single async validator or array of async validator functions.
   * * `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur'
   * | submit').
   */
  record(controls, options = null) {
    const reducedControls = this._reduceControls(controls);
    return new FormRecord(reducedControls, options);
  }
  /**
   * @description
   * Constructs a new `FormControl` with the given state, validators and options. Sets
   * `{nonNullable: true}` in the options to get a non-nullable control. Otherwise, the
   * control will be nullable. Accepts a single generic argument, which is the type  of the
   * control's value.
   *
   * @param formState Initializes the control with an initial state value, or
   * with an object that contains both a value and a disabled status.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or a `FormControlOptions` object that contains
   * validation functions and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator
   * functions.
   *
   * @usageNotes
   *
   * ### Initialize a control as disabled
   *
   * The following example returns a control with an initial value in a disabled state.
   *
   * <code-example path="forms/ts/formBuilder/form_builder_example.ts" region="disabled-control">
   * </code-example>
   */
  control(formState, validatorOrOpts, asyncValidator) {
    let newOptions = {};
    if (!this.useNonNullable) {
      return new FormControl(formState, validatorOrOpts, asyncValidator);
    }
    if (isAbstractControlOptions(validatorOrOpts)) {
      newOptions = validatorOrOpts;
    } else {
      newOptions.validators = validatorOrOpts;
      newOptions.asyncValidators = asyncValidator;
    }
    return new FormControl(formState, __spreadProps(__spreadValues({}, newOptions), {
      nonNullable: true
    }));
  }
  /**
   * Constructs a new `FormArray` from the given array of configurations,
   * validators and options. Accepts a single generic argument, which is the type of each control
   * inside the array.
   *
   * @param controls An array of child controls or control configs. Each child control is given an
   *     index when it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of such functions, or an
   *     `AbstractControlOptions` object that contains
   * validation functions and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions.
   */
  array(controls, validatorOrOpts, asyncValidator) {
    const createdControls = controls.map((c) => this._createControl(c));
    return new FormArray(createdControls, validatorOrOpts, asyncValidator);
  }
  /** @internal */
  _reduceControls(controls) {
    const createdControls = {};
    Object.keys(controls).forEach((controlName) => {
      createdControls[controlName] = this._createControl(controls[controlName]);
    });
    return createdControls;
  }
  /** @internal */
  _createControl(controls) {
    if (controls instanceof FormControl) {
      return controls;
    } else if (controls instanceof AbstractControl) {
      return controls;
    } else if (Array.isArray(controls)) {
      const value = controls[0];
      const validator = controls.length > 1 ? controls[1] : null;
      const asyncValidator = controls.length > 2 ? controls[2] : null;
      return this.control(value, validator, asyncValidator);
    } else {
      return this.control(controls);
    }
  }
  static {
    this.\u0275fac = function FormBuilder_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormBuilder)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _FormBuilder,
      factory: _FormBuilder.\u0275fac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NonNullableFormBuilder = class _NonNullableFormBuilder {
  static {
    this.\u0275fac = function NonNullableFormBuilder_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NonNullableFormBuilder)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _NonNullableFormBuilder,
      factory: () => (() => inject(FormBuilder).nonNullable)(),
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NonNullableFormBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(FormBuilder).nonNullable
    }]
  }], null, null);
})();
var UntypedFormBuilder = class _UntypedFormBuilder extends FormBuilder {
  group(controlsConfig, options = null) {
    return super.group(controlsConfig, options);
  }
  /**
   * Like `FormBuilder#control`, except the resulting control is untyped.
   */
  control(formState, validatorOrOpts, asyncValidator) {
    return super.control(formState, validatorOrOpts, asyncValidator);
  }
  /**
   * Like `FormBuilder#array`, except the resulting array is untyped.
   */
  array(controlsConfig, validatorOrOpts, asyncValidator) {
    return super.array(controlsConfig, validatorOrOpts, asyncValidator);
  }
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275UntypedFormBuilder_BaseFactory;
      return function UntypedFormBuilder_Factory(__ngFactoryType__) {
        return (\u0275UntypedFormBuilder_BaseFactory || (\u0275UntypedFormBuilder_BaseFactory = \u0275\u0275getInheritedFactory(_UntypedFormBuilder)))(__ngFactoryType__ || _UntypedFormBuilder);
      };
    })();
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _UntypedFormBuilder,
      factory: _UntypedFormBuilder.\u0275fac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UntypedFormBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var VERSION = new Version("18.2.13");
var FormsModule = class _FormsModule {
  /**
   * @description
   * Provides options for configuring the forms module.
   *
   * @param opts An object of configuration options
   * * `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
   * correct, or to only call it `whenDisabled`, which is the legacy behavior.
   */
  static withConfig(opts) {
    return {
      ngModule: _FormsModule,
      providers: [{
        provide: CALL_SET_DISABLED_STATE,
        useValue: opts.callSetDisabledState ?? setDisabledStateDefault
      }]
    };
  }
  static {
    this.\u0275fac = function FormsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FormsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _FormsModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [\u0275InternalFormsSharedModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormsModule, [{
    type: NgModule,
    args: [{
      declarations: TEMPLATE_DRIVEN_DIRECTIVES,
      exports: [\u0275InternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
    }]
  }], null, null);
})();
var ReactiveFormsModule = class _ReactiveFormsModule {
  /**
   * @description
   * Provides options for configuring the reactive forms module.
   *
   * @param opts An object of configuration options
   * * `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
   * binding is used with reactive form directives.
   * * `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
   * correct, or to only call it `whenDisabled`, which is the legacy behavior.
   */
  static withConfig(opts) {
    return {
      ngModule: _ReactiveFormsModule,
      providers: [{
        provide: NG_MODEL_WITH_FORM_CONTROL_WARNING,
        useValue: opts.warnOnNgModelWithFormControl ?? "always"
      }, {
        provide: CALL_SET_DISABLED_STATE,
        useValue: opts.callSetDisabledState ?? setDisabledStateDefault
      }]
    };
  }
  static {
    this.\u0275fac = function ReactiveFormsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReactiveFormsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _ReactiveFormsModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [\u0275InternalFormsSharedModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReactiveFormsModule, [{
    type: NgModule,
    args: [{
      declarations: [REACTIVE_DRIVEN_DIRECTIVES],
      exports: [\u0275InternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
    }]
  }], null, null);
})();

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (req.url.includes("/auth/") || req.url.includes("/public/") || req.url.includes("assets/")) {
    return next(req);
  }
  const token = authService.getToken();
  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }) : req;
  return next(authReq).pipe(catchError((error) => {
    if (error.status === 401) {
      authService.logout();
      const returnUrl = router.routerState.snapshot.url;
      router.navigate(["/login"], {
        queryParams: { returnUrl: returnUrl === "/login" ? void 0 : returnUrl }
      });
    }
    return throwError(() => error);
  }));
};

// src/app/core/interceptors/error.interceptor.ts
var ErrorInterceptor = class _ErrorInterceptor {
  router;
  authService;
  intercept(request, next) {
    return next.handle(request).pipe(catchError((error) => {
      let errorMessage = "Ha ocurrido un error inesperado";
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = this.handleBadRequest(error);
            break;
          case 401:
            return this.handleUnauthorized(error);
          case 403:
            return this.handleForbidden(error);
          case 404:
            errorMessage = "Recurso no encontrado";
            this.router.navigate(["/not-found"]);
            break;
          case 500:
            errorMessage = "Error interno del servidor";
            break;
          case 0:
            errorMessage = "No se pudo conectar con el servidor. Verifica tu conexi\xF3n a internet.";
            break;
        }
      }
      if (!environment.production) {
        console.error("HTTP Error:", error);
      }
      return throwError(() => new Error(errorMessage));
    }));
  }
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }
  handleBadRequest(error) {
    if (error.error?.errors) {
      const messages = [];
      for (const key in error.error.errors) {
        if (error.error.errors[key]) {
          messages.push(...error.error.errors[key]);
        }
      }
      return messages.join(" ");
    }
    return error.error?.message || "Solicitud incorrecta";
  }
  handleUnauthorized(error) {
    this.authService.logout();
    const returnUrl = this.router.routerState.snapshot.url;
    this.router.navigate(["/login"], {
      queryParams: { returnUrl: returnUrl === "/login" ? void 0 : returnUrl }
    });
    return throwError(() => new Error(error.error?.message || "No autorizado"));
  }
  handleForbidden(error) {
    this.router.navigate(["/unauthorized"]);
    return throwError(() => new Error(error.error?.message || "Acceso denegado"));
  }
  static \u0275fac = function ErrorInterceptor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorInterceptor)(\u0275\u0275inject(Router), \u0275\u0275inject(AuthService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ErrorInterceptor, factory: _ErrorInterceptor.\u0275fac });
};

// src/app/core/interceptors/loading.interceptor.ts
var LoadingInterceptor = class _LoadingInterceptor {
  loadingService;
  totalRequests = 0;
  constructor(loadingService) {
    this.loadingService = loadingService;
  }
  intercept(request, next) {
    if (request.headers.has("X-Loading-Skip")) {
      return next.handle(request);
    }
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(finalize(() => {
      this.totalRequests--;
      if (this.totalRequests === 0) {
        this.loadingService.setLoading(false);
      }
    }));
  }
  static \u0275fac = function LoadingInterceptor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingInterceptor)(\u0275\u0275inject(LoadingService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoadingInterceptor, factory: _LoadingInterceptor.\u0275fac });
};

// src/app/services/api.service.ts
var ApiService = class _ApiService {
  http;
  base = "/api";
  constructor(http) {
    this.http = http;
  }
  // ===== util: PascalCase -> camelCase =====
  toCamel(obj) {
    if (Array.isArray(obj))
      return obj.map((v) => this.toCamel(v));
    if (obj && typeof obj === "object") {
      const out = {};
      for (const [k, v] of Object.entries(obj)) {
        const ck = k.length ? k[0].toLowerCase() + k.slice(1) : k;
        out[ck] = this.toCamel(v);
      }
      return out;
    }
    return obj;
  }
  ensureUtcIso(s) {
    if (!s)
      return "";
    return s.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(s) ? s : `${s}Z`;
  }
  // ========== Juegos ==========
  listGames() {
    return this.http.get(`${this.base}/games`).pipe(map((rows) => this.toCamel(rows)), map((rows) => rows.map((r) => ({
      gameId: r.gameId,
      homeTeam: r.homeTeam,
      awayTeam: r.awayTeam,
      status: r.status,
      quarter: r.quarter,
      homeScore: r.homeScore,
      awayScore: r.awayScore,
      createdAt: this.ensureUtcIso(r.createdAt),
      // NUEVO (si vienen en la respuesta)
      homeTeamId: r.homeTeamId ?? r.hometeamid ?? null,
      awayTeamId: r.awayTeamId ?? r.awayteamid ?? null
    }))));
  }
  createGame(home, away, quarterMs) {
    const body = { home, away };
    if (quarterMs)
      body.quarterMs = quarterMs;
    return this.http.post(`${this.base}/games`, body).pipe(map((r) => ({ gameId: r.GameId ?? r.gameId })));
  }
  getGame(id) {
    return this.http.get(`${this.base}/games/${id}`).pipe(map((raw) => {
      const game = this.toCamel(raw.game);
      const events = this.toCamel(raw.events ?? []);
      const gameFixed = {
        gameId: game.gameId,
        homeTeam: game.homeTeam,
        awayTeam: game.awayTeam,
        status: game.status,
        quarter: game.quarter,
        homeScore: game.homeScore,
        awayScore: game.awayScore,
        createdAt: this.ensureUtcIso(game.createdAt),
        // NUEVO (si existen)
        homeTeamId: game.homeTeamId ?? game.hometeamid ?? null,
        awayTeamId: game.awayTeamId ?? game.awayteamid ?? null
      };
      const eventsFixed = events.map((e) => __spreadProps(__spreadValues({}, e), {
        createdAt: this.ensureUtcIso(e.createdAt)
      }));
      return { game: gameFixed, events: eventsFixed };
    }));
  }
  // ========== Flow ==========
  start(id) {
    return this.http.post(`${this.base}/games/${id}/start`, {});
  }
  advance(id) {
    return this.http.post(`${this.base}/games/${id}/advance-quarter`, {});
  }
  finish(id) {
    return this.http.post(`${this.base}/games/${id}/finish`, {});
  }
  // ========== Acciones ==========
  score(id, team, points, opts) {
    const body = { team, points, playerId: opts?.playerId ?? null, playerNumber: opts?.playerNumber ?? null };
    return this.http.post(`${this.base}/games/${id}/score`, body);
  }
  // (ACTUALIZADO) Foul acepta jugador opcional
  foul(id, team, opts) {
    const body = { team, playerId: opts?.playerId ?? null, playerNumber: opts?.playerNumber ?? null };
    return this.http.post(`${this.base}/games/${id}/foul`, body);
  }
  // NUEVO: Restar falta
  removeFoul(id, team, opts) {
    const body = { team, playerId: opts?.playerId ?? null, playerNumber: opts?.playerNumber ?? null };
    return this.http.post(`${this.base}/games/${id}/remove-foul`, body);
  }
  // NUEVO: Restar puntos (última anotación)
  removeScore(id, team) {
    const body = { team };
    return this.http.post(`${this.base}/games/${id}/remove-score`, body);
  }
  undo(id) {
    return this.http.post(`${this.base}/games/${id}/undo`, {});
  }
  /* ========== Equipos ========== */
  listTeams() {
    return this.http.get(`${this.base}/teams`).pipe(map((rows) => rows.map((r) => ({
      teamId: r.TeamId ?? r.teamId,
      name: r.Name ?? r.name,
      createdAt: this.ensureUtcIso(r.CreatedAt ?? r.createdAt)
    }))));
  }
  createTeam(arg) {
    const body = typeof arg === "string" ? { name: arg } : arg;
    return this.http.post(`${this.base}/teams`, body).pipe(map((r) => ({ teamId: r.teamId ?? r.TeamId, name: r.name ?? body.name })));
  }
  /* ========== Emparejar (crear juego desde IDs de equipo) ========== */
  pairGame(homeTeamId, awayTeamId, quarterMs) {
    const body = { homeTeamId, awayTeamId };
    if (quarterMs)
      body.quarterMs = quarterMs;
    return this.http.post(`${this.base}/games/pair`, body).pipe(map((r) => ({ gameId: r.gameId ?? r.GameId })));
  }
  /* ========== Jugadores (por equipo) ========== */
  listPlayers(teamId) {
    return this.http.get(`${this.base}/teams/${teamId}/players`).pipe(map((rows) => this.toCamel(rows)));
  }
  createPlayer(teamId, p) {
    return this.http.post(`${this.base}/teams/${teamId}/players`, p);
  }
  updatePlayer(playerId, patch) {
    return this.http.patch(`${this.base}/players/${playerId}`, patch);
  }
  deletePlayer(playerId) {
    return this.http.delete(`${this.base}/players/${playerId}`);
  }
  /* ========== Jugadores por juego (HOME/AWAY) ========== */
  listGamePlayers(gameId, side) {
    return this.http.get(`${this.base}/games/${gameId}/players/${side}`).pipe(map((rows) => this.toCamel(rows)));
  }
  /* ========== Resumen de faltas ========== */
  getFoulSummary(id) {
    return this.http.get(`${this.base}/games/${id}/fouls/summary`).pipe(map((r) => this.toCamel(r)));
  }
  static \u0275fac = function ApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
};

// src/app/widgets/admin-team-roster.component.ts
function AdminTeamRosterComponent_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275property("value", t_r3.teamId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", t_r3.name, " (#", t_r3.teamId, ") ");
  }
}
function AdminTeamRosterComponent_div_15_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Cargando jugadores\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminTeamRosterComponent_div_15_div_4_table_1_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 32)(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 33)(8, "button", 34);
    \u0275\u0275listener("click", function AdminTeamRosterComponent_div_15_div_4_table_1_tr_11_Template_button_click_8_listener() {
      const p_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r6 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r6.deletePlayer(p_r6));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 35);
    \u0275\u0275element(10, "path", 36);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    const p_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_8_0 = p_r6.number) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.position || "");
  }
}
function AdminTeamRosterComponent_div_15_div_4_table_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 26)(1, "thead")(2, "tr", 27)(3, "th", 28);
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 29);
    \u0275\u0275text(8, "Posici\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "th", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275template(11, AdminTeamRosterComponent_div_15_div_4_table_1_tr_11_Template, 11, 3, "tr", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", ctx_r6.players)("ngForTrackBy", ctx_r6.trackPlayer);
  }
}
function AdminTeamRosterComponent_div_15_div_4_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275text(1, "Sin jugadores.");
    \u0275\u0275elementEnd();
  }
}
function AdminTeamRosterComponent_div_15_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, AdminTeamRosterComponent_div_15_div_4_table_1_Template, 12, 2, "table", 25)(2, AdminTeamRosterComponent_div_15_div_4_ng_template_2_Template, 2, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const empty_r8 = \u0275\u0275reference(3);
    const ctx_r6 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r6.players.length)("ngIfElse", empty_r8);
  }
}
function AdminTeamRosterComponent_div_15_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r6.errorMsg);
  }
}
function AdminTeamRosterComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminTeamRosterComponent_div_15_div_3_Template, 2, 0, "div", 14)(4, AdminTeamRosterComponent_div_15_div_4_Template, 4, 2, "div", 14);
    \u0275\u0275elementStart(5, "div", 15)(6, "div", 16);
    \u0275\u0275text(7, "Agregar jugador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 17)(9, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function AdminTeamRosterComponent_div_15_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r6 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r6.pName, $event) || (ctx_r6.pName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AdminTeamRosterComponent_div_15_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r6 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r6.pNumber, $event) || (ctx_r6.pNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function AdminTeamRosterComponent_div_15_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r6 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r6.pPosition, $event) || (ctx_r6.pPosition = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 21)(13, "button", 22);
    \u0275\u0275listener("click", function AdminTeamRosterComponent_div_15_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.createPlayer());
    });
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, AdminTeamRosterComponent_div_15_div_15_Template, 2, 1, "div", 23);
    \u0275\u0275elementStart(16, "div", 24);
    \u0275\u0275text(17, "* UNIQUE (Team, Number) cuando el n\xFAmero no es nulo.");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Equipo #", ctx_r6.selectedTeamId, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r6.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r6.loading);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r6.pName);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r6.pNumber);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r6.pPosition);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r6.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r6.saving ? "Guardando\u2026" : "Agregar", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r6.errorMsg);
  }
}
function AdminTeamRosterComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275text(1, "Selecciona un equipo para gestionar su plantilla.");
    \u0275\u0275elementEnd();
  }
}
var AdminTeamRosterComponent = class _AdminTeamRosterComponent {
  api;
  teams = [];
  selectedTeamId = null;
  players = [];
  loading = false;
  saving = false;
  errorMsg = "";
  // Form nuevo jugador
  pName = "";
  pNumber;
  pPosition = "";
  constructor(api) {
    this.api = api;
    this.loadTeams();
  }
  trackTeam = (_, t) => t.teamId;
  trackPlayer = (_, p) => p.playerId;
  loadTeams() {
    this.api.listTeams().subscribe((t) => this.teams = t);
  }
  // Recibe string|number desde el template (#teamSel.value)
  onSelectTeam(value) {
    const id = typeof value === "string" ? parseInt(value, 10) : value;
    this.selectedTeamId = Number.isFinite(+id) && +id > 0 ? +id : null;
    this.players = [];
    if (this.selectedTeamId !== null)
      this.loadPlayers();
  }
  loadPlayers() {
    if (this.selectedTeamId === null)
      return;
    this.loading = true;
    this.api.listPlayers(this.selectedTeamId).subscribe({
      next: (rows) => this.players = rows,
      error: () => this.players = [],
      complete: () => this.loading = false
    });
  }
  createPlayer() {
    if (this.selectedTeamId === null)
      return;
    const name = this.pName.trim();
    if (!name) {
      this.errorMsg = "Nombre requerido";
      return;
    }
    let num;
    if (this.pNumber !== null && this.pNumber !== void 0 && this.pNumber !== "") {
      if (!Number.isInteger(this.pNumber) || this.pNumber < 0 || this.pNumber > 99) {
        this.errorMsg = "El n\xFAmero debe ser entero entre 0 y 99.";
        return;
      }
      num = this.pNumber;
    }
    this.saving = true;
    this.errorMsg = "";
    this.api.createPlayer(this.selectedTeamId, { name, number: num, position: this.pPosition || void 0 }).subscribe({
      next: () => {
        this.pName = "";
        this.pNumber = void 0;
        this.pPosition = "";
        this.loadPlayers();
      },
      error: (err) => {
        this.errorMsg = err?.error?.error || "No se pudo crear el jugador (\xBFn\xFAmero duplicado?).";
      },
      complete: () => this.saving = false
    });
  }
  deletePlayer(p) {
    if (!confirm(`Eliminar a ${p.name}?`))
      return;
    this.api.deletePlayer(p.playerId).subscribe(() => this.loadPlayers());
  }
  static \u0275fac = function AdminTeamRosterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminTeamRosterComponent)(\u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminTeamRosterComponent, selectors: [["app-admin-team-roster"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 5, consts: [["teamSel", ""], ["noTeam", ""], ["empty", ""], [1, "card", "p-3"], [1, "card-header", 2, "display", "block", "text-align", "center"], [1, "card-title", 2, "margin-bottom", "4px"], [1, "card-subtitle", 2, "display", "block"], [1, "input-group", 2, "margin-bottom", "12px"], [1, "field", 2, "min-width", "260px", "max-width", "420px"], [1, "select", 3, "change"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngIf", "ngIfElse"], [1, "muted", "text-sm", 2, "margin-bottom", "10px"], [4, "ngIf"], [1, "card-subsection", 2, "margin-top", "14px"], [1, "section-title", 2, "margin-bottom", "10px"], [1, "input-group", 2, "margin-bottom", "10px"], ["placeholder", "Nombre", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "N\xB0 (0\u201399 opcional)", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Posici\xF3n (opcional)", 1, "input", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "justify-content", "center", "width", "100%"], [1, "btn", "btn-success", 2, "min-width", "180px", 3, "click", "disabled"], ["class", "error", 4, "ngIf"], [1, "text-xs", "muted", "mt-1"], ["class", "w-full text-sm", 4, "ngIf", "ngIfElse"], [1, "w-full", "text-sm"], [1, "text-left"], [2, "width", "3rem"], [2, "width", "8rem"], [2, "width", "6rem"], ["style", "height: 42px;", 4, "ngFor", "ngForOf", "ngForTrackBy"], [2, "height", "42px"], [1, "text-right"], ["title", "Eliminar", "aria-label", "Eliminar jugador", 1, "btn", "btn-ghost", "btn-sm", 2, "padding", "4px 8px", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true", "focusable", "false"], ["d", "M9 3h6a1 1 0 0 1 1 1v2h4v2h-2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8H4V6h4V4a1 1 0 0 1 1-1zm1 4v12h2V7h-2zm4 0v12h2V7h-2zM10 5v1h4V5h-4z"], [1, "text-sm", "muted"], [1, "error"]], template: function AdminTeamRosterComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5);
      \u0275\u0275text(3, "Gesti\xF3n de jugadores por equipo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 6);
      \u0275\u0275text(5, "Administra la plantilla por equipo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 7)(7, "div", 8)(8, "label");
      \u0275\u0275text(9, "Equipo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "select", 9, 0);
      \u0275\u0275listener("change", function AdminTeamRosterComponent_Template_select_change_10_listener() {
        \u0275\u0275restoreView(_r1);
        const teamSel_r2 = \u0275\u0275reference(11);
        return \u0275\u0275resetView(ctx.onSelectTeam(teamSel_r2.value));
      });
      \u0275\u0275elementStart(12, "option", 10);
      \u0275\u0275text(13, "Seleccione equipo\u2026");
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, AdminTeamRosterComponent_option_14_Template, 2, 3, "option", 11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(15, AdminTeamRosterComponent_div_15_Template, 18, 9, "div", 12)(16, AdminTeamRosterComponent_ng_template_16_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const noTeam_r9 = \u0275\u0275reference(17);
      \u0275\u0275advance(12);
      \u0275\u0275property("value", 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.teams)("ngForTrackBy", ctx.trackTeam);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedTeamId !== null)("ngIfElse", noTeam_r9);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminTeamRosterComponent, { className: "AdminTeamRosterComponent", filePath: "src\\app\\widgets\\admin-team-roster.component.ts", lineNumber: 12 });
})();

// src/app/services/clock.service.ts
var ClockService = class _ClockService {
  http;
  // OJO: si tu proxy ya mapea /api -> backend, déjalo así.
  // Si NO usas proxy, usa la URL completa del backend (p. ej. 'http://localhost:5280/api').
  base = "/api";
  /** Notifica que el clock de un gameId cambió (start/pause/reset en cualquier vista) */
  clockChanged$ = new Subject();
  constructor(http) {
    this.http = http;
  }
  /** Estado del reloj:
   *  - polling cada 1s
   *  - refresco inmediato cuando clockChanged$ emite
   *  - tolerante a errores (no mata el stream)
   */
  state$(gameId) {
    return merge(interval(1e3).pipe(startWith(0)), this.clockChanged$.pipe(filter((id) => id === gameId))).pipe(switchMap(() => this.http.get(`${this.base}/games/${gameId}/clock`).pipe(
      map((dto) => ({
        running: dto.running,
        remainingMs: dto.remainingMs,
        quarterMs: dto.quarterMs
      })),
      // Si falla el GET (404/red), mantenemos el stream vivo con un estado neutro
      catchError(() => of({ running: false, remainingMs: 0, quarterMs: 0 }))
    )), shareReplay(1));
  }
  /** Inicia/Reanuda en servidor y avisa a todas las vistas */
  start(gameId) {
    this.http.post(`${this.base}/games/${gameId}/clock/start`, {}).pipe(tap(() => this.clockChanged$.next(gameId))).subscribe({ error: () => {
    } });
  }
  /** Pausa en servidor y avisa a todas las vistas */
  pause(gameId) {
    this.http.post(`${this.base}/games/${gameId}/clock/pause`, {}).pipe(tap(() => this.clockChanged$.next(gameId))).subscribe({ error: () => {
    } });
  }
  /** Resetea en servidor */
  resetForNewQuarter(gameId, quarterMs) {
    const body = quarterMs ? { quarterMs } : {};
    this.http.post(`${this.base}/games/${gameId}/clock/reset`, body).pipe(tap(() => this.clockChanged$.next(gameId))).subscribe({ error: () => {
    } });
  }
  stop(gameId) {
    this.pause(gameId);
  }
  static \u0275fac = function ClockService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClockService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ClockService, factory: _ClockService.\u0275fac, providedIn: "root" });
};

// src/app/widgets/scoreboard.component.ts
function ScoreboardComponent_div_38_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "span", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const player_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", player_r1.number || "?", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(player_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.getPlayerFouls(player_r1.playerId), " fouls");
  }
}
function ScoreboardComponent_div_38_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "span", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const player_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", player_r3.number || "?", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(player_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.getPlayerFouls(player_r3.playerId), " fouls");
  }
}
function ScoreboardComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "div", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 24);
    \u0275\u0275template(5, ScoreboardComponent_div_38_div_5_Template, 7, 3, "div", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 26)(7, "div", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 24);
    \u0275\u0275template(10, ScoreboardComponent_div_38_div_10_Template, 7, 3, "div", 25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.game.homeTeam, " - PLAYERS");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.homePlayers);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.game.awayTeam, " - PLAYERS");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.awayPlayers);
  }
}
var MsToClockPipe = class _MsToClockPipe {
  transform(ms) {
    if (ms == null)
      return "00:00";
    const total = Math.max(0, Math.floor(ms / 1e3));
    const m = Math.floor(total / 60).toString().padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }
  static \u0275fac = function MsToClockPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MsToClockPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "msToClock", type: _MsToClockPipe, pure: true, standalone: true });
};
var ScoreboardComponent = class _ScoreboardComponent {
  clockService;
  apiService;
  game;
  showPlayerManagement = true;
  // Clock state (read-only)
  clockState$;
  // Players (read-only)
  homePlayers = [];
  awayPlayers = [];
  // Fouls tracking (read-only)
  foulSummary = { team: [], players: [] };
  subscriptions = [];
  constructor(clockService, apiService) {
    this.clockService = clockService;
    this.apiService = apiService;
  }
  ngOnInit() {
    this.initializeClock();
    this.loadPlayers();
    this.loadFoulSummary();
  }
  ngOnChanges(changes) {
    if (changes["game"] && !changes["game"].firstChange) {
      this.initializeClock();
      this.loadPlayers();
      this.loadFoulSummary();
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  initializeClock() {
    if (this.game?.gameId) {
      this.clockState$ = this.clockService.state$(this.game.gameId);
    }
  }
  loadPlayers() {
    if (!this.game?.gameId)
      return;
    if (this.game.homeTeamId) {
      this.apiService.listPlayers(this.game.homeTeamId).subscribe({
        next: (players) => this.homePlayers = players,
        error: () => this.homePlayers = []
      });
    } else {
      this.apiService.listGamePlayers(this.game.gameId, "HOME").subscribe({
        next: (players) => this.homePlayers = players,
        error: () => this.homePlayers = []
      });
    }
    if (this.game.awayTeamId) {
      this.apiService.listPlayers(this.game.awayTeamId).subscribe({
        next: (players) => this.awayPlayers = players,
        error: () => this.awayPlayers = []
      });
    } else {
      this.apiService.listGamePlayers(this.game.gameId, "AWAY").subscribe({
        next: (players) => this.awayPlayers = players,
        error: () => this.awayPlayers = []
      });
    }
  }
  loadFoulSummary() {
    if (!this.game?.gameId)
      return;
    this.apiService.getFoulSummary(this.game.gameId).subscribe({
      next: (summary) => this.foulSummary = summary,
      error: () => this.foulSummary = { team: [], players: [] }
    });
  }
  // Display-only method for showing player fouls
  getPlayerFouls(playerId) {
    const currentQuarter = this.game.quarter;
    return this.foulSummary.players.filter((f) => f.playerId === playerId && f.quarter === currentQuarter).reduce((total, f) => total + f.fouls, 0);
  }
  // Get total team fouls for current quarter
  getTeamFouls(team) {
    const currentQuarter = this.game.quarter;
    return this.foulSummary.team.filter((f) => f.team === team && f.quarter === currentQuarter).reduce((total, f) => total + f.fouls, 0);
  }
  // Get total team fouls for entire game
  getTotalTeamFouls(team) {
    return this.foulSummary.team.filter((f) => f.team === team).reduce((total, f) => total + f.fouls, 0);
  }
  // Get quarter text for display (Q1-Q4, OT1, OT2, etc.)
  getQuarterText() {
    if (!this.game)
      return "Q1";
    if (this.game.quarter <= 4) {
      return `Q${this.game.quarter}`;
    } else {
      const overtimeNum = this.game.quarter - 4;
      return `OT${overtimeNum}`;
    }
  }
  static \u0275fac = function ScoreboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScoreboardComponent)(\u0275\u0275directiveInject(ClockService), \u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScoreboardComponent, selectors: [["app-scoreboard"]], inputs: { game: "game", showPlayerManagement: "showPlayerManagement" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 39, vars: 12, consts: [[1, "scoreboard-container"], [1, "scoreboard-frame"], [1, "scoreboard-header"], [1, "scoreboard-title"], [1, "scoreboard-main"], [1, "team-section", "home-team"], [1, "team-label"], [1, "team-name"], [1, "team-score"], [1, "center-section"], [1, "timer-section"], [1, "timer-label"], [1, "timer-value"], [1, "period-section"], [1, "period-label"], [1, "period-value"], [1, "status-section"], [1, "status-label"], [1, "status-value"], [1, "team-section", "away-team"], ["class", "player-management", 4, "ngIf"], [1, "player-management"], [1, "player-panel", "home-panel"], [1, "panel-header"], [1, "player-list"], ["class", "player-item", 4, "ngFor", "ngForOf"], [1, "player-panel", "away-panel"], [1, "player-item"], [1, "player-number"], [1, "player-name"], [1, "player-fouls"]], template: function ScoreboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275text(4, "MARCADOR DE BALONCESTO");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "div", 6);
      \u0275\u0275text(8, "HOME");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 8);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 9)(14, "div", 10)(15, "div", 11);
      \u0275\u0275text(16, "TIME");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 12);
      \u0275\u0275text(18);
      \u0275\u0275pipe(19, "async");
      \u0275\u0275pipe(20, "msToClock");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 13)(22, "div", 14);
      \u0275\u0275text(23, "PERIOD");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 15);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 16)(27, "div", 17);
      \u0275\u0275text(28, "STATUS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 18);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 19)(32, "div", 6);
      \u0275\u0275text(33, "VISITOR");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 7);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 8);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(38, ScoreboardComponent_div_38_Template, 11, 4, "div", 20);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.game.homeTeam);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.game.homeScore.toString().padStart(3, "0"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 10, (tmp_2_0 = \u0275\u0275pipeBind1(19, 8, ctx.clockState$)) == null ? null : tmp_2_0.remainingMs));
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.getQuarterText());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.game.status);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.game.awayTeam);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.game.awayScore.toString().padStart(3, "0"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showPlayerManagement);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, AsyncPipe, MsToClockPipe], styles: ["\n\n.scoreboard-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 20px;\n  font-family: monospace;\n}\n.scoreboard-frame[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border: 8px solid #333;\n  border-radius: 15px;\n  box-shadow: 0 0 30px #0f0;\n  padding: 20px;\n  min-width: 800px;\n}\n.scoreboard-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 20px;\n  padding: 10px;\n  background: #000;\n  border-radius: 8px;\n  border: 2px solid #555;\n}\n.scoreboard-title[_ngcontent-%COMP%] {\n  color: #0f0;\n  font-size: 18px;\n  font-weight: bold;\n  letter-spacing: 3px;\n  text-shadow: 0 0 10px #0f0;\n}\n.scoreboard-main[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  gap: 30px;\n  align-items: center;\n}\n.team-section[_ngcontent-%COMP%] {\n  background: #0a0a0a;\n  border: 3px solid #444;\n  border-radius: 12px;\n  padding: 20px;\n  text-align: center;\n}\n.team-label[_ngcontent-%COMP%] {\n  color: #ff0;\n  font-size: 14px;\n  font-weight: bold;\n  margin-bottom: 8px;\n  text-shadow: 0 0 8px #ff0;\n}\n.team-name[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 20px;\n  font-weight: bold;\n  margin-bottom: 15px;\n  text-shadow: 0 0 10px #fff;\n  min-height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.team-score[_ngcontent-%COMP%] {\n  color: #0f0;\n  font-size: 72px;\n  font-weight: bold;\n  font-family: monospace;\n  text-shadow: 0 0 15px #0f0;\n  background: #000;\n  border: 2px solid #333;\n  border-radius: 8px;\n  padding: 10px;\n  margin: 10px auto;\n  width: 120px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.team-fouls[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  background: #0a0a0a;\n  border: 2px solid #444;\n  border-radius: 8px;\n  padding: 10px;\n  text-align: center;\n}\n.fouls-label[_ngcontent-%COMP%] {\n  color: #ff0;\n  font-size: 12px;\n  font-weight: bold;\n  margin-bottom: 5px;\n  text-shadow: 0 0 6px #ff0;\n}\n.fouls-value[_ngcontent-%COMP%] {\n  color: #f00;\n  font-size: 24px;\n  font-weight: bold;\n  font-family: monospace;\n  text-shadow: 0 0 10px #f00;\n  background: #000;\n  border: 1px solid #333;\n  border-radius: 4px;\n  padding: 5px 10px;\n  margin-top: 5px;\n}\n.center-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  align-items: center;\n}\n.period-section[_ngcontent-%COMP%], \n.status-section[_ngcontent-%COMP%], \n.timer-section[_ngcontent-%COMP%] {\n  background: #0a0a0a;\n  border: 2px solid #444;\n  border-radius: 8px;\n  padding: 15px 20px;\n  text-align: center;\n  min-width: 120px;\n}\n.timer-section[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n  min-width: 160px;\n}\n.period-label[_ngcontent-%COMP%], \n.status-label[_ngcontent-%COMP%], \n.timer-label[_ngcontent-%COMP%] {\n  color: #ff0;\n  font-size: 12px;\n  font-weight: bold;\n  margin-bottom: 5px;\n  text-shadow: 0 0 6px #ff0;\n}\n.period-value[_ngcontent-%COMP%] {\n  color: #f60;\n  font-size: 36px;\n  font-weight: bold;\n  text-shadow: 0 0 10px #f60;\n  background: #000;\n  border: 1px solid #333;\n  border-radius: 4px;\n  padding: 5px 10px;\n  margin-top: 5px;\n}\n.status-value[_ngcontent-%COMP%] {\n  color: #0ff;\n  font-size: 14px;\n  font-weight: bold;\n  text-shadow: 0 0 8px #0ff;\n  background: #000;\n  border: 1px solid #333;\n  border-radius: 4px;\n  padding: 8px 12px;\n  margin-top: 5px;\n}\n.timer-value[_ngcontent-%COMP%] {\n  color: #0ff;\n  font-size: 32px;\n  font-weight: bold;\n  font-family: monospace;\n  text-shadow: 0 0 10px #0ff;\n  background: #000;\n  border: 1px solid #333;\n  border-radius: 4px;\n  padding: 8px 12px;\n  margin: 8px 0;\n}\n.timer-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n  margin-top: 10px;\n}\n.timer-btn[_ngcontent-%COMP%] {\n  background: #333;\n  color: #0f0;\n  border: 1px solid #666;\n  border-radius: 4px;\n  padding: 4px 8px;\n  font-size: 10px;\n  font-weight: bold;\n  cursor: pointer;\n  text-shadow: 0 0 5px #0f0;\n}\n.timer-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #444;\n  text-shadow: 0 0 8px #0f0;\n}\n.timer-btn[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.home-team[_ngcontent-%COMP%] {\n  border-color: #0f0;\n}\n.home-team[_ngcontent-%COMP%]   .team-label[_ngcontent-%COMP%] {\n  color: #0f0;\n  text-shadow: 0 0 8px #0f0;\n}\n.away-team[_ngcontent-%COMP%] {\n  border-color: #f60;\n}\n.away-team[_ngcontent-%COMP%]   .team-label[_ngcontent-%COMP%] {\n  color: #f60;\n  text-shadow: 0 0 8px #f60;\n}\n.player-management[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 30px;\n}\n.player-panel[_ngcontent-%COMP%] {\n  background: #0a0a0a;\n  border: 3px solid #444;\n  border-radius: 12px;\n  padding: 20px;\n}\n.home-panel[_ngcontent-%COMP%] {\n  border-color: #0f0;\n}\n.away-panel[_ngcontent-%COMP%] {\n  border-color: #f60;\n}\n.panel-header[_ngcontent-%COMP%] {\n  color: #ff0;\n  font-size: 16px;\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 15px;\n  padding: 8px;\n  background: #000;\n  border-radius: 6px;\n  border: 1px solid #555;\n  text-shadow: 0 0 8px #ff0;\n}\n.player-list[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n  margin-bottom: 15px;\n}\n.player-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto auto;\n  gap: 10px;\n  align-items: center;\n  padding: 8px 12px;\n  margin-bottom: 8px;\n  background: #111;\n  border: 1px solid #333;\n  border-radius: 6px;\n}\n.player-item[_ngcontent-%COMP%]:hover {\n  border-color: #555;\n  background: #1a1a1a;\n}\n.player-number[_ngcontent-%COMP%] {\n  color: #f60;\n  font-weight: bold;\n  font-size: 14px;\n  text-shadow: 0 0 5px #f60;\n  min-width: 30px;\n}\n.player-name[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 14px;\n  text-shadow: 0 0 5px #fff;\n}\n.player-fouls[_ngcontent-%COMP%] {\n  color: #ff0;\n  font-size: 12px;\n  font-weight: bold;\n  text-shadow: 0 0 5px #ff0;\n}\n.foul-btn[_ngcontent-%COMP%] {\n  background: #600;\n  color: #fff;\n  border: 1px solid #a00;\n  border-radius: 4px;\n  padding: 4px 8px;\n  font-size: 10px;\n  font-weight: bold;\n  cursor: pointer;\n  text-shadow: 0 0 3px #fff;\n}\n.foul-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #800;\n}\n.foul-btn[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.add-player-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  gap: 8px;\n  align-items: center;\n  padding: 12px;\n  background: #000;\n  border: 1px solid #444;\n  border-radius: 8px;\n}\n.player-input[_ngcontent-%COMP%] {\n  background: #000;\n  color: #0f0;\n  border: 1px solid #333;\n  border-radius: 4px;\n  padding: 6px 8px;\n  font-size: 12px;\n  font-family: monospace;\n  text-shadow: 0 0 3px #0f0;\n}\n.player-input[_ngcontent-%COMP%]::placeholder {\n  color: #555;\n}\n.player-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #0f0;\n}\n.player-number-input[_ngcontent-%COMP%] {\n  background: #000;\n  color: #f60;\n  border: 1px solid #333;\n  border-radius: 4px;\n  padding: 6px 8px;\n  font-size: 12px;\n  font-family: monospace;\n  text-shadow: 0 0 3px #f60;\n  width: 50px;\n}\n.player-number-input[_ngcontent-%COMP%]::placeholder {\n  color: #555;\n}\n.player-number-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #f60;\n}\n.add-player-btn[_ngcontent-%COMP%] {\n  background: #060;\n  color: #fff;\n  border: 1px solid #0a0;\n  border-radius: 4px;\n  padding: 6px 12px;\n  font-size: 10px;\n  font-weight: bold;\n  cursor: pointer;\n  text-shadow: 0 0 3px #fff;\n  white-space: nowrap;\n}\n.add-player-btn[_ngcontent-%COMP%]:hover {\n  background: #080;\n}\n@media (max-width:768px) {\n  .scoreboard-frame[_ngcontent-%COMP%] {\n    min-width: auto;\n    width: 100%;\n    padding: 15px;\n  }\n  .scoreboard-main[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n  }\n  .team-score[_ngcontent-%COMP%] {\n    font-size: 48px;\n    width: 100px;\n  }\n  .fouls-value[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .scoreboard-title[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .player-management[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n  }\n  .add-player-section[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n  .timer-value[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .timer-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 5px;\n  }\n}\n/*# sourceMappingURL=scoreboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScoreboardComponent, { className: "ScoreboardComponent", filePath: "src\\app\\widgets\\scoreboard.component.ts", lineNumber: 28 });
})();

// src/app/services/audio.service.ts
var AudioService = class _AudioService {
  whistleAudio = null;
  scoreAudio = null;
  isEnabled = true;
  constructor() {
    this.preloadAudio();
  }
  preloadAudio() {
    try {
      this.whistleAudio = new Audio();
      this.whistleAudio.src = "/assets/sounds/whistle.mp3";
      this.whistleAudio.preload = "auto";
      this.whistleAudio.volume = 0.7;
      this.scoreAudio = new Audio();
      this.scoreAudio.src = "/assets/sounds/score.mp3";
      this.scoreAudio.preload = "auto";
      this.scoreAudio.volume = 0.6;
    } catch (error) {
      console.warn("No se pudo precargar el audio de silbato:", error);
    }
  }
  /**
   * Reproduce el sonido de silbato para fin de cuarto
   */
  playQuarterEndWhistle() {
    if (!this.isEnabled || !this.whistleAudio) {
      return;
    }
    try {
      this.whistleAudio.currentTime = 0;
      const playPromise = this.whistleAudio.play();
      if (playPromise !== void 0) {
        playPromise.catch((error) => {
          console.warn("No se pudo reproducir el silbato autom\xE1ticamente:", error);
          this.enableAudioOnNextInteraction();
        });
      }
    } catch (error) {
      console.warn("Error al reproducir silbato:", error);
    }
  }
  /**
   * Reproduce sonido de anotación
   */
  playScore() {
    if (!this.isEnabled || !this.scoreAudio)
      return;
    try {
      this.scoreAudio.currentTime = 0;
      const p = this.scoreAudio.play();
      if (p)
        p.catch(() => this.enableAudioOnNextInteraction());
    } catch {
    }
  }
  /**
   * Reproduce sonido para inicio de tiempo extra (reutiliza silbato)
   */
  playOvertimeStart() {
    this.playQuarterEndWhistle();
  }
  /**
   * Reproduce sonido al finalizar el partido (reutiliza silbato + score suave)
   */
  playGameEnd() {
    this.playQuarterEndWhistle();
    setTimeout(() => this.playScore(), 250);
  }
  /**
   * Habilita/deshabilita los sonidos
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }
  /**
   * Obtiene el estado de habilitación de audio
   */
  isAudioEnabled() {
    return this.isEnabled;
  }
  /**
   * Maneja la política de autoplay de los navegadores
   */
  enableAudioOnNextInteraction() {
    const enableAudio = () => {
      if (this.whistleAudio) {
        this.whistleAudio.play().then(() => {
          this.whistleAudio.pause();
          this.whistleAudio.currentTime = 0;
        }).catch(() => {
        });
      }
      if (this.scoreAudio) {
        this.scoreAudio.play().then(() => {
          this.scoreAudio.pause();
          this.scoreAudio.currentTime = 0;
        }).catch(() => {
        });
      }
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
      document.removeEventListener("keydown", enableAudio);
    };
    document.addEventListener("click", enableAudio, { once: true });
    document.addEventListener("touchstart", enableAudio, { once: true });
    document.addEventListener("keydown", enableAudio, { once: true });
  }
  static \u0275fac = function AudioService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AudioService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AudioService, factory: _AudioService.\u0275fac, providedIn: "root" });
};

// src/app/widgets/control-panel.component.ts
function ControlPanelComponent_option_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngValue", p_r1.playerId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", p_r1.number ? "#" + p_r1.number + " " : "", "", p_r1.name, "", ctx_r1.isPlayerOut(p_r1) ? " (OUT)" : "", " ");
  }
}
function ControlPanelComponent_option_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngValue", p_r3.playerId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", p_r3.number ? "#" + p_r3.number + " " : "", "", p_r3.name, "", ctx_r1.isPlayerOut(p_r3) ? " (OUT)" : "", " ");
  }
}
var ControlPanelComponent = class _ControlPanelComponent {
  api;
  audio;
  notifications;
  clock;
  game;
  changed = new EventEmitter();
  // Listas de jugadores del partido (lado HOME/AWAY)
  homePlayers = [];
  awayPlayers = [];
  // Selección actual para registrar falta por jugador
  selHomePlayerId;
  selAwayPlayerId;
  // Conteo de faltas del cuarto actual
  teamFouls = { home: 0, away: 0 };
  // Conteo de faltas por jugador (total acumulado, por juego)
  playerFouls = /* @__PURE__ */ new Map();
  constructor(api, audio, notifications, clock) {
    this.api = api;
    this.audio = audio;
    this.notifications = notifications;
    this.clock = clock;
  }
  ngOnChanges(ch) {
    if (!this.game)
      return;
    this.api.listGamePlayers(this.game.gameId, "HOME").subscribe((p) => this.homePlayers = p);
    this.api.listGamePlayers(this.game.gameId, "AWAY").subscribe((p) => this.awayPlayers = p);
    this.refreshFouls();
  }
  refresh() {
    this.changed.emit();
  }
  refreshFouls() {
    if (!this.game)
      return;
    this.api.getFoulSummary(this.game.gameId).subscribe((s) => {
      const q = this.game.quarter;
      const th = s.team.find((r) => r.quarter === q && r.team === "HOME")?.fouls ?? 0;
      const ta = s.team.find((r) => r.quarter === q && r.team === "AWAY")?.fouls ?? 0;
      this.teamFouls = { home: th, away: ta };
      this.playerFouls.clear();
      for (const row of s.players) {
        const prev = this.playerFouls.get(row.playerId) ?? 0;
        this.playerFouls.set(row.playerId, prev + (row.fouls ?? 0));
      }
    });
  }
  disabledScore() {
    return this.game?.status !== "IN_PROGRESS";
  }
  canAdvance() {
    if (!this.game || this.game.status !== "IN_PROGRESS")
      return false;
    if (this.game.quarter < 4)
      return true;
    return this.game.homeScore === this.game.awayScore;
  }
  getAdvanceButtonText() {
    if (!this.game)
      return "Advance";
    if (this.game.quarter < 4) {
      return `Q${this.game.quarter + 1}`;
    } else {
      const overtimeNum = this.game.quarter - 3;
      return `OT${overtimeNum}`;
    }
  }
  getQuarterText() {
    if (!this.game)
      return "Q1";
    if (this.game.quarter <= 4) {
      return `Q${this.game.quarter}`;
    } else {
      const overtimeNum = this.game.quarter - 4;
      return `OT${overtimeNum}`;
    }
  }
  start() {
    this.api.start(this.game.gameId).subscribe(() => this.refresh());
  }
  advance() {
    const nextQuarter = this.game.quarter + 1;
    const isOvertimeStart = nextQuarter >= 5;
    this.api.advance(this.game.gameId).subscribe(() => {
      this.refresh();
      this.refreshFouls();
      if (isOvertimeStart) {
        this.audio.playOvertimeStart();
        alert("Inicia Tiempo Extra");
      } else {
        this.audio.playQuarterEndWhistle();
      }
    });
  }
  finish() {
    this.api.finish(this.game.gameId).subscribe(() => {
      this.refresh();
      this.refreshFouls();
      this.audio.playGameEnd();
      const msg = `\u{1F3C1} Partido finalizado: ${this.game.homeTeam} ${this.game.homeScore} - ${this.game.awayScore} ${this.game.awayTeam}`;
      this.notifications.showSuccess(msg, 6e3);
    });
  }
  undo() {
    this.api.undo(this.game.gameId).subscribe(() => {
      this.refresh();
      this.refreshFouls();
    });
  }
  score(team, points) {
    this.api.score(this.game.gameId, team, points).subscribe(() => {
      this.refresh();
      this.audio.playScore();
    });
  }
  foul(team) {
    const playerId = team === "HOME" ? this.selHomePlayerId : this.selAwayPlayerId;
    const prevTeamCount = team === "HOME" ? this.teamFouls.home : this.teamFouls.away;
    this.api.foul(this.game.gameId, team, { playerId }).subscribe(() => {
      this.refresh();
      this.refreshFouls();
      setTimeout(() => {
        const newTeamCount = team === "HOME" ? this.teamFouls.home : this.teamFouls.away;
        if (newTeamCount !== prevTeamCount && newTeamCount > 4) {
          const over = newTeamCount - 4;
          const shots = over === 1 ? 1 : 2;
          const rival = team === "HOME" ? "AWAY" : "HOME";
          const rivalName = rival === "HOME" ? this.game.homeTeam : this.game.awayTeam;
          const msg = shots === 1 ? `\u{1F3AF} ${rivalName}: +1 tiro libre por faltas acumuladas del rival` : `\u{1F3AF} ${rivalName}: +2 tiros libres por faltas acumuladas del rival`;
          this.notifications.showInfo(msg, 6e3);
        }
      }, 150);
      if (playerId != null) {
        setTimeout(() => {
          const count = this.playerFouls.get(playerId) ?? 0;
          if (count >= 5) {
            const pool = team === "HOME" ? this.homePlayers : this.awayPlayers;
            const p = pool.find((x) => x.playerId === playerId);
            if (team === "HOME" && this.selHomePlayerId === playerId)
              this.selHomePlayerId = void 0;
            if (team === "AWAY" && this.selAwayPlayerId === playerId)
              this.selAwayPlayerId = void 0;
            const tag = p ? p.number ? `#${p.number} ${p.name}` : p.name : `Jugador ${playerId}`;
            this.notifications.showWarning(`\u{1F6AB} ${tag} qued\xF3 OUT por 5 faltas`, 6e3);
          }
        }, 150);
      }
    });
  }
  removeFoul(team) {
    const playerId = team === "HOME" ? this.selHomePlayerId : this.selAwayPlayerId;
    const prevCount = playerId != null ? this.playerFouls.get(playerId) ?? 0 : void 0;
    const wasOut = prevCount != null ? prevCount >= 5 : false;
    this.api.removeFoul(this.game.gameId, team, { playerId }).subscribe(() => {
      this.refresh();
      this.refreshFouls();
      setTimeout(() => {
        if (playerId != null) {
          const now = this.playerFouls.get(playerId) ?? 0;
          const pool = team === "HOME" ? this.homePlayers : this.awayPlayers;
          const p = pool.find((x) => x.playerId === playerId);
          const tag = p ? p.number ? `#${p.number} ${p.name}` : p.name : `Jugador ${playerId}`;
          this.notifications.showInfo(`\u2796 Se quit\xF3 una falta a ${tag} (ahora: ${now})`, 5e3);
          if (wasOut && now < 5) {
            this.notifications.showSuccess(`\u2705 ${tag} vuelve a estar habilitado (<5 faltas)`, 6e3);
          }
        }
      }, 150);
    });
  }
  removeScore(team) {
    this.api.removeScore(this.game.gameId, team).subscribe(() => this.refresh());
  }
  resetQuarter() {
    if (!this.game)
      return;
    this.clock.resetForNewQuarter(this.game.gameId);
  }
  // Helpers de UI
  // OUT: solo por faltas del juego actual (no depende de 'active' global)
  isPlayerOut(p) {
    const fouls = this.playerFouls.get(p.playerId) ?? 0;
    return fouls >= 5;
  }
  isSelectedPlayerOut(side) {
    const pid = side === "HOME" ? this.selHomePlayerId : this.selAwayPlayerId;
    if (!pid)
      return false;
    const pool = side === "HOME" ? this.homePlayers : this.awayPlayers;
    const p = pool.find((x) => x.playerId === pid);
    return !!(p && this.isPlayerOut(p));
  }
  static \u0275fac = function ControlPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ControlPanelComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(AudioService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(ClockService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ControlPanelComponent, selectors: [["app-control-panel"]], inputs: { game: "game" }, outputs: { changed: "changed" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 76, vars: 36, consts: [[1, "card", "p-3", 2, "width", "100%", "max-width", "100%", "box-sizing", "border-box"], [1, "card-header", 2, "display", "block", "text-align", "center"], [1, "card-title", 2, "margin-bottom", "4px"], [1, "card-subtitle", 2, "display", "block"], [2, "display", "flex", "justify-content", "center", "gap", "8px", "flex-wrap", "wrap", "margin-bottom", "12px"], [1, "btn", "btn-success", 3, "click", "disabled"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "btn", "btn-ghost", 3, "click", "disabled"], [2, "display", "grid", "gap", "12px", "grid-template-columns", "repeat(auto-fit, minmax(260px, 1fr))", "align-items", "stretch"], [1, "card-subsection", "my-md"], [1, "card", "p-3", 2, "background", "rgba(255,255,255,0.02)", "border", "1px solid rgba(255,255,255,0.08)", "height", "100%", "display", "flex", "flex-direction", "column"], [1, "card-header", 2, "display", "block", "margin-bottom", ".5rem"], [1, "card-title"], [1, "card-subtitle"], [1, "input-group", 2, "align-items", "stretch", "width", "100%", "flex", "1 1 auto"], [2, "display", "flex", "gap", "8px", "flex-wrap", "wrap", "align-items", "center", "margin-bottom", "8px"], [2, "display", "flex", "width", "100%", "margin-bottom", "8px"], [1, "select", 2, "flex", "1 1 100%", "min-width", "0", "width", "100%", 3, "ngModelChange", "ngModel", "disabled"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [2, "display", "flex", "gap", "8px", "flex-wrap", "wrap", "align-items", "center", "margin-bottom", "6px"], [1, "muted", "text-sm", 2, "margin-top", "2px"]], template: function ControlPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275text(3, "Controles");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275text(5, "Gestiona el juego y registra eventos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4)(7, "button", 5);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_7_listener() {
        return ctx.start();
      });
      \u0275\u0275text(8, "Start");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_9_listener() {
        return ctx.advance();
      });
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_11_listener() {
        return ctx.finish();
      });
      \u0275\u0275text(12, "Finish");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 7);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_13_listener() {
        return ctx.undo();
      });
      \u0275\u0275text(14, "Undo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 7);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_15_listener() {
        return ctx.resetQuarter();
      });
      \u0275\u0275text(16, "Reiniciar cuarto");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 8)(18, "div", 9)(19, "div", 10)(20, "div", 11)(21, "div", 12);
      \u0275\u0275text(22, "HOME");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 13);
      \u0275\u0275text(24, "Anotar, seleccionar jugador y registrar faltas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 14)(26, "div", 15)(27, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_27_listener() {
        return ctx.score("HOME", 1);
      });
      \u0275\u0275text(28, "+1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_29_listener() {
        return ctx.score("HOME", 2);
      });
      \u0275\u0275text(30, "+2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_31_listener() {
        return ctx.score("HOME", 3);
      });
      \u0275\u0275text(32, "+3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "button", 7);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_33_listener() {
        return ctx.removeScore("HOME");
      });
      \u0275\u0275text(34, "-Pts");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 16)(36, "select", 17);
      \u0275\u0275twoWayListener("ngModelChange", function ControlPanelComponent_Template_select_ngModelChange_36_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selHomePlayerId, $event) || (ctx.selHomePlayerId = $event);
        return $event;
      });
      \u0275\u0275elementStart(37, "option", 18);
      \u0275\u0275text(38, "Jugador HOME (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275template(39, ControlPanelComponent_option_39_Template, 2, 4, "option", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 20)(41, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_41_listener() {
        return ctx.foul("HOME");
      });
      \u0275\u0275text(42, "+Foul");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "button", 7);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_43_listener() {
        return ctx.removeFoul("HOME");
      });
      \u0275\u0275text(44, "-Foul");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 21);
      \u0275\u0275text(46);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(47, "div", 9)(48, "div", 10)(49, "div", 11)(50, "div", 12);
      \u0275\u0275text(51, "AWAY");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 13);
      \u0275\u0275text(53, "Anotar, seleccionar jugador y registrar faltas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "div", 14)(55, "div", 15)(56, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_56_listener() {
        return ctx.score("AWAY", 1);
      });
      \u0275\u0275text(57, "+1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_58_listener() {
        return ctx.score("AWAY", 2);
      });
      \u0275\u0275text(59, "+2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_60_listener() {
        return ctx.score("AWAY", 3);
      });
      \u0275\u0275text(61, "+3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "button", 7);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_62_listener() {
        return ctx.removeScore("AWAY");
      });
      \u0275\u0275text(63, "-Pts");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div", 16)(65, "select", 17);
      \u0275\u0275twoWayListener("ngModelChange", function ControlPanelComponent_Template_select_ngModelChange_65_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selAwayPlayerId, $event) || (ctx.selAwayPlayerId = $event);
        return $event;
      });
      \u0275\u0275elementStart(66, "option", 18);
      \u0275\u0275text(67, "Jugador AWAY (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275template(68, ControlPanelComponent_option_68_Template, 2, 4, "option", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "div", 20)(70, "button", 6);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_70_listener() {
        return ctx.foul("AWAY");
      });
      \u0275\u0275text(71, "+Foul");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "button", 7);
      \u0275\u0275listener("click", function ControlPanelComponent_Template_button_click_72_listener() {
        return ctx.removeFoul("AWAY");
      });
      \u0275\u0275text(73, "-Foul");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "div", 21);
      \u0275\u0275text(75);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.game.status !== "SCHEDULED");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.canAdvance());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.getAdvanceButtonText());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.game);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.game);
      \u0275\u0275advance(12);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS" || ctx.game.homeScore === 0);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.selHomePlayerId);
      \u0275\u0275property("disabled", !ctx.homePlayers.length);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", void 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.homePlayers);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS" || ctx.isSelectedPlayerOut("HOME"));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS" || ctx.teamFouls.home === 0);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("text-red-600", ctx.teamFouls.home >= 5);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" Faltas HOME (Q", ctx.game.quarter, "): ", ctx.teamFouls.home, " ", ctx.teamFouls.home >= 5 ? "(Penalizaci\xF3n)" : "", " ");
      \u0275\u0275advance(10);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS" || ctx.game.awayScore === 0);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.selAwayPlayerId);
      \u0275\u0275property("disabled", !ctx.awayPlayers.length);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", void 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.awayPlayers);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS" || ctx.isSelectedPlayerOut("AWAY"));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.game.status !== "IN_PROGRESS" || ctx.teamFouls.away === 0);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("text-red-600", ctx.teamFouls.away >= 5);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" Faltas AWAY (Q", ctx.game.quarter, "): ", ctx.teamFouls.away, " ", ctx.teamFouls.away >= 5 ? "(Penalizaci\xF3n)" : "", " ");
    }
  }, dependencies: [CommonModule, NgForOf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ControlPanelComponent, { className: "ControlPanelComponent", filePath: "src\\app\\widgets\\control-panel.component.ts", lineNumber: 15 });
})();

// src/app/widgets/team-roster.component.ts
function TeamRosterComponent_div_7_li_3_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1.position);
  }
}
function TeamRosterComponent_div_7_li_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 11)(1, "div", 12)(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, TeamRosterComponent_div_7_li_3_span_6_Template, 2, 1, "span", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const p_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("border-bottom", i_r2 === ctx_r2.players.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" #", (tmp_6_0 = p_r1.number) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r1.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r1.position);
  }
}
function TeamRosterComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "ul", 9);
    \u0275\u0275template(3, TeamRosterComponent_div_7_li_3_Template, 7, 5, "li", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.players);
  }
}
function TeamRosterComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275text(2, "Sin jugadores asignados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19);
    \u0275\u0275text(4, "Los jugadores aparecer\xE1n aqu\xED una vez configurada la plantilla");
    \u0275\u0275elementEnd()();
  }
}
var TeamRosterComponent = class _TeamRosterComponent {
  api;
  gameId;
  side;
  players = [];
  constructor(api) {
    this.api = api;
  }
  ngOnChanges(ch) {
    if (!this.gameId || !this.side)
      return;
    this.api.listGamePlayers(this.gameId, this.side).subscribe((ps) => this.players = ps);
  }
  static \u0275fac = function TeamRosterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamRosterComponent)(\u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamRosterComponent, selectors: [["app-team-roster"]], inputs: { gameId: "gameId", side: "side" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 10, vars: 3, consts: [["empty", ""], [1, "card", "p-3", 2, "background", "rgba(255,255,255,0.02)", "border", "1px solid rgba(255,255,255,0.08)", "height", "100%", "display", "flex", "flex-direction", "column"], [1, "card-header", 2, "display", "block", "margin-bottom", ".5rem"], [1, "card-title"], [1, "card-subtitle"], [1, "input-group", 2, "align-items", "stretch", "width", "100%", "flex", "1 1 auto"], ["style", "width:100%;", 4, "ngIf", "ngIfElse"], [2, "width", "100%"], [2, "max-height", "280px", "overflow-y", "auto", "border-radius", "8px"], [1, "list-clean", "text-sm", 2, "margin", "0"], ["style", "display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06);", 3, "border-bottom", 4, "ngFor", "ngForOf"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "8px 12px", "border-bottom", "1px solid rgba(255,255,255,0.06)"], [2, "display", "flex", "align-items", "center", "gap", "8px"], [1, "text-xs", 2, "opacity", ".7", "border", "1px solid rgba(255,255,255,0.18)", "padding", "2px 6px", "border-radius", "999px", "min-width", "28px", "text-align", "center"], [1, "font-medium"], ["class", "text-xs muted", "style", "opacity:.6;", 4, "ngIf"], [1, "text-xs", "muted", 2, "opacity", ".6"], [1, "text-center", 2, "padding", "20px", "opacity", ".6"], [1, "text-sm", "muted"], [1, "text-xs", "muted", 2, "margin-top", "4px"]], template: function TeamRosterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275text(5, "Jugadores activos en el partido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5);
      \u0275\u0275template(7, TeamRosterComponent_div_7_Template, 4, 1, "div", 6)(8, TeamRosterComponent_ng_template_8_Template, 5, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const empty_r4 = \u0275\u0275reference(9);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Plantilla ", ctx.side, "");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.players.length)("ngIfElse", empty_r4);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeamRosterComponent, { className: "TeamRosterComponent", filePath: "src\\app\\widgets\\team-roster.component.ts", lineNumber: 11 });
})();

// src/app/pages/home-page.component.ts
var _c02 = (a0) => ["/display", a0];
var _c12 = (a0, a1, a2) => ({ "pill-finished": a0, "pill-inprogress": a1, "pill-scheduled": a2 });
var _c22 = () => ["/results"];
var _c32 = (a0) => ({ id: a0 });
function HomePageComponent_li_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 40)(1, "div", 41)(2, "div")(3, "a", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 43);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 44)(8, "span", 45);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "lowercase");
    \u0275\u0275pipe(11, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 46);
    \u0275\u0275text(13, "Ver");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const g_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(12, _c02, g_r2.gameId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", g_r2.homeTeam, " vs ", g_r2.awayTeam, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Q", g_r2.quarter, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(14, _c12, g_r2.status === "FINISHED", g_r2.status === "IN_PROGRESS", g_r2.status === "SCHEDULED"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 10, \u0275\u0275pipeBind1(10, 8, g_r2.status)), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(18, _c22))("queryParams", \u0275\u0275pureFunction1(19, _c32, g_r2.gameId));
  }
}
function HomePageComponent_option_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275property("value", t_r3.teamId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3.name);
  }
}
function HomePageComponent_option_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    \u0275\u0275property("value", t_r4.teamId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4.name);
  }
}
function HomePageComponent_li_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 47)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", t_r7.teamId, "");
  }
}
function HomePageComponent_span_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "Nombre inv\xE1lido.");
    \u0275\u0275elementEnd();
  }
}
function HomePageComponent_div_83_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "app-scoreboard", 50);
    \u0275\u0275elementStart(2, "div", 51)(3, "div", 52)(4, "app-control-panel", 53);
    \u0275\u0275listener("changed", function HomePageComponent_div_83_Template_app_control_panel_changed_4_listener() {
      const d_r9 = \u0275\u0275restoreView(_r8).ngIf;
      const ctx_r9 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r9.view(d_r9.game.gameId));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "div", 54)(6, "div", 55);
    \u0275\u0275element(7, "app-team-roster", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 55);
    \u0275\u0275element(9, "app-team-roster", 57);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const d_r9 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("game", d_r9.game);
    \u0275\u0275advance(3);
    \u0275\u0275property("game", d_r9.game);
    \u0275\u0275advance(3);
    \u0275\u0275property("gameId", d_r9.game.gameId);
    \u0275\u0275advance(2);
    \u0275\u0275property("gameId", d_r9.game.gameId);
  }
}
var HomePageComponent = class _HomePageComponent {
  api;
  notifications;
  // filtros / estado
  q = "";
  creating = false;
  advancing = false;
  // NUEVO: nombre del equipo a crear
  newTeamName = "";
  // Regla: solo letras (incluye acentos/ñ) y espacios
  teamNameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;
  // Duración del cuarto seleccionada (en milisegundos)
  selectedQuarterMs = 72e4;
  // Default 12 min
  // datos
  teams = [];
  games = [];
  detail = null;
  constructor(api, notifications) {
    this.api = api;
    this.notifications = notifications;
    this.reloadAll();
  }
  // Validación pública para usar en template
  isTeamNameValid(value) {
    const v = (value ?? "").trim();
    if (!v)
      return false;
    return this.teamNameRegex.test(v);
  }
  // ===== API wrappers (lógica mínima) =====
  reloadAll() {
    this.api.listTeams().subscribe((t) => this.teams = t);
    this.reloadGames();
  }
  reloadGames() {
    this.api.listGames().subscribe((g) => this.games = g);
  }
  view(id) {
    this.api.getGame(id).subscribe((d) => this.detail = d);
  }
  createGame(homeTeamId, awayTeamId) {
    if (!homeTeamId || !awayTeamId || homeTeamId === awayTeamId)
      return;
    this.creating = true;
    const homeTeam = this.teams.find((t) => t.teamId === homeTeamId);
    const awayTeam = this.teams.find((t) => t.teamId === awayTeamId);
    this.api.pairGame(homeTeamId, awayTeamId, this.selectedQuarterMs).subscribe({
      next: ({ gameId }) => {
        this.reloadGames();
        if (homeTeam && awayTeam) {
          this.notifications.showSuccess(`\u{1F3C0} Enfrentamiento creado: ${homeTeam.name} vs ${awayTeam.name}`, 5e3);
        }
        this.view(gameId);
      },
      error: () => {
        this.notifications.showError("Error al crear el enfrentamiento");
      },
      complete: () => this.creating = false
    });
  }
  // Obtener texto descriptivo para la duración seleccionada
  getQuarterDurationText() {
    switch (this.selectedQuarterMs) {
      case 3e4:
        return "30 segundos";
      case 3e5:
        return "5 minutos";
      case 6e5:
        return "10 minutos";
      case 72e4:
        return "12 minutos";
      default:
        return "12 minutos";
    }
  }
  createTeam() {
    const name = this.newTeamName.trim();
    if (!name)
      return;
    if (!this.isTeamNameValid(name))
      return;
    this.creating = true;
    this.api.createTeam(name).subscribe({
      next: () => {
        this.newTeamName = "";
        this.creating = false;
        this.reloadAll();
      },
      error: (err) => {
        console.error("Error creando equipo", err);
        this.creating = false;
      }
    });
  }
  // Hook desde <app-clock> cuando se agota el tiempo del cuarto
  onExpire() {
    const g = this.detail?.game;
    if (!g)
      return;
    if (g.status === "IN_PROGRESS" && g.quarter < 4 && !this.advancing) {
      this.advancing = true;
      this.api.advance(g.gameId).subscribe({
        next: () => this.view(g.gameId),
        complete: () => this.advancing = false
      });
    }
  }
  static \u0275fac = function HomePageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomePageComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(NotificationService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomePageComponent, selectors: [["app-home-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 84, vars: 23, consts: [["homeSel", ""], ["awaySel", ""], [1, "p-4"], [1, "container", "stack"], [1, "hero"], [1, "muted"], [1, "container", "grid-2"], [1, "card", "p-3"], [1, "card-header"], [1, "card-title"], [1, "card-subtitle"], [1, "divider-y"], ["class", "py-3", 4, "ngFor", "ngForOf"], [1, "mt-4", "pt-3"], [1, "font-semibold", "mb-2", 2, "text-align", "center"], [2, "display", "flex", "justify-content", "center", "width", "100%"], [1, "input-group", 2, "width", "100%", "max-width", "640px", "margin-bottom", "10px"], [1, "field", 2, "flex", "1", "min-width", "220px"], [1, "select"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "field", 2, "flex", "1", "min-width", "180px"], [1, "select", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "justify-content", "center", "width", "100%", "margin-bottom", "8px"], [1, "btn", "btn-success", 2, "min-width", "200px", 3, "click", "disabled"], [1, "text-xs", "muted", "text-center"], [1, "card-header", 2, "display", "block", "text-align", "center"], [1, "card-title", 2, "margin-bottom", "4px"], [1, "card-subtitle", 2, "display", "block"], [2, "max-height", "320px", "overflow", "auto", "margin-top", "6px", "border-radius", "10px"], [1, "list-clean", "text-sm", 2, "margin", "0"], ["style", "display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom: 1px solid rgba(255,255,255,0.06);", 4, "ngFor", "ngForOf"], [1, "input-group", 2, "margin-bottom", "10px"], [1, "field", 2, "flex", "1", "min-width", "260px"], ["placeholder", "Ej. Los halcones", 1, "input", 3, "ngModelChange", "ngModel"], [1, "text-xs", 2, "margin-top", "4px"], ["style", "color:#f87171;", 4, "ngIf"], [1, "text-xs", "muted", "mt-1"], [1, "mt-4"], ["class", "card p-3", 4, "ngIf"], [1, "py-3"], [2, "display", "grid", "grid-template-columns", "1fr auto", "gap", ".5rem", "align-items", "center"], [1, "font-medium", 3, "routerLink"], [1, "text-xs", "muted"], [1, "row"], [1, "pill", 3, "ngClass"], [1, "btn", "btn-ghost", "btn-sm", 3, "routerLink", "queryParams"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "10px 12px", "border-bottom", "1px solid rgba(255,255,255,0.06)"], [1, "text-xs", 2, "opacity", ".7", "border", "1px solid rgba(255,255,255,0.18)", "padding", "2px 8px", "border-radius", "999px"], [2, "color", "#f87171"], [3, "game"], [1, "mt-4", 2, "display", "grid", "justify-items", "center"], [2, "width", "100%", "max-width", "900px"], [3, "changed", "game"], [1, "mt-5", 2, "display", "grid", "gap", "1.25rem", "grid-template-columns", "repeat(auto-fit, minmax(260px, 1fr))", "margin-top", "1.25rem"], [1, "card", "p-3", 2, "min-width", "0"], ["side", "HOME", 3, "gameId"], ["side", "AWAY", 3, "gameId"]], template: function HomePageComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "header", 4)(3, "h1");
      \u0275\u0275text(4, "Gesti\xF3n de partidos de Baloncesto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 5);
      \u0275\u0275text(6, "Hecho por Grupo #9");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "section", 6)(8, "div", 7)(9, "div", 8)(10, "div", 9);
      \u0275\u0275text(11, "Partidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 10);
      \u0275\u0275text(13, "Lista de los \xFAltimos 50");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "ul", 11);
      \u0275\u0275template(15, HomePageComponent_li_15_Template, 14, 21, "li", 12);
      \u0275\u0275pipe(16, "slice");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 13)(18, "div", 14);
      \u0275\u0275text(19, "Crear enfrentamiento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 15)(21, "div", 16)(22, "div", 17)(23, "label");
      \u0275\u0275text(24, "Equipo local");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "select", 18, 0)(27, "option", 19);
      \u0275\u0275text(28, "Locales");
      \u0275\u0275elementEnd();
      \u0275\u0275template(29, HomePageComponent_option_29_Template, 2, 2, "option", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 17)(31, "label");
      \u0275\u0275text(32, "Equipo visitante");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "select", 18, 1)(35, "option", 19);
      \u0275\u0275text(36, "Visitantes");
      \u0275\u0275elementEnd();
      \u0275\u0275template(37, HomePageComponent_option_37_Template, 2, 2, "option", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 21)(39, "label");
      \u0275\u0275text(40, "Duraci\xF3n del cuarto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "select", 22);
      \u0275\u0275twoWayListener("ngModelChange", function HomePageComponent_Template_select_ngModelChange_41_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.selectedQuarterMs, $event) || (ctx.selectedQuarterMs = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(42, "option", 19);
      \u0275\u0275text(43, "30 segundos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "option", 19);
      \u0275\u0275text(45, "5 minutos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "option", 19);
      \u0275\u0275text(47, "10 minutos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "option", 19);
      \u0275\u0275text(49, "12 minutos");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(50, "div", 23)(51, "button", 24);
      \u0275\u0275listener("click", function HomePageComponent_Template_button_click_51_listener() {
        \u0275\u0275restoreView(_r1);
        const homeSel_r5 = \u0275\u0275reference(26);
        const awaySel_r6 = \u0275\u0275reference(34);
        return \u0275\u0275resetView(ctx.createGame(+homeSel_r5.value, +awaySel_r6.value));
      });
      \u0275\u0275text(52);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 25);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(55, "div", 7)(56, "div", 26)(57, "div", 27);
      \u0275\u0275text(58, "Equipos existentes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "div", 28);
      \u0275\u0275text(60, "Los \xFAltimos creados");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "div", 29)(62, "ul", 30);
      \u0275\u0275template(63, HomePageComponent_li_63_Template, 5, 2, "li", 31);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(64, "div", 7)(65, "div", 26)(66, "div", 9);
      \u0275\u0275text(67, "Crear equipo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "div", 32)(69, "div", 33)(70, "label");
      \u0275\u0275text(71, "Nombre del equipo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "input", 34);
      \u0275\u0275twoWayListener("ngModelChange", function HomePageComponent_Template_input_ngModelChange_72_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.newTeamName, $event) || (ctx.newTeamName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "div", 35);
      \u0275\u0275text(74, " * Solo letras y espacios. ");
      \u0275\u0275template(75, HomePageComponent_span_75_Template, 2, 0, "span", 36);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(76, "div", 23)(77, "button", 24);
      \u0275\u0275listener("click", function HomePageComponent_Template_button_click_77_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.createTeam());
      });
      \u0275\u0275text(78);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(79, "div", 37);
      \u0275\u0275text(80, "* El nombre debe ser \xFAnico.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(81, "div", 38);
      \u0275\u0275element(82, "app-admin-team-roster");
      \u0275\u0275elementEnd();
      \u0275\u0275template(83, HomePageComponent_div_83_Template, 10, 4, "div", 39);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275property("ngForOf", \u0275\u0275pipeBind3(16, 19, ctx.games, 0, 50));
      \u0275\u0275advance(12);
      \u0275\u0275property("value", 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.teams);
      \u0275\u0275advance(6);
      \u0275\u0275property("value", 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.teams);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedQuarterMs);
      \u0275\u0275advance();
      \u0275\u0275property("value", 3e4);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", 3e5);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", 6e5);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", 72e4);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.creating);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.creating ? "Creando\u2026" : "Crear", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("* Duraci\xF3n seleccionada: ", ctx.getQuarterDurationText(), "");
      \u0275\u0275advance(9);
      \u0275\u0275property("ngForOf", ctx.teams);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.newTeamName);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.newTeamName.trim() && !ctx.isTeamNameValid(ctx.newTeamName));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.creating || !ctx.isTeamNameValid(ctx.newTeamName));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.creating ? "Creando\u2026" : "Crear equipo", " ");
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.detail);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    LowerCasePipe,
    SlicePipe,
    TitleCasePipe,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    RouterModule,
    RouterLink,
    ScoreboardComponent,
    ControlPanelComponent,
    TeamRosterComponent,
    AdminTeamRosterComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomePageComponent, { className: "HomePageComponent", filePath: "src\\app\\pages\\home-page.component.ts", lineNumber: 26 });
})();

// src/app/widgets/clock.component.ts
var _c03 = (a0, a1) => ({ "btn-success": a0, "btn-primary": a1 });
function ClockComponent_div_9_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, " BONUS");
    \u0275\u0275elementEnd();
  }
}
function ClockComponent_div_9_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, " BONUS");
    \u0275\u0275elementEnd();
  }
}
function ClockComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div");
    \u0275\u0275text(2, " HOME: ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ClockComponent_div_9_span_5_Template, 2, 0, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 8);
    \u0275\u0275text(7, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div");
    \u0275\u0275text(9, " AWAY: ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, ClockComponent_div_9_span_12_Template, 2, 0, "span", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.teamFoulsHome);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.bonusHome);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.teamFoulsAway);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.bonusAway);
  }
}
function ClockComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "button", 11);
    \u0275\u0275listener("click", function ClockComponent_div_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggle());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 12);
    \u0275\u0275listener("click", function ClockComponent_div_10_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.resetQuarter());
    });
    \u0275\u0275text(4, " Reiniciar cuarto ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(4, _c03, !(ctx_r0.vmSnap == null ? null : ctx_r0.vmSnap.running), ctx_r0.vmSnap == null ? null : ctx_r0.vmSnap.running))("disabled", ctx_r0.busy || !ctx_r0.gameId || ctx_r0.status === "FINISHED");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r0.vmSnap == null ? null : ctx_r0.vmSnap.running) ? "Pausar" : "Iniciar", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.busy || !ctx_r0.gameId);
  }
}
var MsToClockPipe2 = class _MsToClockPipe {
  transform(ms) {
    if (ms == null)
      return "--:--";
    const total = Math.max(0, Math.floor(ms / 1e3));
    const m = Math.floor(total / 60).toString().padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }
  static \u0275fac = function MsToClockPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MsToClockPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "msToClock", type: _MsToClockPipe, pure: true, standalone: true });
};
var ClockComponent = class _ClockComponent {
  clock;
  api;
  gameId;
  status;
  quarter;
  showTeamFouls = true;
  /** Mostrar/ocultar botones (en público: [controls]="false") */
  controls = true;
  /** Enable test mode with 30-second quarters */
  testMode = false;
  expired = new EventEmitter();
  vm$;
  vmSnap;
  teamFoulsHome = 0;
  teamFoulsAway = 0;
  bonusHome = false;
  bonusAway = false;
  prevRemaining = -1;
  // guarda estado previo para detectar llegada a 0
  prevRunning = false;
  busy = false;
  foulsSub;
  constructor(clock, api) {
    this.clock = clock;
    this.api = api;
  }
  ngOnChanges(ch) {
    if (!this.gameId)
      return;
    if (!this.vm$ || ch["gameId"] && !ch["gameId"].firstChange && ch["gameId"].previousValue !== ch["gameId"].currentValue) {
      this.prevRemaining = -1;
      this.prevRunning = false;
      this.vm$ = this.clock.state$(this.gameId).pipe(map((s) => {
        if (this.prevRunning && this.prevRemaining > 0 && s.remainingMs === 0)
          this.expired.emit();
        this.vmSnap = s;
        this.prevRunning = !!s.running;
        this.prevRemaining = s.remainingMs;
        return s;
      }));
    }
    if (ch["status"] && !ch["status"].firstChange && ch["status"].previousValue !== ch["status"].currentValue) {
      if (this.status === "IN_PROGRESS")
        this.clock.start(this.gameId);
      else
        this.clock.pause(this.gameId);
    }
    if (ch["quarter"] && !ch["quarter"].firstChange && ch["quarter"].previousValue !== ch["quarter"].currentValue) {
      const quarterMs = this.testMode ? 3e4 : void 0;
      this.clock.resetForNewQuarter(this.gameId, quarterMs);
      if (this.status === "IN_PROGRESS")
        this.clock.start(this.gameId);
    }
    if (ch["gameId"] || ch["status"] || ch["quarter"]) {
      this.startFoulsPolling();
    }
  }
  ngOnDestroy() {
    this.foulsSub?.unsubscribe();
  }
  toggle() {
    if (this.busy || !this.gameId || this.status === "FINISHED")
      return;
    this.busy = true;
    this.vmSnap?.running ? this.clock.pause(this.gameId) : this.clock.start(this.gameId);
    setTimeout(() => this.busy = false, 150);
  }
  resetQuarter() {
    if (this.busy || !this.gameId)
      return;
    this.busy = true;
    const quarterMs = this.testMode ? 3e4 : void 0;
    this.clock.resetForNewQuarter(this.gameId, quarterMs);
    setTimeout(() => this.busy = false, 150);
  }
  // +++ AÑADIR: inicia/renueva el polling de faltas
  startFoulsPolling() {
    this.foulsSub?.unsubscribe();
    if (!this.gameId)
      return;
    this.refreshFouls();
    if (this.status === "IN_PROGRESS") {
      this.foulsSub = interval(2e3).subscribe(() => this.refreshFouls());
    }
  }
  // +++ AÑADIR: consulta el summary y calcula conteos/bonus del cuarto actual
  refreshFouls() {
    if (!this.gameId)
      return;
    const curQ = this.quarter ?? 1;
    this.api.getFoulSummary(this.gameId).subscribe({
      next: (s) => {
        const sumOf = (team) => (s.team ?? []).filter((r) => r.team?.toString().toUpperCase() === team && r.quarter === curQ).reduce((a, r) => a + (r.fouls ?? 0), 0);
        this.teamFoulsHome = sumOf("HOME");
        this.teamFoulsAway = sumOf("AWAY");
        this.bonusHome = this.teamFoulsHome >= 5;
        this.bonusAway = this.teamFoulsAway >= 5;
      },
      error: () => {
        this.teamFoulsHome = 0;
        this.teamFoulsAway = 0;
        this.bonusHome = this.bonusAway = false;
      }
    });
  }
  static \u0275fac = function ClockComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClockComponent)(\u0275\u0275directiveInject(ClockService), \u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClockComponent, selectors: [["app-clock"]], inputs: { gameId: "gameId", status: "status", quarter: "quarter", showTeamFouls: "showTeamFouls", controls: "controls", testMode: "testMode" }, outputs: { expired: "expired" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 11, vars: 11, consts: [[1, "card", "p-3"], [1, "card-header", 2, "display", "block", "text-align", "center"], [1, "card-title", 2, "margin-bottom", "4px"], [1, "text-4xl", "font-bold", "text-center"], ["class", "text-sm", "style", "display:flex; align-items:center; justify-content:center; gap:12px; margin-top:8px;", 4, "ngIf"], ["class", "input-group", "style", "justify-content:center; margin-top:10px;", 4, "ngIf"], [1, "text-sm", 2, "display", "flex", "align-items", "center", "justify-content", "center", "gap", "12px", "margin-top", "8px"], ["class", "ml-2 px-2 py-0.5 bg-red-600 text-white rounded text-xs", 4, "ngIf"], [1, "opacity-40"], [1, "ml-2", "px-2", "py-0.5", "bg-red-600", "text-white", "rounded", "text-xs"], [1, "input-group", 2, "justify-content", "center", "margin-top", "10px"], [1, "btn", 3, "click", "ngClass", "disabled"], [1, "btn", "btn-ghost", 3, "click", "disabled"]], template: function ClockComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275text(3, "Cron\xF3metro (por cuarto)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275pipe(5, "async");
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "async");
      \u0275\u0275pipe(8, "msToClock");
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, ClockComponent_div_9_Template, 13, 4, "div", 4)(10, ClockComponent_div_10_Template, 5, 7, "div", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      \u0275\u0275advance(4);
      \u0275\u0275classProp("text-red-600", ((tmp_0_0 = \u0275\u0275pipeBind1(5, 5, ctx.vm$)) == null ? null : tmp_0_0.remainingMs) === 0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(8, 9, (tmp_1_0 = \u0275\u0275pipeBind1(7, 7, ctx.vm$)) == null ? null : tmp_1_0.remainingMs), " ");
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.showTeamFouls);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.controls);
    }
  }, dependencies: [CommonModule, NgClass, NgIf, AsyncPipe, MsToClockPipe2], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClockComponent, { className: "ClockComponent", filePath: "src\\app\\widgets\\clock.component.ts", lineNumber: 25 });
})();

// src/app/pages/display-page.component.ts
function DisplayPageComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-scoreboard", 3);
    \u0275\u0275elementStart(2, "div", 4);
    \u0275\u0275element(3, "app-clock", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r1 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("game", d_r1.game);
    \u0275\u0275advance(2);
    \u0275\u0275property("gameId", d_r1.game.gameId)("status", d_r1.game.status)("quarter", d_r1.game.quarter)("controls", false);
  }
}
var DisplayPageComponent = class _DisplayPageComponent {
  route;
  api;
  detail;
  gameId;
  sub;
  constructor(route, api) {
    this.route = route;
    this.api = api;
  }
  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get("id"));
    this.sub = interval(2e3).pipe(switchMap(() => this.api.getGame(this.gameId))).subscribe((d) => this.detail = d);
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  static \u0275fac = function DisplayPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DisplayPageComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DisplayPageComponent, selectors: [["app-display-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "min-h-screen", "grid", "place-items-center", "bg-black", "text-white"], ["class", "w-full max-w-4xl p-4", 4, "ngIf"], [1, "w-full", "max-w-4xl", "p-4"], [3, "game"], [1, "mt-4"], [3, "gameId", "status", "quarter", "controls"]], template: function DisplayPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, DisplayPageComponent_div_1_Template, 4, 5, "div", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.detail);
    }
  }, dependencies: [CommonModule, NgIf, ScoreboardComponent, ClockComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DisplayPageComponent, { className: "DisplayPageComponent", filePath: "src\\app\\pages\\display-page.component.ts", lineNumber: 16 });
})();

// src/app/pages/ui.pipes.ts
function toTeamKey(x) {
  const t = (x ?? "").toString().toUpperCase();
  return t === "HOME" ? "HOME" : t === "AWAY" ? "AWAY" : null;
}
var TeamFoulsPipe = class _TeamFoulsPipe {
  transform(teamAgg, team, quarter) {
    if (!teamAgg?.length)
      return 0;
    return teamAgg.filter((r) => toTeamKey(r.team) === team && (quarter ? r.quarter === quarter : true)).reduce((acc, r) => acc + (r.fouls ?? 0), 0);
  }
  static \u0275fac = function TeamFoulsPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TeamFoulsPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "teamFouls", type: _TeamFoulsPipe, pure: true, standalone: true });
};
var IsBonusPipe = class _IsBonusPipe {
  transform(teamAgg, team, quarter) {
    if (!teamAgg?.length)
      return false;
    const fouls = teamAgg.filter((r) => toTeamKey(r.team) === team && r.quarter === quarter).reduce((a, r) => a + (r.fouls ?? 0), 0);
    return fouls >= 5;
  }
  static \u0275fac = function IsBonusPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IsBonusPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "isBonus", type: _IsBonusPipe, pure: true, standalone: true });
};
var PlayerFoulsTotalPipe = class _PlayerFoulsTotalPipe {
  transform(playerAgg, team, playerId) {
    if (!playerAgg?.length)
      return 0;
    return playerAgg.filter((r) => toTeamKey(r.team) === team && r.playerId === playerId).reduce((a, r) => a + (r.fouls ?? 0), 0);
  }
  static \u0275fac = function PlayerFoulsTotalPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlayerFoulsTotalPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "playerFoulsTotal", type: _PlayerFoulsTotalPipe, pure: true, standalone: true });
};
var PlayerFoulsQPipe = class _PlayerFoulsQPipe {
  /**
   * Devuelve la cantidad de faltas de un jugador en un cuarto específico.
   */
  transform(playerAgg, team, playerId, quarter) {
    if (!playerAgg?.length)
      return 0;
    return playerAgg.filter((r) => toTeamKey(r.team) === team && r.playerId === playerId && r.quarter === quarter).reduce((a, r) => a + (r.fouls ?? 0), 0);
  }
  static \u0275fac = function PlayerFoulsQPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlayerFoulsQPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "playerFoulsQ", type: _PlayerFoulsQPipe, pure: true, standalone: true });
};

// src/app/pages/results-page.component.ts
var _c04 = (a0, a1, a2) => ({ "pill-finished": a0, "pill-inprogress": a1, "pill-scheduled": a2 });
function ResultsPageComponent_li_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 21)(1, "div")(2, "div", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 23);
    \u0275\u0275text(5);
    \u0275\u0275elementStart(6, "span", 24);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "lowercase");
    \u0275\u0275pipe(9, "titlecase");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "button", 25);
    \u0275\u0275listener("click", function ResultsPageComponent_li_33_Template_button_click_10_listener() {
      const g_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.view(g_r2));
    });
    \u0275\u0275text(11, "Ver");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const g_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", g_r2.homeTeam, " vs ", g_r2.awayTeam, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Q", g_r2.quarter, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(9, _c04, g_r2.status === "FINISHED", g_r2.status === "IN_PROGRESS", g_r2.status === "SCHEDULED"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 7, \u0275\u0275pipeBind1(8, 5, g_r2.status)));
  }
}
function ResultsPageComponent_div_34_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "BONUS");
    \u0275\u0275elementEnd();
  }
}
function ResultsPageComponent_div_34_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "BONUS");
    \u0275\u0275elementEnd();
  }
}
function ResultsPageComponent_div_34_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1, " Partido finalizado ");
    \u0275\u0275elementEnd();
  }
}
function ResultsPageComponent_div_34_li_37_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const e_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", e_r4.team, ")");
  }
}
function ResultsPageComponent_div_34_li_37_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const e_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" #", e_r4.playerNumber, "");
  }
}
function ResultsPageComponent_div_34_li_37_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const e_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (id: ", e_r4.playerId, ")");
  }
}
function ResultsPageComponent_div_34_li_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 46);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275template(3, ResultsPageComponent_div_34_li_37_ng_container_3_Template, 2, 1, "ng-container", 47)(4, ResultsPageComponent_div_34_li_37_ng_container_4_Template, 2, 1, "ng-container", 47)(5, ResultsPageComponent_div_34_li_37_ng_container_5_Template, 2, 1, "ng-container", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(2, 5, e_r4.createdAt, "short"), " \u2014 ", e_r4.eventType, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", e_r4.team);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r4.playerNumber != null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r4.playerId != null);
  }
}
function ResultsPageComponent_div_34_span_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "BONUS");
    \u0275\u0275elementEnd();
  }
}
function ResultsPageComponent_div_34_tr_62_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1, "OUT");
    \u0275\u0275elementEnd();
  }
}
function ResultsPageComponent_div_34_tr_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 48)(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 49);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "playerFoulsQ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 49);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "playerFoulsQ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 49);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "playerFoulsQ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 49);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "playerFoulsQ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 50);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "playerFoulsTotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275template(21, ResultsPageComponent_div_34_tr_62_span_21_Template, 2, 0, "span", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const p_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_4_0 = p_r5.number) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 8, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "HOME", p_r5.playerId, 1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(10, 13, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "HOME", p_r5.playerId, 2));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(13, 18, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "HOME", p_r5.playerId, 3));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(16, 23, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "HOME", p_r5.playerId, 4));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind3(19, 28, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "HOME", p_r5.playerId), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r2.outSet.has(p_r5.playerId));
  }
}
function ResultsPageComponent_div_34_span_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1, "BONUS");
    \u0275\u0275elementEnd();
  }
}
function ResultsPageComponent_div_34_tr_86_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1, "OUT");
    \u0275\u0275elementEnd();
  }
}
function ResultsPageComponent_div_34_tr_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 48)(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 49);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "playerFoulsQ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 49);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "playerFoulsQ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 49);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "playerFoulsQ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 49);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "playerFoulsQ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 50);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "playerFoulsTotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275template(21, ResultsPageComponent_div_34_tr_86_span_21_Template, 2, 0, "span", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const p_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_4_0 = p_r6.number) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(7, 8, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "AWAY", p_r6.playerId, 1));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(10, 13, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "AWAY", p_r6.playerId, 2));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(13, 18, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "AWAY", p_r6.playerId, 3));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(16, 23, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "AWAY", p_r6.playerId, 4));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind3(19, 28, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.players, "AWAY", p_r6.playerId), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r2.outSet.has(p_r6.playerId));
  }
}
function ResultsPageComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 26)(2, "div")(3, "div", 27);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementStart(7, "span", 24);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "lowercase");
    \u0275\u0275pipe(10, "titlecase");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 28)(12, "div");
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "teamFouls");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, ResultsPageComponent_div_34_span_17_Template, 2, 0, "span", 29);
    \u0275\u0275pipe(18, "isBonus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 30);
    \u0275\u0275text(20, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div");
    \u0275\u0275text(22);
    \u0275\u0275elementStart(23, "strong");
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "teamFouls");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, ResultsPageComponent_div_34_span_26_Template, 2, 0, "span", 29);
    \u0275\u0275pipe(27, "isBonus");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(28, ResultsPageComponent_div_34_div_28_Template, 2, 0, "div", 31);
    \u0275\u0275elementStart(29, "div", 32)(30, "div", 33)(31, "div", 15)(32, "div", 3);
    \u0275\u0275text(33, "Eventos recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 16);
    \u0275\u0275text(35, "Actividad del juego (cronol\xF3gico)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "ul", 34);
    \u0275\u0275template(37, ResultsPageComponent_div_34_li_37_Template, 6, 8, "li", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 36)(39, "div", 33)(40, "div", 26);
    \u0275\u0275template(41, ResultsPageComponent_div_34_span_41_Template, 2, 0, "span", 29);
    \u0275\u0275pipe(42, "isBonus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "table", 37)(44, "thead")(45, "tr", 38)(46, "th", 39);
    \u0275\u0275text(47, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "th");
    \u0275\u0275text(49, "Jugador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "th", 40);
    \u0275\u0275text(51, "Q1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "th", 40);
    \u0275\u0275text(53, "Q2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "th", 40);
    \u0275\u0275text(55, "Q3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "th", 40);
    \u0275\u0275text(57, "Q4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "th", 41);
    \u0275\u0275text(59, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275element(60, "th", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "tbody");
    \u0275\u0275template(62, ResultsPageComponent_div_34_tr_62_Template, 22, 32, "tr", 43);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "div", 1)(64, "div", 26);
    \u0275\u0275template(65, ResultsPageComponent_div_34_span_65_Template, 2, 0, "span", 29);
    \u0275\u0275pipe(66, "isBonus");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "table", 37)(68, "thead")(69, "tr", 38)(70, "th", 39);
    \u0275\u0275text(71, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "th");
    \u0275\u0275text(73, "Jugador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "th", 40);
    \u0275\u0275text(75, "Q1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "th", 40);
    \u0275\u0275text(77, "Q2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "th", 40);
    \u0275\u0275text(79, "Q3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "th", 40);
    \u0275\u0275text(81, "Q4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "th", 41);
    \u0275\u0275text(83, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275element(84, "th", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "tbody");
    \u0275\u0275template(86, ResultsPageComponent_div_34_tr_86_Template, 22, 32, "tr", 43);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const d_r7 = ctx.ngIf;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate4(" ", d_r7.game.homeTeam, " ", d_r7.game.homeScore, " - ", d_r7.game.awayScore, " ", d_r7.game.awayTeam, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Q", d_r7.game.quarter, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(47, _c04, d_r7.game.status === "FINISHED", d_r7.game.status === "IN_PROGRESS", d_r7.game.status === "SCHEDULED"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 21, \u0275\u0275pipeBind1(9, 19, d_r7.game.status)));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" HOME Q", d_r7.game.quarter, ": ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(16, 23, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.team, "HOME", d_r7.game.quarter));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind3(18, 27, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.team, "HOME", d_r7.game.quarter));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" AWAY Q", d_r7.game.quarter, ": ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(25, 31, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.team, "AWAY", d_r7.game.quarter));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind3(27, 35, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.team, "AWAY", d_r7.game.quarter));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", d_r7.game.status === "FINISHED");
    \u0275\u0275advance(9);
    \u0275\u0275property("ngForOf", d_r7.events);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind3(42, 39, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.team, "HOME", d_r7.game.quarter));
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r2.homeRoster);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind3(66, 43, ctx_r2.foulSummary == null ? null : ctx_r2.foulSummary.team, "AWAY", d_r7.game.quarter));
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r2.awayRoster);
  }
}
var ResultsPageComponent = class _ResultsPageComponent {
  api;
  route;
  // filtros
  q = "";
  statusFilter = "FINISHED";
  // datos
  games = [];
  filtered = [];
  selected = null;
  homeRoster = [];
  awayRoster = [];
  foulSummary = null;
  // jugadores fuera por 5 faltas o por descalificación
  outSet = /* @__PURE__ */ new Set();
  constructor(api, route) {
    this.api = api;
    this.route = route;
    this.reload();
    const idParam = this.route.snapshot.queryParamMap.get("id");
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isNaN(id)) {
      this.api.getGame(id).subscribe((d) => {
        this.selected = d;
        this.loadAuxFor(d.game.gameId);
      });
    }
  }
  // ===== Listado y filtros =====
  reload() {
    this.api.listGames().subscribe((g) => {
      this.games = g;
      this.applyFilters();
    });
  }
  applyFilters() {
    const q = this.q.trim().toLowerCase();
    this.filtered = this.games.filter((x) => {
      const okS = this.statusFilter === "ALL" || x.status === this.statusFilter;
      const txt = `${x.homeTeam} ${x.awayTeam}`.toLowerCase();
      const okQ = !q || txt.includes(q);
      return okS && okQ;
    });
  }
  // ===== Detalle =====
  view(game) {
    const gameId = typeof game === "number" ? game : game.gameId;
    forkJoin({
      detail: this.api.getGame(gameId),
      home: this.api.listGamePlayers(gameId, "HOME"),
      away: this.api.listGamePlayers(gameId, "AWAY"),
      summary: this.api.getFoulSummary(gameId)
    }).subscribe(({ detail, home, away, summary }) => {
      detail.events = [...detail.events].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      this.selected = detail;
      this.homeRoster = home;
      this.awayRoster = away;
      this.foulSummary = summary;
      this.computeOuts();
    });
  }
  /** Carga rosters + summary cuando ya tengo selected.game (se usa al entrar por ?id=...) */
  loadAuxFor(gameId) {
    forkJoin({
      home: this.api.listGamePlayers(gameId, "HOME"),
      away: this.api.listGamePlayers(gameId, "AWAY"),
      summary: this.api.getFoulSummary(gameId)
    }).subscribe(({ home, away, summary }) => {
      this.homeRoster = home;
      this.awayRoster = away;
      this.foulSummary = summary;
      this.computeOuts();
    });
  }
  /** Marca jugadores OUT por llegar a 5 faltas o por evento FOUL_OUT/DQ */
  computeOuts() {
    this.outSet.clear();
    if (!this.selected)
      return;
    for (const e of this.selected.events) {
      if ((e.eventType === "FOUL_OUT" || e.eventType === "DISQUALIFIED") && e.playerId != null) {
        this.outSet.add(e.playerId);
      }
    }
    const rows = this.foulSummary?.players ?? [];
    const countByPlayer = /* @__PURE__ */ new Map();
    for (const r of rows) {
      const prev = countByPlayer.get(r.playerId) ?? 0;
      countByPlayer.set(r.playerId, prev + (r.fouls ?? 0));
    }
    for (const [pid, total] of countByPlayer) {
      if (total >= 5)
        this.outSet.add(pid);
    }
  }
  static \u0275fac = function ResultsPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResultsPageComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResultsPageComponent, selectors: [["app-results-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 35, vars: 4, consts: [[1, "p-4", "max-w-5xl", "mx-auto", "grid", "gap-4"], [1, "card", "p-3", "my-md"], [1, "card-header", 2, "display", "block", "text-align", "center"], [1, "card-title"], [1, "card-subtitle", 2, "display", "block"], [1, "input-group", 2, "flex-wrap", "wrap", "justify-content", "center"], [1, "field", 2, "min-width", "220px"], [1, "select", 3, "ngModelChange", "change", "ngModel"], ["value", "FINISHED"], ["value", "ALL"], ["value", "IN_PROGRESS"], ["value", "SCHEDULED"], [1, "field", 2, "min-width", "260px"], ["placeholder", "nombre contiene\u2026", 1, "input", 3, "ngModelChange", "input", "ngModel"], [1, "grid", "gap-6", 2, "grid-template-columns", "1fr 1.6fr"], [1, "card-header"], [1, "card-subtitle"], [2, "max-height", "400px", "overflow", "auto", "border-radius", "8px"], [1, "list-clean", 2, "margin", "0"], ["style", "display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid rgba(255,255,255,0.06);", 4, "ngFor", "ngForOf"], ["class", "card p-3 my-md", 4, "ngIf"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "10px 12px", "border-bottom", "1px solid rgba(255,255,255,0.06)"], [1, "font-medium"], [1, "text-xs", "muted"], [1, "pill", 2, "margin-left", "6px", 3, "ngClass"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "card-header", 2, "display", "flex", "align-items", "center", "justify-content", "space-between"], [1, "card-title", 2, "margin-bottom", "4px"], [1, "text-sm", 2, "display", "flex", "align-items", "center", "gap", "10px"], ["class", "ml-2 px-2 py-0.5 bg-red-600 text-white rounded text-xs", 4, "ngIf"], [1, "opacity-40"], ["style", "\n        background: rgba(34,197,94,0.15);\n        border: 1px solid rgba(34,197,94,0.35);\n        color: #bbf7d0;\n        padding: 10px 12px;\n        border-radius: 8px;\n        margin: 10px 0;\n        font-weight: 600;", 4, "ngIf"], [1, "stack-md"], [1, "card", "p-3"], [1, "text-sm", 2, "max-height", "16rem", "overflow", "auto", "border-radius", "8px"], ["style", "padding:6px 12px; border-bottom:1px solid rgba(255,255,255,0.06);", 4, "ngFor", "ngForOf"], [1, "grid", "gap-4", "p-3", "my-md", 2, "grid-template-columns", "1fr 1fr"], [1, "w-full", "text-sm", 2, "border-collapse", "separate", "border-spacing", "0 6px"], [1, "text-left", 2, "background", "rgba(59,130,246,0.12)"], [2, "width", "3rem"], [2, "width", "3rem", "text-align", "center"], [2, "width", "3.5rem", "text-align", "center"], [2, "width", "3.5rem"], ["style", "background:rgba(255,255,255,0.03);", 4, "ngFor", "ngForOf"], [1, "ml-2", "px-2", "py-0.5", "bg-red-600", "text-white", "rounded", "text-xs"], [2, "background", "rgba(34,197,94,0.15)", "border", "1px solid rgba(34,197,94,0.35)", "color", "#bbf7d0", "padding", "10px 12px", "border-radius", "8px", "margin", "10px 0", "font-weight", "600"], [2, "padding", "6px 12px", "border-bottom", "1px solid rgba(255,255,255,0.06)"], [4, "ngIf"], [2, "background", "rgba(255,255,255,0.03)"], [2, "text-align", "center"], [2, "text-align", "center", "font-weight", "600"], ["class", "ml-2 px-2 py-0.5 bg-black text-white rounded", 4, "ngIf"], [1, "ml-2", "px-2", "py-0.5", "bg-black", "text-white", "rounded"]], template: function ResultsPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275text(4, "Resultados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4);
      \u0275\u0275text(6, "Filtra y consulta detalles de los partidos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "label");
      \u0275\u0275text(10, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "select", 7);
      \u0275\u0275twoWayListener("ngModelChange", function ResultsPageComponent_Template_select_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function ResultsPageComponent_Template_select_change_11_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(12, "option", 8);
      \u0275\u0275text(13, "Finalizados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "option", 9);
      \u0275\u0275text(15, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "option", 10);
      \u0275\u0275text(17, "En progreso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "option", 11);
      \u0275\u0275text(19, "Programados");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 12)(21, "label");
      \u0275\u0275text(22, "Buscar equipo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function ResultsPageComponent_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.q, $event) || (ctx.q = $event);
        return $event;
      });
      \u0275\u0275listener("input", function ResultsPageComponent_Template_input_input_23_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(24, "div", 14)(25, "div", 1)(26, "div", 15)(27, "div", 3);
      \u0275\u0275text(28, "Partidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 16);
      \u0275\u0275text(30, "Coinciden con el filtro");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 17)(32, "ul", 18);
      \u0275\u0275template(33, ResultsPageComponent_li_33_Template, 12, 13, "li", 19);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(34, ResultsPageComponent_div_34_Template, 87, 51, "div", 20);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.q);
      \u0275\u0275advance(10);
      \u0275\u0275property("ngForOf", ctx.filtered);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selected);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    RouterModule,
    TeamFoulsPipe,
    PlayerFoulsTotalPipe,
    IsBonusPipe,
    PlayerFoulsQPipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResultsPageComponent, { className: "ResultsPageComponent", filePath: "src\\app\\pages\\results-page.component.ts", lineNumber: 25 });
})();

// src/app/auth/login/login.component.ts
var _c05 = (a0) => ({ "is-invalid": a0 });
function LoginComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, " El usuario es requerido ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, " La contrase\xF1a es requerida ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
function LoginComponent_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 17);
  }
}
var LoginComponent = class _LoginComponent {
  formBuilder;
  router;
  route;
  authService;
  loginForm;
  loading = false;
  error = "";
  constructor(formBuilder, router, route, authService) {
    this.formBuilder = formBuilder;
    this.router = router;
    this.route = route;
    this.authService = authService;
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.redirectUser();
    } else {
      if (this.router.url.includes("?")) {
        this.router.navigate([], {
          queryParams: {},
          replaceUrl: true
        });
      }
    }
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.error = "";
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).pipe(finalize(() => this.loading = false)).subscribe({
      next: () => {
        this.router.navigate(["/"], { replaceUrl: true });
      },
      error: (error) => {
        this.error = error.message || "Error al iniciar sesi\xF3n. Por favor, intente nuevamente.";
      }
    });
  }
  redirectUser() {
    const returnUrl = localStorage.getItem("returnUrl");
    localStorage.removeItem("returnUrl");
    const user = this.authService.currentUserValue;
    if (returnUrl && !returnUrl.includes("/login")) {
      this.router.navigateByUrl(returnUrl, { replaceUrl: true });
    } else if (user) {
      const redirectUrl = user.role === "Admin" ? "/admin" : "/";
      this.router.navigate([redirectUrl], { replaceUrl: true });
    } else {
      this.router.navigate(["/"], { replaceUrl: true });
    }
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 25, vars: 13, consts: [[1, "login-container"], [1, "card"], [1, "card-header"], [1, "card-body"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "username"], ["type", "text", "id", "username", "formControlName", "username", "placeholder", "Ingrese su usuario", 1, "form-control", 3, "ngClass"], ["class", "invalid-feedback", 4, "ngIf"], ["for", "password"], ["type", "password", "id", "password", "formControlName", "password", "placeholder", "Ingrese su contrase\xF1a", 1, "form-control", 3, "ngClass"], ["class", "alert alert-danger", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], ["class", "spinner-border spinner-border-sm", "role", "status", "aria-hidden", "true", 4, "ngIf"], [1, "card-footer", "text-center"], [1, "invalid-feedback"], [1, "alert", "alert-danger"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2");
      \u0275\u0275text(4, "Iniciar Sesi\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_6_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(7, "div", 5)(8, "label", 6);
      \u0275\u0275text(9, "Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "input", 7);
      \u0275\u0275template(11, LoginComponent_div_11_Template, 2, 0, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 5)(13, "label", 9);
      \u0275\u0275text(14, "Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "input", 10);
      \u0275\u0275template(16, LoginComponent_div_16_Template, 2, 0, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, LoginComponent_div_17_Template, 2, 1, "div", 11);
      \u0275\u0275elementStart(18, "div", 5)(19, "button", 12);
      \u0275\u0275template(20, LoginComponent_span_20_Template, 1, 0, "span", 13);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(22, "div", 14)(23, "small");
      \u0275\u0275text(24, "Sistema de Marcador de Baloncesto");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      \u0275\u0275advance(6);
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(9, _c05, ((tmp_1_0 = ctx.loginForm.get("username")) == null ? null : tmp_1_0.errors) && ((tmp_1_0 = ctx.loginForm.get("username")) == null ? null : tmp_1_0.touched)));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.loginForm.get("username")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]) && ((tmp_2_0 = ctx.loginForm.get("username")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(11, _c05, ((tmp_3_0 = ctx.loginForm.get("password")) == null ? null : tmp_3_0.errors) && ((tmp_3_0 = ctx.loginForm.get("password")) == null ? null : tmp_3_0.touched)));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.loginForm.get("password")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["required"]) && ((tmp_4_0 = ctx.loginForm.get("password")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "Iniciando sesi\xF3n..." : "Iniciar Sesi\xF3n", " ");
    }
  }, dependencies: [CommonModule, NgClass, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.login-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background-color: #f5f5f5;\n  padding: 20px;\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  border: none;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #1976d2;\n  color: white;\n  padding: 20px;\n  text-align: center;\n}\n.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.5rem;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 30px;\n  background-color: white;\n}\n.card-footer[_ngcontent-%COMP%] {\n  padding: 15px 20px;\n  background-color: #f8f9fa;\n  border-top: 1px solid #eee;\n  text-align: center;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 15px;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 4px;\n  transition:\n    color 0.15s ease-in-out,\n    background-color 0.15s ease-in-out,\n    border-color 0.15s ease-in-out,\n    box-shadow 0.15s ease-in-out;\n  cursor: pointer;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #1976d2;\n  border-color: #1976d2;\n  width: 100%;\n  padding: 10px;\n  font-size: 1.1rem;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #1565c0;\n  border-color: #1565c0;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  background-color: #90caf9;\n  border-color: #90caf9;\n  cursor: not-allowed;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875em;\n  color: #dc3545;\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545 !important;\n}\n.alert[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  font-size: 0.9rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 1rem;\n  height: 1rem;\n  vertical-align: text-bottom;\n  border: 0.2em solid currentColor;\n  border-right-color: transparent;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spinner-border 0.75s linear infinite;\n  margin-right: 0.5rem;\n}\n@keyframes _ngcontent-%COMP%_spinner-border {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=login.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\auth\\login\\login.component.ts", lineNumber: 15 });
})();

// src/app/core/guards/auth.guard.ts
var authGuard = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.currentUser.pipe(map((user) => {
    if (user) {
      const requiredRole = route.data?.["role"];
      if (requiredRole && user.role !== requiredRole) {
        return router.createUrlTree(["/unauthorized"]);
      }
      return true;
    }
    return router.createUrlTree(["/login"], {
      queryParams: { returnUrl: state.url }
    });
  }));
};

// src/app/core/pages/unauthorized/unauthorized.component.ts
var UnauthorizedComponent = class _UnauthorizedComponent {
  static \u0275fac = function UnauthorizedComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnauthorizedComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnauthorizedComponent, selectors: [["app-unauthorized"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 21, vars: 0, consts: [[1, "container", "mt-5", "text-center"], [1, "row", "justify-content-center"], [1, "col-md-8"], [1, "card"], [1, "card-header", "bg-danger", "text-white"], [1, "card-body"], ["role", "alert", 1, "alert", "alert-warning"], [1, "alert-heading"], [1, "mb-0"], ["routerLink", "/login", 1, "alert-link"], ["routerLink", "/", 1, "btn", "btn-primary"]], template: function UnauthorizedComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h1");
      \u0275\u0275text(6, "Acceso No Autorizado");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "h4", 7);
      \u0275\u0275text(10, "\xA1Lo sentimos!");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p");
      \u0275\u0275text(12, "No tienes los permisos necesarios para acceder a esta p\xE1gina.");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "hr");
      \u0275\u0275elementStart(14, "p", 8);
      \u0275\u0275text(15, " Por favor, contacta al administrador si crees que esto es un error o ");
      \u0275\u0275elementStart(16, "a", 9);
      \u0275\u0275text(17, "inicia sesi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275text(18, " con una cuenta diferente. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "button", 10);
      \u0275\u0275text(20, " Volver al Inicio ");
      \u0275\u0275elementEnd()()()()()();
    }
  }, dependencies: [CommonModule, RouterLink], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  border: none;\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n/*# sourceMappingURL=unauthorized.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnauthorizedComponent, { className: "UnauthorizedComponent", filePath: "src\\app\\core\\pages\\unauthorized\\unauthorized.component.ts", lineNumber: 46 });
})();

// src/app/app.routes.ts
var routes = [
  // Public routes
  {
    path: "login",
    component: LoginComponent,
    title: "Iniciar Sesi\xF3n | Marcador de Baloncesto"
  },
  {
    path: "unauthorized",
    component: UnauthorizedComponent,
    title: "No Autorizado | Marcador de Baloncesto"
  },
  // Public display route (no authentication required)
  {
    path: "display/:id",
    component: DisplayPageComponent,
    title: "Marcador en Vivo | Marcador de Baloncesto"
  },
  // Protected routes (require authentication)
  {
    path: "",
    component: HomePageComponent,
    canActivate: [authGuard],
    title: "Inicio | Marcador de Baloncesto"
  },
  {
    path: "admin",
    canActivate: [authGuard],
    data: { role: "Admin" },
    loadChildren: () => import("./chunk-753JAANK.mjs").then((m) => m.ADMIN_ROUTES)
  },
  {
    path: "results",
    component: ResultsPageComponent,
    canActivate: [authGuard],
    title: "Resultados | Marcador de Baloncesto"
  },
  // Fallback route - Redirect to home
  {
    path: "**",
    redirectTo: ""
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    // Router configuration
    provideRouter(routes, withComponentInputBinding(), withViewTransitions({
      skipInitialTransition: true,
      onViewTransitionCreated(transitionInfo) {
        console.log("View transition started:", transitionInfo);
      }
    })),
    // HTTP client configuration
    provideHttpClient(withInterceptors([authInterceptor]), withJsonpSupport()),
    // HTTP interceptors
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    // Client hydration for SSR
    provideClientHydration(withNoHttpTransferCache()),
    // Browser animations
    provideAnimations(),
    // Form modules
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    // Environment-specific providers
    ...environment.production ? [
      // Production-specific providers go here
    ] : [
      // Development-specific providers go here
    ]
  ]
};

// src/app/app.config.server.ts
var serverConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: StorageService,
      useFactory: () => ({
        getItem: () => null,
        setItem: () => {
        },
        removeItem: () => {
        },
        clear: () => {
        }
      })
    },
    { provide: SERVER_CONTEXT, useValue: "ssr" },
    { provide: PLATFORM_ID, useValue: "server" }
  ]
};
var config = mergeApplicationConfig(appConfig, serverConfig);

// src/main.server.ts
var bootstrap = () => bootstrapApplication(AppComponent, config);
var main_server_default = bootstrap;

export {
  main_server_default
};
/*! Bundled license information:

@angular/forms/fesm2022/forms.mjs:
  (**
   * @license Angular v18.2.13
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-VASLJVA2.mjs.map
