import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Loader2 } from "lucide-react";
import { MoleculeArt } from "@/components/molecular/MoleculeArt";
import { PASOS_ANALISIS } from "@/data/prediccion";

export function LoadingAnalysis({ onFinish }: { onFinish: () => void }) {
  const [paso, setPaso] = useState(0);

  useEffect(() => {
    if (paso >= PASOS_ANALISIS.length) {
      const t = setTimeout(onFinish, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPaso((p) => p + 1), 700);
    return () => clearTimeout(t);
  }, [paso, onFinish]);

  const progreso = Math.round((paso / PASOS_ANALISIS.length) * 100);

  return (
    <Card className="card-soft items-center gap-6 border-border/70 px-6 py-12">
      <div className="h-28 w-28 opacity-90">
        <MoleculeArt seed={7} animated />
      </div>

      <div className="w-full max-w-md">
        <Progress value={progreso} aria-label="Progreso del análisis" />
        <p className="mt-2 text-center text-xs text-muted-foreground">{progreso}% completado</p>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {PASOS_ANALISIS.map((p, i) => {
          const hecho = i < paso;
          const activo = i === paso;
          return (
            <li
              key={p}
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-surface/60 px-3 py-2 text-sm"
            >
              {hecho ? (
                <Check className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              ) : activo ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-teal" aria-hidden="true" />
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border border-border" />
              )}
              <span className={hecho || activo ? "text-foreground" : "text-muted-foreground"}>
                {p}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
