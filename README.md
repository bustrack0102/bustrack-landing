# BusTrack Landing & Portal Web — BusTrack UTTT

> Sistema Inteligente de Consulta y Planificación de Transporte Público — Universidad Tecnológica de Tula-Tepeji.
> Desarrollado bajo metodología SDD + DevSecOps con **React 19 + TypeScript + Vite + Tailwind CSS**.

## Estado actual

- **Tecnología real:** React 19, TypeScript 5.7, Vite 6, React Router 7, Tailwind CSS 3, Lucide Icons, Vitest + React Testing Library, Docker (Nginx), Semgrep SAST.
- **Implementado:**
  - Landing pública interactiva con Hero, propuesta de valor y telemetría de ruta activa.
  - Explorador interactivo de rutas, paradas, horarios y tarifas estudiantiles sincronizado con el catálogo de `BusTrackDB`.
  - Simulador interactivo del Asistente IA (`bustrack-genai`) con Grounding verificado y Guardrails anti-inyección.
  - Sección de arquitectura distribuida del proyecto UTTT y enlace transparente a la app móvil Android (Spec 08).
  - Portal de autenticación corporativa (`/login`), guardia de rutas protegidas (`RequireAuth`), Panel Operativo (`/panel`), Aviso de Privacidad (`/privacidad`) y páginas de control (`/denegado`, `404`).
- **Despliegue Azure:** Azure Container Instances (`rg-bustrack-ncus` en `northcentralus`) con CI/CD automatizado en GitHub Actions.

## Estructura del Proyecto

```text
src/
  core/
    config/env.ts           # Variables de entorno sin secretos
    context/AuthContext.tsx # Estado de sesión reactivo y seguro
    models/                 # Contratos tipados de Auth y Transporte
    services/authService.ts # Cliente HTTP hacia API central (.NET 10)
  shared/
    components/             # Navbar, Footer, RequireAuth guard
  pages/                    # LandingPage, LoginPage, DashboardPage, PrivacyPage, DeniedPage, NotFoundPage
tests/
  authService.test.ts       # Pruebas unitarias de contratos y sesión
  LandingAndAuth.test.tsx   # Pruebas de integración de componentes, filtros y guardrails
```

## Comandos principales

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo local (Vite)
npm run typecheck    # Verificación estricta de tipos TypeScript
npm run build        # Build de producción en dist/
npm test             # Ejecutar suite de pruebas con Vitest
```
