import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.Login)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'solicitudes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./solicitudes/lista-solicitudes/lista-solicitudes').then(m => m.ListaSolicitudes)
  },
  {
    path: 'solicitudes/nueva',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./solicitudes/crear-solicitud/crear-solicitud').then(m => m.CrearSolicitud)
  },
  {
    path: 'solicitudes/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./solicitudes/detalle-solicitud/detalle-solicitud').then(m => m.DetalleSolicitud)
  },
  {
    path: 'usuarios',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./usuarios/lista-usuarios/lista-usuarios').then(m => m.ListaUsuarios)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];