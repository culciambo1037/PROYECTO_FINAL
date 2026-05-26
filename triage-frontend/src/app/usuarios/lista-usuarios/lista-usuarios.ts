import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsuarioService } from '../../core/services/usuario';
import { Usuario, UsuarioRequest } from '../../core/models/usuario.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatTooltipModule  
  ],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.scss'
})
export class ListaUsuarios implements OnInit {

  usuarios: Usuario[] = [];
  cargando = false;
  guardando = false;

  columnas = ['nombre', 'correo', 'identificacion', 'rol', 'estado', 'acciones'];

  roles = ['ESTUDIANTE', 'RESPONSABLE', 'ADMIN'];

  formCrear: FormGroup;
  mostrarFormCrear = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.formCrear = this.fb.group({
      nombre:         ['', Validators.required],
      apellido:       ['', Validators.required],
      correo:         ['', [Validators.required, Validators.email]],
      identificacion: ['', Validators.required],
      rol:            ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.usuarioService.listarTodos().subscribe({
      next: u => {
        this.usuarios = u;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  crear(): void {
    if (this.formCrear.invalid) return;
    this.guardando = true;
    this.usuarioService.crear(this.formCrear.value).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrarFormCrear = false;
        this.formCrear.reset();
        this.snackBar.open('Usuario creado exitosamente', 'Cerrar', { duration: 3000 });
        this.cargar();
        this.cdr.detectChanges();
      },
      error: err => {
        this.guardando = false;
        this.cdr.detectChanges();
        this.snackBar.open(err.error?.mensaje || 'Error al crear usuario',
                           'Cerrar', { duration: 3000 });
      }
    });
  }

  toggleEstado(usuario: Usuario): void {
    this.usuarioService.cambiarEstado(usuario.id, !usuario.activo).subscribe({
      next: u => {
        const idx = this.usuarios.findIndex(x => x.id === u.id);
        if (idx >= 0) this.usuarios[idx] = u;
        this.snackBar.open(
          `Usuario ${u.activo ? 'activado' : 'desactivado'} exitosamente`,
          'Cerrar', { duration: 3000 }
        );
        this.cdr.detectChanges();
      },
      error: err => {
        this.snackBar.open(err.error?.mensaje || 'Error al cambiar estado',
                           'Cerrar', { duration: 3000 });
      }
    });
  }

  volver(): void {
    this.router.navigate(['/dashboard']);
  }
}