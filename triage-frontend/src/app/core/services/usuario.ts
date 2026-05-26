import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, UsuarioRequest } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  crear(request: UsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, request);
  }

  listarResponsables(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/responsables`);
  }

  listarEstudiantes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/estudiantes`);
  }

  cambiarEstado(id: string, activo: boolean): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/estado`, { activo });
  }

  listarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}