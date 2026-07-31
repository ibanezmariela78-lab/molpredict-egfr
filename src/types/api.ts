/**
 * Contratos TypeScript de la API FastAPI de MolPredict EGFR.
 * Estos tipos describen las respuestas esperadas del backend real.
 * Todavía no hay backend conectado: se usan en modo demostración.
 */

/* ── Errores ───────────────────────────────────────────────── */

export type CodigoErrorApi =
  | "smiles_invalido"
  | "backend_no_disponible"
  | "error_conexion"
  | "tiempo_agotado"
  | "error_inesperado";

export interface ApiError {
  codigo: CodigoErrorApi;
  /** Mensaje amigable en español, apto para mostrar al usuario. */
  mensaje: string;
  /** Detalle técnico interno. Nunca debe mostrarse en la interfaz. */
  detalle?: string;
  status?: number;
}

/* ── Salud del servicio ────────────────────────────────────── */

export interface HealthResponse {
  status: "ok" | "degraded" | "down";
  version?: string;
  uptimeSegundos?: number;
}

/* ── Validación molecular ──────────────────────────────────── */

export interface ValidateRequest {
  smiles: string;
}

export interface ValidateResponse {
  valido: boolean;
  mensaje: string;
  smilesCanonico?: string;
  formula?: string;
  advertencias?: string[];
}

/* ── Descriptores fisicoquímicos y Lipinski ────────────────── */

export interface DescriptorApi {
  clave: string;
  nombre: string;
  valor: number;
  unidad?: string;
  min?: number;
  max?: number;
}

export interface ReglaLipinskiApi {
  criterio: string;
  valor: string;
  limite: string;
  cumple: boolean;
}

export interface DescriptorsRequest {
  smiles: string;
}

export interface DescriptorsResponse {
  smilesCanonico: string;
  formula: string;
  descriptores: DescriptorApi[];
  lipinski: ReglaLipinskiApi[];
  criteriosCumplidos: number;
  criteriosTotales: number;
}

/* ── Renderizado SVG ───────────────────────────────────────── */

export interface RenderRequest {
  smiles: string;
  ancho?: number;
  alto?: number;
}

export interface RenderResponse {
  /** Marcado SVG generado por RDKit en el backend. */
  svg: string;
  ancho: number;
  alto: number;
}

/* ── Predicción EGFR ───────────────────────────────────────── */

export interface DominioAplicabilidad {
  dentroDelDominio: boolean;
  etiqueta: string;
  similitudMaxima: number;
  nivelConfianza: "Alta" | "Media" | "Baja";
}

export interface ContribucionApi {
  nombre: string;
  contribucion: number;
}

export interface InterpretacionPrediccion {
  factoresFavorables: string[];
  factoresDesfavorables: string[];
  contribuciones: ContribucionApi[];
}

export interface PredictionRequest {
  smiles: string;
}

export interface PredictionResponse {
  smilesCanonico: string;
  formula: string;
  pIC50: number;
  ic50nM: number;
  confianza: "Alta" | "Media" | "Baja";
  modelo: string;
  dominio: DominioAplicabilidad;
  descriptores: DescriptorApi[];
  lipinski: ReglaLipinskiApi[];
  interpretacion: InterpretacionPrediccion;
}

/* ── Moléculas similares ───────────────────────────────────── */

export interface MoleculaSimilarApi {
  id: string;
  nombre: string;
  smiles: string;
  tanimoto: number;
  pIC50Experimental: number;
}

export interface SimilaritySearchRequest {
  smiles: string;
  limite?: number;
  umbral?: number;
}

export interface SimilaritySearchResponse {
  resultados: MoleculaSimilarApi[];
  total: number;
}

/* ── Modelo y métricas ─────────────────────────────────────── */

export interface ModelInfo {
  nombre: string;
  version: string;
  algoritmo: string;
  fechaEntrenamiento: string;
  fingerprint: string;
  descripcion?: string;
}

export interface ModelMetrics {
  r2: number;
  rmse: number;
  mae: number;
  q2?: number;
  validacion: string;
  nEntrenamiento: number;
  nPrueba: number;
}

/* ── Resumen del dataset ───────────────────────────────────── */

export interface DatasetSummary {
  fuente: string;
  target: string;
  totalCompuestos: number;
  rangoPIC50: { min: number; max: number };
  fechaExtraccion: string;
  filtrosAplicados?: string[];
}
