import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EducationalTooltip({ texto, etiqueta }: { texto: string; etiqueta: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`Más información sobre ${etiqueta}`}
          className="rounded-full p-0.5 text-muted-foreground transition-colors hover:text-teal"
        >
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-64 text-xs leading-relaxed">{texto}</TooltipContent>
    </Tooltip>
  );
}
