import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaApi, Publicacion } from '../models/modelos';

/**
 * Servicio PublicacionService: conecta el frontend con el endpoint /publicaciones del backend.
 * Tiene las operaciones CRUD: listar, crear, actualizar y eliminar.
 */
@Injectable({ providedIn: 'root' })
export class PublicacionService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/publicaciones`;

  /** GET /publicaciones: consulta todos los registros */
  listar(): Observable<RespuestaApi<Publicacion[]>> {
    return this.http.get<RespuestaApi<Publicacion[]>>(this.url);
  }

  /** POST /publicaciones: crea un registro nuevo */
  crear(datos: Publicacion): Observable<RespuestaApi<Publicacion>> {
    return this.http.post<RespuestaApi<Publicacion>>(this.url, datos);
  }

  /** PUT /publicaciones/{id}: actualiza un registro */
  actualizar(id: number, datos: Partial<Publicacion>): Observable<RespuestaApi<Publicacion>> {
    return this.http.put<RespuestaApi<Publicacion>>(`${this.url}/${id}`, datos);
  }

  /** DELETE /publicaciones/{id}: elimina un registro */
  eliminar(id: number): Observable<RespuestaApi<null>> {
    return this.http.delete<RespuestaApi<null>>(`${this.url}/${id}`);
  }

}
