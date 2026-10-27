import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/** Página de inicio de sesión */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  mensajeError = signal('');
  cargando = signal(false);

  // Formulario reactivo con validaciones
  formulario = inject(FormBuilder).nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(8)]],
  });

  ingresar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.cargando.set(true);
    const { correo, contrasena } = this.formulario.getRawValue();
    this.auth.login(correo, contrasena).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => {
        this.mensajeError.set(e.error?.mensaje ?? 'No se pudo conectar con el servidor');
        this.cargando.set(false);
      },
    });
  }
}
