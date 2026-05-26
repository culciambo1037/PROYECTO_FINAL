import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { SolicitudService } from '../../core/services/solicitud';
import { UsuarioService } from '../../core/services/usuario';
import { AuthService } from '../../core/services/auth';
import { Solicitud, Historial } from '../../core/models/solicitud.model';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-detalle-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './detalle-solicitud.html',
  styleUrl: './detalle-solicitud.scss'
})
export class DetalleSolicitud implements OnInit {

  solicitud: Solicitud | null = null;
  historial: Historial[] = [];
  responsables: Usuario[] = [];
  cargando = true;
  guardando = false;
  resumenIA: string | null = null;
  cargandoResumen = false;

  formClasificar: FormGroup;
  formAsignar: FormGroup;
  formCerrar: FormGroup;
  formEstado: FormGroup;

  tipos = ['REGISTRO_ASIGNATURAS', 'HOMOLOGACION', 'CANCELACION_ASIGNATURA',
           'SOLICITUD_CUPOS', 'CONSULTA_ACADEMICA', 'OTRO'];
  prioridades = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];
  estados = ['REGISTRADA', 'CLASIFICADA', 'EN_ATENCION', 'ATENDIDA', 'CERRADA'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private usuarioService: UsuarioService,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.formClasificar = this.fb.group({
      tipoSolicitud: ['', Validators.required],
      justificacionPrioridad: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.formAsignar = this.fb.group({
      responsableId: ['', Validators.required]
    });

    this.formCerrar = this.fb.group({
      observacionCierre: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.formEstado = this.fb.group({
      nuevoEstado: ['', Validators.required],
      observaciones: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.cargarSolicitud(id);
    this.cargarHistorial(id);
    if (this.authService.isAdmin()) {
      this.cargarResponsables();
    }
  }

  cargarSolicitud(id: string): void {
    this.solicitudService.obtener(id).subscribe({
      next: s => {
        this.solicitud = s;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
        this.mostrarMensaje('Error al cargar la solicitud');
      }
    });
  }

  generarResumen(): void {
    if (!this.solicitud) return;
    this.cargandoResumen = true;
    this.resumenIA = null;

    this.solicitudService.generarResumen(this.solicitud.id).subscribe({
      next: r => {
        this.resumenIA = r.resumen;
        this.cargandoResumen = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargandoResumen = false;
        this.cdr.detectChanges();
        this.mostrarMensaje('Error al generar resumen');
      }
    });
  }
  
  cargarHistorial(id: string): void {
    this.solicitudService.obtenerHistorial(id).subscribe({
      next: h => {
        this.historial = h;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  cargarResponsables(): void {
    this.usuarioService.listarResponsables().subscribe({
      next: r => {
        this.responsables = r;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  clasificar(): void {
    if (this.formClasificar.invalid || !this.solicitud) return;
    this.guardando = true;
    this.solicitudService.clasificar(this.solicitud.id, this.formClasificar.value).subscribe({
      next: s => {
        this.solicitud = s;
        this.guardando = false;
        this.mostrarMensaje('Solicitud clasificada exitosamente');
        this.cargarHistorial(s.id);
        this.cdr.detectChanges();
      },
      error: err => {
        this.guardando = false;
        this.cdr.detectChanges();
        this.mostrarMensaje(err.error?.mensaje || 'Error al clasificar');
      }
    });
  }

  asignar(): void {
    if (this.formAsignar.invalid || !this.solicitud) return;
    this.guardando = true;
    this.solicitudService.asignar(this.solicitud.id, this.formAsignar.value).subscribe({
      next: s => {
        this.solicitud = s;
        this.guardando = false;
        this.mostrarMensaje('Responsable asignado exitosamente');
        this.cargarHistorial(s.id);
        this.cdr.detectChanges();
      },
      error: err => {
        this.guardando = false;
        this.cdr.detectChanges();
        this.mostrarMensaje(err.error?.mensaje || 'Error al asignar');
      }
    });
  }

  cambiarEstado(): void {
    if (this.formEstado.invalid || !this.solicitud) return;
    this.guardando = true;
    const { nuevoEstado, observaciones } = this.formEstado.value;
    this.solicitudService.cambiarEstado(this.solicitud.id, nuevoEstado, observaciones).subscribe({
      next: s => {
        this.solicitud = s;
        this.guardando = false;
        this.mostrarMensaje('Estado actualizado exitosamente');
        this.cargarHistorial(s.id);
        this.cdr.detectChanges();
      },
      error: err => {
        this.guardando = false;
        this.cdr.detectChanges();
        this.mostrarMensaje(err.error?.mensaje || 'Error al cambiar estado');
      }
    });
  }

  cerrar(): void {
    if (this.formCerrar.invalid || !this.solicitud) return;
    this.guardando = true;
    this.solicitudService.cerrar(this.solicitud.id, this.formCerrar.value).subscribe({
      next: s => {
        this.solicitud = s;
        this.guardando = false;
        this.mostrarMensaje('Solicitud cerrada exitosamente');
        this.cargarHistorial(s.id);
        this.cdr.detectChanges();
      },
      error: err => {
        this.guardando = false;
        this.cdr.detectChanges();
        this.mostrarMensaje(err.error?.mensaje || 'Error al cerrar');
      }
    });
  }

  volver(): void {
    this.router.navigate(['/solicitudes']);
  }

  mostrarMensaje(msg: string): void {
    this.snackBar.open(msg, 'Cerrar', { duration: 3000 });
  }

  colorEstado(estado: string): string {
    const c: any = {
      'REGISTRADA': 'estado-registrada', 'CLASIFICADA': 'estado-clasificada',
      'EN_ATENCION': 'estado-atencion',  'ATENDIDA': 'estado-atendida',
      'CERRADA': 'estado-cerrada'
    };
    return c[estado] || '';
  }

  colorPrioridad(prioridad: string): string {
    const c: any = {
      'BAJA': 'prioridad-baja', 'MEDIA': 'prioridad-media',
      'ALTA': 'prioridad-alta', 'CRITICA': 'prioridad-critica'
    };
    return c[prioridad] || '';
  }

  puedeCerrar(): boolean {
    return this.solicitud?.estado === 'ATENDIDA' &&
           (this.authService.isAdmin() || this.authService.isResponsable());
  }

  puedeClasificar(): boolean {
    return this.solicitud?.estado === 'REGISTRADA' &&
           (this.authService.isAdmin() || this.authService.isResponsable());
  }

  puedeAsignar(): boolean {
    return this.solicitud?.estado === 'CLASIFICADA' && this.authService.isAdmin();
  }

  puedeCambiarEstado(): boolean {
    return this.solicitud?.estado !== 'CERRADA' &&
           (this.authService.isAdmin() || this.authService.isResponsable());
  }
}