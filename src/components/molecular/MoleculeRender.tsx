import { MoleculeArt } from "@/components/molecular/MoleculeArt";

/**
 * Muestra el SVG molecular generado por RDKit en el backend cuando está
 * disponible. Si no hay SVG, conserva la ilustración abstracta actual.
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
  if (svg && svg.includes("<svg")) {
    // Se elimina el prólogo XML para poder insertar el SVG en el documento HTML.
    const limpio = svg.slice(svg.indexOf("<svg"));
    return (
      <div
        className={className}
        role="img"
        aria-label="Estructura molecular 2D generada con RDKit"
        // El SVG proviene del backend propio de MolPredict.
        dangerouslySetInnerHTML={{ __html: limpio }}
      />
    );
  }
  return <MoleculeArt seed={seed} className={className} />;
}
