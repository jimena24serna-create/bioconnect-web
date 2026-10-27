import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaApi, Postulacion } from '../models/modelos';

/**
 * Servicio PostulacionService: conecta el frontend con el endpoint /postulaciones del backend.
 * Tiene las operaciones CRUD: listar, crear, actualizar y eliminar.
 */
@Injectable({ providedIn: 'root' })
export class PostulacionService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/postulaciones`;

  /** GET /postulaciones: consulta todos los registros */
  listar(): Observable<RespuestaApi<Postulacion[]>> {
    return this.http.get<RespuestaApi<Postulacion[]>>(this.url);
  }

  /** POST /postulaciones: crea un registro nuevo */
  crear(datos: Postulacion): Observable<RespuestaApi<Postulacion>> {
    return this.http.post<RespuestaApi<Postulacion>>(this.url, datos);
  }

  /** PUT /postulaciones/{id}: actualiza un registro */
  actualizar(id: number, datos: Partial<Postulacion>): Observable<RespuestaApi<Postulacion>> {
    return this.http.put<RespuestaApi<Postulacion>>(`${this.url}/${id}`, datos);
  }

  /** DELETE /postulaciones/{id}: elimina un registro */
  eliminar(id: number): Observable<RespuestaApi<null>> {
    return this.http.delete<RespuestaApi<null>>(`${this.url}/${id}`);
  }

}
