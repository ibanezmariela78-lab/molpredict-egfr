# MolPredict EGFR

Quiero crear la interfaz visual completa de una aplicación web profesional llamada MolPredict EGFR.

La aplicación será parte de mi portfolio profesional y debe transmitir conocimientos de:

química farmacéutica;

química medicinal;

quimioinformática;

ciencia de datos;

inteligencia artificial;

machine learning;

React;

análisis molecular.

En esta primera etapa quiero trabajar únicamente el diseño visual y la experiencia de usuario.

No conectar todavía ninguna API real, backend, base de datos, AWS ni modelo de machine learning.

Utilizar datos simulados claramente identificados como demostración.

Objetivo visual

MolPredict EGFR será una plataforma experimental que permita ingresar una estructura química mediante un código SMILES y visualizar una predicción simulada de actividad inhibitoria frente a EGFR.

La aplicación debe parecer un producto científico real, moderno y profesional, no una plantilla genérica ni una página escolar.

Debe combinar la estética de:

laboratorio farmacéutico;

plataforma de inteligencia artificial;

dashboard de ciencia de datos;

software de descubrimiento de fármacos.

Tecnologías del frontend

Crear el proyecto utilizando:

React;

TypeScript;

Vite;

Tailwind CSS;

shadcn/ui;

Lucide Icons;

React Router;

Recharts para gráficos;

componentes reutilizables;

diseño responsive.

Organizar el código en:

pages;

components;

layouts;

data;

types;

utils.

Idioma

Toda la interfaz visible debe estar en español.

Los nombres técnicos aceptados internacionalmente pueden conservarse en inglés, por ejemplo:

SMILES;

pIC50;

IC50;

LogP;

TPSA;

QSAR;

Morgan Fingerprints;

Scaffold Split;

SHAP.

Identidad visual

Crear una identidad moderna, elegante y científica.

Paleta

Usar principalmente:

azul petróleo;

azul profundo;

verde turquesa;

cian suave;

blanco;

gris muy claro;

gris oscuro para textos.

Evitar colores demasiado saturados.

Estética

La aplicación debe incluir:

fondos limpios;

degradados suaves;

transparencias discretas;

tarjetas con bordes finos;

sombras suaves;

ilustraciones moleculares abstractas;

patrones de hexágonos;

estructuras químicas;

gráficos científicos;

animaciones suaves;

mucho espacio en blanco.

No usar una estética infantil, cyberpunk, médica genérica o excesivamente futurista.

Tipografía

Utilizar una tipografía moderna, profesional y legible.

La jerarquía debe ser clara:

títulos grandes;

subtítulos breves;

textos explicativos;

etiquetas pequeñas;

valores científicos destacados.

Navegación principal

Crear una barra superior fija.

A la izquierda:

logotipo molecular minimalista;

nombre “MolPredict”;

texto pequeño “EGFR Intelligence Platform”.

A la derecha:

Inicio;

Predictor;

Explorador;

Espacio químico;

Modelo;

Sobre el proyecto.

Agregar un botón destacado:

Analizar molécula

En dispositivos móviles usar menú hamburguesa.

Página 1: Inicio

Crear una landing page profesional.

Hero principal

Título:

Predicción molecular impulsada por inteligencia artificial

Subtítulo:

Plataforma experimental de análisis QSAR para estimar la actividad inhibitoria de compuestos frente al receptor EGFR.

Agregar dos botones:

Probar predictor;

Ver metodología.

A la derecha del hero mostrar una composición visual con:

una molécula 2D;

nodos conectados;

una tarjeta flotante con “pIC50 estimado: 7.21”;

otra tarjeta con “Confianza: Media”;

otra tarjeta con “Dominio: Dentro”.

Agregar una etiqueta visible:

Proyecto experimental de portfolio

Sección de funcionamiento

Mostrar cuatro pasos conectados:

Ingreso de SMILES.

Cálculo de descriptores.

Análisis mediante modelo QSAR.

Predicción e interpretación.

Usar iconos científicos y líneas de conexión.

Sección de capacidades

Crear seis tarjetas:

Validación molecular;

Descriptores fisicoquímicos;

Predicción QSAR;

Similitud estructural;

Espacio químico;

Inteligencia artificial explicable.

Sección de métricas demo

Mostrar cuatro indicadores:

3.842 moléculas analizadas;

2048 variables estructurales;

12 descriptores moleculares;

3 modelos comparados.

Agregar una etiqueta:

Datos ilustrativos de demostración

Sección del stack

Mostrar logos o etiquetas visuales de:

React;

TypeScript;

Python;

FastAPI;

RDKit;

Scikit-learn;

XGBoost;

SHAP;

AWS.

Footer

Incluir:

MolPredict EGFR;

Proyecto de portfolio;

GitHub;

LinkedIn;

Metodología;

Disclaimer científico.

Página 2: Predictor molecular

Esta debe ser la pantalla central de la aplicación.

Encabezado

Título:

