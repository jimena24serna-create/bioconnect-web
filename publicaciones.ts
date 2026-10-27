import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { AuthService } from '../../services/auth.service';
import { Publicacion } from '../../models/modelos';

/** Módulo Red social: crear, consultar, editar y eliminar publicaciones */
@Component({
  selector: 'app-publicaciones',
  imports: [FormsModule],
  templateUrl: './publicaciones.html',
})
export class Publicaciones implements OnInit {
  private servicio = inject(PublicacionService);
  private auth = inject(AuthService);
  lista = signal<Publicacion[]>([]);
  mensaje = signal('');
  error = signal('');
  editandoId: number | null = null;
  nueva: Publicacion = this.vacia();

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.servicio.listar().subscribe((r) => this.lista.set(r.datos));
  }

  /** Crea una publicación nueva o guarda los cambios de la que se está editando */
  guardar(formulario: NgForm): void {
    const peticion = this.editandoId
      ? this.servicio.actualizar(this.editandoId, this.nueva)
      : this.servicio.crear({ ...this.nueva, id_usuario: this.auth.usuarioActual()!.id_usuario });
    peticion.subscribe({
      next: (r) => {
        this.mensaje.set(r.mensaje);
        this.error.set('');
        this.cancelar(formulario);
        this.cargar();
      },
      error: (e) => this.mostrarError(e.error?.mensaje ?? 'Error al guardar'),
    });
  }

  editar(p: Publicacion): void {
    this.editandoId = p.id_publicacion!;
    this.nueva = { ...p };
  }

  eliminar(p: Publicacion): void {
    if (confirm(`¿Eliminar "${p.titulo}"?`)) {
      this.servicio.eliminar(p.id_publicacion!).subscribe((r) => {
        this.mensaje.set(r.mensaje);
        this.cargar();
      });
    }
  }

  cancelar(formulario?: NgForm): void {
    this.editandoId = null;
    this.nueva = this.vacia();
    formulario?.resetForm(this.nueva);
  }

  private vacia(): Publicacion {
    return { titulo: '', contenido: '', tipo: 'publicacion', id_usuario: 0 };
  }

  /** Muestra un mensaje de error y oculta el de éxito */
  private mostrarError(texto: string): void {
    this.mensaje.set('');
    this.error.set(texto);
  }
}
