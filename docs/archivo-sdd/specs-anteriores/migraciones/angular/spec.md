# Migración Razor Pages → Angular + TypeScript

> Repositorio: BusTrack Landing · Ruta: `specs/migraciones/angular/` · Estado: Pendiente · Fecha: 2026-10-30.

## 1. Identificador y nombre

- **ID:** `migraciones/angular`
- **Nombre:** Migración Razor Pages → Angular + TypeScript
- **Repositorio:** BusTrack Landing

## 2. Objetivo

Documentar la migración del portal Razor Pages a Angular + TypeScript sin ejecutarla.

## 3. Contexto

El código actual Razor tiene login, logout, hardening y pruebas. Se conserva como referencia; Angular no existe.

## 4. Alcance

**Incluye:**

- Flujos, páginas, contratos y pruebas reutilizables.
- Arquitectura Angular.
- Estrategia de sesión.
- Riesgos y reversión.

**No incluye:**

- Implementar Angular ahora.
- Eliminar Razor Pages.
- Cambiar la API.

## 5. Requisitos funcionales

1. Reutilizar contratos y reglas de negocio.
2. Mantener paridad de login/logout.
3. Documentar la decisión de sesión SPA.
4. No asumir conversión automática.

## 6. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad spec -> tarea -> prueba.

## 7. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 8. Criterios de aceptación

- [ ] Login/logout con paridad funcional.
- [ ] Contratos equivalentes.
- [ ] Pruebas de paridad y seguridad.
- [ ] Razor conservado como referencia.

## 9. Restricciones

- No ejecutar migraciones ni despliegues en esta fase.
- No cambiar el stack objetivo sin autorización.
- No incluir secretos ni PII.

## 10. Dependencias

- `docs/contratos-integracion.md`
- specs/endpoints/login/
- specs/endpoints/logout/

## 11. Trazabilidad

- Plan: `plan.md` · Tareas: `task.md` · Diagramas: `chart.md`.
- Estado real: `../../Memoria.md`.
- Contratos: `../../docs/contratos-integracion.md`.
