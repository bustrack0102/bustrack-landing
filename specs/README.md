# Specs por tarea — BusTrack Landing

> Cada carpeta numerada representa una tarea o funcionalidad concreta y contiene
> `spec.md`, `plan.md`, `task.md` y `chart.md`. Las categorías técnicas generales
> ya no viven aquí: CI/CD está en `../cicd/` y Azure en `../azure/`.
> El historial se conserva en `../docs/archivo-sdd/specs-anteriores/`.

## Tareas

| ID | Tarea | Estado |
|---|---|---|
| `01-configuracion-inicial-del-proyecto` | Configuración inicial del proyecto | Implementado |
| `02-arquitectura-base-angular` | Arquitectura base Angular | Pendiente |
| `03-migracion-de-razor-a-angular` | Migración de Razor Pages a Angular | Pendiente |
| `04-autenticacion` | Autenticación en el portal | Parcial |
| `05-gestion-de-sesiones` | Gestión de sesiones del portal | Parcial |
| `06-landing-publica` | Landing pública | Pendiente |
| `07-informacion-del-proyecto` | Información del proyecto | Pendiente |
| `08-enlace-de-descarga` | Enlace de descarga a Google Play | Pendiente |
| `09-aviso-de-privacidad-y-terminos` | Aviso de privacidad y términos | Pendiente |
| `10-accesibilidad` | Accesibilidad del portal | Pendiente |
| `11-analitica-y-medicion` | Analítica y medición | Pendiente |
| `12-publicacion-en-azure-static-web-apps` | Publicación en Azure Static Web Apps | Pendiente |

## Reglas

- No crear carpetas vacías ni specs genéricas para completar la estructura.
- No dividir una tarea en varias specs ni agrupar funcionalidades independientes.
- Una tarea pasa a `Implementado` solo con código y pruebas verificables.
- Los endpoints se documentan aparte, en `../specs-endpoints/`.
