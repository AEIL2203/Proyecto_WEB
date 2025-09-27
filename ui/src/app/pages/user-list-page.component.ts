import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

interface User {
  userId: number;
  userName: string;
  email?: string;
  role: string;
  active: boolean;
  createdAt: string;
}

@Component({
  standalone: true,
  selector: 'app-user-list-page',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="user-list-container">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-info">
            <h1>👥 Gestión de Usuarios</h1>
            <p>Administra todos los usuarios del sistema</p>
          </div>
          <div class="header-actions">
            <button (click)="goToRegister()" class="btn-primary">
              ➕ Nuevo Usuario
            </button>
            <button (click)="goBack()" class="btn-secondary">
              ← Volver al Dashboard
            </button>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="filters-section">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            (input)="filterUsers()"
            placeholder="🔍 Buscar por nombre o email..."
            class="search-input"
          />
        </div>
        <div class="filter-buttons">
          <button 
            (click)="filterByRole('all')" 
            [class.active]="roleFilter === 'all'"
            class="filter-btn"
          >
            Todos ({{ users.length }})
          </button>
          <button 
            (click)="filterByRole('Admin')" 
            [class.active]="roleFilter === 'Admin'"
            class="filter-btn admin"
          >
            👑 Admins ({{ getCountByRole('Admin') }})
          </button>
          <button 
            (click)="filterByRole('User')" 
            [class.active]="roleFilter === 'User'"
            class="filter-btn user"
          >
            👤 Usuarios ({{ getCountByRole('User') }})
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando usuarios...</p>
      </div>

      <!-- Error -->
      <div *ngIf="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
        <button (click)="loadUsers()" class="btn-retry">Reintentar</button>
      </div>

      <!-- Lista de usuarios -->
      <div *ngIf="!loading && !error" class="users-grid">
        <div *ngFor="let user of filteredUsers" class="user-card">
          <div class="user-avatar">
            <div class="avatar-circle" [class.admin-avatar]="user.role === 'Admin'">
              {{ user.userName.charAt(0).toUpperCase() }}
            </div>
            <div class="user-status" [class.active]="user.active" [class.inactive]="!user.active">
              {{ user.active ? '🟢' : '🔴' }}
            </div>
          </div>
          
          <div class="user-info">
            <div class="user-name">{{ user.userName }}</div>
            <div class="user-email" *ngIf="user.email">{{ user.email }}</div>
            <div class="user-role" [class.admin-role]="user.role === 'Admin'">
              {{ user.role === 'Admin' ? '👑 Administrador' : '👤 Usuario' }}
            </div>
            <div class="user-date">
              Creado: {{ formatDate(user.createdAt) }}
            </div>
          </div>

          <div class="user-actions">
            <button 
              (click)="toggleUserStatus(user)" 
              [class.btn-activate]="!user.active"
              [class.btn-deactivate]="user.active"
              class="action-btn"
              [disabled]="user.userId === getCurrentUserId()"
            >
              {{ user.active ? '🚫 Desactivar' : '✅ Activar' }}
            </button>
            <button 
              (click)="editUser(user)" 
              class="action-btn btn-edit"
            >
              ✏️ Editar
            </button>
          </div>
        </div>

        <!-- Empty state -->
        <div *ngIf="filteredUsers.length === 0" class="empty-state">
          <div class="empty-icon">👥</div>
          <h3>No se encontraron usuarios</h3>
          <p *ngIf="searchTerm || roleFilter !== 'all'">
            Intenta ajustar los filtros de búsqueda
          </p>
          <p *ngIf="!searchTerm && roleFilter === 'all'">
            Aún no hay usuarios registrados en el sistema
          </p>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div *ngIf="showEditModal" class="modal-overlay" (click)="closeEditModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>✏️ Editar Usuario</h3>
          <button class="modal-close" (click)="closeEditModal()">✕</button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>Nombre de usuario</label>
            <input 
              type="text" 
              [(ngModel)]="editForm.userName" 
              class="form-input"
              placeholder="Nombre de usuario"
            />
          </div>
          
          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              [(ngModel)]="editForm.email" 
              class="form-input"
              placeholder="Ingresa un email (opcional)"
              [value]="editForm.email"
            />
          </div>
          
          <div class="form-group">
            <label>Rol</label>
            <select [(ngModel)]="editForm.role" class="form-select">
              <option value="User">👤 Usuario</option>
              <option value="Admin">👑 Administrador</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                [(ngModel)]="editForm.active"
                class="form-checkbox"
              />
              <span class="checkbox-text">Usuario activo</span>
            </label>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn-cancel" (click)="closeEditModal()" [disabled]="saving">
            Cancelar
          </button>
          <button class="btn-save" (click)="saveUser()" [disabled]="saving">
            {{ saving ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .user-list-container {
      min-height: 100vh;
      background: var(--bg);
      padding: 20px 0;
    }

    .page-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 0;
      margin-bottom: 30px;
      border-radius: 15px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .header-info h1 {
      margin: 0 0 8px 0;
      font-size: 2rem;
      font-weight: 600;
    }

    .header-info p {
      margin: 0;
      opacity: 0.9;
      font-size: 1.1rem;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .btn-primary, .btn-secondary {
      padding: 12px 24px;
      border: none;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .btn-primary:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: rgba(0, 0, 0, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .btn-secondary:hover {
      background: rgba(0, 0, 0, 0.3);
      transform: translateY(-2px);
    }

    .filters-section {
      background: var(--card);
      padding: 20px;
      border-radius: 15px;
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .search-box {
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      padding: 15px 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 25px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--text);
      font-size: 16px;
      outline: none;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .filter-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 10px 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      background: transparent;
      color: var(--text);
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .filter-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .filter-btn.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }

    .filter-btn.admin.active {
      background: #FFD700;
      color: #000;
      border-color: #FFD700;
    }

    .filter-btn.user.active {
      background: #28a745;
      color: white;
      border-color: #28a745;
    }

    .loading-state, .error-state {
      text-align: center;
      padding: 60px 20px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-left: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-state .error-icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    .btn-retry {
      padding: 10px 20px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      margin-top: 15px;
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
    }

    .user-card {
      background: var(--card);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 20px;
      transition: all 0.3s ease;
    }

    .user-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .user-avatar {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }

    .avatar-circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #667eea;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.2rem;
    }

    .avatar-circle.admin-avatar {
      background: linear-gradient(135deg, #FFD700, #FFA500);
      color: #000;
    }

    .user-status {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 1.2rem;
    }

    .user-info {
      flex: 1;
      margin-bottom: 15px;
    }

    .user-name {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 5px;
    }

    .user-email {
      color: var(--muted);
      font-size: 0.9rem;
      margin-bottom: 8px;
    }

    .user-role {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 0.85rem;
      font-weight: 500;
      background: rgba(40, 167, 69, 0.2);
      color: #28a745;
      margin-bottom: 8px;
    }

    .user-role.admin-role {
      background: rgba(255, 215, 0, 0.2);
      color: #FFD700;
    }

    .user-date {
      font-size: 0.8rem;
      color: var(--muted);
    }

    .user-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .action-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 15px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-activate {
      background: rgba(40, 167, 69, 0.2);
      color: #28a745;
      border: 1px solid rgba(40, 167, 69, 0.3);
    }

    .btn-deactivate {
      background: rgba(220, 53, 69, 0.2);
      color: #dc3545;
      border: 1px solid rgba(220, 53, 69, 0.3);
    }

    .btn-edit {
      background: rgba(102, 126, 234, 0.2);
      color: #667eea;
      border: 1px solid rgba(102, 126, 234, 0.3);
    }

    .action-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      opacity: 0.8;
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px 20px;
      color: var(--muted);
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }

    .empty-state h3 {
      margin: 0 0 10px 0;
      color: var(--text);
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        text-align: center;
      }

      .users-grid {
        grid-template-columns: 1fr;
      }

      .filter-buttons {
        justify-content: center;
      }
    }

    /* Modal styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .modal-content {
      background: #1e2139;
      border-radius: 15px;
      border: 1px solid #3a3f5c;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 25px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-header h3 {
      margin: 0;
      color: var(--text);
      font-size: 1.3rem;
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--muted);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 5px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .modal-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text);
    }

    .modal-body {
      padding: 25px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: var(--text);
      font-weight: 500;
    }

    .form-input, .form-select {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #4a5568;
      border-radius: 8px;
      background: #2d3748;
      color: #ffffff;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 0 !important;
    }

    .form-checkbox {
      width: auto !important;
      margin-right: 10px;
      transform: scale(1.2);
    }

    .checkbox-text {
      color: var(--text);
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 20px 25px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .btn-cancel, .btn-save {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-cancel {
      background: rgba(255, 255, 255, 0.1);
      color: var(--muted);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .btn-cancel:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.2);
      color: var(--text);
    }

    .btn-save {
      background: #667eea;
      color: white;
    }

    .btn-save:hover:not(:disabled) {
      background: #5a6fd8;
      transform: translateY(-1px);
    }

    .btn-cancel:disabled, .btn-save:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class UserListPageComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  roleFilter: 'all' | 'Admin' | 'User' = 'all';
  
  // Modal de edición
  showEditModal = false;
  editingUser: User | null = null;
  editForm = {
    userName: '',
    email: '',
    role: 'User',
    active: true
  };
  saving = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';
    
    this.api.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filterUsers();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  filterUsers() {
    let filtered = [...this.users];

    // Filtrar por término de búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.userName.toLowerCase().includes(term) ||
        (user.email && user.email.toLowerCase().includes(term))
      );
    }

    // Filtrar por rol
    if (this.roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === this.roleFilter);
    }

    this.filteredUsers = filtered;
  }

  filterByRole(role: 'all' | 'Admin' | 'User') {
    this.roleFilter = role;
    this.filterUsers();
  }

  getCountByRole(role: string): number {
    return this.users.filter(user => user.role === role).length;
  }

  getCurrentUserId(): number {
    // Esto debería venir del AuthService cuando tengamos el ID del usuario actual
    return 0; // Por ahora retornamos 0 para evitar errores
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  toggleUserStatus(user: User) {
    if (user.userId === this.getCurrentUserId()) {
      return; // No permitir que el usuario se desactive a sí mismo
    }

    const newStatus = !user.active;
    this.api.updateUser(user.userId, { active: newStatus }).subscribe({
      next: (updatedUser) => {
        // Actualizar el usuario en la lista
        const index = this.users.findIndex(u => u.userId === user.userId);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], active: newStatus };
          this.filterUsers();
        }
        console.log(`Usuario ${user.userName} ${newStatus ? 'activado' : 'desactivado'}`);
      },
      error: (err) => {
        console.error('Error al cambiar estado del usuario:', err);
      }
    });
  }

  editUser(user: User) {
    this.editingUser = user;
    this.editForm = {
      userName: user.userName || '',
      email: user.email || '',
      role: user.role || 'User',
      active: user.active !== false
    };
    this.showEditModal = true;
    console.log('Editando usuario:', user);
    console.log('Formulario inicializado:', this.editForm);
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingUser = null;
    this.saving = false;
  }

  saveUser() {
    if (!this.editingUser) return;

    this.saving = true;
    const payload: any = {};
    
    // Solo enviar campos que han cambiado
    if (this.editForm.userName !== this.editingUser.userName) {
      payload.userName = this.editForm.userName;
    }
    if (this.editForm.email !== (this.editingUser.email || '')) {
      payload.email = this.editForm.email || null;
    }
    if (this.editForm.role !== this.editingUser.role) {
      payload.role = this.editForm.role;
    }
    if (this.editForm.active !== this.editingUser.active) {
      payload.active = this.editForm.active;
    }

    if (Object.keys(payload).length === 0) {
      this.closeEditModal();
      return;
    }

    this.api.updateUser(this.editingUser.userId, payload).subscribe({
      next: (updatedUser) => {
        // Actualizar el usuario en la lista
        const index = this.users.findIndex(u => u.userId === this.editingUser!.userId);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...updatedUser };
          this.filterUsers();
        }
        this.closeEditModal();
        console.log('Usuario actualizado exitosamente');
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        this.saving = false;
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/admin/register-user']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
