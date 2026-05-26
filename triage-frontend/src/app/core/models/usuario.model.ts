export interface LoginRequest {
  correo: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  rol: string;
  nombre: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  identificacion: string;
  rol: string;
  activo: boolean;
}

export interface UsuarioRequest {
  nombre: string;
  apellido: string;
  correo: string;
  identificacion: string;
  rol: string;
}