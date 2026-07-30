import { Fragment, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, LayoutGrid, RotateCcw, Search, Table2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoBanner } from "@/components/common/DemoBanner";
import { MetricCard } from "@/components/common/MetricCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/States";
import { MoleculeCard } from "@/components/molecular/MoleculeCard";
import { MoleculeThumb } from "@/components/molecular/MoleculeArt";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COMPUESTOS, RESUMEN_DATASET } from "@/data/compuestos";
import type { Compuesto } from "@/types";
import { etiquetaActividad, formatearNumero, resumirSmiles } from "@/utils/molecula";

export const Route = createFileRoute("/explorador")({
  head: () => ({
    meta: [
      { title: "Explorador de compuestos — MolPredict EGFR" },
      {
        name: "description",
        content:
          "Explorá una muestra demostrativa de moléculas asociadas a estudios de actividad frente a EGFR, con filtros por pIC50, peso molecular, LogP y TPSA.",
      },
      { property: "og:title", content: "Explorador de compuestos — MolPredict EGFR" },
      {
        property: "og:description",
        content: "Dashboard demostrativo de compuestos con propiedades moleculares y actividad.",
      },
    ],
  }),
  component: Explorador,
});

type Columna = keyof Pick<
  Compuesto,
  "nombre" | "pIC50" | "pIC50Predicho" | "pesoMolecular" | "logP" | "tpsa" | "similitud"
>;

const POR_PAGINA = 8;

