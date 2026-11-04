# Diagramas — 05-gestion-de-sesiones — Gestión de sesiones del portal

> Spec: `spec.md` · Plan: `plan.md`.

## 1. Flujo funcional

```mermaid
flowchart TD
  A[Login] --> B[Sesión]
  B --> C{¿Válida?}
  C -->|sí| D[Acceso]
  C -->|no| E[Login]
  D --> F[Logout]
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

La decisión de sesión SPA sigue abierta.
