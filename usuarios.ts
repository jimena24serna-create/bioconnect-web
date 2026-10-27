import { Component, inject, OnInit, signal } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/modelos';

/** Listado de usuarios registrados en la plataforma */
@Component({
  selector: 'app-usuarios',
  template: `
    <h2>👤 Usuarios</h2>
    <section class="tarjeta">
      <table>
        <tr><th>Nombre</th><th>Correo</th><th>Profesión</th><th>Rol</th><th>Municipio</th></tr>
        @for (u of usuarios(); track u.id_usuario) {
          <tr><td>{{ u.nombre }}</td><td>{{ u.correo }}</td><td>{{ u.profesion }}</td><td><span class="etiqueta">{{ u.rol }}</span></td><td>{{ u.municipio }}</td></tr>
        }
      </table>
    </section>
  `,
})
export class Usuarios implements OnInit {
  private servicio = inject(UsuarioService);
  usuarios = signal<Usuario[]>([]);

  ngOnInit(): void {
    this.servicio.listar().subscribe((r) => this.usuarios.set(r.datos));
  }
}
