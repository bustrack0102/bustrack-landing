# BusTrack Landing — BusTrack UTTT

> Portal Informativo y de Acceso Corporativo — Universidad Tecnológica de Tula-Tepeji.
> Desarrollado bajo metodología SDD + DevSecOps con **React 19 + TypeScript + Vite + Tailwind CSS**.

## Estado actual

- **Tecnología real:** React 19, TypeScript 5.7, Vite 6, React Router 7, Tailwind CSS 3, Lucide Icons, Vitest + React Testing Library, Docker, Semgrep SAST.
- **Implementado conforme a `specs/`:**
  - **Landing Pública (`06-landing-publica`):** Hero con propuesta de valor y sección interactiva por pestañas sobre los 3 pilares tecnológicos del proyecto.
  - **Información del Proyecto (`07-informacion-del-proyecto`):** Descripción veraz, equipo UTTT, alcance, límites (cero rastreo GPS continuo, cero recolección de sensores sin consentimiento) y stack tecnológico.
  - **Enlace de Descarga (`08-enlace-de-descarga`):** Tarjeta de Google Play Store con estado explícito *"Pendiente · En validación académica"*, sin publicar enlaces inexistentes.
  - **Aviso de Privacidad y Términos (`09-aviso-de-privacidad-y-terminos`):** Página dedicada (`/privacidad`) con políticas de datos, sensores y contacto institucional.
  - **Accesibilidad y Analítica (`10-accesibilidad`, `11-analitica-y-medicion`):** Navegación por teclado (`skip-link`, roles ARIA `tablist`/`tabpanel`), contraste WCAG y preferencia de analítica sin PII ni cookies invasivas.
  - **Autenticación y Sesiones (`04-autenticacion`, `05-gestion-de-sesiones`, `13-endpoint-login`, `14-endpoint-logout`):** Login corporativo (`/login`), ruta protegida (`/panel`) y cierre de sesión con limpieza local garantizada.
- **Despliegue Azure:** Azure Container Instances (`rg-bustrack-ncus` en `northcentralus`) con CI/CD automatizado en GitHub Actions.

## Comandos principales

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo local (Vite)
npm run typecheck    # Verificación estricta de tipos TypeScript
npm run build        # Build de producción en dist/
npm test             # Ejecutar suite de pruebas con Vitest
```
