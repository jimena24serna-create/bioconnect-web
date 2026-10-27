import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaApi, Usuario } from '../models/modelos';

/** Servicio de usuarios: consulta el listado desde GET /usuarios */
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);

  listar(): Observable<RespuestaApi<Usuario[]>> {
    return this.http.get<RespuestaApi<Usuario[]>>(`${environment.apiUrl}/usuarios`);
  }
}
