import { MoleculeArt } from "@/components/molecular/MoleculeArt";

/**
 * Muestra el SVG molecular generado por el backend cuando está disponible.
 * En modo demostración (svg vacío) conserva la ilustración abstracta actual.
 */
export function MoleculeRender({
  svg,
  seed = 3,
  className,
}: {
  svg?: string;
  seed?: number;
  className?: string;
}) {
  if (svg && svg.trim().startsWith("<svg")) {
    return (
      <div
        className={className}
        role="img"
        aria-label="Estructura molecular generada por el servicio de predicción"
        // El SVG proviene del backend propio de MolPredict.
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  return <MoleculeArt seed={seed} className={className} />;
}
