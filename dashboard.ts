import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { PublicacionService } from '../../services/publicacion.service';
import { OfertaService } from '../../services/oferta.service';
import { RegistroService } from '../../services/registro.service';
import { IndiceBiodiversidad, Publicacion } from '../../models/modelos';

/** Página principal: indicadores generales de la plataforma */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  auth = inject(AuthService);
  private usuarios = inject(UsuarioService);
  private publicaciones = inject(PublicacionService);
  private ofertas = inject(OfertaService);
  private registros = inject(RegistroService);

  totales = signal({ usuarios: 0, publicaciones: 0, ofertas: 0, registros: 0 });
  recientes = signal<Publicacion[]>([]);
  indice = signal<IndiceBiodiversidad | null>(null);

  ngOnInit(): void {
    // Se consultan varios servicios al mismo tiempo con forkJoin
    forkJoin({
      usuarios: this.usuarios.listar(),
      publicaciones: this.publicaciones.listar(),
      ofertas: this.ofertas.listar(),
      registros: this.registros.listar(),
      indice: this.registros.indice(this.auth.usuarioActual()?.id_municipio ?? 1),
    }).subscribe((r) => {
      this.totales.set({
        usuarios: r.usuarios.datos.length,
        publicaciones: r.publicaciones.datos.length,
        ofertas: r.ofertas.datos.length,
        registros: r.registros.datos.length,
      });
      this.recientes.set(r.publicaciones.datos.slice(0, 3));
      this.indice.set(r.indice.datos);
    });
  }
}
