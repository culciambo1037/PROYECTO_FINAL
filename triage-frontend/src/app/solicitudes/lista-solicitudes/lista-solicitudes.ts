import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SolicitudService } from '../../core/services/solicitud';
import { AuthService } from '../../core/services/auth';
import { Solicitud } from '../../core/models/solicitud.model';

@Component({
  selector: 'app-lista-solicitudes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './lista-solicitudes.html',
  styleUrl: './lista-solicitudes.scss'
})
export class ListaSolicitudes implements OnInit {

  solicitudes: Solicitud[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  cargando = false;

  filtroEstado = '';
  filtroTipo = '';
  filtroPrioridad = '';

  columnas = ['estado', 'tipo', 'prioridad', 'solicitante', 'fecha', 'acciones'];

  estados = ['REGISTRADA', 'CLASIFICADA', 'EN_ATENCION', 'ATENDIDA', 'CERRADA'];
  tipos = ['REGISTRO_ASIGNATURAS', 'HOMOLOGACION', 'CANCELACION_ASIGNATURA',
           'SOLICITUD_CUPOS', 'CONSULTA_ACADEMICA', 'OTRO'];
  prioridades = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];

  constructor(
    private solicitudService: SolicitudService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.solicitudService.listar({ page: this.pageIndex, size: this.pageSize,
      estado: this.filtroEstado || null,
      tipo: this.filtroTipo || null,
      prioridad: this.filtroPrioridad || null
    }).subscribe({
      next: (page) => {
        console.log('DATA:', JSON.stringify(page));
        this.solicitudes = page.content;
        this.totalElements = page.totalElements;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ERROR:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('COMPLETE');
      }
    });
  }

  cambiarPagina(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargar();
  }

  limpiarFiltros(): void {
    this.filtroEstado = '';
    this.filtroTipo = '';
    this.filtroPrioridad = '';
    this.pageIndex = 0;
    this.cargar();
  }

  verDetalle(id: string): void {
    console.log('Navegando a:', id);
    this.router.navigate(['/solicitudes', id]);
  }

  volver(): void {
    this.router.navigate(['/dashboard']);
  }

  colorEstado(estado: string): string {
    const colores: any = {
      'REGISTRADA': 'estado-registrada',
      'CLASIFICADA': 'estado-clasificada',
      'EN_ATENCION': 'estado-atencion',
      'ATENDIDA': 'estado-atendida',
      'CERRADA': 'estado-cerrada'
    };
    return colores[estado] || '';
  }

  colorPrioridad(prioridad: string): string {
    const colores: any = {
      'BAJA': 'prioridad-baja',
      'MEDIA': 'prioridad-media',
      'ALTA': 'prioridad-alta',
      'CRITICA': 'prioridad-critica'
    };
    return colores[prioridad] || '';
  }
}