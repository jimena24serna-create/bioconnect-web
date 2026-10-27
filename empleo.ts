import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OfertaService } from '../../services/oferta.service';
import { PostulacionService } from '../../services/postulacion.service';
import { AuthService } from '../../services/auth.service';
import { MUNICIPIOS, Oferta, Postulacion } from '../../models/modelos';

/** Módulo Empleo: ofertas de trabajo y postulaciones */
@Component({
  selector: 'app-empleo',
  imports: [FormsModule],
  templateUrl: './empleo.html',
})
export class Empleo implements OnInit {
  private ofertasServicio = inject(OfertaService);
  private postulacionesServicio = inject(PostulacionService);
  auth = inject(AuthService);
  municipios = MUNICIPIOS;
  ofertas = signal<Oferta[]>([]);
  postulaciones = signal<Postulacion[]>([]);
  filtroMunicipio = 0;
  mensaje = signal('');
  error = signal('');
  nueva: Oferta = this.vacia();

  ngOnInit(): void {
    this.cargarOfertas();
    this.cargarPostulaciones();
  }

  /** Consulta las ofertas; si hay un municipio escogido, usa el filtro de la API */
  cargarOfertas(): void {
    const peticion = this.filtroMunicipio
      ? this.ofertasServicio.listarPorMunicipio(this.filtroMunicipio)
      : this.ofertasServicio.listar();
    peticion.subscribe((r) => this.ofertas.set(r.datos));
  }

  cargarPostulaciones(): void {
    this.postulacionesServicio.listar().subscribe((r) => this.postulaciones.set(r.datos));
  }

  crearOferta(formulario: NgForm): void {
    this.ofertasServicio.crear({ ...this.nueva, id_empleador: this.auth.usuarioActual()!.id_usuario }).subscribe({
      next: (r) => {
        this.exito(r.mensaje);
        formulario.resetForm(this.nueva);
      },
      error: (e) => this.mostrarError(e.error?.mensaje ?? 'Error al crear la oferta'),
    });
  }

  eliminarOferta(o: Oferta): void {
    if (confirm(`¿Eliminar la oferta "${o.titulo}"?`)) {
      this.ofertasServicio.eliminar(o.id_oferta!).subscribe({
        next: (r) => this.exito(r.mensaje),
        error: (e) => this.mostrarError(e.error?.mensaje ?? 'No se pudo eliminar'),
      });
    }
  }

  /** El usuario actual se postula a una oferta (la API evita postulaciones repetidas) */
  postularme(o: Oferta): void {
    this.postulacionesServicio.crear({ id_oferta: o.id_oferta!, id_usuario: this.auth.usuarioActual()!.id_usuario }).subscribe({
      next: (r) => this.exito(r.mensaje),
      error: (e) => this.mostrarError(e.error?.mensaje ?? 'No se pudo postular'),
    });
  }

  cambiarEstado(p: Postulacion, estado: string): void {
    this.postulacionesServicio.actualizar(p.id_postulacion!, { estado: estado as Postulacion['estado'] }).subscribe((r) => this.exito(r.mensaje));
  }

  eliminarPostulacion(p: Postulacion): void {
    this.postulacionesServicio.eliminar(p.id_postulacion!).subscribe((r) => this.exito(r.mensaje));
  }

  private exito(texto: string): void {
    this.mensaje.set(texto);
    this.error.set('');
    this.nueva = this.vacia();
    this.cargarOfertas();
    this.cargarPostulaciones();
  }

  private vacia(): Oferta {
    const hoy = new Date().toISOString().slice(0, 10);
    return { titulo: '', descripcion: '', salario: 0, fecha: hoy, fecha_cierre: hoy, id_empleador: 0, id_municipio: 1 };
  }

  /** Muestra un mensaje de error y oculta el de éxito */
  private mostrarError(texto: string): void {
    this.mensaje.set('');
    this.error.set(texto);
  }
}
