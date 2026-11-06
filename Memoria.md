# Memoria técnica — BusTrack Landing

> Registro vivo del repositorio. Última actualización: 2026-11-06.

## 1. Estado real

- **Repositorio:** `bustrack0102/bustrack-landing`
- **Tecnología actual:** React 19 + TypeScript + Vite + Tailwind CSS + Vitest + Docker.
- **Despliegue Azure:** Contenedor en `rg-bustrack-ncus` (`northcentralus`) con CI/CD en GitHub Actions.

## 2. Funcionalidades implementadas

- Migración completa de Razor Pages (.NET) hacia SPA moderna en **React 19 + TypeScript**.
- Landing pública completa: Hero interactivo, explorador de rutas/tarifas de `BusTrackDB` con búsqueda y filtros, demostración interactiva del asistente GenAI con guardrails, arquitectura del proyecto UTTT y tarjeta de descarga de app móvil (estado pendiente transparente conforme a Spec 08).
- Paridad total de autenticación (`/login`, `/panel` protegido con `RequireAuth`, `/denegado`, logout con limpieza garantizada).
- Aviso de privacidad y términos legales (`Spec 09`) detallando la ausencia de rastreo GPS personal y el conteo anónimo por visión artificial.
- Suite de pruebas automatizadas con Vitest + React Testing Library (12 pruebas unitarias y de integración).

## 3. Historial

- **2026-10-29:** Estructura SDD original en ASP.NET Core Razor Pages.
- **2026-10-30:** Auditoría documental SDD.
- **2026-11-06:** Migración aprobada y ejecutada a **React 19 + TypeScript + Tailwind CSS**, implementación de todas las secciones públicas y corporativas, suite Vitest y despliegue continuo en Microsoft Azure.
