import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth';
import { SolicitudService } from '../../core/services/solicitud';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  nombre = '';
  rol = '';
  stats = {
    total: 0,
    registradas: 0,
    enAtencion: 0,
    cerradas: 0
  };

  menuItems: any[] = [];

  constructor(
    public authService: AuthService,
    private solicitudService: SolicitudService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.nombre = this.authService.getNombre();
    this.rol = this.authService.getRol();
    this.cargarStats();
    this.configurarMenu();
  }

  configurarMenu(): void {
    this.menuItems = [
      { label: 'Dashboard', icon: 'dashboard', ruta: '/dashboard', visible: true },
      { label: 'Solicitudes', icon: 'list_alt', ruta: '/solicitudes',
        visible: !this.authService.isEstudiante() },
      { label: 'Nueva Solicitud', icon: 'add_circle', ruta: '/solicitudes/nueva',
        visible: this.authService.isEstudiante() },
      { label: 'Usuarios', icon: 'people', ruta: '/usuarios',
        visible: this.authService.isAdmin() }
    ];
  }

  cargarStats(): void {
    if (this.authService.isEstudiante()) return;

    this.solicitudService.listar({ size: 1 }).subscribe(page => {
      this.stats.total = page.totalElements;
      this.cdr.detectChanges();
    });
    this.solicitudService.listar({ estado: 'REGISTRADA', size: 1 }).subscribe(page => {
      this.stats.registradas = page.totalElements;
      this.cdr.detectChanges();
    });
    this.solicitudService.listar({ estado: 'EN_ATENCION', size: 1 }).subscribe(page => {
      this.stats.enAtencion = page.totalElements;
      this.cdr.detectChanges();
    });
    this.solicitudService.listar({ estado: 'CERRADA', size: 1 }).subscribe(page => {
      this.stats.cerradas = page.totalElements;
      this.cdr.detectChanges();
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
  }

  navegar(ruta: string): void {
    this.router.navigate([ruta]);
  }
}