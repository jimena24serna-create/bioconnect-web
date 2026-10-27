import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaApi, Usuario } from '../models/modelos';

/**
 * Servicio de autenticación.
 * Se comunica con /auth/login y /auth/registro del backend y guarda el usuario que inició sesión.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/auth`;

  /** Usuario actual (señal reactiva): null cuando no hay sesión */
  usuarioActual = signal<Usuario | null>(this.leerSesion());

  /** Inicia sesión con correo y contraseña */
  login(correo: string, contrasena: string): Observable<RespuestaApi<{ usuario: Usuario; token: string }>> {
    return this.http
      .post<RespuestaApi<{ usuario: Usuario; token: string }>>(`${this.url}/login`, { correo, contrasena })
      .pipe(
        tap((respuesta) => {
          sessionStorage.setItem('usuario', JSON.stringify(respuesta.datos.usuario));
          sessionStorage.setItem('token', respuesta.datos.token);
          this.usuarioActual.set(respuesta.datos.usuario);
        }),
      );
  }

  /** Registra un usuario nuevo */
  registrar(datos: object): Observable<RespuestaApi<Usuario>> {
    return this.http.post<RespuestaApi<Usuario>>(`${this.url}/registro`, datos);
  }

  /** Cierra la sesión */
  cerrarSesion(): void {
    sessionStorage.clear();
    this.usuarioActual.set(null);
  }

  /** Indica si hay un usuario con sesión iniciada */
  estaAutenticado(): boolean {
    return this.usuarioActual() !== null;
  }

  private leerSesion(): Usuario | null {
    const guardado = sessionStorage.getItem('usuario');
    return guardado ? (JSON.parse(guardado) as Usuario) : null;
  }
}
