import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MoleculeThumb } from "@/components/molecular/MoleculeArt";
import type { Compuesto } from "@/types";
import { etiquetaActividad, formatearNumero, resumirSmiles } from "@/utils/molecula";

export function MoleculeCard({
  compuesto,
  indice = 1,
  accion,
  onAccion,
}: {
  compuesto: Compuesto;
  indice?: number;
  accion?: string;
  onAccion?: (c: Compuesto) => void;
}) {
  return (
    <Card className="card-soft card-lift gap-4 border-border/70 p-5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-border bg-surface">
          <MoleculeThumb seed={indice} />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold text-foreground">
            {compuesto.nombre}
          </h3>
          <p className="truncate font-mono text-xs text-muted-foreground">{compuesto.id}</p>
        </div>
      </div>

      <p className="truncate font-mono text-xs text-muted-foreground" title={compuesto.smiles}>
        {resumirSmiles(compuesto.smiles, 34)}
      </p>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">pIC50 exp.</dt>
          <dd className="font-display font-semibold">{formatearNumero(compuesto.pIC50)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">pIC50 pred.</dt>
          <dd className="font-display font-semibold">
            {formatearNumero(compuesto.pIC50Predicho)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Peso molecular</dt>
          <dd>{formatearNumero(compuesto.pesoMolecular, 1)} g/mol</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">LogP</dt>
          <dd>{formatearNumero(compuesto.logP, 1)}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusBadge tono={compuesto.actividad}>
          {etiquetaActividad(compuesto.actividad)}
        </StatusBadge>
        {accion ? (
          <Button size="sm" variant="outline" onClick={() => onAccion?.(compuesto)}>
            {accion}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
