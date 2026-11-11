# 14-endpoint-logout — Consumo del endpoint de logout

> Repositorio: BusTrack Landing · Endpoint: `POST /api/v1/auth/logout` · Estado: Implementado · Fecha: 2026-11-11.

## 1. Objetivo

Revocar el token y cerrar la sesión del portal.

## 2. Contrato

| Campo | Valor |
|---|---|
| Método | `POST` |
| Ruta | `/api/v1/auth/logout` |
| Autenticación | Sesión vigente. |
| Consumidor | Portal web |
| Estado | Implementado en Razor |

**Parámetros / entrada:**

- Header Authorization: Bearer JWT.

**Respuesta:**

- 204: revocado.
- 401: token inválido.

## 3. Códigos HTTP

- 200/201: éxito.
- 400/422: validación.
- 401/403: autenticación/autorización.
- 404: recurso inexistente.
- 409: conflicto.
- 429: rate limit.
- 500: error interno sin detalles.

## 4. Validaciones

1. Cierre local garantizado.

## 5. Seguridad

- CSP estricta, HSTS, cookies seguras o tokens según decisión, redirecciones locales, rate limiting y cero secretos en cliente.
- No registrar tokens, credenciales ni PII.

## 6. Criterios de aceptación

- [ ] La tarea tiene criterios verificables y evidencia asociada.
- [ ] No se declara implementado lo que no existe en código o pruebas.
- [ ] Los contratos consumidos o expuestos quedan documentados.
- [ ] `Memoria.md` refleja el estado resultante.

## 7. Dependencias

- `docs/contratos-integracion.md`
- `spec.md` de la tarea funcional asociada

## Aprobación

- [x] Revisión funcional y WCAG 2.1 AA completada — fecha: 2026-11-11
- [x] CHECKLIST_PR.md validado
- [x] Sin conflicto con constitution.md
