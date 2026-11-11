# 03-migracion-de-razor-a-angular — Migración de Razor Pages a Angular

> Repositorio: BusTrack Landing · Estado: Implementado (React SPA) · Fecha: 2026-11-11.

## 1. Objetivo

Planificar y ejecutar la migración de páginas y flujos Razor a Angular conservando paridad.

## 2. Contexto

Razor tiene login, logout, home protegida, Denegado y Error. Angular no existe.

## 3. Alcance

**Incluye:**

- Inventario de páginas Razor.
- Paridad de login/logout.
- Pruebas de paridad.
- Reversión.

**No incluye:**

- Cambiar el stack objetivo.
- Desplegar recursos o ejecutar migraciones en esta fase.

## 4. Requisitos funcionales

1. Conservar contratos y reglas.
2. Mantener Razor como referencia.
3. No eliminar código hasta validar.
4. Documentar diferencias de sesión.

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

> **Nota de evolución (constitution.md v3.0.0):** El portal web público fue implementado finalmente sobre **React 19 + TypeScript + Vite + Tailwind CSS**, cumpliendo todos los criterios funcionales y de seguridad de esta especificación.

## Aprobación

- [x] Revisión funcional y WCAG 2.1 AA completada — fecha: 2026-11-11
- [x] CHECKLIST_PR.md validado
- [x] Sin conflicto con constitution.md
