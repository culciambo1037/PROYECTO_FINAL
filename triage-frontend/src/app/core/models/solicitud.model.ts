export interface Solicitud {
  id: string;
  descripcion: string;
  estado: string;
  tipoSolicitud: string;
  prioridad: string;
  canalOrigen: string;
  justificacionPrioridad: string;
  observacionCierre: string | null;
  fechaRegistro: string;
  fechaCierre: string | null;
  nombreSolicitante: string;
  nombreResponsable: string | null;
}

export interface SolicitudRequest {
  descripcion: string;
  tipoSolicitud: string;
  canalOrigen: string;
  solicitanteId: string;
}

export interface ClasificarRequest {
  tipoSolicitud: string;
  prioridad?: string;
  justificacionPrioridad: string;
}

export interface AsignarRequest {
  responsableId: string;
}

export interface CerrarRequest {
  observacionCierre: string;
}

export interface PageSolicitud {
  content: Solicitud[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface Historial {
  id: string;
  accionRealizada: string;
  observaciones: string;
  fechaAccion: string;
  nombreUsuario: string;
}