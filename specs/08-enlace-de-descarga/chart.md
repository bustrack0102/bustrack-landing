# Diagramas — 08-enlace-de-descarga — Enlace de descarga a Google Play

> Spec: `spec.md` · Plan: `plan.md`.

## 1. Flujo funcional

```mermaid
flowchart TD
  A[Descarga] --> B{¿App publicada?}
  B -->|no| C[Pendiente]
  B -->|sí| D[Google Play]
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

No hay app publicada ni URL de tienda verificada.
