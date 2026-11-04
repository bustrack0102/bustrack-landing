# Constitución — BusTrack Landing

> Fuente de verdad del repositorio. Versión 2.0.0 (2026-10-30). Todo cambio de arquitectura
> exige spec y registro en `Memoria.md`.

## 1. Propósito

BusTrack Landing forma parte del ecosistema BusTrack. Portal web / landing tiene como responsabilidad:
Angular -> API central por HTTPS/REST. La API gestiona autenticación y negocio.

## 2. Responsabilidades

- Mantener una responsabilidad delimitada dentro de BusTrack.
- Consumir o exponer contratos HTTP documentados.
- No duplicar datos ni lógica que pertenecen a otro servicio.
- Aplicar SDD: toda funcionalidad nace de un spec aprobado.

## 3. Arquitectura y tecnologías

- **Actual:** ASP.NET Core .NET 10 Razor Pages, cookie auth, Serilog, HTTP resilience, Docker, Gitleaks, ZAP.
- **Objetivo:** Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.
- Cambiar la tecnología objetivo requiere autorización explícita y un spec de migración.

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.
- No se almacenan tokens en localStorage sin decisión de seguridad aprobada.
- No se publican enlaces de tienda inexistentes.

## 4. Principios de diseño

- Separación de responsabilidades y dependencias dirigidas al dominio.
- Contratos explícitos, validados y versionados.
- Configuración por entorno y cero secretos en el repositorio.
- Real-first: no se declara implementado lo que no existe en código o pruebas.
- `Memoria.md` refleja el estado real, no el deseado.

## 5. Seguridad

CSP estricta, HSTS, cookies seguras o tokens según decisión, redirecciones locales, rate limiting y cero secretos en cliente.

- Prohibido registrar tokens, contraseñas, claves o PII.
- Los secretos viven en variables de entorno o Azure Key Vault.
- Toda entrada externa se valida y toda salida se codifica.

## 6. Calidad y pruebas

- Pruebas unitarias Angular, pruebas de componentes, e2e y pruebas de seguridad.
- Sin pruebas y evidencia de ejecución no hay terminado.
- Los gates de CI para lint, pruebas y SAST son bloqueantes.
- Los tests triviales no cuentan como cobertura.

## 7. Convenciones

- Código e identificadores en inglés; documentación y mensajes de usuario en español.
- Formato y lint según el stack objetivo.
- PR pequeños y trazables a un spec.
- Prohibido `TODO` sin issue asociado.

## 8. Restricciones

- No rastreo GPS continuo de usuarios ni unidades.
- No acceso directo de clientes a Cosmos DB.
- No invención de rutas, horarios, tarifas, empresas o destinos por parte de IA.
- No recolección de sensores sin consentimiento explícito.
- No se declaran recursos Azure desplegados.

## 9. Integración con BusTrack

- Contratos transversales: `docs/contratos-integracion.md`.
- La API central es la fuente autorizada de datos de transporte.
- ML y GenAI son servicios internos.

## 10. Gobernanza

- Obligatorios: este documento, `AGENTS.md`, `Memoria.md`, `CHECKLIST_PR.md` y `specs/`.
- Las decisiones no resueltas se registran como pendientes; no se inventan respuestas.
