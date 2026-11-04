# Estrategia de pruebas

> Repositorio: BusTrack Landing · Ruta: `specs/pruebas/` · Estado: Parcial · Fecha: 2026-10-30.

## 1. Identificador y nombre

- **ID:** `pruebas`
- **Nombre:** Estrategia de pruebas
- **Repositorio:** BusTrack Landing

## 2. Objetivo

Definir la estrategia de pruebas de BusTrack Landing y el criterio de evidencia.

## 3. Contexto

Stack de pruebas previsto: Pruebas unitarias Angular, pruebas de componentes, e2e y pruebas de seguridad.

## 4. Alcance

**Incluye:**

- Pruebas unitarias, integración, contrato y seguridad.
- Datos de prueba.
- Cobertura y umbrales.
- Evidencia en CI.

**No incluye:**

- Pruebas de carga/caos no aprobadas.
- Pruebas contra producción.

## 5. Requisitos funcionales

1. Cada requisito crítico tiene prueba.
2. Las pruebas no dependen de servicios reales no controlados.
3. La cobertura se mide y reporta.
4. Los tests deben poder ejecutarse localmente.

## 6. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad spec -> tarea -> prueba.

## 7. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 8. Criterios de aceptación

- [ ] Suite ejecutable en verde.
- [ ] Cobertura reportada.
- [ ] Casos de error cubiertos.
- [ ] Sin dependencia de Azure real.

## 9. Restricciones

- No ejecutar migraciones ni despliegues en esta fase.
- No cambiar el stack objetivo sin autorización.
- No incluir secretos ni PII.

## 10. Dependencias

- `constitution.md`
- specs/seguridad/

## 11. Trazabilidad

- Plan: `plan.md` · Tareas: `task.md` · Diagramas: `chart.md`.
- Estado real: `../../Memoria.md`.
- Contratos: `../../docs/contratos-integracion.md`.
