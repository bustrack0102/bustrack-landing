# 00 — Fundamentos y gobernanza SDD

> Repositorio: BusTrack Landing · Ruta: `specs/00-fundamentos/` · Estado: Implementado · Fecha: 2026-10-30.

## 1. Identificador y nombre

- **ID:** `00-fundamentos`
- **Nombre:** 00 — Fundamentos y gobernanza SDD
- **Repositorio:** BusTrack Landing

## 2. Objetivo

Fijar los principios, límites y flujo SDD de BusTrack Landing.

## 3. Contexto

La documentación previa no reflejaba el estado real del repositorio. Esta spec establece la fuente de verdad.

## 4. Alcance

**Incluye:**

- Constitución, AGENTS, Memoria, CHECKLIST y README.
- Tecnología actual vs objetivo.
- Flujo spec→plan→task→chart→pruebas.
- Prohibición de declarar avances sin evidencia.

**No incluye:**

- Implementar funcionalidad de negocio.
- Cambiar la tecnología objetivo.
- Desplegar recursos.

## 5. Requisitos funcionales

1. Describir el stack actual: ASP.NET Core .NET 10 Razor Pages, cookie auth, Serilog, HTTP resilience, Docker, Gitleaks, ZAP.
2. Fijar el stack objetivo: Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.
3. Definir criterios de terminado y trazabilidad.
4. Registrar decisiones pendientes sin inventar respuestas.

## 6. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad spec -> tarea -> prueba.

## 7. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 8. Criterios de aceptación

- [ ] El documento existe y es coherente con el código.
- [ ] Las tareas tienen criterio de terminado verificable.
- [ ] No se declaran implementaciones inexistentes.

## 9. Restricciones

- No ejecutar migraciones ni despliegues en esta fase.
- No cambiar el stack objetivo sin autorización.
- No incluir secretos ni PII.

## 10. Dependencias

- `Memoria.md`
- `docs/contratos-integracion.md`

## 11. Trazabilidad

- Plan: `plan.md` · Tareas: `task.md` · Diagramas: `chart.md`.
- Estado real: `../../Memoria.md`.
- Contratos: `../../docs/contratos-integracion.md`.
