import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  Check,
  Copy,
  Gauge,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EducationalTooltip } from "@/components/common/EducationalTooltip";
import { DescriptorCard } from "@/components/molecular/DescriptorCard";
import { MoleculeThumb } from "@/components/molecular/MoleculeArt";
import { MoleculeRender } from "@/components/molecular/MoleculeRender";
import { ScientificDisclaimer } from "@/components/common/ScientificDisclaimer";
import { ChartPanel } from "@/components/common/ChartPanel";
import {
  DEMO_MOLPREDICT,
  TEXTOS_DEMO,
  type MoleculaSimilarDemo,
} from "@/data/molpredictDemoData";
import { DEMO_MODE } from "@/config/api";
import { formatearNumero } from "@/utils/molecula";

function MedidorDominio({ valor, etiqueta }: { valor: number; etiqueta: string }) {
  const radio = 60;
  const circunferencia = Math.PI * radio;
  const avance = circunferencia * valor;
  return (
    <svg
      viewBox="0 0 160 90"
      className="h-32 w-full max-w-56"
      role="img"
      aria-label={`${etiqueta}: ${valor}`}
    >
      <path
        d="M20 80 A60 60 0 0 1 140 80"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M20 80 A60 60 0 0 1 140 80"
        fill="none"
        stroke="var(--teal)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${avance} ${circunferencia}`}
      />
      <text
        x="80"
        y="72"
        textAnchor="middle"
        className="fill-foreground font-display"
        fontSize="24"
        fontWeight="600"
      >
        {valor.toFixed(2)}
      </text>
    </svg>
  );
}

