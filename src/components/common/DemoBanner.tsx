import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

export function DemoBanner({ className, texto }: { className?: string; texto?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm text-accent-foreground",
        className,
      )}
    >
      <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>{texto ?? "Modo demostración — resultados y métricas ilustrativas."}</p>
    </div>
  );
}
