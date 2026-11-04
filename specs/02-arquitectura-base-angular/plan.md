# Plan técnico — 02-arquitectura-base-angular — Arquitectura base Angular

> Spec: `spec.md` · Repositorio: BusTrack Landing · Estado: Pendiente.

## 1. Estrategia

Implementar por incrementos, conservando contratos y midiendo con pruebas antes de avanzar.

## 2. Arquitectura y componentes

- Stack objetivo: Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.
- Componentes: componentes del repositorio afectados por la tarea.
- Tecnología: Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.

## 3. Archivos y estructura

```text
src/app/, src/environments/ (futuro)
```

## 4. Seguridad

- CSP estricta, HSTS, cookies seguras o tokens según decisión, redirecciones locales, rate limiting y cero secretos en cliente.
- Validar entradas y no registrar secretos/PII.

## 5. Riesgos

- Confundir el estado actual con el objetivo.
- Dependencias con otros repositorios no documentadas.
- Ampliar el alcance sin spec aprobada.

## 6. Estrategia de pruebas

Pruebas unitarias y de contrato cuando exista código; revisión documental mientras la tarea sea propuesta.

## 7. Trazabilidad

Cada tarea de `task.md` referencia un requisito de `spec.md`; los diagramas viven en `chart.md`.
