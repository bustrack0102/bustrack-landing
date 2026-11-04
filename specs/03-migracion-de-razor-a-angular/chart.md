# Diagramas — 03-migracion-de-razor-a-angular — Migración de Razor Pages a Angular

> Spec: `spec.md` · Plan: `plan.md`.

## 1. Flujo funcional

```mermaid
flowchart TD
  R[Razor] --> I[Inventario]
  I --> A[Angular]
  A --> P[Paridad]
  R -.referencia.-> A
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

Diagramas de proceso; no representan recursos desplegados.
