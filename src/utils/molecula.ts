import type { NivelActividad } from "@/types";

export function resumirSmiles(smiles: string, max = 28) {
  return smiles.length > max ? `${smiles.slice(0, max)}…` : smiles;
}

export function etiquetaActividad(nivel: NivelActividad) {
  switch (nivel) {
    case "alta":
      return "Actividad alta";
    case "media":
      return "Actividad moderada";
    default:
      return "Actividad baja";
  }
}

export function nivelDesdePIC50(valor: number): NivelActividad {
  if (valor >= 7) return "alta";
  if (valor >= 6) return "media";
  return "baja";
}

export function formatearNumero(valor: number, decimales = 2) {
  return valor.toLocaleString("es-AR", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

/** Validación superficial de SMILES, solo para la demo visual. */
export function validarSmiles(smiles: string) {
  const limpio = smiles.trim();
  if (!limpio) return { valido: false, mensaje: "Ingresá una cadena SMILES." };
  if (!/^[A-Za-z0-9@+\-\[\]\(\)\\\/%=#$.:*]+$/.test(limpio))
    return { valido: false, mensaje: "La cadena contiene caracteres no válidos." };
  const abiertos = (limpio.match(/\(/g) ?? []).length;
  const cerrados = (limpio.match(/\)/g) ?? []).length;
  if (abiertos !== cerrados)
    return { valido: false, mensaje: "Los paréntesis no están balanceados." };
  if (limpio.length < 4)
    return { valido: false, mensaje: "La estructura es demasiado corta." };
  return { valido: true, mensaje: "Estructura válida" };
}
