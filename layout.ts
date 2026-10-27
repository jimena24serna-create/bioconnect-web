import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/** Estructura de las páginas internas: menú lateral, encabezado y contenido */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  auth = inject(AuthService);
  private router = inject(Router);

  menu = [
    { ruta: '/dashboard', icono: '📊', texto: 'Dashboard' },
    { ruta: '/red-social', icono: '💬', texto: 'Red social' },
    { ruta: '/empleo', icono: '💼', texto: 'Empleo' },
    { ruta: '/biodiversidad', icono: '🦜', texto: 'Biodiversidad' },
    { ruta: '/usuarios', icono: '👤', texto: 'Usuarios' },
  ];

  /** Iniciales del usuario para el avatar */
  iniciales(): string {
    return (this.auth.usuarioActual()?.nombre ?? '?').split(' ').map((p) => p[0]).slice(0, 2).join('');
  }

  salir(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