export function ResultadoPrediccion({ smiles, svg }: { smiles: string; svg?: string }) {
  const [copiado, setCopiado] = useState(false);
  const [comparado, setComparado] = useState<MoleculaSimilarDemo | null>(null);
  const p = DEMO_MOLPREDICT;
  const demo = DEMO_MODE;
  const potencia = Math.min(100, Math.max(0, ((p.pIC50 - 4) / 6) * 100));
  const cumplidasClasicas = p.lipinski.filter((l) => l.cumple).length;
  const flexOk = p.flexibilidad.every((f) => f.cumple);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(smiles || p.smiles);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <div className="space-y-6 fade-up">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        {/* Estructura */}
        <Card className="card-soft border-border/70">
          <CardHeader className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-base">
              {demo ? "Molécula de referencia" : "Estructura analizada"}
            </CardTitle>
            {demo ? <StatusBadge tono="info">Datos demostrativos</StatusBadge> : null}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid place-items-center rounded-xl border border-border bg-surface/70 hex-pattern p-4">
              <div className="h-40 w-40">
                <MoleculeRender svg={svg} seed={3} />
              </div>
              {demo ? (
                <p className="text-[11px] text-muted-foreground">{TEXTOS_DEMO.ilustracion}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                SMILES canónico
              </span>
              <p className="break-all rounded-lg bg-muted px-3 py-2 font-mono text-xs">
                {smiles || p.smiles}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Fórmula molecular
                </span>
                <p className="font-mono text-sm">{p.formula}</p>
                {demo ? (
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {TEXTOS_DEMO.formulaReferencia}
                  </p>
                ) : null}
              </div>
              <Button variant="outline" size="sm" onClick={copiar}>
                {copiado ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copiado ? "Copiado" : "Copiar SMILES"}
              </Button>
            </div>

            <StatusBadge tono="alta">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {demo ? TEXTOS_DEMO.validacionOk : "Estructura válida"}
            </StatusBadge>
          </CardContent>
        </Card>

        {/* Predicción principal */}
        <Card className="card-soft border-teal/30 bg-accent/30">
          <CardHeader>
            <CardTitle className="text-base">Predicción de actividad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <span className="text-xs tracking-wide text-muted-foreground">
                pIC50 estimado
              </span>
              <p className="font-display text-6xl font-semibold leading-none text-foreground">
                {p.pIC50.toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                IC50 estimado:{" "}
                <span className="font-medium text-foreground">{p.ic50nM} nM</span>
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Potencia relativa</span>
                <span>pIC50 4 – 10</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-teal"
                  style={{ width: `${potencia}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tono="alta">Actividad potencial alta</StatusBadge>
              <StatusBadge tono="media">
                <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
                Confianza: {p.confianza}
              </StatusBadge>
              <StatusBadge tono="info">{p.modelo}</StatusBadge>
              {demo ? (
                <EducationalTooltip
                  texto={TEXTOS_DEMO.modeloTooltip}
                  etiqueta="el modelo de simulación"
                />
              ) : null}
            </div>

            {demo ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {TEXTOS_DEMO.prediccionNota}
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Descriptores */}
      <section>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold">Descriptores fisicoquímicos</h2>
          {demo ? (
            <>
              <StatusBadge tono="info">Valores de referencia</StatusBadge>
            </>
          ) : null}
        </div>
        {demo ? (
          <p className="mt-1 text-xs text-muted-foreground">{TEXTOS_DEMO.descriptoresNota}</p>
        ) : null}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.descriptores.map((d) => (
            <DescriptorCard key={d.clave} descriptor={d} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lipinski y flexibilidad */}
        <Card className="card-soft border-border/70">
          <CardHeader>
            <CardTitle className="text-base">Lipinski y flexibilidad molecular</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Regla de los cinco de Lipinski
              </h3>
              <ul className="space-y-2">
                {p.lipinski.map((l) => (
                  <li
                    key={l.criterio}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border/60 px-3 py-2 text-sm"
                  >
                    {l.cumple ? (
                      <Check className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                    )}
                    <span className="min-w-0 truncate">{l.criterio}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {l.valor} · {l.limite}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Criterio adicional de flexibilidad
              </h3>
              <ul className="space-y-2">
                {p.flexibilidad.map((l) => (
                  <li
                    key={l.criterio}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border/60 px-3 py-2 text-sm"
                  >
                    {l.cumple ? (
                      <Check className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                    )}
                    <span className="min-w-0 truncate">{l.criterio}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {l.valor} · {l.limite}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {TEXTOS_DEMO.flexibilidadNota}
              </p>
            </div>

            <p className="text-sm font-medium">
              La molécula cumple {cumplidasClasicas} de {p.lipinski.length} criterios clásicos de
              Lipinski y presenta {flexOk ? "una observación favorable" : "una observación adicional"}{" "}
              de flexibilidad.
            </p>
          </CardContent>
        </Card>

        {/* Dominio */}
        <Card className="card-soft border-border/70">
          <CardHeader>
            <CardTitle className="text-base">Dominio de aplicabilidad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid place-items-center">
              <MedidorDominio
                valor={p.dominio.similitudMaxima}
                etiqueta={
                  demo ? TEXTOS_DEMO.dominioSubtitulo : "Similitud máxima con el conjunto de referencia"
                }
              />
              <span className="text-center text-xs text-muted-foreground">
                {demo
                  ? TEXTOS_DEMO.dominioSubtitulo
                  : "Similitud máxima con el conjunto de referencia"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tono="alta">{p.dominio.etiqueta}</StatusBadge>
              <StatusBadge tono="media">
                Nivel de confianza: {p.dominio.nivelConfianza}
              </StatusBadge>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {demo
                ? TEXTOS_DEMO.dominioNota
                : "Una similitud alta respecto al conjunto de referencia indica que ya se observaron estructuras comparables, lo que aumenta la confiabilidad de la estimación."}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interpretación */}
      <Card className="card-soft border-border/70">
        <CardHeader className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-base">Interpretación de la predicción</CardTitle>
          {demo ? <StatusBadge tono="info">Interpretación ilustrativa</StatusBadge> : null}
        </CardHeader>
        <CardContent className="space-y-6">
          {demo ? (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {TEXTOS_DEMO.interpretacionNota}
            </p>
          ) : null}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-success">
                <Plus className="h-4 w-4" aria-hidden="true" /> Factores favorables
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {p.interpretacion.favorables.map((f) => (
                  <li key={f} className="rounded-lg border border-success/25 bg-success/5 px-3 py-2">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-warning">
                <Minus className="h-4 w-4" aria-hidden="true" /> Factores desfavorables
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {p.interpretacion.desfavorables.map((f) => (
                  <li key={f} className="rounded-lg border border-warning/30 bg-warning/5 px-3 py-2">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ChartPanel
            titulo={demo ? TEXTOS_DEMO.contribucionesTitulo : "Contribuciones por descriptor"}
            descripcion={
              demo
                ? TEXTOS_DEMO.contribucionesSubtitulo
                : "Contribuciones devueltas por el servicio de predicción."
            }
          >
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[...p.contribuciones]}
                  margin={{ left: 20, right: 20 }}
                >
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis
                    type="category"
                    dataKey="nombre"
                    width={140}
                    tick={{ fontSize: 12 }}
                    stroke="var(--muted-foreground)"
                  />
                  <RTooltip
                    cursor={{ fill: "var(--muted)" }}
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="contribucion" radius={[4, 4, 4, 4]}>
                    {p.contribuciones.map((c) => (
                      <Cell
                        key={c.nombre}
                        fill={c.contribucion >= 0 ? "var(--teal)" : "var(--warning)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartPanel>
        </CardContent>
      </Card>

      {/* Similares */}
      <section>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <h2 className="min-w-0 text-xl font-semibold">Moléculas similares</h2>
          {demo ? <StatusBadge tono="info">Datos ilustrativos</StatusBadge> : null}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {p.similares.map((c, i) => (
            <Card key={c.id} className="card-soft card-lift gap-3 border-border/70 p-4">
              <div className="grid place-items-center rounded-lg border border-border bg-surface p-2">
                <MoleculeThumb seed={i + 2} className="h-14 w-14" />
              </div>
              <h3 className="truncate text-sm font-semibold">{c.nombre}</h3>
              <dl className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between gap-2">
                  <dt>Tanimoto</dt>
                  <dd className="font-mono text-foreground">{c.tanimoto.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>pIC50 exp.</dt>
                  <dd className="font-mono text-foreground">
                    {formatearNumero(c.pIC50Experimental)}
                  </dd>
                </div>
              </dl>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => setComparado(c)}
                aria-label={`Comparar ${c.nombre} con la molécula de referencia`}
              >
                Comparar
              </Button>
            </Card>
          ))}
        </div>
        {demo ? (
          <p className="mt-3 text-xs text-muted-foreground">{TEXTOS_DEMO.similaresNota}</p>
        ) : null}
      </section>

      <Dialog open={comparado !== null} onOpenChange={(abierto) => !abierto && setComparado(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Comparación con {comparado?.nombre}</DialogTitle>
            <DialogDescription>
              {demo
                ? "Comparación demostrativa: los valores provienen del conjunto de referencia."
                : "Comparación calculada por el servicio de similitud molecular."}
            </DialogDescription>
          </DialogHeader>
          {comparado ? (
            <div className="space-y-4">
              {demo ? <StatusBadge tono="info">Comparación demostrativa</StatusBadge> : null}
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    Comparación entre {comparado.nombre} y la molécula de referencia
                  </caption>
                  <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left">
                        Parámetro
                      </th>
                      <th scope="col" className="px-3 py-2 text-right">
                        {comparado.nombre}
                      </th>
                      <th scope="col" className="px-3 py-2 text-right">
                        Referencia
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <th scope="row" className="px-3 py-2 text-left font-normal">
                        Tanimoto
                      </th>
                      <td className="px-3 py-2 text-right font-mono">
                        {comparado.tanimoto.toFixed(2)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono">1.00</td>
                    </tr>
                    <tr className="border-t border-border">
                      <th scope="row" className="px-3 py-2 text-left font-normal">
                        pIC50 experimental
                      </th>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatearNumero(comparado.pIC50Experimental)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {p.pIC50.toFixed(2)} (estimado)
                      </td>
                    </tr>
                    <tr className="border-t border-border">
                      <th scope="row" className="px-3 py-2 text-left font-normal">
                        Diferencia de pIC50
                      </th>
                      <td className="px-3 py-2 text-right font-mono" colSpan={2}>
                        {formatearNumero(comparado.pIC50Experimental - p.pIC50)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  SMILES
                </span>
                <p className="break-all rounded-lg bg-muted px-3 py-2 font-mono text-xs">
                  {comparado.smiles}
                </p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ScientificDisclaimer />
    </div>
  );
}
