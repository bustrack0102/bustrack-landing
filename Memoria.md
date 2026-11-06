# Memoria técnica — BusTrack Landing

> Registro vivo del repositorio. Última actualización: 2026-11-06.

## 1. Estado real

- **Repositorio:** `bustrack0102/bustrack-landing`
- **Tecnología actual:** React 19 + TypeScript + Vite + Tailwind CSS + Vitest + Docker.
- **Despliegue Azure:** Contenedor `bustrack-landing` en `rg-bustrack-ncus` (`northcentralus`) con CI/CD en GitHub Actions.

## 2. Funcionalidades implementadas (Alineadas a Specs 01–14)

- **Spec 06 (Landing Pública):** Hero informativo, propuesta de valor y componente interactivo por pestañas (`tablist`/`tabpanel`) de beneficios del proyecto, sin incluir funciones operativas que pertenecen exclusivamente a la aplicación móvil.
- **Spec 07 (Información del Proyecto):** Descripción institucional UTTT, alcance, límites (cero rastreo GPS personal, cero acceso directo a BD/IA desde el cliente) y arquitectura.
- **Spec 08 (Enlace de Descarga):** Botón hacia Google Play Store marcado honestamente en estado pendiente mientras la app móvil concluye validación.
- **Spec 09 (Aviso de Privacidad y Términos):** Vista `/privacidad` detallando tratamiento de datos, sensores y contacto.
- **Spec 10 y 11 (Accesibilidad y Analítica):** Etiquetas ARIA, navegación por teclado y control de consentimiento de métricas anónimas sin PII.
- **Specs 04, 05, 13 y 14 (Autenticación y Sesiones):** Login (`/login`), Panel protegido (`/panel`), Acceso denegado (`/denegado`) y Logout con limpieza local garantizada.
- **Pruebas:** 12 casos de prueba automatizados con Vitest + React Testing Library.
