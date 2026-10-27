import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IndiceBiodiversidad, RespuestaApi, RegistroEspecie } from '../models/modelos';

/**
 * Servicio RegistroService: conecta el frontend con el endpoint /registros del backend.
 * Tiene las operaciones CRUD: listar, crear, actualizar y eliminar.
 */
@Injectable({ providedIn: 'root' })
export class RegistroService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/registros`;

  /** GET /registros: consulta todos los registros */
  listar(): Observable<RespuestaApi<RegistroEspecie[]>> {
    return this.http.get<RespuestaApi<RegistroEspecie[]>>(this.url);
  }

  /** POST /registros: crea un registro nuevo */
  crear(datos: RegistroEspecie): Observable<RespuestaApi<RegistroEspecie>> {
    return this.http.post<RespuestaApi<RegistroEspecie>>(this.url, datos);
  }

  /** PUT /registros/{id}: actualiza un registro */
  actualizar(id: number, datos: Partial<RegistroEspecie>): Observable<RespuestaApi<RegistroEspecie>> {
    return this.http.put<RespuestaApi<RegistroEspecie>>(`${this.url}/${id}`, datos);
  }

  /** DELETE /registros/{id}: elimina un registro */
  eliminar(id: number): Observable<RespuestaApi<null>> {
    return this.http.delete<RespuestaApi<null>>(`${this.url}/${id}`);
  }

  /** PUT /registros/{id}/validar: el administrador valida un registro */
  validar(id: number): Observable<RespuestaApi<RegistroEspecie>> {
    return this.http.put<RespuestaApi<RegistroEspecie>>(`${this.url}/${id}/validar`, {});
  }

  /** GET /biodiversidad/{idMunicipio}: índice de biodiversidad del municipio */
  indice(idMunicipio: number): Observable<RespuestaApi<IndiceBiodiversidad>> {
    return this.http.get<RespuestaApi<IndiceBiodiversidad>>(`${environment.apiUrl}/biodiversidad/${idMunicipio}`);
  }
}
