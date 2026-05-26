import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Solicitud, SolicitudRequest, ClasificarRequest,
  AsignarRequest, CerrarRequest, PageSolicitud, Historial
} from '../models/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) {}

  crear(request: SolicitudRequest): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, request);
  }

  listar(filtros: any = {}): Observable<PageSolicitud> {
    let params = new HttpParams();
    if (filtros.estado)       params = params.set('estado', filtros.estado);
    if (filtros.tipo)         params = params.set('tipo', filtros.tipo);
    if (filtros.prioridad)    params = params.set('prioridad', filtros.prioridad);
    if (filtros.page != null) params = params.set('page', String(filtros.page));
    if (filtros.size != null) params = params.set('size', String(filtros.size));
    return this.http.get<PageSolicitud>(`${environment.apiUrl}/solicitudes`, { params });
  }

  obtener(id: string): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
  }

  clasificar(id: string, request: ClasificarRequest): Observable<Solicitud> {
    return this.http.patch<Solicitud>(`${this.apiUrl}/${id}/clasificar`, request);
  }

  asignar(id: string, request: AsignarRequest): Observable<Solicitud> {
    return this.http.patch<Solicitud>(`${this.apiUrl}/${id}/asignar`, request);
  }

  cambiarEstado(id: string, nuevoEstado: string, observaciones: string): Observable<Solicitud> {
    return this.http.patch<Solicitud>(`${this.apiUrl}/${id}/estado`, {
      nuevoEstado, observaciones
    });
  }

  cerrar(id: string, request: CerrarRequest): Observable<Solicitud> {
    return this.http.patch<Solicitud>(`${this.apiUrl}/${id}/cerrar`, request);
  }

  obtenerHistorial(id: string): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.apiUrl}/${id}/historial`);
  }
}