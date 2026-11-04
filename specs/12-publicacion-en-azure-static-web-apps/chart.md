# Diagramas — 12-publicacion-en-azure-static-web-apps — Publicación en Azure Static Web Apps

> Spec: `spec.md` · Plan: `plan.md`.

## 1. Flujo funcional

```mermaid
flowchart TD
  A[Build Angular] --> B[Static Web Apps]
  B --> C[Dominio]
  C --> D[API]
```

## 2. Componentes

```mermaid
flowchart LR
  C[Cliente] --> A[Servicio]
  A --> D[(Datos)]
```

## 3. Secuencia

```mermaid
sequenceDiagram
  participant D as Dev
  participant C as CI
  D->>C: push
  C-->>D: lint + pruebas
```

## 4. Notas

Propuesta; no hay despliegue.
