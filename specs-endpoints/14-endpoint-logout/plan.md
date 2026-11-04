# Plan técnico — 14-endpoint-logout — Consumo del endpoint de logout

> Spec: `spec.md` · Endpoint: `POST /api/v1/auth/logout` · Estado: Implementado en Razor.

## 1. Estrategia

Definir contrato, esquema de entrada/salida, validaciones y pruebas antes de implementar.

## 2. Diseño

- Stack objetivo: Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.
- Componentes: controlador/router, servicio, repositorio o cliente HTTP.
- Tecnología: Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.

## 3. Archivos

```text
WebSDD/Pages/, WebSDD/Services/, specs/05-gestion-de-sesiones/
```

## 4. Seguridad

- CSP estricta, HSTS, cookies seguras o tokens según decisión, redirecciones locales, rate limiting y cero secretos en cliente.
- Validar entradas y no registrar secretos/PII.

## 5. Errores

- Respuesta uniforme sin stack traces ni detalles internos.
- Registrar correlación sin datos sensibles.

## 6. Pruebas

Pruebas de contrato, validación, autenticación y errores cuando el endpoint exista; casos definidos mientras sea propuesto.

## 7. Riesgos

- Contrato desalineado con el consumidor.
- Errores no cubiertos.
- Exposición de datos sensibles.
