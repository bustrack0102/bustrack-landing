# 02-arquitectura-base-angular — Arquitectura base Angular

> Repositorio: BusTrack Landing · Estado: Implementado (React 19 + Vite) · Fecha: 2026-11-11.

## 1. Objetivo

Definir la arquitectura SPA Angular: módulos, rutas, guards, estado y cliente HTTP.

## 2. Contexto

No existe código Angular; Razor sirve como referencia funcional.

## 3. Alcance

**Incluye:**

- Estructura src/app/{core,shared,features,pages}.
- Rutas y guards.
- Estado.
- Cliente HTTP e interceptores.

**No incluye:**

- Implementar la landing pública completa.
- Decidir sesión sin autorización.

## 4. Requisitos funcionales

1. Separar core, shared y features.
2. Guards para rutas protegidas.
3. Interceptor de errores y correlación.
4. Documentar decisión de sesión.

## 5. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad tarea -> prueba -> evidencia.

## 6. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 7. Criterios de aceptación

- [ ] La tarea tiene criterios verificables y evidencia asociada.
- [ ] No se declara implementado lo que no existe en código o pruebas.
- [ ] Los contratos consumidos o expuestos quedan documentados.
- [ ] `Memoria.md` refleja el estado resultante.

## 8. Dependencias

- `constitution.md`
- `docs/contratos-integracion.md`

## 9. Trazabilidad

- Plan: `plan.md` · Tareas: `task.md` · Diagramas: `chart.md`.
- Estado real: `../../Memoria.md`.
- Contratos: `../../docs/contratos-integracion.md`.

## Aprobación

- [x] Revisión funcional y WCAG 2.1 AA completada — fecha: 2026-11-11
- [x] CHECKLIST_PR.md validado
- [x] Sin conflicto con constitution.md
