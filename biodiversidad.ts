import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EspecieService } from '../../services/especie.service';
import { RegistroService } from '../../services/registro.service';
import { AuthService } from '../../services/auth.service';
import { Especie, IndiceBiodiversidad, MUNICIPIOS, RegistroEspecie } from '../../models/modelos';

/** Módulo Biodiversidad: catálogo de especies, registros y su índice por municipio */
@Component({
  selector: 'app-biodiversidad',
  imports: [FormsModule],
  templateUrl: './biodiversidad.html',
})
export class Biodiversidad implements OnInit {
  private especiesServicio = inject(EspecieService);
  private registrosServicio = inject(RegistroService);
  private auth = inject(AuthService);
  municipios = MUNICIPIOS;
  especies = signal<Especie[]>([]);
  registros = signal<RegistroEspecie[]>([]);
  indice = signal<IndiceBiodiversidad | null>(null);
  municipioIndice = 1;
  mensaje = signal('');
  error = signal('');
  nuevoRegistro: RegistroEspecie = this.registroVacio();
  nuevaEspecie: Especie = { nombre_comun: '', nombre_cientifico: '', grupo: 'aves' };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.especiesServicio.listar().subscribe((r) => this.especies.set(r.datos));
    this.registrosServicio.listar().subscribe((r) => this.registros.set(r.datos));
    this.registrosServicio.indice(this.municipioIndice).subscribe((r) => this.indice.set(r.datos));
  }

  /** Guarda un registro de especie; la API rechaza cantidades menores o iguales a 0 */
  registrar(): void {
    this.registrosServicio.crear({ ...this.nuevoRegistro, id_usuario: this.auth.usuarioActual()!.id_usuario }).subscribe({
      next: (r) => this.exito(r.mensaje),
      error: (e) => this.mostrarError(e.error?.errores?.cantidad ?? e.error?.mensaje ?? 'Error al registrar'),
    });
  }

  validar(r: RegistroEspecie): void {
    this.registrosServicio.validar(r.id_registro!).subscribe((res) => this.exito(res.mensaje));
  }

  eliminarRegistro(r: RegistroEspecie): void {
    this.registrosServicio.eliminar(r.id_registro!).subscribe((res) => this.exito(res.mensaje));
  }

  crearEspecie(): void {
    this.especiesServicio.crear(this.nuevaEspecie).subscribe({
      next: (r) => {
        this.nuevaEspecie = { nombre_comun: '', nombre_cientifico: '', grupo: 'aves' };
        this.exito(r.mensaje);
      },
      error: (e) => this.mostrarError(e.error?.mensaje ?? 'Error al crear la especie'),
    });
  }

  eliminarEspecie(e: Especie): void {
    this.especiesServicio.eliminar(e.id_especie!).subscribe({
      next: (r) => this.exito(r.mensaje),
      error: (err) => this.mostrarError(err.error?.mensaje ?? 'No se pudo eliminar'),
    });
  }

  private exito(texto: string): void {
    this.mensaje.set(texto);
    this.error.set('');
    this.nuevoRegistro = this.registroVacio();
    this.cargar();
  }

  private registroVacio(): RegistroEspecie {
    return { fecha: new Date().toISOString().slice(0, 10), cantidad: 1, id_especie: 1, id_municipio: 1, id_usuario: 0 };
  }

  /** Muestra un mensaje de error y oculta el de éxito */
  private mostrarError(texto: string): void {
    this.mensaje.set('');
    this.error.set(texto);
  }
}
