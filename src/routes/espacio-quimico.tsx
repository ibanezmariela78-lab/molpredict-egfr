import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoBanner } from "@/components/common/DemoBanner";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ChartPanel } from "@/components/common/ChartPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoleculeArt } from "@/components/molecular/MoleculeArt";
import { ESPACIO_QUIMICO } from "@/data/espacioQuimico";
import type { PuntoEspacioQuimico } from "@/types";
import { formatearNumero } from "@/utils/molecula";

export const Route = createFileRoute("/espacio-quimico")({
  head: () => ({
    meta: [
      { title: "Mapa del espacio químico — MolPredict EGFR" },
      {
        name: "description",
        content:
          "Representación bidimensional simulada de compuestos según sus características moleculares, con proyecciones tipo PCA y UMAP.",
      },
      { property: "og:title", content: "Mapa del espacio químico — MolPredict EGFR" },
      {
        property: "og:description",
        content: "Visualización interactiva del espacio químico de inhibidores de EGFR (demo).",
      },
    ],
  }),
  component: EspacioQuimico,
});

const categorias = [
  { clave: "alta", nombre: "Actividad alta", color: "var(--teal)" },
  { clave: "media", nombre: "Actividad media", color: "var(--info)" },
  { clave: "baja", nombre: "Actividad baja", color: "var(--muted-foreground)" },
  { clave: "vecino", nombre: "Vecinos estructurales", color: "var(--warning)" },
  { clave: "consulta", nombre: "Molécula consultada", color: "var(--primary)" },
] as const;

function EspacioQuimico() {
  const [proyeccion, setProyeccion] = useState<"pca" | "umap">("pca");
  const [colorPor, setColorPor] = useState<"pIC50" | "logP" | "pesoMolecular">("pIC50");
  const [ocultas, setOcultas] = useState<string[]>([]);
  const [seleccion, setSeleccion] = useState<PuntoEspacioQuimico | null>(null);

  const series = useMemo(
    () =>
      categorias
        .filter((c) => !ocultas.includes(c.clave))
        .map((c) => ({
          ...c,
          datos: ESPACIO_QUIMICO.filter((p) => p.categoria === c.clave).map((p) => ({
            ...p,
            cx: proyeccion === "pca" ? p.x : p.ux,
            cy: proyeccion === "pca" ? p.y : p.uy,
            z: colorPor === "pIC50" ? p.pIC50 : colorPor === "logP" ? p.logP : p.pesoMolecular,
          })),
        })),
    [proyeccion, colorPor, ocultas],
  );

  const alternar = (clave: string) =>
    setOcultas((o) => (o.includes(clave) ? o.filter((x) => x !== clave) : [...o, clave]));

  return (
    <div>
      <PageHeader
        titulo="Mapa del espacio químico"
        descripcion="Representación bidimensional simulada de compuestos según sus características moleculares."
        etiqueta={<StatusBadge tono="info">Modo demostración</StatusBadge>}
      />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <DemoBanner />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          <ChartPanel
            titulo="Proyección de compuestos"
            descripcion="Usá la rueda del mouse sobre el gráfico y la leyenda para filtrar categorías."
            acciones={
              <div className="flex flex-wrap gap-2">
                <Select value={proyeccion} onValueChange={(v) => setProyeccion(v as "pca" | "umap")}>
                  <SelectTrigger className="w-28" aria-label="Tipo de proyección">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pca">PCA</SelectItem>
                    <SelectItem value="umap">UMAP</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={colorPor}
                  onValueChange={(v) => setColorPor(v as typeof colorPor)}
                >
                  <SelectTrigger className="w-40" aria-label="Variable de tamaño y color">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pIC50">Color por pIC50</SelectItem>
                    <SelectItem value="logP">Color por LogP</SelectItem>
                    <SelectItem value="pesoMolecular">Color por peso molecular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }
          >
            <div className="h-[26rem] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="cx"
                    name={proyeccion === "pca" ? "PC1" : "UMAP-1"}
                    tick={{ fontSize: 11 }}
                    stroke="var(--muted-foreground)"
                  />
                  <YAxis
                    type="number"
                    dataKey="cy"
                    name={proyeccion === "pca" ? "PC2" : "UMAP-2"}
                    tick={{ fontSize: 11 }}
                    stroke="var(--muted-foreground)"
                  />
                  <ZAxis type="number" dataKey="z" range={[40, 240]} />
                  <RTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    formatter={(v: number | string, n: string) => [String(v), n]}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {series.map((s) => (
                    <Scatter
                      key={s.clave}
                      name={s.nombre}
                      data={s.datos}
                      fill={s.color}
                      fillOpacity={s.clave === "consulta" ? 1 : 0.7}
                      onClick={(d: unknown) => setSeleccion(d as PuntoEspacioQuimico)}
                      cursor="pointer"
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {categorias.map((c) => (
                <button
                  key={c.clave}
                  type="button"
                  onClick={() => alternar(c.clave)}
                  aria-pressed={!ocultas.includes(c.clave)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    ocultas.includes(c.clave)
                      ? "border-border text-muted-foreground opacity-50"
                      : "border-teal/40 text-foreground"
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                    aria-hidden="true"
                  />
                  {c.nombre}
                </button>
              ))}
            </div>
          </ChartPanel>

          <div className="space-y-6">
            <Card className="card-soft border-border/70">
              <CardHeader>
                <CardTitle className="text-base">Compuesto seleccionado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {seleccion ? (
                  <>
                    <div className="grid place-items-center rounded-xl border border-border bg-surface p-3">
                      <div className="h-28 w-28">
                        <MoleculeArt seed={5} />
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-semibold">{seleccion.nombre}</h3>
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <dt className="text-xs text-muted-foreground">pIC50</dt>
                        <dd className="font-mono">{formatearNumero(seleccion.pIC50)}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Peso molecular</dt>
                        <dd className="font-mono">
                          {formatearNumero(seleccion.pesoMolecular, 1)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">LogP</dt>
                        <dd className="font-mono">{formatearNumero(seleccion.logP, 1)}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">TPSA</dt>
                        <dd className="font-mono">{formatearNumero(seleccion.tpsa, 1)} Å²</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Similitud</dt>
                        <dd className="font-mono">{seleccion.similitud.toFixed(2)}</dd>
                      </div>
                    </dl>
                    <Button asChild className="w-full">
                      <Link to="/predictor">Analizar</Link>
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Seleccioná un punto del gráfico para ver el detalle del compuesto.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="card-soft border-border/70">
              <CardHeader>
                <CardTitle className="text-base">¿Qué representa este gráfico?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Cada punto es una molécula. Su posición resume, en dos dimensiones, muchas
                  características estructurales y fisicoquímicas a la vez.
                </p>
                <p>
                  Las moléculas cercanas comparten propiedades similares, por lo que suelen
                  presentar comportamientos biológicos parecidos.
                </p>
                <p className="text-foreground">
                  El gráfico actual utiliza datos simulados: no proviene de un PCA ni de un UMAP
                  entrenado.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Proyección activa
              </Label>
              <p className="text-sm">
                {proyeccion === "pca" ? "PCA (componentes principales)" : "UMAP (no lineal)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
