import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Si el usuario ya está autenticado, redirigir a la página principal
    if (this.authService.isAuthenticated()) {
      this.redirectUser();
    } else {
      // Limpiar la URL de parámetros
      if (this.router.url.includes('?')) {
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
    this.error = '';

    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => {
          // Redirigir a la página principal sin parámetros en la URL
          this.router.navigate(['/'], { replaceUrl: true });
        },
        error: (error) => {
          this.error = error.message || 'Error al iniciar sesión. Por favor, intente nuevamente.';
        }
      });
  }

  private redirectUser(): void {
    // Obtener la URL de retorno del localStorage si existe
    const returnUrl = localStorage.getItem('returnUrl');
    localStorage.removeItem('returnUrl'); // Limpiar después de usarlo
    
    // Redirigir según el rol del usuario o a la URL guardada
    const user = this.authService.currentUserValue;
    if (returnUrl && !returnUrl.includes('/login')) {
      this.router.navigateByUrl(returnUrl, { replaceUrl: true });
    } else if (user) {
      const redirectUrl = user.role === 'Admin' ? '/admin' : '/';
      this.router.navigate([redirectUrl], { replaceUrl: true });
    } else {
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }
}
