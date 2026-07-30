import type { PuntoEspacioQuimico } from "@/types";
import { COMPUESTOS } from "./compuestos";

/** Coordenadas SIMULADAS: no provienen de un PCA/UMAP real. */
function pseudoAleatorio(semilla: number) {
  const x = Math.sin(semilla * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const base: PuntoEspacioQuimico[] = COMPUESTOS.map((c, i) => {
  const r = pseudoAleatorio(i + 1);
  const r2 = pseudoAleatorio(i + 31);
  const centro =
    c.actividad === "alta" ? [2.1, 1.4] : c.actividad === "media" ? [-0.4, -0.2] : [-2.3, -1.6];
  return {
    id: c.id,
    nombre: c.nombre,
    x: centro[0] + (r - 0.5) * 2.4,
    y: centro[1] + (r2 - 0.5) * 2.4,
    ux: centro[1] * 1.3 + (r2 - 0.5) * 3,
    uy: centro[0] * 1.1 + (r - 0.5) * 3,
    pIC50: c.pIC50,
    logP: c.logP,
    pesoMolecular: c.pesoMolecular,
    tpsa: c.tpsa,
    similitud: c.similitud,
    categoria: c.actividad,
  };
});

const relleno: PuntoEspacioQuimico[] = Array.from({ length: 60 }, (_, i) => {
  const r = pseudoAleatorio(i + 101);
  const r2 = pseudoAleatorio(i + 211);
  const r3 = pseudoAleatorio(i + 307);
  const cat: PuntoEspacioQuimico["categoria"] =
    r3 > 0.66 ? "alta" : r3 > 0.33 ? "media" : "baja";
  const centro = cat === "alta" ? [2.1, 1.4] : cat === "media" ? [-0.4, -0.2] : [-2.3, -1.6];
  const pIC50 = cat === "alta" ? 7.2 + r * 1.8 : cat === "media" ? 6 + r * 1.2 : 4.3 + r * 1.4;
  return {
    id: `DEMO-${i + 100}`,
    nombre: `Compuesto demo ${i + 100}`,
    x: centro[0] + (r - 0.5) * 3.4,
    y: centro[1] + (r2 - 0.5) * 3.4,
    ux: centro[1] * 1.3 + (r2 - 0.5) * 4,
    uy: centro[0] * 1.1 + (r - 0.5) * 4,
    pIC50: Number(pIC50.toFixed(2)),
    logP: Number((0.5 + r2 * 5).toFixed(1)),
    pesoMolecular: Number((180 + r * 380).toFixed(1)),
    tpsa: Number((30 + r2 * 90).toFixed(1)),
    similitud: Number((0.2 + r3 * 0.6).toFixed(2)),
    categoria: cat,
  };
});

export const CONSULTA: PuntoEspacioQuimico = {
  id: "QUERY",
  nombre: "Molécula consultada",
  x: 1.7,
  y: 1.05,
  ux: 1.2,
  uy: 1.9,
  pIC50: 7.21,
  logP: 4.1,
  pesoMolecular: 446.9,
  tpsa: 68.7,
  similitud: 1,
  categoria: "consulta",
};

const vecinos: PuntoEspacioQuimico[] = base
  .slice(0, 5)
  .map((p) => ({ ...p, id: `${p.id}-N`, categoria: "vecino" as const }));

export const ESPACIO_QUIMICO: PuntoEspacioQuimico[] = [
  ...base,
  ...relleno,
  ...vecinos,
  CONSULTA,
];
