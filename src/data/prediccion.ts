import type { Descriptor, FactorSHAP, ReglaLipinski } from "@/types";

/** Resultado SIMULADO de predicción — no proviene de ningún modelo real. */
export const PREDICCION_DEMO = {
  smilesCanonico: "COc1cc2ncnc(Nc3ccc(F)c(Cl)c3)c2cc1OCCCN1CCOCC1",
  formula: "C22H24ClFN4O3",
  pIC50: 7.21,
  ic50nM: 61.7,
  confianza: "Media" as const,
  modelo: "Simulación QSAR v0.1",
  similitudMaxima: 0.78,
  dominio: "Dentro del dominio",
};

export const DESCRIPTORES: Descriptor[] = [
  {
    clave: "mw",
    nombre: "Peso molecular",
    valor: "446.9",
    numero: 446.9,
    min: 0,
    max: 700,
    unidad: "g/mol",
    tooltip:
      "Masa de la molécula. Valores por debajo de 500 g/mol suelen asociarse a mejor absorción oral.",
  },
  {
    clave: "logp",
    nombre: "LogP",
    valor: "4.1",
    numero: 4.1,
    min: -2,
    max: 8,
    tooltip:
      "Coeficiente de partición octanol/agua: estima la lipofilia del compuesto.",
  },
  {
    clave: "tpsa",
    nombre: "TPSA",
    valor: "68.7",
    numero: 68.7,
    min: 0,
    max: 160,
    unidad: "Å²",
    tooltip:
      "Área polar superficial topológica. Se relaciona con la permeabilidad de membranas.",
  },
  {
    clave: "hbd",
    nombre: "Donantes de H",
    valor: "1",
    numero: 1,
    min: 0,
    max: 10,
    tooltip: "Número de grupos capaces de donar enlaces de hidrógeno.",
  },
  {
    clave: "hba",
    nombre: "Aceptores de H",
    valor: "7",
    numero: 7,
    min: 0,
    max: 15,
    tooltip: "Número de átomos capaces de aceptar enlaces de hidrógeno.",
  },
  {
    clave: "rotb",
    nombre: "Enlaces rotables",
    valor: "6",
    numero: 6,
    min: 0,
    max: 15,
    tooltip:
      "Indica flexibilidad conformacional. Valores altos pueden reducir la afinidad de unión.",
  },
  {
    clave: "arom",
    nombre: "Anillos aromáticos",
    valor: "3",
    numero: 3,
    min: 0,
    max: 6,
    tooltip:
      "Los sistemas aromáticos participan en interacciones π con el sitio activo.",
  },
  {
    clave: "csp3",
    nombre: "Fracción Csp3",
    valor: "0.22",
    numero: 0.22,
    min: 0,
    max: 1,
    tooltip:
      "Proporción de carbonos sp3. Refleja el grado de tridimensionalidad de la estructura.",
  },
];

export const LIPINSKI: ReglaLipinski[] = [
  { criterio: "Peso molecular", valor: "446.9 g/mol", limite: "≤ 500", cumple: true },
  { criterio: "LogP", valor: "4.1", limite: "≤ 5", cumple: true },
  { criterio: "Donantes de H", valor: "1", limite: "≤ 5", cumple: true },
  { criterio: "Aceptores de H", valor: "7", limite: "≤ 10", cumple: true },
  { criterio: "Enlaces rotables", valor: "6", limite: "≤ 5", cumple: false },
];

export const FACTORES_FAVORABLES = [
  "Patrón aromático similar a inhibidores conocidos",
  "Cantidad adecuada de aceptores de hidrógeno",
  "TPSA dentro del rango observado en el conjunto activo",
];

export const FACTORES_DESFAVORABLES = [
  "Flexibilidad molecular elevada",
  "Lipofilia superior al promedio del conjunto",
  "Similitud moderada con el conjunto de entrenamiento",
];

export const CONTRIBUCIONES_SHAP: FactorSHAP[] = [
  { nombre: "Núcleo quinazolina", contribucion: 0.62 },
  { nombre: "Aceptores de H", contribucion: 0.38 },
  { nombre: "TPSA", contribucion: 0.24 },
  { nombre: "Anillos aromáticos", contribucion: 0.17 },
  { nombre: "Fracción Csp3", contribucion: -0.12 },
  { nombre: "LogP", contribucion: -0.29 },
  { nombre: "Enlaces rotables", contribucion: -0.41 },
];

export const PASOS_ANALISIS = [
  "Validando estructura",
  "Calculando descriptores",
  "Generando fingerprints",
  "Ejecutando modelo",
  "Preparando explicación",
];
