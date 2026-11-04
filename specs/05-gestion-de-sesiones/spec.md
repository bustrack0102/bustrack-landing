# 05-gestion-de-sesiones — Gestión de sesiones del portal

> Repositorio: BusTrack Landing · Estado: Parcial · Fecha: 2026-10-30.

## 1. Objetivo

Definir el ciclo de vida de la sesión web y su migración a Angular.

## 2. Contexto

Razor usa cookie de servidor; la estrategia SPA está pendiente de autorización.

## 3. Alcance

**Incluye:**

- Expiración.
- Cierre local y remoto.
- Protección CSRF/XSS.
- Decisión cookie vs token.

**No incluye:**

- Elegir almacenamiento de tokens sin aprobación.

## 4. Requisitos funcionales

1. La sesión expira según la API.
2. Logout limpia estado local.
3. No almacenar tokens en localStorage sin decisión.
4. Proteger rutas.

## 5. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad tarea -> prueba -> evidencia.

## 6. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 7. Criterios de aceptación

- [ ] La tarea tiene criterios verificables y evidencia asociada.
- [ ] No se declara implementado lo que no existe en código o pruebas.
- [ ] Los contratos consumidos o expuestos quedan documentados.
- [ ] `Memoria.md` refleja el estado resultante.

## 8. Dependencias

- `constitution.md`
- `docs/contratos-integracion.md`

## 9. Trazabilidad

- Plan: `plan.md` · Tareas: `task.md` · Diagramas: `chart.md`.
- Estado real: `../../Memoria.md`.
- Contratos: `../../docs/contratos-integracion.md`.