Predictor de actividad molecular

Descripción:

Ingresá una estructura química en formato SMILES para explorar sus propiedades y obtener una predicción experimental simulada.

Agregar una etiqueta:

Modo demostración

Formulario SMILES

Crear una tarjeta amplia con:

campo de texto grande;

placeholder:
“Ejemplo: COc1ccc2ncnc(Nc3ccc(F)c(Cl)c3)c2c1”;

botón “Validar estructura”;

botón principal “Analizar molécula”;

botón secundario “Limpiar”.

Debajo mostrar ejemplos rápidos como chips:

Gefitinib;

Erlotinib;

Lapatinib;

Osimertinib.

Cuando se seleccione un ejemplo, completar automáticamente un SMILES simulado.

Estado inicial

Antes de analizar mostrar una ilustración molecular y el mensaje:

Ingresá un SMILES para comenzar el análisis.

Estado de carga

Crear una animación elegante con:

molécula rotando lentamente;

barra de progreso;

pasos:

validando estructura;

calculando descriptores;

generando fingerprints;

ejecutando modelo;

preparando explicación.

Resultado simulado

Después de presionar “Analizar molécula”, mostrar una interfaz completa con datos mock.

Tarjeta de estructura

Mostrar:

dibujo 2D estilizado de una molécula;

SMILES canónico;

fórmula molecular;

botón copiar;

estado “Estructura válida”.

Tarjeta principal de predicción

Mostrar en grande:

pIC50 estimado: 7.21

Debajo:

IC50 estimado: 61.7 nM

Agregar:

barra visual de potencia;

badge “Actividad potencial alta”;

indicador de confianza “Media”;

modelo “QSAR Ensemble v0.1 Demo”.

Descriptores fisicoquímicos

Crear una cuadrícula con:

peso molecular: 446.9 g/mol;

LogP: 4.1;

TPSA: 68.7 Å²;

donantes de H: 1;

aceptores de H: 7;

enlaces rotables: 6;

anillos aromáticos: 3;

fracción Csp3: 0.22.

Cada descriptor debe tener:

nombre;

valor;

icono;

tooltip explicativo;

pequeño indicador de rango.

Reglas de Lipinski

Crear una tarjeta con cinco criterios:

peso molecular;

LogP;

donantes;

aceptores;

enlaces rotables.

Mostrar checks verdes o advertencias amarillas.

Texto:

La molécula cumple 4 de 5 criterios orientativos.

Aclarar:

Las reglas de Lipinski son filtros orientativos y no determinan por sí solas la viabilidad de un fármaco.

Dominio de aplicabilidad

Crear un medidor circular o semicircular.

Mostrar:

similitud máxima al entrenamiento: 0.78;

estado: Dentro del dominio;

nivel de confianza: Medio;

explicación breve.

Factores que influyeron

Crear una tarjeta titulada:

Interpretación de la predicción

Mostrar dos columnas.

Factores favorables:

patrón aromático similar a inhibidores conocidos;

cantidad adecuada de aceptores;

TPSA dentro del rango observado.

Factores desfavorables:

flexibilidad molecular elevada;

lipofilia superior al promedio;

similitud moderada con el conjunto de entrenamiento.

Agregar un gráfico horizontal de contribuciones tipo SHAP simulado.

Moléculas similares

Mostrar cinco tarjetas pequeñas con:

estructura molecular;

nombre;

similitud de Tanimoto;

pIC50 experimental;

botón “Comparar”.

Usar nombres de ejemplo:

Gefitinib;

Erlotinib;

Afatinib;

Lapatinib;

Osimertinib.

Aclarar que son datos ilustrativos hasta conectar el dataset real.

Disclaimer fijo

Mostrar una advertencia visible:

Esta herramienta es experimental. Los resultados simulados no reemplazan ensayos químicos, biológicos, toxicológicos, preclínicos ni clínicos.

Página 3: Explorador químico

Crear una página tipo dashboard.

Encabezado

Título:

Explorador de compuestos

Descripción:

Explorá una muestra demostrativa de moléculas asociadas a estudios de actividad frente a EGFR.

Resumen

Mostrar:

total de compuestos;

activos;

moderadamente activos;

baja actividad;

valor medio de pIC50.

Filtros

Agregar:

búsqueda por nombre;

rango de pIC50;

rango de peso molecular;

rango de LogP;

rango de TPSA;

selector de actividad;

botón restablecer.

Tabla

Columnas:

estructura;

identificador;

nombre;

SMILES resumido;

pIC50 experimental;

pIC50 predicho;

peso molecular;

LogP;

TPSA;

similitud.

Agregar:

ordenamiento;

paginación;

filas expandibles;

botón “Ver detalle”.

Usar datos simulados.

Vista alternativa

Agregar botones:

Vista tabla;

Vista tarjetas.

En vista tarjetas mostrar cada molécula con estructura, propiedades y badge de actividad.

Página 4: Espacio químico

Crear una visualización científica e interactiva.

