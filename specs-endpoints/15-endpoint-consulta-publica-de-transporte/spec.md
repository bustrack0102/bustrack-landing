# 15-endpoint-consulta-publica-de-transporte — Consumo de consulta pública de transporte

> Repositorio: BusTrack Landing · Endpoint: `GET /api/v1/transporte/publico` · Estado: Propuesto · Fecha: 2026-11-11.

## 1. Objetivo

Mostrar información pública de transporte en la landing.

## 2. Contrato

| Campo | Valor |
|---|---|
| Método | `GET` |
| Ruta | `/api/v1/transporte/publico` |
| Autenticación | Público o según decisión de la API. |
| Consumidor | Landing pública |
| Estado | Propuesto |

**Parámetros / entrada:**

- Query: destino o empresa.

**Respuesta:**

- 200: información pública.

## 3. Códigos HTTP

- 200/201: éxito.
- 400/422: validación.
- 401/403: autenticación/autorización.
- 404: recurso inexistente.
- 409: conflicto.
- 429: rate limit.
- 500: error interno sin detalles.

## 4. Validaciones

1. Solo datos públicos.
2. Sin PII.

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
