# Memoria técnica — BusTrack Landing

> Registro vivo. No se borra historial. Última actualización: 2026-10-30.

## 1. Estado real

- **Repositorio:** `bustrack-landing-main` (raíz interior; el árbol está anidado `X-main/X-main`).
- **Tecnología actual:** ASP.NET Core .NET 10 Razor Pages, cookie auth, Serilog, HTTP resilience, Docker, Gitleaks, ZAP.
- **Tecnología objetivo:** Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.
- **Git:** no hay repositorio Git local; los tags/releases no son verificables.

## 2. Funcionalidades implementadas

- Login Razor Pages contra API externa con cookie HttpOnly/Secure/SameSite=Strict y expiración min(24h, dteExpira).
- Logout POST autorizado con Bearer y cierre local garantizado.
- Página principal protegida, Denegado y Error.
- Hardening: CSP con nonce, HSTS, headers, rate limiting, correlation ID y filtro de secretos.
- 47 casos de prueba (20 unit, 20 integración, 7 seguridad).

## 3. Funcionalidades pendientes

- Migración a Angular + TypeScript.
- Landing pública con propuesta de valor, información del proyecto y enlace a Google Play.
- Aviso de privacidad y términos legales reales.
- Decisión de sesión para SPA (cookie same-site vs token) y CORS.
- Analítica y accesibilidad auditada.

## 4. Arquitectura actual

src/app/{core,shared,features,pages}, src/assets, src/environments (objetivo Angular). Estructura real actual: WebSDD/{Pages,Models,Services,Middleware,Logging,wwwroot}.

## 5. Migraciones

ASP.NET Core Razor Pages -> Angular + TypeScript

## 6. Decisiones arquitectónicas

- Se adopta SDD y DevSecOps.
- La API central es la fuente autorizada de datos.
- Cosmos DB for NoSQL es la persistencia objetivo.
- ML y GenAI son servicios internos FastAPI.
- OpenAI API es el proveedor GenAI objetivo; Google GenAI queda inactivo.
- Flutter + Dart y Angular + TypeScript son los objetivos de cliente.
- No se declaran recursos Azure desplegados.

## 7. Dependencias entre repositorios

Angular -> API central por HTTPS/REST. La API gestiona autenticación y negocio.

## 8. Problemas conocidos

- Documentación previa desalineada con el código (corregida en esta reorganización).
- Specs históricas conservadas como referencia; ver `specs/README.md`.
- Gates CI/SAST incompletos o no bloqueantes en el estado previo.
- Deuda de pruebas y despliegue documentada en cada spec.

## 9. Historial

- **2026-10-29:** estructura SDD original y primeras fases.
- **2026-10-30:** auditoría completa, corrección documental y reorganización SDD.
  Se separan specs históricas de canónicas, se corrigen afirmaciones de stack y se
  documentan migraciones, contratos y Azure propuesto.
