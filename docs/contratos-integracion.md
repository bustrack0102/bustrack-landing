# Contratos de integración — BusTrack Landing

> Vista de los contratos que este repositorio expone o consume. Solo login/logout están
> implementados en los clientes y la API; el resto es **propuesta** hasta que exista código.

## 1. Principios

- La API central es la única fuente autorizada de datos de transporte.
- Ningún cliente accede a Cosmos DB ni a ML/GenAI directamente.
- ML y GenAI son servicios internos autenticados; no exponen login público.
- Toda integración usa HTTPS, timeouts y errores tipados.
- Lo propuesto se marca como tal; no se declaran endpoints inexistentes.

## 2. Consume (API central)

| Método | Ruta | Estado | Notas |
|---|---|---|---|
| POST | `/api/v1/auth/login` | Implementado (Razor) | Paridad obligatoria en Angular. |
| POST | `/api/v1/auth/logout` | Implementado (Razor) | Cierre local garantizado. |
| GET | `/api/v1/transporte/*` | Propuesta | Información pública de transporte. |

## 3. Pendiente de decisión

- Estrategia de sesión para SPA: cookie same-site vs token en memoria.
- CORS entre Static Web Apps y la API.
- Enlace real a Google Play (la app aún no está publicada).

## 5. Errores uniformes

| Código | Significado |
|---|---|
| 400 | Petición mal formada. |
| 401 | Credencial ausente o inválida. |
| 403 | Sin permiso. |
| 404 | Recurso inexistente. |
| 409 | Conflicto de concurrencia/unicidad. |
| 422 | Validación de dominio/esquema. |
| 429 | Rate limit. |
| 500 | Error interno sin detalles sensibles. |