Encabezado

Título:

Mapa del espacio químico

Descripción:

Representación bidimensional simulada de compuestos según sus características moleculares.

Gráfico

Crear un scatter plot tipo PCA o UMAP.

Mostrar categorías:

actividad alta;

actividad media;

actividad baja;

molécula consultada;

vecinos estructurales.

Agregar:

zoom;

tooltip;

leyenda;

filtros;

selector PCA/UMAP;

selector de color por pIC50, LogP o peso molecular.

Panel lateral

Al seleccionar un punto mostrar:

estructura;

nombre;

pIC50;

peso molecular;

LogP;

TPSA;

similitud;

botón “Analizar”.

Explicación

Agregar una tarjeta:

¿Qué representa este gráfico?

Explicar de manera sencilla que moléculas cercanas comparten características estructurales o fisicoquímicas similares.

Indicar que el gráfico actual usa datos simulados.

Página 5: Modelo y metodología

Crear una página seria y detallada.

Secciones

Problema científico.

Fuente de datos prevista.

Limpieza química.

Transformación IC50 a pIC50.

Descriptores moleculares.

Morgan Fingerprints.

Modelos comparados.

Validación.

Scaffold Split.

Métricas.

Dominio de aplicabilidad.

Interpretabilidad.

Limitaciones.

Usos no recomendados.

Diagrama del pipeline

Mostrar:

ChEMBL
→ limpieza de estructuras
→ cálculo de descriptores
→ división de datos
→ entrenamiento
→ validación
→ despliegue
→ predicción.

Tarjetas de modelos

Crear tarjetas para:

Ridge Regression;

Random Forest;

XGBoost.

No mostrar métricas reales.

Usar textos como:

Pendiente de entrenamiento;

Pendiente de validación;

Métricas no disponibles todavía.

Model Card

Crear una sección visual con:

nombre del modelo;

versión;

estado;

tipo de tarea;

endpoint;

datos;

métricas;

limitaciones;

responsable.

Estado:

Versión demo — modelo real pendiente de integración

Página 6: Sobre el proyecto

Introducción

Título:

Un proyecto interdisciplinario entre química farmacéutica e inteligencia artificial

Explicar que MolPredict EGFR fue diseñado para demostrar la integración de conocimientos de:

química medicinal;

ciencia de datos;

machine learning;

desarrollo frontend;

arquitectura cloud;

comunicación científica.

Habilidades

Crear cuatro bloques.

Química farmacéutica

estructura-actividad;

bioactividad;

propiedades moleculares;

química medicinal;

QSAR;

análisis de potencia.

Ciencia de datos

limpieza;

análisis exploratorio;

ingeniería de características;

validación;

visualización;

estadística.

Inteligencia artificial

regresión;

modelos ensemble;

interpretabilidad;

dominio de aplicabilidad;

evaluación;

MLOps.

Desarrollo

React;

TypeScript;

APIs;

AWS;

arquitectura cloud;

despliegue.

Arquitectura prevista

Crear un diagrama visual:

React
→ API Gateway
→ FastAPI
→ modelo QSAR
→ AWS SageMaker
→ almacenamiento S3.

Indicar:

Arquitectura proyectada. La primera versión funciona con datos demostrativos.

Contacto

Agregar botones:

Ver GitHub;

Ver LinkedIn;

Descargar resumen del proyecto.

Usar enlaces placeholder fáciles de reemplazar.

Componentes globales

Crear:

navbar;

footer;

page header;

metric card;

molecule card;

descriptor card;

status badge;

scientific disclaimer;

empty state;

loading state;

error state;

demo mode banner;

chart container;

tooltip educativo.

Comportamiento de demostración

Toda la aplicación debe funcionar sin backend.

Crear datos mock en archivos separados.

Cuando el usuario presione “Analizar molécula”:

validar que el campo no esté vacío;

mostrar estado de carga durante unos segundos;

mostrar los resultados simulados;

permitir limpiar y volver a analizar.

No realizar llamadas a servicios externos.

No presentar datos simulados como resultados reales.

Mostrar en las páginas relevantes:

Modo demostración — resultados y métricas ilustrativas.

Responsive

La aplicación debe funcionar correctamente en:

computadora;

tablet;

celular.

En móvil:

apilar tarjetas;

adaptar tablas;

usar scroll horizontal cuando sea necesario;

mantener botones visibles;

simplificar gráficos sin perder información.

Accesibilidad

Agregar:

contraste adecuado;

labels;

navegación por teclado;

estados de foco;

textos alternativos;

tooltips;

botones con nombres claros.

Resultado esperado

Generar una aplicación visualmente completa, profesional y navegable.

No dejar páginas vacías.

No dejar botones sin comportamiento visual.

No integrar todavía backend, autenticación, base de datos ni APIs externas.

La prioridad de esta primera etapa es lograr una interfaz sólida, coherente y atractiva para un portfolio profesional.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3fd50279-b466-4a6a-923a-98d95529c013).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
