import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import { TEXTOS_DEMO } from "@/data/molpredictDemoData";

export function DemoBanner({
  className,
  texto,
  secundario,
}: {
  className?: string;
  texto?: string;
  secundario?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-accent/50 px-4 py-3 text-sm text-accent-foreground",
        className,
      )}
    >
      <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 space-y-0.5">
        <p>{texto ?? TEXTOS_DEMO.banner}</p>
        <p className="text-xs text-muted-foreground">
          {secundario ?? TEXTOS_DEMO.bannerSecundario}
        </p>
      </div>
    </div>
  );
}
