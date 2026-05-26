import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SolicitudService } from '../../core/services/solicitud';
import { UsuarioService } from '../../core/services/usuario';
import { AuthService } from '../../core/services/auth';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-crear-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './crear-solicitud.html',
  styleUrl: './crear-solicitud.scss'
})
export class CrearSolicitud implements OnInit {

  form: FormGroup;
  guardando = false;
  estudiantes: Usuario[] = [];

  tipos = [
    { valor: 'REGISTRO_ASIGNATURAS', label: 'Registro de asignaturas' },
    { valor: 'HOMOLOGACION', label: 'Homologación' },
    { valor: 'CANCELACION_ASIGNATURA', label: 'Cancelación de asignatura' },
    { valor: 'SOLICITUD_CUPOS', label: 'Solicitud de cupos' },
    { valor: 'CONSULTA_ACADEMICA', label: 'Consulta académica' },
    { valor: 'OTRO', label: 'Otro' }
  ];

  canales = [
    { valor: 'CSU', label: 'CSU' },
    { valor: 'CORREO', label: 'Correo electrónico' },
    { valor: 'PRESENCIAL', label: 'Presencial' },
    { valor: 'SAC', label: 'SAC' },
    { valor: 'TELEFONICO', label: 'Telefónico' }
  ];

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private usuarioService: UsuarioService,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(10),
                         Validators.maxLength(2000)]],
      tipoSolicitud: ['', Validators.required],
      canalOrigen: ['', Validators.required],
      solicitanteId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.usuarioService.listarEstudiantes().subscribe({
      next: e => {
        this.estudiantes = e;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  crear(): void {
    if (this.form.invalid) return;
    this.guardando = true;

    this.solicitudService.crear(this.form.value).subscribe({
      next: s => {
        this.guardando = false;
        this.snackBar.open('Solicitud creada exitosamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/solicitudes', s.id]);
        this.cdr.detectChanges();
      },
      error: err => {
        this.guardando = false;
        this.cdr.detectChanges();
        this.snackBar.open(err.error?.mensaje || 'Error al crear la solicitud',
                           'Cerrar', { duration: 3000 });
      }
    });
  }

  volver(): void {
    this.router.navigate(['/dashboard']);
  }
}