function Explorador() {
  const [busqueda, setBusqueda] = useState("");
  const [rangoPic, setRangoPic] = useState<number[]>([4, 9]);
  const [rangoMw, setRangoMw] = useState<number[]>([100, 600]);
  const [rangoLogp, setRangoLogp] = useState<number[]>([-1, 6]);
  const [rangoTpsa, setRangoTpsa] = useState<number[]>([0, 130]);
  const [actividad, setActividad] = useState("todas");
  const [orden, setOrden] = useState<{ col: Columna; asc: boolean }>({
    col: "pIC50",
    asc: false,
  });
  const [pagina, setPagina] = useState(0);
  const [vista, setVista] = useState<"tabla" | "tarjetas">("tabla");
  const [expandida, setExpandida] = useState<string | null>(null);

  const restablecer = () => {
    setBusqueda("");
    setRangoPic([4, 9]);
    setRangoMw([100, 600]);
    setRangoLogp([-1, 6]);
    setRangoTpsa([0, 130]);
    setActividad("todas");
    setPagina(0);
  };

  const filtrados = useMemo(() => {
    const lista = COMPUESTOS.filter((c) => {
      const q = busqueda.trim().toLowerCase();
      if (q && !c.nombre.toLowerCase().includes(q) && !c.id.toLowerCase().includes(q))
        return false;
      if (c.pIC50 < rangoPic[0] || c.pIC50 > rangoPic[1]) return false;
      if (c.pesoMolecular < rangoMw[0] || c.pesoMolecular > rangoMw[1]) return false;
      if (c.logP < rangoLogp[0] || c.logP > rangoLogp[1]) return false;
      if (c.tpsa < rangoTpsa[0] || c.tpsa > rangoTpsa[1]) return false;
      if (actividad !== "todas" && c.actividad !== actividad) return false;
      return true;
    });
    return lista.sort((a, b) => {
      const va = a[orden.col];
      const vb = b[orden.col];
      if (typeof va === "string" && typeof vb === "string")
        return orden.asc ? va.localeCompare(vb) : vb.localeCompare(va);
      return orden.asc ? Number(va) - Number(vb) : Number(vb) - Number(va);
    });
  }, [busqueda, rangoPic, rangoMw, rangoLogp, rangoTpsa, actividad, orden]);

  const paginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, paginas - 1);
  const visibles = filtrados.slice(
    paginaActual * POR_PAGINA,
    paginaActual * POR_PAGINA + POR_PAGINA,
  );

  const ordenarPor = (col: Columna) =>
    setOrden((o) => ({ col, asc: o.col === col ? !o.asc : true }));

  const columnas: { col: Columna; label: string }[] = [
    { col: "nombre", label: "Nombre" },
    { col: "pIC50", label: "pIC50 exp." },
    { col: "pIC50Predicho", label: "pIC50 pred." },
    { col: "pesoMolecular", label: "PM" },
    { col: "logP", label: "LogP" },
    { col: "tpsa", label: "TPSA" },
    { col: "similitud", label: "Similitud" },
  ];

  return (
    <div>
      <PageHeader
        titulo="Explorador de compuestos"
        descripcion="Explorá una muestra demostrativa de moléculas asociadas a estudios de actividad frente a EGFR."
        etiqueta={<StatusBadge tono="info">Modo demostración</StatusBadge>}
        acciones={
          <div className="flex gap-2">
            <Button
              variant={vista === "tabla" ? "default" : "outline"}
              onClick={() => setVista("tabla")}
            >
              <Table2 className="h-4 w-4" aria-hidden="true" /> Vista tabla
            </Button>
            <Button
              variant={vista === "tarjetas" ? "default" : "outline"}
              onClick={() => setVista("tarjetas")}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden="true" /> Vista tarjetas
            </Button>
          </div>
        }
      />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <DemoBanner />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MetricCard valor={String(RESUMEN_DATASET.total)} etiqueta="Total de compuestos" />
          <MetricCard valor={String(RESUMEN_DATASET.activos)} etiqueta="Activos" />
          <MetricCard
            valor={String(RESUMEN_DATASET.moderados)}
            etiqueta="Moderadamente activos"
          />
          <MetricCard valor={String(RESUMEN_DATASET.bajos)} etiqueta="Baja actividad" />
          <MetricCard
            valor={formatearNumero(RESUMEN_DATASET.mediaPIC50)}
            etiqueta="pIC50 medio"
          />
        </div>

        {/* Filtros */}
        <Card className="card-soft border-border/70">
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="buscar">Búsqueda por nombre</Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="buscar"
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPagina(0);
                  }}
                  placeholder="Gefitinib, CHEMBL…"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Actividad</Label>
              <Select
                value={actividad}
                onValueChange={(v) => {
                  setActividad(v);
                  setPagina(0);
                }}
              >
                <SelectTrigger aria-label="Filtrar por nivel de actividad">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="alta">Actividad alta</SelectItem>
                  <SelectItem value="media">Actividad moderada</SelectItem>
                  <SelectItem value="baja">Actividad baja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>
                pIC50: {rangoPic[0].toFixed(1)} – {rangoPic[1].toFixed(1)}
              </Label>
              <Slider min={4} max={9} step={0.1} value={rangoPic} onValueChange={setRangoPic} />
            </div>

            <div className="space-y-3">
              <Label>
                Peso molecular: {rangoMw[0]} – {rangoMw[1]} g/mol
              </Label>
              <Slider min={100} max={600} step={10} value={rangoMw} onValueChange={setRangoMw} />
            </div>

            <div className="space-y-3">
              <Label>
                LogP: {rangoLogp[0]} – {rangoLogp[1]}
              </Label>
              <Slider
                min={-1}
                max={6}
                step={0.1}
                value={rangoLogp}
                onValueChange={setRangoLogp}
              />
            </div>

            <div className="space-y-3">
              <Label>
                TPSA: {rangoTpsa[0]} – {rangoTpsa[1]} Å²
              </Label>
              <Slider
                min={0}
                max={130}
                step={5}
                value={rangoTpsa}
                onValueChange={setRangoTpsa}
              />
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={restablecer}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Restablecer
              </Button>
            </div>
          </CardContent>
        </Card>

        {filtrados.length === 0 ? (
          <EmptyState
            titulo="Sin resultados"
            descripcion="Ningún compuesto de la muestra cumple con los filtros seleccionados."
            accion={
              <Button variant="outline" onClick={restablecer}>
                Restablecer filtros
              </Button>
            }
          />
        ) : vista === "tabla" ? (
          <Card className="card-soft overflow-hidden border-border/70 py-0">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Estructura</TableHead>
                    <TableHead>ID</TableHead>
                    {columnas.map((c) => (
                      <TableHead key={c.col}>
                        <button
                          type="button"
                          onClick={() => ordenarPor(c.col)}
                          className="inline-flex items-center gap-1 transition-colors hover:text-teal"
                          aria-label={`Ordenar por ${c.label}`}
                        >
                          {c.label}
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform ${
                              orden.col === c.col && orden.asc ? "rotate-180" : ""
                            } ${orden.col === c.col ? "text-teal" : "opacity-40"}`}
                            aria-hidden="true"
                          />
                        </button>
                      </TableHead>
                    ))}
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibles.map((c, i) => (
                    <Fragment key={c.id}>
                      <TableRow>
                        <TableCell>
                          <MoleculeThumb seed={i + 1} className="h-9 w-9" />
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {c.id}
                        </TableCell>
                        <TableCell className="font-medium">{c.nombre}</TableCell>
                        <TableCell className="font-mono">{formatearNumero(c.pIC50)}</TableCell>
                        <TableCell className="font-mono">
                          {formatearNumero(c.pIC50Predicho)}
                        </TableCell>
                        <TableCell className="font-mono">
                          {formatearNumero(c.pesoMolecular, 1)}
                        </TableCell>
                        <TableCell className="font-mono">{formatearNumero(c.logP, 1)}</TableCell>
                        <TableCell className="font-mono">{formatearNumero(c.tpsa, 1)}</TableCell>
                        <TableCell className="font-mono">{c.similitud.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setExpandida(expandida === c.id ? null : c.id)}
                            aria-expanded={expandida === c.id}
                          >
                            Ver detalle
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandida === c.id ? (
                        <TableRow className="bg-surface/70">
                          <TableCell colSpan={10}>
                            <div className="grid gap-4 py-2 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                              <div className="min-w-0 space-y-2">
                                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                  SMILES
                                </span>
                                <p className="break-all font-mono text-xs">{c.smiles}</p>
                              </div>
                              <dl className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <dt className="text-xs text-muted-foreground">Donantes de H</dt>
                                  <dd>{c.donantesH}</dd>
                                </div>
                                <div>
                                  <dt className="text-xs text-muted-foreground">Aceptores de H</dt>
                                  <dd>{c.aceptoresH}</dd>
                                </div>
                                <div className="col-span-2">
                                  <StatusBadge tono={c.actividad}>
                                    {etiquetaActividad(c.actividad)}
                                  </StatusBadge>
                                </div>
                              </dl>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border px-4 py-3">
              <p className="min-w-0 text-xs text-muted-foreground">
                Mostrando {visibles.length} de {filtrados.length} compuestos · SMILES resumido:{" "}
                <span className="font-mono">{resumirSmiles(visibles[0]?.smiles ?? "", 20)}</span>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={paginaActual === 0}
                  onClick={() => setPagina(paginaActual - 1)}
                >
                  Anterior
                </Button>
                <span className="text-xs text-muted-foreground">
                  {paginaActual + 1} / {paginas}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={paginaActual >= paginas - 1}
                  onClick={() => setPagina(paginaActual + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((c, i) => (
              <MoleculeCard key={c.id} compuesto={c} indice={i + 1} accion="Ver detalle" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
