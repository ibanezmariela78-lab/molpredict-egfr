/**
 * Adaptador entre las respuestas reales del backend FastAPI y el modelo
 * de vista que utilizan los componentes de resultados.
 */

import type { Descriptor, FactorSHAP, ReglaLipinski } from "@/types";
import type {
  DescriptorsResponse,
  PredictionResponse,
  SimilarityResponse,
} from "@/types/api";
import { formatearNumero } from "@/utils/molecula";

export interface MoleculaSimilar {
  id: string;
  nombre: string;
  smiles: string;
  formula?: string;
  tanimoto: number;
  pIC50Experimental: number;
}

export interface ResultadoAnalisis {
  smilesCanonico: string;
  formula: string;
  descriptores: Descriptor[];
  lipinski: ReglaLipinski[];
  flexibilidad: ReglaLipinski[];
  resumenLipinski?: string;
  pIC50: number;
  ic50nM: number;
  etiquetaActividad: string;
  confianza: string;
  modelo: string;
  validadoCientificamente: boolean;
  dominio: { etiqueta: string; similitudMaxima: number; nivelConfianza: string };
  interpretacion: { favorables: string[]; desfavorables: string[] };
  contribuciones: FactorSHAP[];
  similares: MoleculaSimilar[];
  metodoSimilitud?: string;
  notaSimilares?: string;
  notaPrediccion?: string;
  notaLipinski?: string;
  svg?: string;
}

const CONFIANZA_ES: Record<string, string> = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

export function traducirConfianza(valor: string): string {
  return CONFIANZA_ES[valor.toLowerCase()] ?? valor;
}

interface MetaDescriptor {
  clave: string;
  nombre: string;
  min: number;
  max: number;
  unidad?: string;
  decimales: number;
  tooltip: string;
}

const META: MetaDescriptor[] = [
  {
    clave: "mw",
    nombre: "Peso molecular",
    min: 0,
    max: 700,
    unidad: "g/mol",
    decimales: 1,
    tooltip:
      "Masa de la molécula calculada con RDKit. Valores por debajo de 500 g/mol suelen asociarse a mejor absorción oral.",
  },
  {
    clave: "logp",
    nombre: "LogP",
    min: -2,
    max: 8,
    decimales: 2,
    tooltip: "Coeficiente de partición octanol/agua: estima la lipofilia del compuesto.",
  },
  {
    clave: "tpsa",
    nombre: "TPSA",
    min: 0,
    max: 160,
    unidad: "Å²",
    decimales: 1,
    tooltip:
      "Área polar superficial topológica. Se relaciona con la permeabilidad de membranas.",
  },
  {
    clave: "hbd",
    nombre: "Donantes de H",
    min: 0,
    max: 10,
    decimales: 0,
    tooltip: "Número de grupos capaces de donar enlaces de hidrógeno.",
  },
  {
    clave: "hba",
    nombre: "Aceptores de H",
    min: 0,
    max: 15,
    decimales: 0,
    tooltip: "Número de átomos capaces de aceptar enlaces de hidrógeno.",
  },
  {
    clave: "rotb",
    nombre: "Enlaces rotables",
    min: 0,
    max: 15,
    decimales: 0,
    tooltip:
      "Indica flexibilidad conformacional. Valores altos pueden reducir la afinidad de unión.",
  },
  {
    clave: "arom",
    nombre: "Anillos aromáticos",
    min: 0,
    max: 6,
    decimales: 0,
    tooltip: "Los sistemas aromáticos participan en interacciones π con el sitio activo.",
  },
  {
    clave: "csp3",
    nombre: "Fracción Csp3",
    min: 0,
    max: 1,
    decimales: 2,
    tooltip:
      "Proporción de carbonos sp3. Refleja el grado de tridimensionalidad de la estructura.",
  },
];

function descriptor(meta: MetaDescriptor, numero: number): Descriptor {
  return {
    clave: meta.clave,
    nombre: meta.nombre,
    numero,
    valor: formatearNumero(numero, meta.decimales),
    min: meta.min,
    max: meta.max,
    ...(meta.unidad ? { unidad: meta.unidad } : {}),
    tooltip: meta.tooltip,
  };
}

export function mapearDescriptores(d: DescriptorsResponse): Descriptor[] {
  const valores: Record<string, number> = {
    mw: d.molecular_weight,
    logp: d.logp,
    tpsa: d.tpsa,
    hbd: d.h_bond_donors,
    hba: d.h_bond_acceptors,
    rotb: d.rotatable_bonds,
    arom: d.aromatic_rings,
    csp3: d.fraction_csp3,
  };
  return META.filter((m) => typeof valores[m.clave] === "number").map((m) =>
    descriptor(m, valores[m.clave] as number),
  );
}

const CRITERIO_FLEXIBILIDAD = "Enlaces rotables";

function mapearCriterio(c: DescriptorsResponse["lipinski"]["criteria"][number]): ReglaLipinski {
  const entero = Number.isInteger(c.value);
  return {
    criterio: c.name,
    valor: formatearNumero(c.value, entero ? 0 : 2),
    limite: c.threshold,
    cumple: c.passes,
  };
}

/** Construye el modelo de vista a partir de las respuestas reales del backend. */
export function construirResultado(params: {
  prediccion: PredictionResponse;
  descriptores: DescriptorsResponse;
  similares?: SimilarityResponse | null;
  svg?: string;
}): ResultadoAnalisis {
  const { prediccion, descriptores, similares, svg } = params;
  const criterios = descriptores.lipinski.criteria ?? [];

  return {
    smilesCanonico: prediccion.canonical_smiles || descriptores.canonical_smiles,
    formula: descriptores.molecular_formula,
    descriptores: mapearDescriptores(descriptores),
    lipinski: criterios.filter((c) => c.name !== CRITERIO_FLEXIBILIDAD).map(mapearCriterio),
    flexibilidad: criterios.filter((c) => c.name === CRITERIO_FLEXIBILIDAD).map(mapearCriterio),
    ...(descriptores.lipinski.summary ? { resumenLipinski: descriptores.lipinski.summary } : {}),
    pIC50: prediccion.pic50_prediction,
    ic50nM: prediccion.ic50_nm_prediction,
    etiquetaActividad: prediccion.activity_label,
    confianza: traducirConfianza(prediccion.confidence),
    modelo: prediccion.model_version,
    validadoCientificamente: prediccion.scientifically_validated === true,
    dominio: {
      etiqueta: prediccion.applicability_domain.inside_domain
        ? "Dentro del dominio"
        : "Fuera del dominio",
      similitudMaxima: prediccion.applicability_domain.maximum_similarity,
      nivelConfianza: traducirConfianza(prediccion.applicability_domain.confidence),
    },
    interpretacion: {
      favorables: prediccion.favorable_factors ?? [],
      desfavorables: prediccion.unfavorable_factors ?? [],
    },
    contribuciones: [],
    similares: (similares?.results ?? []).map((r, i) => ({
      id: `${r.name}-${i}`,
      nombre: r.name,
      smiles: r.canonical_smiles,
      ...(r.molecular_formula ? { formula: r.molecular_formula } : {}),
      tanimoto: r.similarity,
      pIC50Experimental: r.experimental_pic50_demo,
    })),
    ...(similares?.method ? { metodoSimilitud: similares.method } : {}),
    ...(similares?.disclaimer ? { notaSimilares: similares.disclaimer } : {}),
    ...(prediccion.disclaimer ? { notaPrediccion: prediccion.disclaimer } : {}),
    ...(descriptores.disclaimer ? { notaLipinski: descriptores.disclaimer } : {}),
    ...(svg ? { svg } : {}),
  };
}
