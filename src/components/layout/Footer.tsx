import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Hexagon } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr] lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Hexagon className="h-5 w-5 text-teal" aria-hidden="true" />
            <span className="font-display text-lg font-semibold">MolPredict EGFR</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Proyecto de portfolio que integra química medicinal, quimioinformática y machine
            learning en una plataforma experimental de predicción QSAR.
          </p>
        </div>

        <nav aria-label="Navegación del pie de página" className="min-w-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Plataforma
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/predictor" className="transition-colors hover:text-teal">
                Predictor
              </Link>
            </li>
            <li>
              <Link to="/explorador" className="transition-colors hover:text-teal">
                Explorador
              </Link>
            </li>
            <li>
              <Link to="/modelo" className="transition-colors hover:text-teal">
                Metodología
              </Link>
            </li>
            <li>
              <Link to="/sobre-el-proyecto" className="transition-colors hover:text-teal">
                Sobre el proyecto
              </Link>
            </li>
          </ul>
        </nav>

        <div className="min-w-0">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Contacto
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="https://github.com/usuario"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-teal"
              >
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/usuario"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-teal"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>
            Disclaimer científico: MolPredict EGFR es una demostración educativa. Los valores
            mostrados son simulados y no deben utilizarse para decisiones clínicas, regulatorias
            ni experimentales.
          </p>
          <p>© {new Date().getFullYear()} MolPredict EGFR — Proyecto de portfolio.</p>
        </div>
      </div>
    </footer>
  );
}
