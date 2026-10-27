import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaApi, Especie } from '../models/modelos';

/**
 * Servicio EspecieService: conecta el frontend con el endpoint /especies del backend.
 * Tiene las operaciones CRUD: listar, crear, actualizar y eliminar.
 */
@Injectable({ providedIn: 'root' })
export class EspecieService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/especies`;

  /** GET /especies: consulta todos los registros */
  listar(): Observable<RespuestaApi<Especie[]>> {
    return this.http.get<RespuestaApi<Especie[]>>(this.url);
  }

  /** POST /especies: crea un registro nuevo */
  crear(datos: Especie): Observable<RespuestaApi<Especie>> {
    return this.http.post<RespuestaApi<Especie>>(this.url, datos);
  }

  /** PUT /especies/{id}: actualiza un registro */
  actualizar(id: number, datos: Partial<Especie>): Observable<RespuestaApi<Especie>> {
    return this.http.put<RespuestaApi<Especie>>(`${this.url}/${id}`, datos);
  }

  /** DELETE /especies/{id}: elimina un registro */
  eliminar(id: number): Observable<RespuestaApi<null>> {
    return this.http.delete<RespuestaApi<null>>(`${this.url}/${id}`);
  }

}
