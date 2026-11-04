# Diagramas — Migración Razor Pages → Angular + TypeScript

> Spec: `spec.md` · Plan: `plan.md`. Diagramas Mermaid; no representan recursos desplegados.

## 1. Flujo funcional

```mermaid
flowchart TD
  R[Razor actual] --> I[Inventario]
  I --> A[Arquitectura Angular]
  A --> M[Migración por páginas]
  M --> P[Pruebas de paridad]
  P -->|ok| N[Angular]
  R -.->|referencia| M
```

## 2. Relación entre componentes

```mermaid
flowchart LR
  N[Angular] --> API[API]
  R[Razor legacy] -.->|referencia| N
```

## 3. Flujo de datos / secuencia

```mermaid
sequenceDiagram
  participant U as Usuario
  participant W as Angular
  participant A as API
  U->>W: login
  W->>A: POST /auth/login
  A-->>W: credencial/sesión
  W-->>U: home
```

## 4. Notas

Angular es objetivo, no estado actual.
