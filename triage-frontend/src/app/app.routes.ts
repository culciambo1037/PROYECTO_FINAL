import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.Login)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/layout/layout').then(m => m.Layout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'solicitudes',
        loadComponent: () =>
          import('./solicitudes/lista-solicitudes/lista-solicitudes').then(m => m.ListaSolicitudes)
      },
      {
        path: 'solicitudes/nueva',
        loadComponent: () =>
          import('./solicitudes/crear-solicitud/crear-solicitud').then(m => m.CrearSolicitud)
      },
      {
        path: 'solicitudes/:id',
        loadComponent: () =>
          import('./solicitudes/detalle-solicitud/detalle-solicitud').then(m => m.DetalleSolicitud)
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./usuarios/lista-usuarios/lista-usuarios').then(m => m.ListaUsuarios)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];