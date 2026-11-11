# 01-configuracion-inicial-del-proyecto — Configuración inicial del proyecto

> Repositorio: BusTrack Landing · Estado: Implementado · Fecha: 2026-11-11.

## 1. Objetivo

Dejar el portal web configurable por entorno, con dependencias y comandos reproducibles.

## 2. Contexto

Existe el proyecto ASP.NET Core Razor Pages con Docker, Gitleaks y configuración de API.

## 3. Alcance

**Incluye:**

- Proyecto Razor actual.
- Configuración dev/prod.
- Docker.
- Comandos de build/test.

**No incluye:**

- Cambiar el stack objetivo.
- Desplegar recursos o ejecutar migraciones en esta fase.

## 4. Requisitos funcionales

1. El proyecto compila y ejecuta pruebas.
2. No incluye secretos reales.
3. Los entornos están separados.
4. Se documenta la brecha hacia Angular.

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
