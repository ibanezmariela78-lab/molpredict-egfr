import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Eraser, Sparkles, X } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { DemoBanner } from "@/components/common/DemoBanner";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState, ErrorState, InlineLoading } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingAnalysis } from "@/components/predictor/LoadingAnalysis";
import { ResultadoPrediccion } from "@/components/predictor/ResultadoPrediccion";
import { SMILES_EJEMPLOS } from "@/data/compuestos";
import {
  DEMO_MODE,
  mensajeAmigable,
  predecirEgfr,
  renderizarMolecula,
  validarMolecula,
} from "@/services/molpredictApi";

export const Route = createFileRoute("/predictor")({
  head: () => ({
    meta: [
      { title: "Predictor molecular — MolPredict EGFR" },
      {
        name: "description",
        content:
          "Ingresá una estructura SMILES y explorá una predicción simulada de pIC50, descriptores fisicoquímicos e interpretación del resultado.",
      },
      { property: "og:title", content: "Predictor molecular — MolPredict EGFR" },
      {
        property: "og:description",
        content: "Predicción QSAR experimental de actividad frente a EGFR con datos demostrativos.",
      },
    ],
  }),
  component: Predictor,
});

type Estado =
  | "inicial"
  | "validando"
  | "analizando"
  | "cargando"
  | "resultado"
  | "error";

const ejemplos = ["Gefitinib", "Erlotinib", "Lapatinib", "Osimertinib"] as const;

function Predictor() {
  const [smiles, setSmiles] = useState("");
  const [estado, setEstado] = useState<Estado>("inicial");
  const [validacion, setValidacion] = useState<{ valido: boolean; mensaje: string } | null>(null);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [svgMolecula, setSvgMolecula] = useState<string | undefined>(undefined);

  const enProceso = estado === "validando" || estado === "analizando" || estado === "cargando";

  const analizar = async () => {
    if (enProceso) return;
    setErrorMensaje(null);
    setEstado("validando");
    try {
      const v = await validarMolecula({ smiles });
      setValidacion({ valido: v.valido, mensaje: v.mensaje });
      if (!v.valido) {
        setEstado("inicial");
        return;
      }
      setEstado("cargando");
      if (!DEMO_MODE) {
        await predecirEgfr({ smiles });
        const render = await renderizarMolecula({ smiles });
        setSvgMolecula(render.svg);
        setEstado("resultado");
      }
    } catch (error) {
      // El SMILES ingresado se conserva para que el usuario pueda corregirlo.
      setErrorMensaje(mensajeAmigable(error));
      setEstado("error");
    }
  };

  const validarEstructura = async () => {
    if (enProceso) return;
    try {
      const v = await validarMolecula({ smiles });
      setValidacion({ valido: v.valido, mensaje: v.mensaje });
    } catch (error) {
      setErrorMensaje(mensajeAmigable(error));
      setEstado("error");
    }
  };

  const limpiar = () => {
    setSmiles("");
    setValidacion(null);
    setErrorMensaje(null);
    setSvgMolecula(undefined);
    setEstado("inicial");
  };

  return (
    <div>
      <PageHeader
        titulo="Predictor de actividad molecular"
        descripcion="Ingresá una estructura química en formato SMILES para explorar sus propiedades y obtener una predicción experimental simulada."
        etiqueta={<StatusBadge tono="info">Modo demostración</StatusBadge>}
      />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <DemoBanner />

        <Card className="card-soft border-border/70">
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="smiles-input" className="text-sm font-medium">
                Cadena SMILES
              </Label>
              <Textarea
                id="smiles-input"
                value={smiles}
                onChange={(e) => {
                  setSmiles(e.target.value);
                  setValidacion(null);
                }}
                rows={3}
                spellCheck={false}
                aria-describedby="smiles-ayuda"
                placeholder="Ejemplo: COc1ccc2ncnc(Nc3ccc(F)c(Cl)c3)c2c1"
                className="min-h-24 resize-y font-mono text-sm"
              />
              <p id="smiles-ayuda" className="text-xs text-muted-foreground">
                La validación es sintáctica y demostrativa; no utiliza RDKit todavía.
              </p>
            </div>

            {validacion ? (
              <p
                role="status"
                className={`flex items-center gap-2 text-sm ${
                  validacion.valido ? "text-success" : "text-destructive"
                }`}
              >
                {validacion.valido ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <X className="h-4 w-4" aria-hidden="true" />
                )}
                {validacion.mensaje}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Button onClick={analizar} size="lg" disabled={enProceso}>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Analizar molécula
              </Button>
              <Button variant="outline" size="lg" onClick={validarEstructura} disabled={enProceso}>
                Validar estructura
              </Button>
              <Button variant="ghost" size="lg" onClick={limpiar}>
                <Eraser className="h-4 w-4" aria-hidden="true" />
                Limpiar
              </Button>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Ejemplos rápidos
              </span>
              <div className="flex flex-wrap gap-2">
                {ejemplos.map((nombre) => (
                  <button
                    key={nombre}
                    type="button"
                    onClick={() => {
                      setSmiles(SMILES_EJEMPLOS[nombre]);
                      setValidacion(null);
                      setErrorMensaje(null);
                      setEstado("inicial");
                    }}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-teal/50 hover:text-teal"
                  >
                    {nombre}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {estado === "inicial" ? (
          <EmptyState
            titulo="Ingresá un SMILES para comenzar el análisis."
            descripcion="Podés escribir tu propia estructura o seleccionar uno de los inhibidores de referencia."
          />
        ) : null}

        {estado === "validando" ? (
          <Card className="card-soft border-border/70">
            <CardContent>
              <InlineLoading texto="Validando estructura…" />
            </CardContent>
          </Card>
        ) : null}

        {estado === "cargando" || estado === "analizando" ? (
          <LoadingAnalysis onFinish={() => DEMO_MODE && setEstado("resultado")} />
        ) : null}

        {estado === "error" ? (
          <ErrorState
            titulo="No pudimos completar el análisis"
            descripcion={errorMensaje ?? undefined}
            accion={
              <Button variant="outline" onClick={analizar}>
                Reintentar
              </Button>
            }
          />
        ) : null}

        {estado === "resultado" ? (
          <ResultadoPrediccion smiles={smiles} svg={svgMolecula} />
        ) : null}
      </div>
    </div>
  );
}
