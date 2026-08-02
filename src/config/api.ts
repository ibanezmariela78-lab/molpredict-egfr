/**
 * Configuración de la capa de comunicación con el backend FastAPI.
 *
 * Producción: https://molpredict-egfr-api--ibanezmariela78.replit.app
 */

const raw = import.meta.env as Record<string, string | undefined>;

/** URL base por defecto del backend publicado (sin barra final). */
const BASE_POR_DEFECTO = "https://molpredict-egfr-api--ibanezmariela78.replit.app";

/** URL base del backend FastAPI, normalizada sin barra final duplicada. */
export const API_BASE_URL = ((raw["VITE_API_BASE_URL"] ?? "").trim() || BASE_POR_DEFECTO).replace(
  /\/+$/,
  "",
);

/** El modo demostración solo está activo si se declara explícitamente "true". */
export const DEMO_MODE = (raw["VITE_DEMO_MODE"] ?? "false").toLowerCase() === "true";

/** Tiempo máximo de espera por solicitud (ms). */
export const API_TIMEOUT_MS = Number(raw["VITE_API_TIMEOUT_MS"] ?? 30000);

/** Alias de DEMO_MODE: única fuente de verdad del modo demostración. */
export const isDemoMode = DEMO_MODE;

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
