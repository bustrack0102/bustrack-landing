# Cierre de sesión / revocación

> Repositorio: BusTrack Landing · Ruta: `specs/endpoints/logout/` · Estado: Implementado · Fecha: 2026-10-30.

## 1. Identificador y nombre

- **ID:** `endpoints/logout`
- **Nombre:** Cierre de sesión / revocación
- **Repositorio:** BusTrack Landing

## 2. Objetivo

Documentar el cierre de sesión y la revocación de credenciales en Portal web / landing.

## 3. Contexto

Actualmente cookie de servidor Razor. En Angular la estrategia está pendiente de autorización.

## 4. Alcance

**Incluye:**

- Cierre local y remoto.
- Revocación de token/sesión.
- Errores y reintentos.

**No incluye:**

- Registro de usuarios.

## 5. Requisitos funcionales

1. Cerrar sesión aunque falle la red (local-first) cuando aplique.
2. Revocar token del lado servidor en API.
3. No dejar credenciales en almacenamiento local.

## 6. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad spec -> tarea -> prueba.

## 7. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 8. Criterios de aceptación

- [ ] Logout exitoso limpia sesión.
- [ ] Token revocado no puede reutilizarse.
- [ ] Sin token/credenciales en logs.

## 9. Restricciones

- No ejecutar migraciones ni despliegues en esta fase.
- No cambiar el stack objetivo sin autorización.
- No incluir secretos ni PII.

## 10. Dependencias

- API central
- `docs/contratos-integracion.md`

## 11. Trazabilidad

- Plan: `plan.md` · Tareas: `task.md` · Diagramas: `chart.md`.
- Estado real: `../../Memoria.md`.
- Contratos: `../../docs/contratos-integracion.md`.
