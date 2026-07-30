import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/sobre-el-proyecto")({
  head: () => ({
    meta: [
      { title: "Sobre el proyecto — MolPredict EGFR" },
      {
        name: "description",
        content:
          "MolPredict EGFR integra química farmacéutica, ciencia de datos, machine learning y desarrollo frontend en un proyecto de portfolio interdisciplinario.",
      },
      { property: "og:title", content: "Sobre el proyecto — MolPredict EGFR" },
      {
        property: "og:description",
        content: "Un proyecto interdisciplinario entre química farmacéutica e inteligencia artificial.",
      },
    ],
  }),
  component: SobreElProyecto,
});

const bloques = [
  {
    titulo: "Química farmacéutica",
    items: [
      "Relación estructura-actividad",
      "Bioactividad",
      "Propiedades moleculares",
      "Química medicinal",
      "QSAR",
      "Análisis de potencia",
    ],
  },
  {
    titulo: "Ciencia de datos",
    items: [
      "Limpieza de datos",
      "Análisis exploratorio",
      "Ingeniería de características",
      "Validación",
      "Visualización",
      "Estadística",
    ],
  },
  {
    titulo: "Inteligencia artificial",
    items: [
      "Regresión",
      "Modelos ensemble",
      "Interpretabilidad",
      "Dominio de aplicabilidad",
      "Evaluación",
      "MLOps",
    ],
  },
  {
    titulo: "Desarrollo",
    items: ["React", "TypeScript", "APIs", "AWS", "Arquitectura cloud", "Despliegue"],
  },
];

const arquitectura = [
  "React",
  "API Gateway",
  "FastAPI",
  "Modelo QSAR",
  "AWS SageMaker",
  "Almacenamiento S3",
];

function SobreElProyecto() {
  return (
    <div>
      <PageHeader
        titulo="Un proyecto interdisciplinario entre química farmacéutica e inteligencia artificial"
        descripcion="MolPredict EGFR fue diseñado para demostrar la integración de química medicinal, ciencia de datos, machine learning, desarrollo frontend, arquitectura cloud y comunicación científica en una sola plataforma."
        etiqueta={<StatusBadge tono="info">Proyecto de portfolio</StatusBadge>}
      />

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-2xl font-semibold">Habilidades demostradas</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bloques.map((b) => (
              <Card key={b.titulo} className="card-soft card-lift gap-3 border-border/70 p-6">
                <h3 className="font-display text-base font-semibold">{b.titulo}</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {b.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                        aria-hidden="true"
                      />
                      {i}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Arquitectura prevista</h2>
          <div className="mt-6 rounded-2xl border border-border bg-surface/60 hex-pattern p-6">
            <ol className="flex flex-wrap items-center gap-3">
              {arquitectura.map((a, i) => (
                <li key={a} className="flex items-center gap-3">
                  <span className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium card-soft">
                    {a}
                  </span>
                  {i < arquitectura.length - 1 ? (
                    <ArrowRight className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-muted-foreground">
              Arquitectura proyectada. La primera versión funciona con datos demostrativos.
            </p>
          </div>
        </section>

        <section>
          <Card className="card-soft border-border/70">
            <CardHeader>
              <CardTitle className="text-base">Contacto</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="https://github.com/usuario" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" aria-hidden="true" /> Ver GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://linkedin.com/in/usuario" target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" aria-hidden="true" /> Ver LinkedIn
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="#" download>
                  <Download className="h-4 w-4" aria-hidden="true" /> Descargar resumen del
                  proyecto
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
