import { useEffect, useRef, useState } from "react";
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
import { TEXTOS_DEMO } from "@/data/molpredictDemoData";
import { construirResultado, type ResultadoAnalisis } from "@/lib/mapResultado";
import {
  DEMO_MODE,
  buscarSimilares,
  mensajeAmigable,
  obtenerDescriptores,
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
          "Ingresá una estructura SMILES y obtené descriptores calculados con RDKit, estructura 2D y una predicción demostrativa de pIC50 frente a EGFR.",
      },
      { property: "og:title", content: "Predictor molecular — MolPredict EGFR" },
      {
        property: "og:description",
        content:
          "Análisis molecular con RDKit y predicción demostrativa de actividad frente a EGFR.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Predictor,
});

type Estado = "inicial" | "validando" | "cargando" | "resultado" | "error";

const ejemplos = ["Gefitinib", "Erlotinib", "Lapatinib", "Osimertinib"] as const;

function Predictor() {
  const [smiles, setSmiles] = useState("");
  const [estado, setEstado] = useState<Estado>("inicial");
  const [validacion, setValidacion] = useState<{ valido: boolean; mensaje: string } | null>(null);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoAnalisis | null>(null);
  const [demoListo, setDemoListo] = useState(false);
  const peticion = useRef<AbortController | null>(null);

  useEffect(() => () => peticion.current?.abort(), []);

  const enProceso = estado === "validando" || estado === "cargando";

  const analizar = async () => {
    if (enProceso) return;
    const consulta = smiles.trim();
    if (!consulta) {
      setValidacion({ valido: false, mensaje: "Ingresá una cadena SMILES." });
      return;
    }

    // Evita solicitudes duplicadas: cancela cualquier análisis en curso.
    peticion.current?.abort();
    const controller = new AbortController();
    peticion.current = controller;

    setErrorMensaje(null);
    setResultado(null);
    setDemoListo(false);
    setEstado("validando");

    try {
      if (DEMO_MODE) {
        setValidacion({ valido: true, mensaje: TEXTOS_DEMO.validacionOk });
        setEstado("cargando");
        return;
      }

      const v = await validarMolecula({ smiles: consulta }, controller.signal);
      setValidacion({ valido: v.valid, mensaje: v.message });
      if (!v.valid) {
        setEstado("inicial");
        return;
      }

      setEstado("cargando");

      const [prediccion, descriptores] = await Promise.all([
        predecirEgfr({ smiles: consulta }, controller.signal),
        obtenerDescriptores({ smiles: consulta }, controller.signal),
      ]);

      const render = await renderizarMolecula(
        { smiles: consulta, width: 500, height: 350 },
        controller.signal,
      ).catch(() => null);

      const similares = await buscarSimilares(
        { smiles: consulta, limit: 5 },
        controller.signal,
      ).catch(() => null);

      setResultado(
        construirResultado({
          prediccion,
          descriptores,
          similares,
          ...(render?.svg ? { svg: render.svg } : {}),
        }),
      );
      setEstado("resultado");
    } catch (error) {
      if (controller.signal.aborted) return;
      // El SMILES ingresado se conserva para que el usuario pueda corregirlo.
      setErrorMensaje(mensajeAmigable(error));
      setEstado("error");
    }
  };

  const validarEstructura = async () => {
    if (enProceso) return;
    const consulta = smiles.trim();
    if (!consulta) {
      setValidacion({ valido: false, mensaje: "Ingresá una cadena SMILES." });
      return;
    }
    if (DEMO_MODE) {
      setValidacion({ valido: true, mensaje: TEXTOS_DEMO.validacionOk });
      return;
    }
    try {
      const v = await validarMolecula({ smiles: consulta });
      setValidacion({ valido: v.valid, mensaje: v.message });
    } catch (error) {
      setValidacion({ valido: false, mensaje: mensajeAmigable(error) });
    }
  };

  const limpiar = () => {
    peticion.current?.abort();
    setSmiles("");
    setValidacion(null);
    setErrorMensaje(null);
    setResultado(null);
    setDemoListo(false);
    setEstado("inicial");
  };

  return (
    <div>
      <PageHeader
        titulo="Predictor de actividad molecular"
        descripcion="Ingresá una estructura química en formato SMILES para calcular sus propiedades con RDKit y obtener una predicción demostrativa de actividad frente a EGFR."
        etiqueta={
          <StatusBadge tono="info">
            {DEMO_MODE ? "Modo demostración" : "Predicción demostrativa"}
          </StatusBadge>
        }
      />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {DEMO_MODE ? (
          <DemoBanner />
        ) : (
          <DemoBanner
            texto="Los descriptores, la estructura 2D y la validación se calculan con RDKit en el servicio FastAPI conectado."
            secundario="La predicción de pIC50/IC50 es demostrativa: no proviene de un modelo QSAR entrenado ni validado científicamente."
          />
        )}

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
                {DEMO_MODE
                  ? TEXTOS_DEMO.ayudaSmiles
                  : "La estructura se valida y canonicaliza con RDKit en el servicio de predicción."}
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
                {enProceso ? "Analizando…" : "Analizar molécula"}
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
                      setResultado(null);
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

        {estado === "cargando" ? (
          <LoadingAnalysis
            onFinish={() => {
              if (DEMO_MODE) {
                setDemoListo(true);
                setEstado("resultado");
              }
            }}
          />
        ) : null}

        {estado === "error" ? (
          <ErrorState
            titulo="No pudimos completar el análisis"
            descripcion={errorMensaje ?? undefined}
            accion={
              <Button variant="outline" onClick={analizar}>
                Reintentar análisis
              </Button>
            }
          />
        ) : null}

        {estado === "resultado" && (resultado || (DEMO_MODE && demoListo)) ? (
          <ResultadoPrediccion smiles={smiles} {...(resultado ? { datos: resultado } : {})} />
        ) : null}
      </div>
    </div>
  );
}
