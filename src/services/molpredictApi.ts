/**
 * Capa centralizada de comunicación con la API FastAPI de MolPredict EGFR.
 *
 * Mientras DEMO_MODE esté activo, ninguna función realiza solicitudes de red:
 * devuelven los datos demostrativos actuales, sin mezclarlos con datos reales.
 */

import {
  API_BASE_URL,
  API_CONFIGURADA,
  API_TIMEOUT_MS,
  DEMO_MODE,
  ENDPOINTS,
} from "@/config/api";
import type {
  ApiError,
  DatasetSummary,
  DescriptorsRequest,
  DescriptorsResponse,
  HealthResponse,
  ModelInfo,
  ModelMetrics,
  PredictionRequest,
  PredictionResponse,
  RenderRequest,
  RenderResponse,
  SimilaritySearchRequest,
  SimilaritySearchResponse,
  ValidateRequest,
  ValidateResponse,
} from "@/types/api";
import {
  demoDatasetSummary,
  demoDescriptors,
  demoHealth,
  demoModelInfo,
  demoModelMetrics,
  demoPrediction,
  demoRender,
  demoSimilarity,
  demoValidate,
} from "@/services/demoData";

export const MENSAJES_ERROR: Record<ApiError["codigo"], string> = {
  smiles_invalido: "La estructura SMILES no es válida. Revisala e intentá nuevamente.",
  backend_no_disponible:
    "El servicio de predicción no está disponible en este momento. Intentá más tarde.",
  error_conexion: "No pudimos conectarnos con el servicio. Verificá tu conexión e intentá de nuevo.",
  tiempo_agotado: "El análisis tardó demasiado. Intentá nuevamente en unos instantes.",
  error_inesperado: "Ocurrió un error inesperado durante el análisis. Intentá nuevamente.",
};

export function crearError(codigo: ApiError["codigo"], detalle?: string, status?: number): ApiError {
  return { codigo, mensaje: MENSAJES_ERROR[codigo], detalle, status };
}

export function esApiError(valor: unknown): valor is ApiError {
  return typeof valor === "object" && valor !== null && "codigo" in valor && "mensaje" in valor;
}

/** Mensaje seguro para mostrar al usuario (nunca detalles técnicos). */
export function mensajeAmigable(error: unknown): string {
  return esApiError(error) ? error.mensaje : MENSAJES_ERROR.error_inesperado;
}

async function request<T>(
  endpoint: string,
  opciones: { method?: "GET" | "POST"; body?: unknown; signal?: AbortSignal } = {},
): Promise<T> {
  if (!API_CONFIGURADA) {
    throw crearError(
      "backend_no_disponible",
      "VITE_API_BASE_URL no está configurada o el modo demostración está activo.",
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  if (opciones.signal) {
    opciones.signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const respuesta = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: opciones.method ?? "GET",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: opciones.body === undefined ? undefined : JSON.stringify(opciones.body),
      signal: controller.signal,
    });

    if (!respuesta.ok) {
      if (respuesta.status === 422 || respuesta.status === 400) {
        throw crearError("smiles_invalido", `HTTP ${respuesta.status}`, respuesta.status);
      }
      if (respuesta.status >= 500) {
        throw crearError("backend_no_disponible", `HTTP ${respuesta.status}`, respuesta.status);
      }
      throw crearError("error_inesperado", `HTTP ${respuesta.status}`, respuesta.status);
    }

    return (await respuesta.json()) as T;
  } catch (error) {
    if (esApiError(error)) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw crearError("tiempo_agotado", "AbortError");
    }
    if (error instanceof TypeError) {
      throw crearError("error_conexion", error.message);
    }
    throw crearError("error_inesperado", error instanceof Error ? error.message : undefined);
  } finally {
    clearTimeout(timeout);
  }
}

/* ── Endpoints ─────────────────────────────────────────────── */

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  if (DEMO_MODE) return demoHealth();
  return request<HealthResponse>(ENDPOINTS.health, { signal });
}

export async function validarMolecula(
  datos: ValidateRequest,
  signal?: AbortSignal,
): Promise<ValidateResponse> {
  if (DEMO_MODE) return demoValidate(datos.smiles);
  return request<ValidateResponse>(ENDPOINTS.validate, {
    method: "POST",
    body: datos,
    signal,
  });
}

export async function obtenerDescriptores(
  datos: DescriptorsRequest,
  signal?: AbortSignal,
): Promise<DescriptorsResponse> {
  if (DEMO_MODE) return demoDescriptors(datos.smiles);
  return request<DescriptorsResponse>(ENDPOINTS.descriptors, {
    method: "POST",
    body: datos,
    signal,
  });
}

export async function renderizarMolecula(
  datos: RenderRequest,
  signal?: AbortSignal,
): Promise<RenderResponse> {
  if (DEMO_MODE) return demoRender();
  return request<RenderResponse>(ENDPOINTS.render, { method: "POST", body: datos, signal });
}

export async function predecirEgfr(
  datos: PredictionRequest,
  signal?: AbortSignal,
): Promise<PredictionResponse> {
  if (DEMO_MODE) return demoPrediction(datos.smiles);
  return request<PredictionResponse>(ENDPOINTS.predictionEgfr, {
    method: "POST",
    body: datos,
    signal,
  });
}

export async function buscarSimilares(
  datos: SimilaritySearchRequest,
  signal?: AbortSignal,
): Promise<SimilaritySearchResponse> {
  if (DEMO_MODE) return demoSimilarity(datos.limite ?? 5);
  return request<SimilaritySearchResponse>(ENDPOINTS.similaritySearch, {
    method: "POST",
    body: datos,
    signal,
  });
}

export async function obtenerModeloActual(signal?: AbortSignal): Promise<ModelInfo> {
  if (DEMO_MODE) return demoModelInfo();
  return request<ModelInfo>(ENDPOINTS.modelCurrent, { signal });
}

export async function obtenerMetricasModelo(signal?: AbortSignal): Promise<ModelMetrics> {
  if (DEMO_MODE) return demoModelMetrics();
  return request<ModelMetrics>(ENDPOINTS.modelMetrics, { signal });
}

export async function obtenerResumenDataset(signal?: AbortSignal): Promise<DatasetSummary> {
  if (DEMO_MODE) return demoDatasetSummary();
  return request<DatasetSummary>(ENDPOINTS.datasetSummary, { signal });
}

export { DEMO_MODE, API_BASE_URL, API_CONFIGURADA };
