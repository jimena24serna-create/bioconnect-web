import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaApi, Oferta } from '../models/modelos';

/**
 * Servicio OfertaService: conecta el frontend con el endpoint /ofertas del backend.
 * Tiene las operaciones CRUD: listar, crear, actualizar y eliminar.
 */
@Injectable({ providedIn: 'root' })
export class OfertaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/ofertas`;

  /** GET /ofertas: consulta todos los registros */
  listar(): Observable<RespuestaApi<Oferta[]>> {
    return this.http.get<RespuestaApi<Oferta[]>>(this.url);
  }

  /** POST /ofertas: crea un registro nuevo */
  crear(datos: Oferta): Observable<RespuestaApi<Oferta>> {
    return this.http.post<RespuestaApi<Oferta>>(this.url, datos);
  }

  /** PUT /ofertas/{id}: actualiza un registro */
  actualizar(id: number, datos: Partial<Oferta>): Observable<RespuestaApi<Oferta>> {
    return this.http.put<RespuestaApi<Oferta>>(`${this.url}/${id}`, datos);
  }

  /** DELETE /ofertas/{id}: elimina un registro */
  eliminar(id: number): Observable<RespuestaApi<null>> {
    return this.http.delete<RespuestaApi<null>>(`${this.url}/${id}`);
  }

  /** GET /ofertas?municipio={id}: consulta las ofertas de un municipio */
  listarPorMunicipio(idMunicipio: number): Observable<RespuestaApi<Oferta[]>> {
    return this.http.get<RespuestaApi<Oferta[]>>(this.url, { params: { municipio: idMunicipio } });
  }
}
