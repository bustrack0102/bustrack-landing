# Diagramas — 09-aviso-de-privacidad-y-terminos — Aviso de privacidad y términos

> Spec: `spec.md` · Plan: `plan.md`.

## 1. Flujo funcional

```mermaid
flowchart TD
  A[Borrador] --> B[Revisión legal]
  B --> C[Publicación]
  C --> D[Enlaces]
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

Requiere revisión legal antes de publicar.
