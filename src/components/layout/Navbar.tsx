import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Hexagon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const enlaces = [
  { to: "/", label: "Inicio" },
  { to: "/predictor", label: "Predictor" },
  { to: "/explorador", label: "Explorador" },
  { to: "/espacio-quimico", label: "Espacio químico" },
  { to: "/modelo", label: "Modelo" },
  { to: "/sobre-el-proyecto", label: "Sobre el proyecto" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="MolPredict — inicio">
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-teal/30 bg-accent/60">
        <Hexagon className="h-5 w-5 text-teal" aria-hidden="true" />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-base font-semibold text-foreground">
          MolPredict
        </span>
        <span className="block truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          EGFR Intelligence Platform
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {enlaces.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              activeOptions={{ exact: e.to === "/" }}
              activeProps={{ className: "text-teal bg-accent/60" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"
            >
              {e.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/predictor">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Analizar molécula
            </Link>
          </Button>

          <Sheet open={abierto} onOpenChange={setAbierto}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Abrir menú">
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-display">MolPredict EGFR</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {enlaces.map((e) => (
                  <Link
                    key={e.to}
                    to={e.to}
                    onClick={() => setAbierto(false)}
                    activeOptions={{ exact: e.to === "/" }}
                    activeProps={{ className: "text-teal bg-accent/60" }}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {e.label}
                  </Link>
                ))}
                <Button asChild className="mt-3">
                  <Link to="/predictor" onClick={() => setAbierto(false)}>
                    Analizar molécula
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
