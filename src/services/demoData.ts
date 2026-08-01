/**
 * Adaptadores de modo demostración.
 * Reutilizan exactamente los datos demostrativos actuales de la interfaz,
 * expuestos con la misma forma que devolverá el backend FastAPI.
 */

import type {
  DatasetSummary,
  DescriptorsResponse,
  HealthResponse,
  ModelInfo,
  ModelMetrics,
  PredictionResponse,
  RenderResponse,
  SimilaritySearchResponse,
  ValidateResponse,
} from "@/types/api";
import {
  CONTRIBUCIONES_SHAP,
  DESCRIPTORES,
  FACTORES_DESFAVORABLES,
  FACTORES_FAVORABLES,
  LIPINSKI,
  PREDICCION_DEMO,
} from "@/data/prediccion";
import { COMPUESTOS } from "@/data/compuestos";
import { validarSmiles } from "@/utils/molecula";
import { TEXTOS_DEMO } from "@/data/molpredictDemoData";

const descriptoresApi = DESCRIPTORES.map((d) => ({
  clave: d.clave,
  nombre: d.nombre,
  valor: d.numero,
  unidad: d.unidad,
  min: d.min,
  max: d.max,
}));

export async function demoHealth(): Promise<HealthResponse> {
  return { status: "ok", version: "demo" };
}

export async function demoValidate(smiles: string): Promise<ValidateResponse> {
  const v = validarSmiles(smiles);
  return {
    valido: v.valido,
    mensaje: v.valido ? TEXTOS_DEMO.validacionOk : v.mensaje,
    smilesCanonico: v.valido ? smiles.trim() : undefined,
    formula: v.valido ? PREDICCION_DEMO.formula : undefined,
  };
}

export async function demoDescriptors(smiles: string): Promise<DescriptorsResponse> {
  return {
    smilesCanonico: smiles.trim() || PREDICCION_DEMO.smilesCanonico,
    formula: PREDICCION_DEMO.formula,
    descriptores: descriptoresApi,
    lipinski: LIPINSKI,
    criteriosCumplidos: LIPINSKI.filter((l) => l.cumple).length,
    criteriosTotales: LIPINSKI.length,
  };
}

/** En modo demostración no hay SVG real: se conserva la ilustración actual. */
export async function demoRender(): Promise<RenderResponse> {
  return { svg: "", ancho: 0, alto: 0 };
}

export async function demoPrediction(smiles: string): Promise<PredictionResponse> {
  return {
    smilesCanonico: smiles.trim() || PREDICCION_DEMO.smilesCanonico,
    formula: PREDICCION_DEMO.formula,
    pIC50: PREDICCION_DEMO.pIC50,
    ic50nM: PREDICCION_DEMO.ic50nM,
    confianza: PREDICCION_DEMO.confianza,
    modelo: PREDICCION_DEMO.modelo,
    dominio: {
      dentroDelDominio: true,
      etiqueta: PREDICCION_DEMO.dominio,
      similitudMaxima: PREDICCION_DEMO.similitudMaxima,
      nivelConfianza: "Media",
    },
    descriptores: descriptoresApi,
    lipinski: LIPINSKI,
    interpretacion: {
      factoresFavorables: [...FACTORES_FAVORABLES],
      factoresDesfavorables: [...FACTORES_DESFAVORABLES],
      contribuciones: CONTRIBUCIONES_SHAP,
    },
  };
}

export async function demoSimilarity(limite: number): Promise<SimilaritySearchResponse> {
  const resultados = COMPUESTOS.slice(0, limite).map((c) => ({
    id: c.id,
    nombre: c.nombre,
    smiles: c.smiles,
    tanimoto: c.similitud,
    pIC50Experimental: c.pIC50,
  }));
  return { resultados, total: resultados.length };
}

export async function demoModelInfo(): Promise<ModelInfo> {
  return {
    nombre: "QSAR Ensemble",
    version: "v0.1 (simulación)",
    algoritmo: "XGBoost + Random Forest",
    fechaEntrenamiento: "2025-01-01",
    fingerprint: "Morgan ECFP4 (2048 bits)",
    descripcion: "Modelo demostrativo; no proviene de un entrenamiento real.",
  };
}

export async function demoModelMetrics(): Promise<ModelMetrics> {
  return {
    r2: 0.72,
    rmse: 0.61,
    mae: 0.47,
    q2: 0.68,
    validacion: "Validación cruzada 5-fold (simulada)",
    nEntrenamiento: 4200,
    nPrueba: 1050,
  };
}

export async function demoDatasetSummary(): Promise<DatasetSummary> {
  return {
    fuente: "ChEMBL",
    target: "EGFR (CHEMBL203)",
    totalCompuestos: 5250,
    rangoPIC50: { min: 4.0, max: 10.0 },
    fechaExtraccion: "2025-01-01",
    filtrosAplicados: ["IC50 en nM", "Actividad tipo = IC50", "Sin duplicados"],
  };
}
