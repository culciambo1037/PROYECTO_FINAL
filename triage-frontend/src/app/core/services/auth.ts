import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, request).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('nombre', response.nombre);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRol(): string {
    return localStorage.getItem('rol') || '';
  }

  getNombre(): string {
    return localStorage.getItem('nombre') || '';
  }

  isAdmin(): boolean {
    return this.getRol() === 'ADMIN';
  }

  isResponsable(): boolean {
    return this.getRol() === 'RESPONSABLE';
  }

  isEstudiante(): boolean {
    return this.getRol() === 'ESTUDIANTE';
  }
}