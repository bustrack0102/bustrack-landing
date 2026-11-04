# Plan técnico — Endpoint / flujo de login

> Spec: `spec.md` · Repositorio: BusTrack Landing · Estado: Implementado.

## 1. Estrategia técnica

Documentar el estado actual y el objetivo; implementar por incrementos con pruebas y sin romper contratos.

## 2. Arquitectura propuesta

- Stack objetivo: Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.
- Componentes: Componentes del repositorio afectados por la spec.
- Tecnologías: Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.

## 3. Componentes afectados

- Componentes del repositorio afectados por la spec

## 4. Estructura de archivos

```text
specs/endpoints/login/ + código y pruebas relacionadas
```

## 5. Dependencias

- API central
- `docs/contratos-integracion.md`

## 6. Consideraciones de seguridad

- CSP estricta, HSTS, cookies seguras o tokens según decisión, redirecciones locales, rate limiting y cero secretos en cliente.

- Validar entradas y no registrar secretos/PII.

## 7. Riesgos

- Confundir el estado actual con el objetivo.
- Documentación genérica o desalineada.
- Dependencias entre repos no documentadas.

## 8. Estrategia de pruebas

Revisión de coherencia documental y, cuando exista código, pruebas unitarias, de contrato y seguridad.

## 9. Trazabilidad

Cada tarea de `task.md` referencia un requisito de `spec.md`. Los diagramas están en `chart.md`.
