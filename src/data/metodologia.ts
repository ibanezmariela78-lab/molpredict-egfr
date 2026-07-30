export const SECCIONES_METODOLOGIA = [
  {
    id: "problema",
    titulo: "Problema científico",
    texto:
      "El receptor del factor de crecimiento epidérmico (EGFR) es una tirosina quinasa validada como diana oncológica. El objetivo del proyecto es estimar la potencia inhibitoria (pIC50) de compuestos pequeños a partir de su estructura química, mediante modelos QSAR.",
  },
  {
    id: "datos",
    titulo: "Fuente de datos prevista",
    texto:
      "Se prevé utilizar registros de bioactividad de ChEMBL asociados al target EGFR, filtrando ensayos de tipo IC50 con unidades homogéneas y confianza documentada.",
  },
  {
    id: "limpieza",
    titulo: "Limpieza química",
    texto:
      "Estandarización de estructuras, eliminación de sales y contraiones, neutralización de cargas, normalización de tautómeros y remoción de duplicados y mezclas.",
  },
  {
    id: "pic50",
    titulo: "Transformación IC50 a pIC50",
    texto:
      "Los valores de IC50 expresados en nM se convierten a pIC50 mediante pIC50 = 9 − log10(IC50 en nM), obteniendo una escala logarítmica más adecuada para regresión.",
  },
  {
    id: "descriptores",
    titulo: "Descriptores moleculares",
    texto:
      "Peso molecular, LogP, TPSA, donantes y aceptores de hidrógeno, enlaces rotables, anillos aromáticos y fracción Csp3, calculados con RDKit.",
  },
  {
    id: "fingerprints",
    titulo: "Morgan Fingerprints",
    texto:
      "Huellas circulares de radio 2 y 2048 bits que codifican el entorno atómico local, utilizadas como representación estructural del compuesto.",
  },
  {
    id: "modelos",
    titulo: "Modelos comparados",
    texto:
      "Se planifica comparar una regresión lineal regularizada (Ridge), un ensemble de árboles (Random Forest) y un modelo de gradient boosting (XGBoost).",
  },
  {
    id: "validacion",
    titulo: "Validación",
    texto:
      "Validación cruzada con búsqueda de hiperparámetros y conjunto de prueba retenido, evitando fuga de información entre particiones.",
  },
  {
    id: "scaffold",
    titulo: "Scaffold Split",
    texto:
      "La división por scaffolds de Bemis-Murcko evalúa la capacidad de generalización frente a familias químicas no vistas, una estimación más realista que la partición aleatoria.",
  },
  {
    id: "metricas",
    titulo: "Métricas",
    texto:
      "Se reportarán RMSE, MAE, R² y coeficiente de Spearman, junto con gráficos de dispersión de valores observados frente a predichos. Métricas no disponibles todavía.",
  },
  {
    id: "dominio",
    titulo: "Dominio de aplicabilidad",
    texto:
      "Se estimará mediante similitud de Tanimoto máxima respecto al conjunto de entrenamiento, marcando como poco confiables las predicciones fuera del dominio.",
  },
  {
    id: "interpretabilidad",
    titulo: "Interpretabilidad",
    texto:
      "Se prevé el uso de valores SHAP para atribuir la contribución de cada descriptor y fragmento estructural a la predicción individual.",
  },
  {
    id: "limitaciones",
    titulo: "Limitaciones",
    texto:
      "Heterogeneidad experimental entre ensayos, sesgos del dataset público, cobertura química limitada y ausencia de información sobre selectividad, ADMET o toxicidad.",
  },
  {
    id: "usos",
    titulo: "Usos no recomendados",
    texto:
      "No debe utilizarse para decisiones clínicas, regulatorias, toxicológicas ni para sustituir ensayos experimentales. Su finalidad es educativa y demostrativa.",
  },
];

export const PIPELINE = [
  "ChEMBL",
  "Limpieza de estructuras",
  "Cálculo de descriptores",
  "División de datos",
  "Entrenamiento",
  "Validación",
  "Despliegue",
  "Predicción",
];

export const MODELOS = [
  {
    nombre: "Ridge Regression",
    descripcion:
      "Línea de base lineal con regularización L2 sobre descriptores y fingerprints.",
    estado: "Pendiente de entrenamiento",
  },
  {
    nombre: "Random Forest",
    descripcion:
      "Ensemble de árboles con capacidad de capturar relaciones no lineales entre descriptores.",
    estado: "Pendiente de validación",
  },
  {
    nombre: "XGBoost",
    descripcion:
      "Gradient boosting con regularización, candidato principal para el modelo final.",
    estado: "Métricas no disponibles todavía",
  },
];

export const MODEL_CARD = [
  { campo: "Nombre del modelo", valor: "MolPredict EGFR QSAR Ensemble" },
  { campo: "Versión", valor: "v0.1 Demo" },
  { campo: "Estado", valor: "Versión demo — modelo real pendiente de integración" },
  { campo: "Tipo de tarea", valor: "Regresión de pIC50 sobre EGFR" },
  { campo: "Endpoint", valor: "pIC50 (IC50 en escala logarítmica negativa)" },
  { campo: "Datos", valor: "ChEMBL — EGFR, ensayos IC50 (integración pendiente)" },
  { campo: "Métricas", valor: "No disponibles todavía" },
  {
    campo: "Limitaciones",
    valor: "Uso educativo. No apto para decisiones clínicas ni regulatorias.",
  },
  { campo: "Responsable", valor: "Proyecto de portfolio profesional" },
];
