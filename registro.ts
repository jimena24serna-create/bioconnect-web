import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MUNICIPIOS } from '../../models/modelos';

/** Página para crear una cuenta nueva */
@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: '../login/login.css',
})
export class Registro {
  private auth = inject(AuthService);
  private router = inject(Router);
  municipios = MUNICIPIOS;
  mensajeError = signal('');
  mensajeExito = signal('');

  formulario = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(8)]],
    profesion: [''],
    id_rol: [2, Validators.required],
    id_municipio: [1, Validators.required],
  });

  registrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.auth.registrar(this.formulario.getRawValue()).subscribe({
      next: (r) => {
        this.mensajeExito.set(r.mensaje + '. Ya puedes iniciar sesión.');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (e) => this.mensajeError.set(e.error?.mensaje ?? 'No se pudo registrar'),
    });
  }
}
