/**
 * Capa centralizada de comunicación con la API FastAPI de MolPredict EGFR.
 *
 * Base de producción: https://molpredict-egfr-api--ibanezmariela78.replit.app
 * Todas las rutas y esquemas provienen de /openapi.json.
 */

import { API_BASE_URL, API_CONFIGURADA, API_TIMEOUT_MS, DEMO_MODE, ENDPOINTS } from "@/config/api";
import type {
  ApiError,
  BackendErrorBody,
  DatasetSummaryResponse,
  DescriptorsResponse,
  HealthResponse,
  ModelInfoResponse,
  ModelMetricsResponse,
  PredictionResponse,
  RenderInput,
  RenderResponse,
  SimilarityInput,
  SimilarityResponse,
  SMILESInput,
  ValidateResponse,
} from "@/types/api";

export const MENSAJES_ERROR: Record<ApiError["codigo"], string> = {
  smiles_invalido: "La estructura SMILES no es válida. Revisala e intentá nuevamente.",
  backend_no_disponible:
    "El servicio de predicción no está disponible en este momento. Intentá más tarde.",
  error_conexion: "No pudimos conectarnos con el servicio. Verificá tu conexión e intentá de nuevo.",
  tiempo_agotado: "El análisis tardó demasiado. Intentá nuevamente en unos instantes.",
  respuesta_inesperada: "El servicio devolvió una respuesta inesperada. Intentá nuevamente.",
  error_validacion: "Los datos enviados no pudieron ser validados por el servicio.",
  error_inesperado: "Ocurrió un error inesperado durante el análisis. Intentá nuevamente.",
};

export function crearError(
  codigo: ApiError["codigo"],
  detalle?: string,
  status?: number,
  mensaje?: string,
): ApiError {
  return { codigo, mensaje: mensaje ?? MENSAJES_ERROR[codigo], detalle, status };
}

export function esApiError(valor: unknown): valor is ApiError {
  return typeof valor === "object" && valor !== null && "codigo" in valor && "mensaje" in valor;
}

/** Mensaje seguro para mostrar al usuario (nunca detalles técnicos crudos). */
export function mensajeAmigable(error: unknown): string {
  return esApiError(error) ? error.mensaje : MENSAJES_ERROR.error_inesperado;
}

function mensajeBackend(cuerpo: BackendErrorBody | null): string | undefined {
  if (!cuerpo) return undefined;
  if (typeof cuerpo.message === "string" && cuerpo.message.trim()) return cuerpo.message;
  return undefined;
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
    if (opciones.signal.aborted) controller.abort();
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
      let cuerpo: BackendErrorBody | null = null;
      try {
        cuerpo = (await respuesta.json()) as BackendErrorBody;
      } catch {
        cuerpo = null;
      }
      const mensaje = mensajeBackend(cuerpo);

      if (respuesta.status === 422 || respuesta.status === 400) {
        const esSmiles = cuerpo?.error === "smiles_invalido" || respuesta.status === 400;
        throw crearError(
          esSmiles ? "smiles_invalido" : "error_validacion",
          `HTTP ${respuesta.status}`,
          respuesta.status,
          mensaje,
        );
      }
      if (respuesta.status >= 500) {
        throw crearError("backend_no_disponible", `HTTP ${respuesta.status}`, respuesta.status);
      }
      throw crearError("error_inesperado", `HTTP ${respuesta.status}`, respuesta.status, mensaje);
    }

    try {
      return (await respuesta.json()) as T;
    } catch {
      throw crearError("respuesta_inesperada", "JSON inválido", respuesta.status);
    }
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

/* ── Endpoints reales ──────────────────────────────────────── */

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  return request<HealthResponse>(ENDPOINTS.health, { signal });
}

export async function validarMolecula(
  datos: SMILESInput,
  signal?: AbortSignal,
): Promise<ValidateResponse> {
  return request<ValidateResponse>(ENDPOINTS.validate, { method: "POST", body: datos, signal });
}

export async function obtenerDescriptores(
  datos: SMILESInput,
  signal?: AbortSignal,
): Promise<DescriptorsResponse> {
  return request<DescriptorsResponse>(ENDPOINTS.descriptors, {
    method: "POST",
    body: datos,
    signal,
  });
}

export async function renderizarMolecula(
  datos: RenderInput,
  signal?: AbortSignal,
): Promise<RenderResponse> {
  return request<RenderResponse>(ENDPOINTS.render, { method: "POST", body: datos, signal });
}

export async function predecirEgfr(
  datos: SMILESInput,
  signal?: AbortSignal,
): Promise<PredictionResponse> {
  return request<PredictionResponse>(ENDPOINTS.predictionEgfr, {
    method: "POST",
    body: datos,
    signal,
  });
}

export async function buscarSimilares(
  datos: SimilarityInput,
  signal?: AbortSignal,
): Promise<SimilarityResponse> {
  return request<SimilarityResponse>(ENDPOINTS.similaritySearch, {
    method: "POST",
    body: { smiles: datos.smiles, limit: datos.limit ?? 5 },
    signal,
  });
}

export async function obtenerModeloActual(signal?: AbortSignal): Promise<ModelInfoResponse> {
  return request<ModelInfoResponse>(ENDPOINTS.modelCurrent, { signal });
}

export async function obtenerMetricasModelo(signal?: AbortSignal): Promise<ModelMetricsResponse> {
  return request<ModelMetricsResponse>(ENDPOINTS.modelMetrics, { signal });
}

export async function obtenerResumenDataset(signal?: AbortSignal): Promise<DatasetSummaryResponse> {
  return request<DatasetSummaryResponse>(ENDPOINTS.datasetSummary, { signal });
}

export { DEMO_MODE, API_BASE_URL, API_CONFIGURADA };
