export type NivelActividad = "alta" | "media" | "baja";

export interface Compuesto {
  id: string;
  nombre: string;
  smiles: string;
  pIC50: number;
  pIC50Predicho: number;
  pesoMolecular: number;
  logP: number;
  tpsa: number;
  similitud: number;
  actividad: NivelActividad;
  donantesH: number;
  aceptoresH: number;
}

export interface Descriptor {
  clave: string;
  nombre: string;
  valor: string;
  numero: number;
  min: number;
  max: number;
  unidad?: string;
  tooltip: string;
}

export interface PuntoEspacioQuimico {
  id: string;
  nombre: string;
  x: number;
  y: number;
  ux: number;
  uy: number;
  pIC50: number;
  logP: number;
  pesoMolecular: number;
  tpsa: number;
  similitud: number;
  categoria: "alta" | "media" | "baja" | "consulta" | "vecino";
}

export interface FactorSHAP {
  nombre: string;
  contribucion: number;
}

export interface ReglaLipinski {
  criterio: string;
  valor: string;
  limite: string;
  cumple: boolean;
}
