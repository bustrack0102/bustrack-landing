# Memoria técnica — BusTrack Landing

> Registro vivo del repositorio. Última actualización: 2026-11-11.

## 1. Estado real

- **Repositorio:** `bustrack0102/bustrack-landing`
- **Tecnología actual:** React 19 + TypeScript + Vite + Tailwind CSS + Vitest + Docker.
- **Despliegue Azure:** Contenedor `bustrack-landing` en `rg-bustrack-ncus` (`northcentralus`) con CI/CD en GitHub Actions (`http://bustrack-landing-uttt.northcentralus.azurecontainer.io:8000`).

## 2. Funcionalidades implementadas (Alineadas a Specs 01–15)

- **Spec 06 (Landing Pública):** Hero informativo, propuesta de valor y componente interactivo por pestañas (`tablist`/`tabpanel`) de beneficios del proyecto, sin incluir funciones operativas que pertenecen exclusivamente a la aplicación móvil.
- **Spec 07 (Información del Proyecto):** Descripción institucional UTTT, alcance, límites (cero rastreo GPS personal, cero acceso directo a BD/IA desde el cliente) y arquitectura.
- **Spec 08 (Enlace de Descarga):** Botón hacia Google Play Store marcado honestamente en estado pendiente mientras la app móvil concluye validación.
- **Spec 09 (Aviso de Privacidad y Términos):** Vista `/privacidad` detallando tratamiento de datos, sensores y contacto.
- **Spec 10 y 11 (Accesibilidad y Analítica):** Etiquetas ARIA, navegación por teclado y suite automatizada `tests/WCAGAccessibility.test.tsx`.
- **Specs 04, 05, 13 y 14 (Autenticación y Sesiones):** Login (`/login`), Panel protegido (`/panel`), Acceso denegado (`/denegado`) y Logout con limpieza local garantizada.
- **Pruebas:** 20 casos de prueba automatizados con Vitest + React Testing Library (`authService.test.ts`, `LandingAndAuth.test.tsx`, `WCAGAccessibility.test.tsx`) + puerta SDD (`scripts/check_sdd.ps1`).
- **2026-11-11 (Etapa 0 — v0.2.0 SemVer y CD ACR real):** agregada `docs/versionamiento.md` y actualizado `.github/workflows/cd-azure.yml` para construir la imagen Nginx real (`Dockerfile` + `docker/nginx.conf`) y publicarla en `bustrackacr0102`. Verificado local: `npm run typecheck`, `npm test` (20/20), `check_sdd.ps1` (`SDD-OK`).
