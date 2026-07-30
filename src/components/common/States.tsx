import type { ReactNode } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MoleculeArt } from "@/components/molecular/MoleculeArt";
import { cn } from "@/lib/utils";

export function EmptyState({
  titulo,
  descripcion,
  accion,
  className,
}: {
  titulo: string;
  descripcion?: string;
  accion?: ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "card-soft items-center gap-4 border-dashed border-border/80 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="h-32 w-32 opacity-70">
        <MoleculeArt seed={4} />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{titulo}</h3>
      {descripcion ? (
        <p className="max-w-md text-sm text-muted-foreground">{descripcion}</p>
      ) : null}
      {accion}
    </Card>
  );
}

export function ErrorState({
  titulo = "No se pudo completar la operación",
  descripcion,
  accion,
  className,
}: {
  titulo?: string;
  descripcion?: string;
  accion?: ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "card-soft items-center gap-3 border-destructive/35 bg-destructive/5 px-6 py-10 text-center",
        className,
      )}
    >
      <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
      <h3 className="text-base font-semibold text-foreground">{titulo}</h3>
      {descripcion ? <p className="text-sm text-muted-foreground">{descripcion}</p> : null}
      {accion}
    </Card>
  );
}

export function InlineLoading({ texto }: { texto: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      {texto}
    </span>
  );
}
