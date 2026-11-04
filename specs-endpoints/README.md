# Specs de endpoints — BusTrack Landing

> Contratos HTTP que este repositorio expone o consume. Cada endpoint tiene
> `spec.md`, `plan.md`, `task.md` y `chart.md`. La numeración continúa después
> de la última tarea de `../specs/`.

## Endpoints

| ID | Método y ruta | Nombre | Estado |
|---|---|---|---|
| `13-endpoint-login` | `POST /api/v1/auth/login` | Consumo del endpoint de login | Implementado en Razor |
| `14-endpoint-logout` | `POST /api/v1/auth/logout` | Consumo del endpoint de logout | Implementado en Razor |
| `15-endpoint-consulta-publica-de-transporte` | `GET /api/v1/transporte/publico` | Consumo de consulta pública de transporte | Propuesto |

## Reglas

- Diferenciar endpoints implementados de propuestos.
- No inventar endpoints ni métodos.
- Cada endpoint declara autenticación, validaciones, códigos HTTP y pruebas.
