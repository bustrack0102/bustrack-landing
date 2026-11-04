# Diagramas — Landing pública, descarga, privacidad y accesibilidad

> Spec: `spec.md` · Plan: `plan.md`. Diagramas Mermaid; no representan recursos desplegados.

## 1. Flujo funcional

```mermaid
flowchart TD
  A[Home] --> B[Proyecto]
  A --> C[Descarga]
  A --> D[Privacidad]
  A --> E[Login]
  C --> F[Google Play]
```

## 2. Relación entre componentes

```mermaid
flowchart LR
  W[Angular] --> API[API]
  W --> P[Google Play]
```

## 3. Flujo de datos / secuencia

```mermaid
sequenceDiagram
  participant U as Visitante
  participant W as Landing
  U->>W: visita
  W-->>U: propuesta de valor
  U->>W: clic descarga
  W-->>U: Google Play (cuando exista)
```

## 4. Notas

La landing pública no existe; el enlace de tienda está pendiente.
