# 🧬 MolPredict EGFR
<img width="1440" height="678" alt="Captura de pantalla 2026-08-12 200345" src="https://github.com/user-attachments/assets/0509ac03-9c4d-41f6-80cf-3d1fd0ccb8b3" />


**Plataforma experimental de quimioinformática para análisis molecular y predicción computacional demostrativa de actividad frente a EGFR.**

🌐 **Aplicación:** [mol-insight-studio.lovable.app](https://mol-insight-studio.lovable.app)

⚙️ **Backend API:** [molpredict-egfr-api](https://github.com/ibanezmariela78-lab/molpredict-egfr-api)

---

## 🔬 Sobre el proyecto

MolPredict EGFR es un proyecto de portfolio que integra **química medicinal, quimioinformática, ciencia de datos y desarrollo web**.

La plataforma permite ingresar estructuras químicas mediante **SMILES**, procesarlas con **RDKit** y visualizar información molecular en una interfaz web interactiva.

La predicción pIC50/IC50 incluida actualmente es **demostrativa y no corresponde a un modelo QSAR científicamente validado**.

---

## ✨ Funcionalidades

* Validación y canonicalización de estructuras **SMILES**
* Representación molecular 2D generada con **RDKit**
* Cálculo de descriptores fisicoquímicos
* Evaluación orientativa de reglas de **Lipinski**
* Predicción demostrativa de actividad frente a **EGFR**
* Dominio de aplicabilidad
* Factores favorables y desfavorables de interpretación
* Búsqueda de moléculas estructuralmente similares
* Similitud mediante **Morgan Fingerprints + Tanimoto**
* Explorador de compuestos
* Visualización del espacio químico
* Sección de metodología y arquitectura del proyecto

---

## 🧪 Descriptores moleculares

Entre las propiedades calculadas se incluyen:

* Peso molecular
* LogP
* TPSA
* Donantes de enlaces de hidrógeno
* Aceptores de enlaces de hidrógeno
* Enlaces rotables
* Anillos aromáticos
* Fracción Csp3

---

## 🛠️ Tecnologías

### Frontend

* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Recharts
* TanStack Router
* Lovable

### Backend

* Python
* FastAPI
* RDKit
* Uvicorn
* Replit

### Desarrollo

* Git
* GitHub
* Cursor
* REST API

---

## 🏗️ Arquitectura

```text
React / TypeScript
        │
        ▼
   FastAPI REST API
        │
        ▼
      RDKit
        │
        ├── Validación molecular
        ├── Descriptores fisicoquímicos
        ├── Representación 2D
        └── Similitud estructural
```

---

## 🚀 Aplicación

La interfaz está publicada y puede probarse directamente:

👉 **[Abrir MolPredict EGFR](https://mol-insight-studio.lovable.app)**

El backend FastAPI se encuentra en un repositorio independiente:

👉 **[Ver Backend API](https://github.com/ibanezmariela78-lab/molpredict-egfr-api)**

---

## ⚠️ Disclaimer científico

MolPredict EGFR es una **demostración educativa y de portfolio**.

Los descriptores y estructuras moleculares se calculan computacionalmente mediante RDKit.

La predicción pIC50/IC50 es demostrativa, **no está científicamente validada** y no debe utilizarse para decisiones clínicas, regulatorias ni experimentales.

Los resultados no reemplazan ensayos químicos, biológicos, toxicológicos, preclínicos ni clínicos.

---

## 🎯 Objetivo del proyecto

El proyecto busca demostrar la integración interdisciplinaria de:

* Química medicinal
* Quimioinformática
* Ciencia de datos
* Inteligencia artificial
* Desarrollo frontend
* Desarrollo de APIs
* Visualización científica
* Arquitectura de aplicaciones científicas

---

## 👩‍💻 Autora

**Mariela Ibáñez**

Química · Ciencia de Datos · Inteligencia Artificial · Quimioinformática

🌐 [MolPredict EGFR](https://mol-insight-studio.lovable.app)
💻 [GitHub](https://github.com/ibanezmariela78-lab)
💼 [LinkedIn](https://www.linkedin.com/in/mariela-ibanez-quimioinformatica/)
