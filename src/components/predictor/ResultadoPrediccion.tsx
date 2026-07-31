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
import { Link } from "@tanstack/react-router";
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
import { StatusBadge } from "@/components/common/StatusBadge";
import { DescriptorCard } from "@/components/molecular/DescriptorCard";
import { MoleculeThumb } from "@/components/molecular/MoleculeArt";
import { MoleculeRender } from "@/components/molecular/MoleculeRender";
import { ScientificDisclaimer } from "@/components/common/ScientificDisclaimer";
import { ChartPanel } from "@/components/common/ChartPanel";
import {
  CONTRIBUCIONES_SHAP,
  DESCRIPTORES,
  FACTORES_DESFAVORABLES,
  FACTORES_FAVORABLES,
  LIPINSKI,
  PREDICCION_DEMO,
} from "@/data/prediccion";
import { COMPUESTOS } from "@/data/compuestos";
import { formatearNumero } from "@/utils/molecula";

function MedidorDominio({ valor }: { valor: number }) {
  const radio = 60;
  const circunferencia = Math.PI * radio;
  const avance = circunferencia * valor;
  return (
    <svg
      viewBox="0 0 160 90"
      className="h-32 w-full max-w-56"
      role="img"
      aria-label={`Similitud máxima al conjunto de entrenamiento: ${valor}`}
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
  const p = PREDICCION_DEMO;
  const potencia = Math.min(100, Math.max(0, ((p.pIC50 - 4) / 6) * 100));
  const cumplidas = LIPINSKI.filter((l) => l.cumple).length;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(smiles || p.smilesCanonico);
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
          <CardHeader>
            <CardTitle className="text-base">Estructura analizada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid place-items-center rounded-xl border border-border bg-surface/70 hex-pattern p-4">
              <div className="h-40 w-40">
                <MoleculeRender svg={svg} seed={3} />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Representación ilustrativa, no generada por RDKit.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                SMILES canónico
              </span>
              <p className="break-all rounded-lg bg-muted px-3 py-2 font-mono text-xs">
                {smiles || p.smilesCanonico}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Fórmula molecular
                </span>
                <p className="font-mono text-sm">{p.formula}</p>
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
              Estructura válida
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
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
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

            <div className="flex flex-wrap gap-2">
              <StatusBadge tono="alta">Actividad potencial alta</StatusBadge>
              <StatusBadge tono="media">
                <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
                Confianza: {p.confianza}
              </StatusBadge>
              <StatusBadge tono="info">{p.modelo}</StatusBadge>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Valor simulado con fines de demostración. La versión productiva utilizará un
              modelo QSAR entrenado sobre datos de ChEMBL.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Descriptores */}
      <section>
        <h2 className="text-xl font-semibold">Descriptores fisicoquímicos</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DESCRIPTORES.map((d) => (
            <DescriptorCard key={d.clave} descriptor={d} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lipinski */}
        <Card className="card-soft border-border/70">
          <CardHeader>
            <CardTitle className="text-base">Reglas de Lipinski</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2">
              {LIPINSKI.map((l) => (
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
            <p className="text-sm font-medium">
              La molécula cumple {cumplidas} de {LIPINSKI.length} criterios orientativos.
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Las reglas de Lipinski son filtros orientativos y no determinan por sí solas la
              viabilidad de un fármaco.
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
              <MedidorDominio valor={p.similitudMaxima} />
              <span className="text-xs text-muted-foreground">
                Similitud máxima al conjunto de entrenamiento
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tono="alta">{p.dominio}</StatusBadge>
              <StatusBadge tono="media">Nivel de confianza: Medio</StatusBadge>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Una similitud alta respecto al conjunto de entrenamiento indica que el modelo ya
              observó estructuras comparables, lo que aumenta la confiabilidad de la estimación.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interpretación */}
      <Card className="card-soft border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Interpretación de la predicción</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-success">
                <Plus className="h-4 w-4" aria-hidden="true" /> Factores favorables
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {FACTORES_FAVORABLES.map((f) => (
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
                {FACTORES_DESFAVORABLES.map((f) => (
                  <li key={f} className="rounded-lg border border-warning/30 bg-warning/5 px-3 py-2">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ChartPanel
            titulo="Contribuciones por descriptor"
            descripcion="Gráfico tipo SHAP simulado: valores positivos aumentan el pIC50 estimado."
          >
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={CONTRIBUCIONES_SHAP}
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
                    {CONTRIBUCIONES_SHAP.map((c) => (
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
          <StatusBadge tono="info">Datos ilustrativos</StatusBadge>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {COMPUESTOS.slice(0, 5).map((c, i) => (
            <Card key={c.id} className="card-soft card-lift gap-3 border-border/70 p-4">
              <div className="grid place-items-center rounded-lg border border-border bg-surface p-2">
                <MoleculeThumb seed={i + 2} className="h-14 w-14" />
              </div>
              <h3 className="truncate text-sm font-semibold">{c.nombre}</h3>
              <dl className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between gap-2">
                  <dt>Tanimoto</dt>
                  <dd className="font-mono text-foreground">{c.similitud.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>pIC50 exp.</dt>
                  <dd className="font-mono text-foreground">{formatearNumero(c.pIC50)}</dd>
                </div>
              </dl>
              <Button asChild size="sm" variant="outline" className="w-full">
                <Link to="/explorador">Comparar</Link>
              </Button>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Los compuestos mostrados son ilustrativos hasta conectar el dataset real de ChEMBL.
        </p>
      </section>

      <ScientificDisclaimer />
    </div>
  );
}
