# AGENTS.md — BusTrack Landing

> Instrucciones permanentes para agentes de IA. Leer junto con `constitution.md`.

## 1. Antes de actuar

1. Leer `constitution.md`, `Memoria.md` y el `spec.md` de la tarea.
2. Confirmar el estado real en el código; no asumir que el README describe el código.
3. Revisar `docs/contratos-integracion.md` si el cambio cruza servicios.

## 2. Arquitectura que debes respetar

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.
- No se almacenan tokens en localStorage sin decisión de seguridad aprobada.
- No se publican enlaces de tienda inexistentes.

- Stack objetivo: Angular + TypeScript (SPA) consumiendo la API central; estrategia de sesión pendiente de autorización.
- Stack actual: ASP.NET Core .NET 10 Razor Pages, cookie auth, Serilog, HTTP resilience, Docker, Gitleaks, ZAP.
- No introduzcas dependencias, frameworks o servicios no aprobados.

## 3. Flujo SDD obligatorio

1. `spec.md`: objetivo, alcance, requisitos y criterios de aceptación.
2. `plan.md`: estrategia, componentes, archivos, riesgos y pruebas.
3. `task.md`: tareas atómicas con archivos y criterio de terminado.
4. `chart.md`: diagramas de flujo, arquitectura y secuencia.
5. Implementación y pruebas.
6. Actualización de `Memoria.md` y documentos vivos.

## 4. Cómo crear una spec

- Crear `specs/<NN-nombre-tarea>/` con los cuatro archivos; los endpoints van en `specs-endpoints/<NN-nombre-endpoint>/`.
- Copiar la estructura de una spec existente del mismo stack, nunca la plantilla de otro repo.
- Enlazar dependencias con rutas relativas. No usar categorías técnicas como `azure`, `cicd`, `seguridad` o `endpoints` dentro de `specs/`.
- Marcar lo implementado, lo parcial y lo pendiente.

## 5. Validación mínima

```text
npm ci
npm run lint
npm run build && npm test -- --watch=false
```

- Si un comando no existe todavía, decirlo; no inventar resultados.

## 6. Archivos que no debes modificar sin autorización

- Contratos públicos ya consumidos por otros repos.
- Migraciones de datos o esquemas de producción.
- Workflows de despliegue y configuración Azure.
- Secretos, `.env`, `appsettings.Local.json` y equivalentes.
- Código legacy conservado como referencia de migración.

## 7. Actualización de Memoria.md

Registrar fecha, decisión, motivo, archivos afectados, estado, riesgos y relación con otros
repositorios. No borrar historial. No declarar avances sin evidencia.

## 8. Ramas y Pull Requests

- Rama `feat/<spec-id>-<slug>`, `fix/<slug>` o `docs/<slug>`.
- PR con enlace al spec y checklist completo.
- No hacer commit/push sin autorización explícita.
- No marcar tareas como completadas solo por documentarlas.

## 9. Errores a evitar

- Copiar specs de otro stack.
- Afirmar endpoints o recursos inexistentes.
- Declarar Azure desplegado sin evidencia.
- Ocultar deuda técnica o fallos de build.
