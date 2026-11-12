# Matriz de Versionamiento SemVer — BusTrack Landing (Requisito 11 y 17)

Ver matriz maestra unificada en `bustrack-api/docs/versionamiento.md`.

| Hito | SemVer | `package.json` | Despliegue | Alcance |
|---|---|---|---|---|
| Línea Base | `0.1.0` | `2.0.0` | Nginx ACI transición | SPA React 19 + Vitest WCAG AA |
| **Etapa 0** | `0.2.0` | `2.0.0` | ACR `bustrack-landing:0.2.0-{sha}` | Imagen Nginx real desde `Dockerfile` |
| **Etapa 4** | `0.9.0` | `2.1.0` | Azure Static Web App Free + CDN | GA4 (`gtag.js`), `/manejo-datos`, Google Play CTA, SWR Cache |
| **Etapa 5** | `1.0.0` | `2.2.0` | Azure Static Web App Free + CDN | Link final Play Store verificado + DAST ZAP |
