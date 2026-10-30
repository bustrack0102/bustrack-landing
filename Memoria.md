# Memoria técnica — BusTrack Landing Page

> Registro de estado, decisiones arquitectónicas con justificación, lecciones aprendidas y deuda técnica del portal web y landing page de BusTrack.

---

## 📌 Fase 000 — Inicialización y Estructura SDD (2026-10-29)

- **Estado:** Estructura base Spec-Driven Development (SDD) creada a partir de `WebSDD`.
- **Decisión 1 (Propósito):** La landing page centralizará la información institucional, enlaces directos a la tienda Google Play para la descarga de la app móvil y las políticas legales (Aviso de Privacidad y uso de datos de sensores).
- **Decisión 2 (Analítica):** Se contempla la integración del script de seguimiento de Google Analytics conforme a los requerimientos oficiales.
- **Decisión 3 (DevSecOps):** Implementación de análisis estático con Semgrep, escaneo de secretos con Gitleaks y pruebas modulares (`UnitTest`, `IntegrationTest`, `SecurityTest`).
- **Deuda Técnica Documentada:** Configuración del proveedor de hosting definitivo (ej. Azure Static Web Apps) y obtención del ID de seguimiento de Google Analytics a realizarse en etapas de despliegue.
