# BusTrack Landing — BusTrack

> Sistema de consulta y planificación de transporte público — Universidad Tecnológica de Tula-Tepeji.
> SDD + DevSecOps. Este README describe el **estado real** y la **arquitectura objetivo**.

## Estado actual

- **Tecnología real:** ASP.NET Core .NET 10 Razor Pages, cookie auth, Serilog, HTTP resilience, Docker, Gitleaks, ZAP.
- **Tecnología objetivo:** Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.
- **Implementado:** ver lista en `Memoria.md`.
- **No implementado:** ver pendientes en `Memoria.md`.
- **Recursos Azure:** no desplegados; propuesta en `azure/`.

## Qué hace este repositorio

Angular -> API central por HTTPS/REST. La API gestiona autenticación y negocio.

## Estructura

```text
src/app/{core,shared,features,pages}, src/assets, src/environments (objetivo Angular). Estructura real actual: WebSDD/{Pages,Models,Services,Middleware,Logging,wwwroot}.
```

## Gobernanza SDD

| Documento | Propósito |
|---|---|
| `constitution.md` | Principios inalterables del repositorio. |
| `AGENTS.md` | Instrucciones para agentes de IA. |
| `Memoria.md` | Estado real, decisiones y deuda técnica. |
| `CHECKLIST_PR.md` | Controles obligatorios de PR. |
| `specs/` | Specs canónicas (`spec.md`, `plan.md`, `task.md`, `chart.md`). |
| `docs/contratos-integracion.md` | Contratos con los demás repositorios. |
| `.opencode/` | Agentes y skills específicos. |
| `.semgrep/` | Reglas SAST reales. |
| `.github/workflows/` | CI por stack. |

## Specs por tarea

- `specs/01-configuracion-inicial-del-proyecto/` — Configuración inicial del proyecto (Implementado).
- `specs/02-arquitectura-base-angular/` — Arquitectura base Angular (Pendiente).
- `specs/03-migracion-de-razor-a-angular/` — Migración de Razor Pages a Angular (Pendiente).
- `specs/04-autenticacion/` — Autenticación en el portal (Parcial).
- `specs/05-gestion-de-sesiones/` — Gestión de sesiones del portal (Parcial).
- `specs/06-landing-publica/` — Landing pública (Pendiente).
- `specs/07-informacion-del-proyecto/` — Información del proyecto (Pendiente).
- `specs/08-enlace-de-descarga/` — Enlace de descarga a Google Play (Pendiente).
- `specs/09-aviso-de-privacidad-y-terminos/` — Aviso de privacidad y términos (Pendiente).
- `specs/10-accesibilidad/` — Accesibilidad del portal (Pendiente).
- `specs/11-analitica-y-medicion/` — Analítica y medición (Pendiente).
- `specs/12-publicacion-en-azure-static-web-apps/` — Publicación en Azure Static Web Apps (Pendiente).

## Specs de endpoints

- `specs-endpoints/13-endpoint-login/` — `POST /api/v1/auth/login` (Implementado en Razor).
- `specs-endpoints/14-endpoint-logout/` — `POST /api/v1/auth/logout` (Implementado en Razor).
- `specs-endpoints/15-endpoint-consulta-publica-de-transporte/` — `GET /api/v1/transporte/publico` (Propuesto).

## CI/CD y Azure

- `cicd/` — arquitectura del pipeline y gates.
- `azure/` — arquitectura final de despliegue (propuesta).

El historial de la organización anterior está en `docs/archivo-sdd/specs-anteriores/`.

## Comandos

```text
npm ci
npm run lint
npm run build && npm test -- --watch=false
```

## Limitaciones y advertencias

- No se declara funcionalidad terminada sin código y pruebas.
- El árbol está anidado `X-main/X-main`; la raíz real es la carpeta interior.
- No hay repositorio Git local, por lo que tags/releases no son verificables.
- No hay despliegue Azure ni recursos provisionados.

## Equipo

Fátima Ximena García González, Diego Parra Cruz, José de Jesús López Islas, Melanie Joliee Bonilla Domínguez.
