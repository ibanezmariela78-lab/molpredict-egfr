/**
 * Configuración de la capa de comunicación con el backend.
 *
 * Modo demostración (por defecto):
 *   VITE_DEMO_MODE=true   → no se realizan solicitudes reales.
 * Modo real:
 *   VITE_DEMO_MODE=false  → se consume VITE_API_BASE_URL.
 */

const raw = import.meta.env as Record<string, string | undefined>;

/** URL base del backend FastAPI. Vacía mientras no exista una URL definitiva. */
export const API_BASE_URL = (raw["VITE_API_BASE_URL"] ?? "").replace(/\/+$/, "");

/** El modo demostración está activo salvo que se declare explícitamente "false". */
export const DEMO_MODE = (raw["VITE_DEMO_MODE"] ?? "true").toLowerCase() !== "false";

/** Tiempo máximo de espera por solicitud (ms). */
export const API_TIMEOUT_MS = Number(raw["VITE_API_TIMEOUT_MS"] ?? 20000);

/** Indica si es posible realizar solicitudes reales. */
export const API_CONFIGURADA = !DEMO_MODE && API_BASE_URL.length > 0;

export const ENDPOINTS = {
  health: "/health",
  validate: "/api/v1/molecules/validate",
  descriptors: "/api/v1/molecules/descriptors",
  render: "/api/v1/molecules/render",
  predictionEgfr: "/api/v1/predictions/egfr",
  similaritySearch: "/api/v1/similarity/search",
  modelCurrent: "/api/v1/models/current",
  modelMetrics: "/api/v1/models/metrics",
  datasetSummary: "/api/v1/dataset/summary",
} as const;
