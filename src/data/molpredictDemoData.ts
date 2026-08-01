/**
 * Fuente única de datos demostrativos de MolPredict EGFR.
 *
 * Todos los valores aquí son ILUSTRATIVOS: corresponden a una molécula de
 * referencia y no provienen de un modelo QSAR entrenado ni de RDKit.
 * Los componentes visuales deben leer los datos desde este archivo.
 */

import type { Descriptor, FactorSHAP, ReglaLipinski } from "@/types";
import { COMPUESTOS } from "@/data/compuestos";
import {
  CONTRIBUCIONES_SHAP,
  DESCRIPTORES,
  FACTORES_DESFAVORABLES,
  FACTORES_FAVORABLES,
  LIPINSKI,
  PREDICCION_DEMO,
} from "@/data/prediccion";

/** Criterios clásicos de la regla de los cinco de Lipinski. */
export const LIPINSKI_CLASICO: ReglaLipinski[] = LIPINSKI.filter(
  (l) => l.criterio !== "Enlaces rotables",
);

/** Criterio adicional, orientativo, de flexibilidad molecular. */
export const FLEXIBILIDAD: ReglaLipinski[] = LIPINSKI.filter(
  (l) => l.criterio === "Enlaces rotables",
);

export interface MoleculaSimilarDemo {
  id: string;
  nombre: string;
  smiles: string;
  tanimoto: number;
  pIC50Experimental: number;
}

export const MOLECULAS_SIMILARES_DEMO: MoleculaSimilarDemo[] = COMPUESTOS.slice(0, 5).map((c) => ({
  id: c.id,
  nombre: c.nombre,
  smiles: c.smiles,
  tanimoto: c.similitud,
  pIC50Experimental: c.pIC50,
}));

export const TEXTOS_DEMO = {
  banner:
    "Modo demostración — los resultados mostrados corresponden a una molécula de referencia y pueden no representar el SMILES ingresado.",
  bannerSecundario:
    "La versión conectada procesará cada estructura con RDKit y una API FastAPI.",
  ayudaSmiles:
    "Validación visual en modo demostración. La estructura todavía no se procesa con RDKit.",
  validacionOk: "Formato aceptado en demo",
  ilustracion: "Representación ilustrativa, no generada por RDKit.",
  formulaReferencia: "Valor correspondiente a la molécula de referencia del ejemplo.",
  modeloTooltip: "Resultado demostrativo sin modelo entrenado.",
  prediccionNota:
    "Valor ilustrativo generado con fines de demostración. No proviene de un modelo QSAR entrenado ni validado.",
  descriptoresNota:
    "Estos valores corresponden a la molécula de referencia y no necesariamente al SMILES ingresado.",
  flexibilidadNota:
    "Los enlaces rotables son un criterio orientativo de flexibilidad molecular y no forman parte de las cuatro reglas clásicas de Lipinski.",
  dominioSubtitulo: "Similitud ilustrativa con el conjunto de referencia",
  dominioNota:
    "Este dominio de aplicabilidad es demostrativo y se calcula sobre un conjunto reducido de moléculas de referencia.",
  interpretacionNota:
    "Los factores mostrados son reglas explicativas de demostración y no corresponden a una explicación SHAP de un modelo entrenado.",
  contribucionesTitulo: "Contribuciones simuladas por descriptor",
  contribucionesSubtitulo:
    "Visualización demostrativa inspirada en SHAP. No fue generada por un modelo entrenado.",
  similaresNota:
    "Los compuestos y valores mostrados pertenecen a un conjunto demostrativo reducido. La versión conectada calculará similitud molecular mediante fingerprints Morgan y coeficiente de Tanimoto.",
  disclaimer:
    "Esta herramienta es experimental y educativa. Los resultados demostrativos o computacionales no reemplazan ensayos químicos, biológicos, toxicológicos, preclínicos ni clínicos, ni deben utilizarse para tomar decisiones médicas.",
} as const;

/** Objeto demostrativo completo de la molécula de referencia. */
export const DEMO_MOLPREDICT = {
  nombreReferencia: "Molécula de referencia (análoga a Gefitinib)",
  smiles: PREDICCION_DEMO.smilesCanonico,
  formula: PREDICCION_DEMO.formula,
  descriptores: DESCRIPTORES as Descriptor[],
  lipinski: LIPINSKI_CLASICO,
  flexibilidad: FLEXIBILIDAD,
  pIC50: PREDICCION_DEMO.pIC50,
  ic50nM: PREDICCION_DEMO.ic50nM,
  confianza: PREDICCION_DEMO.confianza,
  modelo: "Simulación QSAR v0.1",
  dominio: {
    etiqueta: PREDICCION_DEMO.dominio,
    similitudMaxima: PREDICCION_DEMO.similitudMaxima,
    nivelConfianza: "Media" as const,
  },
  interpretacion: {
    favorables: FACTORES_FAVORABLES,
    desfavorables: FACTORES_DESFAVORABLES,
  },
  contribuciones: CONTRIBUCIONES_SHAP as FactorSHAP[],
  similares: MOLECULAS_SIMILARES_DEMO,
  disclaimer: TEXTOS_DEMO.disclaimer,
} as const;
