import { Card } from "@/components/ui/card";
import { EducationalTooltip } from "@/components/common/EducationalTooltip";
import type { Descriptor } from "@/types";
import { cn } from "@/lib/utils";

export function DescriptorCard({ descriptor }: { descriptor: Descriptor }) {
  const porcentaje = Math.min(
    100,
    Math.max(
      2,
      ((descriptor.numero - descriptor.min) / (descriptor.max - descriptor.min)) * 100,
    ),
  );

  return (
    <Card className="card-soft gap-3 border-border/70 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {descriptor.nombre}
        </span>
        <EducationalTooltip texto={descriptor.tooltip} etiqueta={descriptor.nombre} />
      </div>
      <p className="font-display text-2xl font-semibold text-foreground">
        {descriptor.valor}
        {descriptor.unidad ? (
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            {descriptor.unidad}
          </span>
        ) : null}
      </p>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`${descriptor.nombre}: ${descriptor.valor} dentro del rango ${descriptor.min} a ${descriptor.max}`}
      >
        <div
          className={cn("h-full rounded-full bg-teal transition-all")}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{descriptor.min}</span>
        <span>{descriptor.max}</span>
      </div>
    </Card>
  );
}
