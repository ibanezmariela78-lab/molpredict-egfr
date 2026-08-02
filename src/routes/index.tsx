import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Atom,
  BarChart3,
  Beaker,
  BrainCircuit,
  FlaskConical,
  Layers,
  LineChart,
  Network,
  ScanSearch,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MetricCard } from "@/components/common/MetricCard";
import { MoleculeArt } from "@/components/molecular/MoleculeArt";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MolPredict EGFR — Predicción molecular con inteligencia artificial" },
      {
        name: "description",
        content:
          "Plataforma experimental de análisis QSAR para estimar la actividad inhibitoria de compuestos frente al receptor EGFR. Proyecto de portfolio con datos demostrativos.",
      },
      {
        property: "og:title",
        content: "MolPredict EGFR — Predicción molecular con inteligencia artificial",
      },
      {
        property: "og:description",
        content:
          "Análisis QSAR experimental de inhibidores de EGFR: descriptores, predicción de pIC50 y espacio químico.",
      },
    ],
  }),
  component: Inicio,
});

const pasos = [
  {
    icono: Beaker,
    titulo: "Ingreso de SMILES",
    texto: "La estructura química se escribe en notación SMILES y se valida sintácticamente.",
  },
  {
    icono: Layers,
    titulo: "Cálculo de descriptores",
    texto: "Se derivan propiedades fisicoquímicas y Morgan Fingerprints de 2048 bits.",
  },
  {
    icono: BrainCircuit,
    titulo: "Análisis mediante modelo QSAR",
    texto: "Un ensemble de regresión estima la potencia inhibitoria frente a EGFR.",
  },
  {
    icono: LineChart,
    titulo: "Predicción e interpretación",
    texto: "Se reporta el pIC50 con confianza, dominio de aplicabilidad e interpretación.",
  },
];

const capacidades = [
  {
    icono: ShieldCheck,
    titulo: "Validación molecular",
    texto: "Revisión de la sintaxis SMILES y normalización de la estructura antes del análisis.",
  },
  {
    icono: Atom,
    titulo: "Descriptores fisicoquímicos",
    texto: "Peso molecular, LogP, TPSA, donantes y aceptores de hidrógeno, entre otros.",
  },
  {
    icono: BrainCircuit,
    titulo: "Predicción QSAR",
    texto: "Estimación de pIC50 e IC50 a partir de la relación estructura-actividad.",
  },
  {
    icono: Share2,
    titulo: "Similitud estructural",
    texto: "Comparación por similitud de Tanimoto con inhibidores de referencia.",
  },
  {
    icono: ScanSearch,
    titulo: "Espacio químico",
    texto: "Proyección bidimensional de compuestos según sus características moleculares.",
  },
  {
    icono: Sparkles,
    titulo: "Inteligencia artificial explicable",
    texto: "Atribución de contribuciones por descriptor con enfoque tipo SHAP.",
  },
];

const metricas = [
  { valor: "3.842", etiqueta: "Moléculas analizadas" },
  { valor: "2048", etiqueta: "Variables estructurales" },
  { valor: "12", etiqueta: "Descriptores moleculares" },
  { valor: "3", etiqueta: "Modelos comparados" },
];

const stack = [
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "RDKit",
  "Scikit-learn",
  "XGBoost",
  "SHAP",
  "AWS",
];

function Inicio() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
          <div className="min-w-0 fade-up">
            <StatusBadge tono="info">
              <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
              Proyecto experimental de portfolio
            </StatusBadge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.4rem]">
              Análisis molecular y{" "}
              <span className="brand-gradient-text">predicción computacional demostrativa</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Plataforma experimental de quimioinformática para explorar propiedades moleculares y
              demostrar un futuro flujo QSAR orientado al receptor EGFR.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/predictor">Probar predictor</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/modelo">Ver metodología</Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-80 min-w-0">
            <div className="absolute inset-0 rounded-3xl border border-border/70 bg-card/60 hex-pattern card-soft" />
            <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80">
              <MoleculeArt seed={2} />
            </div>

            <Card className="card-soft absolute -left-2 top-4 gap-0.5 border-border/70 px-4 py-3 sm:left-0">
              <span className="text-[10px] tracking-wide text-muted-foreground">
                pIC50 ilustrativo
              </span>
              <span className="font-display text-xl font-semibold text-teal">7.21</span>
            </Card>

            <Card className="card-soft absolute -right-1 top-1/3 gap-0.5 border-border/70 px-4 py-3">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Confianza demo
              </span>
              <span className="font-display text-base font-semibold">Demo</span>
            </Card>

            <Card className="card-soft absolute bottom-2 left-6 gap-0.5 border-border/70 px-4 py-3">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Dominio ilustrativo
              </span>
              <span className="font-display text-base font-semibold">Ilustrativo</span>
            </Card>

            <span className="absolute inset-x-0 -bottom-7 mx-auto block w-fit rounded-full border border-border/70 bg-card/80 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Datos demostrativos
            </span>
          </div>
        </div>
      </section>

      {/* Funcionamiento */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold">Cómo funciona</h2>
          <p className="mt-3 text-muted-foreground">
            Un flujo de quimioinformática clásico, desde la estructura hasta la interpretación
            del resultado.
          </p>
        </div>

        <ol className="relative mt-12 grid gap-8 md:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-teal/50 via-primary/30 to-transparent md:block"
          />
          {pasos.map((p, i) => (
            <li key={p.titulo} className="relative min-w-0">
              <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-teal/30 bg-card text-teal card-soft">
                <p.icono className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="mt-4 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Paso {i + 1}
              </span>
              <h3 className="mt-1 text-base font-semibold">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Capacidades */}
      <section className="border-y border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold">Capacidades de la plataforma</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capacidades.map((c) => (
              <Card key={c.titulo} className="card-soft card-lift gap-3 border-border/70 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <c.icono className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold">{c.titulo}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.texto}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Métricas */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="min-w-0">
            <h2 className="text-3xl font-semibold">Métricas del conjunto</h2>
            <p className="mt-2 text-muted-foreground">
              Escala prevista del proyecto una vez integrado el dataset completo.
            </p>
          </div>
          <StatusBadge tono="info">
            <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
            Datos ilustrativos de demostración
          </StatusBadge>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metricas.map((m) => (
            <MetricCard key={m.etiqueta} valor={m.valor} etiqueta={m.etiqueta} icono={Network} />
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold">Stack técnico previsto</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-card px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-teal/50 hover:text-teal"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
