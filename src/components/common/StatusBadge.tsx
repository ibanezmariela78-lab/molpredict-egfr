import { cn } from "@/lib/utils";
import type { NivelActividad } from "@/types";

const estilos: Record<string, string> = {
  alta: "border-success/40 bg-success/12 text-success",
  media: "border-warning/45 bg-warning/12 text-warning",
  baja: "border-border bg-muted text-muted-foreground",
  info: "border-teal/40 bg-teal/12 text-teal",
  neutro: "border-border bg-secondary text-secondary-foreground",
};

export function StatusBadge({
  children,
  tono = "neutro",
  className,
}: {
  children: React.ReactNode;
  tono?: NivelActividad | "info" | "neutro";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        estilos[tono],
        className,
      )}
    >
      {children}
    </span>
  );
}
