# Constitución — BusTrack Landing

> Fuente de verdad del repositorio. Versión 3.0.0 (2026-11-06).

## 1. Propósito

BusTrack Landing es el portal web público y corporativo del ecosistema BusTrack UTTT:
React 19 + TypeScript (SPA) -> API central (.NET 10) por REST. La API gestiona autenticación y negocio.

## 2. Responsabilidades

- Presentar la propuesta de valor, catálogo oficial de rutas/tarifas de la Región Tula-Tepeji, información del proyecto, estado de la aplicación móvil y aviso de privacidad.
-Proveer acceso corporativo autenticado consumiendo `POST /api/v1/Auth/login` y `POST /api/v1/Auth/logout`.
- Mantener cero secretos en el cliente y aplicar SAST (Semgrep) y pruebas automatizadas (Vitest) en cada commit.

## 3. Arquitectura y tecnologías

- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS + React Router.
- **Sesión:** Almacenamiento temporal en `sessionStorage` + memoria con expiración acotada a máximo 24 horas (`min(24h, dteExpira)`) y limpieza local garantizada en `logout`.
- **Seguridad:** Cero uso de `innerHTML`, validación de redirecciones locales (`returnUrl`), sin secretos hardcodeados, cabeceras de seguridad en contenedor.
