import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CircleDashed } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoBanner } from "@/components/common/DemoBanner";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScientificDisclaimer } from "@/components/common/ScientificDisclaimer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MODELOS, MODEL_CARD, PIPELINE, SECCIONES_METODOLOGIA } from "@/data/metodologia";

export const Route = createFileRoute("/modelo")({
  head: () => ({
    meta: [
      { title: "Modelo y metodología — MolPredict EGFR" },
      {
        name: "description",
        content:
          "Metodología QSAR del proyecto: limpieza química, descriptores, Morgan Fingerprints, Scaffold Split, validación, dominio de aplicabilidad e interpretabilidad.",
      },
      { property: "og:title", content: "Modelo y metodología — MolPredict EGFR" },
      {
        property: "og:description",
        content: "Pipeline científico y Model Card del proyecto MolPredict EGFR.",
      },
    ],
  }),
  component: Modelo,
});

function Modelo() {
  return (
    <div>
      <PageHeader
        titulo="Modelo y metodología"
        descripcion="Documentación del enfoque científico previsto para la construcción y validación del modelo QSAR."
        etiqueta={<StatusBadge tono="info">Versión demo</StatusBadge>}
      />

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        <DemoBanner texto="Modo demostración — el modelo real todavía no está integrado." />

        {/* Pipeline */}
        <section>
          <h2 className="text-2xl font-semibold">Diagrama del pipeline</h2>
          <ol className="mt-6 flex flex-wrap items-center gap-3">
            {PIPELINE.map((p, i) => (
              <li key={p} className="flex items-center gap-3">
                <span className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium card-soft">
                  {p}
                </span>
                {i < PIPELINE.length - 1 ? (
                  <ArrowRight className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        {/* Secciones */}
        <section>
          <h2 className="text-2xl font-semibold">Metodología</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {SECCIONES_METODOLOGIA.map((s, i) => (
              <Card key={s.id} className="card-soft gap-2 border-border/70 p-6">
                <span className="font-mono text-xs text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold">{s.titulo}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.texto}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Modelos */}
        <section>
          <h2 className="text-2xl font-semibold">Modelos comparados</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {MODELOS.map((m) => (
              <Card key={m.nombre} className="card-soft card-lift gap-3 border-border/70 p-6">
                <h3 className="font-display text-lg font-semibold">{m.nombre}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.descripcion}</p>
                <StatusBadge tono="media">
                  <CircleDashed className="h-3.5 w-3.5" aria-hidden="true" />
                  {m.estado}
                </StatusBadge>
              </Card>
            ))}
          </div>
        </section>

        {/* Model Card */}
        <section>
          <Card className="card-soft border-border/70">
            <CardHeader>
              <CardTitle className="text-base">Model Card</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                {MODEL_CARD.map((c) => (
                  <div
                    key={c.campo}
                    className="grid grid-cols-[minmax(0,1fr)] gap-1 py-3 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt className="text-sm font-medium text-muted-foreground">{c.campo}</dt>
                    <dd className="text-sm text-foreground">{c.valor}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </section>

        <ScientificDisclaimer />
      </div>
    </div>
  );
}
