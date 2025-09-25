import {
  AuthService,
  CommonModule,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-XODQXHJ5.js";

// src/app/admin/components/admin-dashboard/admin-dashboard.component.ts
var AdminDashboardComponent = class _AdminDashboardComponent {
  authService;
  constructor(authService) {
    this.authService = authService;
  }
  ngOnInit() {
    if (!this.authService.hasRole("Admin")) {
    }
  }
  static \u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardComponent)(\u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 125, vars: 0, consts: [[1, "container-fluid"], [1, "row"], ["id", "sidebar", 1, "col-md-3", "col-lg-2", "d-md-block", "bg-dark", "sidebar", "collapse"], [1, "position-sticky", "pt-3"], [1, "nav", "flex-column"], [1, "nav-item"], ["routerLink", "/admin", "routerLinkActive", "active", 1, "nav-link", "active", "text-white"], [1, "bi", "bi-speedometer2", "me-2"], ["routerLink", "users", "routerLinkActive", "active", 1, "nav-link", "text-white"], [1, "bi", "bi-people", "me-2"], ["routerLink", "teams", "routerLinkActive", "active", 1, "nav-link", "text-white"], [1, "bi", "bi-people-fill", "me-2"], ["routerLink", "games", "routerLinkActive", "active", 1, "nav-link", "text-white"], [1, "bi", "bi-calendar3", "me-2"], [1, "nav-item", "mt-4"], ["routerLink", "/", "routerLinkActive", "active", 1, "nav-link", "text-white"], [1, "bi", "bi-arrow-left-circle", "me-2"], [1, "col-md-9", "ms-sm-auto", "col-lg-10", "px-md-4"], [1, "d-flex", "justify-content-between", "flex-wrap", "flex-md-nowrap", "align-items-center", "pt-3", "pb-2", "mb-3", "border-bottom"], [1, "h2"], [1, "btn-toolbar", "mb-2", "mb-md-0"], [1, "btn-group", "me-2"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary"], [1, "bi", "bi-download", "me-1"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", "dropdown-toggle"], [1, "bi", "bi-calendar3", "me-1"], [1, "col-md-4", "mb-4"], [1, "card", "text-white", "bg-primary"], [1, "card-body"], [1, "card-title"], [1, "card-text"], [1, "card", "text-white", "bg-success"], [1, "card", "text-white", "bg-warning"], [1, "card"], [1, "card-header"], [1, "mb-0"], [1, "table-responsive"], [1, "table", "table-striped", "table-sm"], [1, "badge", "bg-success"], [1, "badge", "bg-danger"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "nav", 2)(3, "div", 3)(4, "ul", 4)(5, "li", 5)(6, "a", 6);
      \u0275\u0275element(7, "i", 7);
      \u0275\u0275text(8, " Dashboard ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "li", 5)(10, "a", 8);
      \u0275\u0275element(11, "i", 9);
      \u0275\u0275text(12, " Usuarios ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "li", 5)(14, "a", 10);
      \u0275\u0275element(15, "i", 11);
      \u0275\u0275text(16, " Equipos ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "li", 5)(18, "a", 12);
      \u0275\u0275element(19, "i", 13);
      \u0275\u0275text(20, " Partidos ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "li", 14)(22, "a", 15);
      \u0275\u0275element(23, "i", 16);
      \u0275\u0275text(24, " Volver a la Aplicaci\xF3n ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(25, "main", 17)(26, "div", 18)(27, "h1", 19);
      \u0275\u0275text(28, "Panel de Administraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 20)(30, "div", 21)(31, "button", 22);
      \u0275\u0275element(32, "i", 23);
      \u0275\u0275text(33, " Exportar ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "button", 24);
      \u0275\u0275element(35, "i", 25);
      \u0275\u0275text(36, " Esta semana ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "div", 1)(38, "div", 26)(39, "div", 27)(40, "div", 28)(41, "h5", 29);
      \u0275\u0275text(42, "Usuarios Registrados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "h2", 30);
      \u0275\u0275text(44, "1,234");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "p", 30)(46, "small");
      \u0275\u0275text(47, "+15% desde el mes pasado");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(48, "div", 26)(49, "div", 31)(50, "div", 28)(51, "h5", 29);
      \u0275\u0275text(52, "Partidos Activos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "h2", 30);
      \u0275\u0275text(54, "12");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "p", 30)(56, "small");
      \u0275\u0275text(57, "+2 desde ayer");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(58, "div", 26)(59, "div", 32)(60, "div", 28)(61, "h5", 29);
      \u0275\u0275text(62, "Equipos Registrados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "h2", 30);
      \u0275\u0275text(64, "48");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "p", 30)(66, "small");
      \u0275\u0275text(67, "+3 este mes");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(68, "div", 33)(69, "div", 34)(70, "h5", 35);
      \u0275\u0275text(71, "Actividad Reciente");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(72, "div", 28)(73, "div", 36)(74, "table", 37)(75, "thead")(76, "tr")(77, "th");
      \u0275\u0275text(78, "#");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "th");
      \u0275\u0275text(80, "Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "th");
      \u0275\u0275text(82, "Acci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "th");
      \u0275\u0275text(84, "Fecha");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "th");
      \u0275\u0275text(86, "Estado");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(87, "tbody")(88, "tr")(89, "td");
      \u0275\u0275text(90, "1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "td");
      \u0275\u0275text(92, "usuario@ejemplo.com");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "td");
      \u0275\u0275text(94, "Inici\xF3 sesi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "td");
      \u0275\u0275text(96, "Hace 2 minutos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "td")(98, "span", 38);
      \u0275\u0275text(99, "Completado");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(100, "tr")(101, "td");
      \u0275\u0275text(102, "2");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "td");
      \u0275\u0275text(104, "admin@ejemplo.com");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "td");
      \u0275\u0275text(106, "Actualiz\xF3 configuraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(107, "td");
      \u0275\u0275text(108, "Hace 15 minutos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(109, "td")(110, "span", 38);
      \u0275\u0275text(111, "Completado");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(112, "tr")(113, "td");
      \u0275\u0275text(114, "3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(115, "td");
      \u0275\u0275text(116, "usuario2@ejemplo.com");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(117, "td");
      \u0275\u0275text(118, "Registro fallido");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(119, "td");
      \u0275\u0275text(120, "Hace 1 hora");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "td")(122, "span", 39);
      \u0275\u0275text(123, "Fallido");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275element(124, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [CommonModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive], styles: ["\n\n.sidebar[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 100;\n  padding: 48px 0 0;\n  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);\n}\n.sidebar[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #adb5bd;\n}\n.sidebar[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.sidebar[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: rgba(255, 255, 255, 0.2);\n}\n.sidebar[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 4px;\n  color: #6c757d;\n}\n.sidebar[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #fff;\n}\nmain[_ngcontent-%COMP%] {\n  padding-top: 1rem;\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src\\app\\admin\\components\\admin-dashboard\\admin-dashboard.component.ts", lineNumber: 190 });
})();

// src/app/admin/admin.routes.ts
var ADMIN_ROUTES = [
  {
    path: "",
    component: AdminDashboardComponent,
    title: "Panel de Administraci\xF3n | Marcador de Baloncesto",
    children: [
      // Aquí puedes agregar rutas hijas del panel de administración
      // Por ejemplo: gestión de usuarios, equipos, partidos, etc.
      // { path: 'users', component: UsersComponent, title: 'Usuarios' },
      // { path: 'teams', component: TeamsComponent, title: 'Equipos' },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "**", redirectTo: "dashboard" }
    ]
  }
];
export {
  ADMIN_ROUTES
};
//# sourceMappingURL=chunk-SS7YWZSP.js.map
