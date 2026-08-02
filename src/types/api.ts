/**
 * Contratos TypeScript de la API FastAPI de MolPredict EGFR.
 * Reflejan exactamente los esquemas publicados en /openapi.json
 * (https://molpredict-egfr-api--ibanezmariela78.replit.app/openapi.json).
 */

/* ── Errores ───────────────────────────────────────────────── */

export type CodigoErrorApi =
  | "smiles_invalido"
  | "backend_no_disponible"
  | "error_conexion"
  | "tiempo_agotado"
  | "respuesta_inesperada"
  | "error_validacion"
  | "error_inesperado";

export interface ApiError {
  codigo: CodigoErrorApi;
  /** Mensaje amigable en español, apto para mostrar al usuario. */
  mensaje: string;
  /** Detalle técnico interno. Nunca debe mostrarse en la interfaz. */
  detalle?: string;
  status?: number;
}

/** Cuerpo de error devuelto por el backend FastAPI. */
export interface BackendErrorBody {
  error?: string;
  message?: string;
  detail?: unknown;
}

/* ── Salud del servicio ────────────────────────────────────── */

export interface HealthResponse {
  status: string;
  service?: string;
  environment?: string;
  demo_mode?: boolean;
  rdkit_available?: boolean;
  version?: string;
}

/* ── Entradas ──────────────────────────────────────────────── */

export interface SMILESInput {
  smiles: string;
}

export interface RenderInput {
  smiles: string;
  width?: number;
  height?: number;
}

export interface SimilarityInput {
  smiles: string;
  limit?: number;
}

/* ── Validación molecular ──────────────────────────────────── */

export interface ValidateResponse {
  valid: boolean;
  input_smiles: string;
  canonical_smiles: string;
  molecular_formula: string;
  atom_count: number;
  heavy_atom_count: number;
  message: string;
}

/* ── Descriptores y Lipinski ───────────────────────────────── */

export interface LipinskiCriterion {
  name: string;
  value: number;
  threshold: string;
  passes: boolean;
}

export interface LipinskiEvaluation {
  criteria: LipinskiCriterion[];
  passed_count: number;
  total_count: number;
  summary: string;
}

export interface DescriptorsResponse {
  canonical_smiles: string;
  molecular_formula: string;
  molecular_weight: number;
  logp: number;
  tpsa: number;
  h_bond_donors: number;
  h_bond_acceptors: number;
  rotatable_bonds: number;
  aromatic_rings: number;
  fraction_csp3: number;
  formal_charge: number;
  atom_count: number;
  heavy_atom_count: number;
  ring_count: number;
  lipinski_violations: number;
  lipinski: LipinskiEvaluation;
  disclaimer?: string;
}

/* ── Renderizado SVG ───────────────────────────────────────── */

export interface RenderResponse {
  canonical_smiles: string;
  format?: string;
  width: number;
  height: number;
  svg: string;
}

/* ── Predicción EGFR ───────────────────────────────────────── */

export interface ApplicabilityDomain {
  inside_domain: boolean;
  maximum_similarity: number;
  confidence: string;
  method?: string;
}

export interface PredictionResponse {
  canonical_smiles: string;
  pic50_prediction: number;
  ic50_nm_prediction: number;
  activity_label: string;
  confidence: string;
  prediction_mode?: string;
  scientifically_validated?: boolean;
  model_version: string;
  descriptors: Record<string, number | string | boolean | null>;
  applicability_domain: ApplicabilityDomain;
  favorable_factors: string[];
  unfavorable_factors: string[];
  disclaimer?: string;
}

/* ── Moléculas similares ───────────────────────────────────── */

export interface SimilarCompound {
  name: string;
  canonical_smiles: string;
  similarity: number;
  experimental_pic50_demo: number;
  data_mode: string;
  molecular_formula: string;
}

export interface SimilarityResponse {
  query_smiles: string;
  results: SimilarCompound[];
  method?: string;
  disclaimer?: string;
}

/* ── Modelo y métricas ─────────────────────────────────────── */

export interface ModelInfoResponse {
  name: string;
  version: string;
  status: string;
  task: string;
  target: string;
  endpoint: string;
  trained: boolean;
  validated: boolean;
  message: string;
}

export interface ModelMetricsResponse {
  available: boolean;
  metrics?: unknown;
  message: string;
}

/* ── Resumen del dataset ───────────────────────────────────── */

export interface DatasetCompoundSummary {
  id: string;
  name: string;
  data_mode: string;
}

export interface DatasetSummaryResponse {
  total_compounds: number;
  compounds: DatasetCompoundSummary[];
  data_mode: string;
  source: string;
  generation_date: string;
  disclaimer: string;
}
