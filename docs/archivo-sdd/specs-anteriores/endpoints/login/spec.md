# Endpoint / flujo de login

> Repositorio: BusTrack Landing · Ruta: `specs/endpoints/login/` · Estado: Implementado · Fecha: 2026-10-30.

## 1. Identificador y nombre

- **ID:** `endpoints/login`
- **Nombre:** Endpoint / flujo de login
- **Repositorio:** BusTrack Landing

## 2. Objetivo

Documentar y garantizar el flujo de inicio de sesión en Portal web / landing.

## 3. Contexto

Actualmente cookie de servidor Razor. En Angular la estrategia está pendiente de autorización.

## 4. Alcance

**Incluye:**

- Contrato de entrada/salida.
- Validaciones y errores.
- Sesión/token y expiración.
- Rate limiting y auditoría.

**No incluye:**

- Registro de usuarios nuevos.
- Recuperación de contraseña.
- SSO o biometría.

## 5. Requisitos funcionales

1. Aceptar credenciales y devolver token/sesión según el repositorio.
2. Mapear errores sin filtrar información sensible.
3. Respetar expiración server-driven.
4. Registrar eventos sin PII.

## 6. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad spec -> tarea -> prueba.

## 7. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 8. Criterios de aceptación

- [ ] Login exitoso devuelve el contrato esperado.
- [ ] Credenciales inválidas no revelan si el usuario existe.
- [ ] Rate limit responde 429 con Retry-After.
- [ ] Logs sin token ni contraseña.

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
