// Interfaces que describen los datos que envía y recibe la API de BioConnect

/** Estructura común de todas las respuestas de la API */
export interface RespuestaApi<T> {
  ok: boolean;
  mensaje: string;
  datos: T;
  errores?: Record<string, string>;
}

export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  profesion?: string;
  rol?: string;
  municipio?: string;
  id_rol?: number;
  id_municipio?: number;
}

export interface Publicacion {
  id_publicacion?: number;
  titulo: string;
  contenido: string;
  tipo: 'publicacion' | 'investigacion' | 'proyecto';
  fecha?: string;
  id_usuario: number;
  autor?: string;
}

export interface Oferta {
  id_oferta?: number;
  titulo: string;
  descripcion: string;
  salario: number;
  fecha: string;
  fecha_cierre: string;
  id_empleador: number;
  id_municipio: number;
  empleador?: string;
  municipio?: string;
}

export interface Postulacion {
  id_postulacion?: number;
  id_oferta: number;
  id_usuario: number;
  estado?: 'en_revision' | 'entrevista' | 'seleccionada' | 'no_seleccionada';
  fecha?: string;
  postulante?: string;
  oferta?: string;
}

export interface Especie {
  id_especie?: number;
  nombre_comun: string;
  nombre_cientifico: string;
  grupo: string;
}

export interface RegistroEspecie {
  id_registro?: number;
  fecha: string;
  cantidad: number;
  validado?: number;
  id_especie: number;
  id_municipio: number;
  id_usuario: number;
  especie?: string;
  municipio?: string;
  registrado_por?: string;
}

export interface IndiceBiodiversidad {
  id_municipio: number;
  riqueza_especies: number;
  total_individuos: number;
  indice_shannon: number;
}

/** Municipios disponibles (coinciden con la tabla municipio de la base de datos) */
export const MUNICIPIOS = [
  { id: 1, nombre: 'Villagarzón' },
  { id: 2, nombre: 'Mocoa' },
  { id: 3, nombre: 'Puerto Asís' },
  { id: 4, nombre: 'Orito' },
];
