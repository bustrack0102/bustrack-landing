# CI/CD y gates de calidad

> Repositorio: BusTrack Landing · Ruta: `specs/cicd/` · Estado: Parcial · Fecha: 2026-10-30.

## 1. Identificador y nombre

- **ID:** `cicd`
- **Nombre:** CI/CD y gates de calidad
- **Repositorio:** BusTrack Landing

## 2. Objetivo

Definir el pipeline de BusTrack Landing con gates bloqueantes y artefactos verificables.

## 3. Contexto

Herramientas objetivo: GitHub Actions, npm ci, lint, build, test, Semgrep (TypeScript), Gitleaks y escaneo de dependencias.

## 4. Alcance

**Incluye:**

- Lint, formato, pruebas, SAST, SCA y secretos.
- Artefactos y cobertura.
- Reglas de rama y PR.
- Sin despliegue real en esta fase.

**No incluye:**

- Despliegue automático a Azure.
- Servicios de pago.

## 5. Requisitos funcionales

1. Todo PR ejecuta lint + pruebas + SAST.
2. Los fallos bloquean la fusión.
3. No se usan secretos productivos en PR.
4. Se conservan artefactos útiles.

## 6. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad spec -> tarea -> prueba.

## 7. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 8. Criterios de aceptación

- [ ] El workflow se ejecuta en PR.
- [ ] Un fallo de lint/test/SAST pone el check en rojo.
- [ ] La cobertura se genera o se documenta su ausencia.

## 9. Restricciones

- No ejecutar migraciones ni despliegues en esta fase.
- No cambiar el stack objetivo sin autorización.
- No incluir secretos ni PII.

## 10. Dependencias

- .github/workflows/
- specs/pruebas/
- specs/seguridad/

## 11. Trazabilidad

- Plan: `plan.md` · Tareas: `task.md` · Diagramas: `chart.md`.
- Estado real: `../../Memoria.md`.
- Contratos: `../../docs/contratos-integracion.md`.
