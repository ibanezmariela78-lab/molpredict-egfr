import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({
  valor,
  etiqueta,
  icono: Icono,
  nota,
  className,
}: {
  valor: string;
  etiqueta: string;
  icono?: LucideIcon;
  nota?: string;
  className?: string;
}) {
  return (
    <Card className={cn("card-soft card-lift gap-2 border-border/70 p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {etiqueta}
        </span>
        {Icono ? <Icono className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" /> : null}
      </div>
      <p className="font-display text-3xl font-semibold text-foreground">{valor}</p>
      {nota ? <p className="text-xs text-muted-foreground">{nota}</p> : null}
    </Card>
  );
}
