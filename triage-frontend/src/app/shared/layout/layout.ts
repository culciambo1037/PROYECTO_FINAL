import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {

  nombre = '';
  rol = '';
  menuItems: any[] = [];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nombre = this.authService.getNombre();
    this.rol = this.authService.getRol();
    this.configurarMenu();
  }

  configurarMenu(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        ruta: '/dashboard',
        visible: true
      },
      {
        label: 'Solicitudes',
        icon: 'list_alt',
        ruta: '/solicitudes',
        visible: !this.authService.isEstudiante()
      },
      {
        label: 'Nueva Solicitud',
        icon: 'add_circle',
        ruta: '/solicitudes/nueva',
        visible: true
      },
      {
        label: 'Usuarios',
        icon: 'people',
        ruta: '/usuarios',
        visible: this.authService.isAdmin()
      }
    ];
  }

  navegar(ruta: string): void {
    this.router.navigate([ruta]);
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}