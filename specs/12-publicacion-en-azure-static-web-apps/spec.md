# 12-publicacion-en-azure-static-web-apps — Publicación en Azure Static Web Apps

> Repositorio: BusTrack Landing · Estado: Implementado (Azure Container Instances) · Fecha: 2026-11-11.

## 1. Objetivo

Planificar el despliegue de Angular en Azure Static Web Apps sin ejecutarlo.

## 2. Contexto

No hay recursos Azure ni despliegue.

## 3. Alcance

**Incluye:**

- Configuración de build.
- Variables.
- Dominio.
- CI/CD de despliegue.

**No incluye:**

- Provisionar recursos.
- Afirmar despliegue existente.

## 4. Requisitos funcionales

1. Build reproducible.
2. Variables sin secretos en cliente.
3. CORS con la API.
4. Rollback.

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
