import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  titulo,
  descripcion,
  etiqueta,
  acciones,
  className,
}: {
  titulo: string;
  descripcion?: string;
  etiqueta?: ReactNode;
  acciones?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-border bg-surface/60 hex-pattern", className)}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end lg:px-8">
        <div className="min-w-0">
          {etiqueta}
          <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">{titulo}</h1>
          {descripcion ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {descripcion}
            </p>
          ) : null}
        </div>
        {acciones ? <div className="flex flex-wrap gap-3">{acciones}</div> : null}
      </div>
    </header>
  );
}
