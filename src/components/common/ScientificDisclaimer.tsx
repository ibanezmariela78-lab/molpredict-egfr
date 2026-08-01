import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScientificDisclaimer({
  className,
  texto,
}: {
  className?: string;
  texto?: string;
}) {
  return (
    <aside
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-foreground",
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
      <p>
        {texto ??
          "Esta herramienta es experimental y educativa. Los resultados demostrativos o computacionales no reemplazan ensayos químicos, biológicos, toxicológicos, preclínicos ni clínicos, ni deben utilizarse para tomar decisiones médicas."}
      </p>
    </aside>
  );
}
