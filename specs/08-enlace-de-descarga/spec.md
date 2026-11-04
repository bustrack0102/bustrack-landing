# 08-enlace-de-descarga — Enlace de descarga a Google Play

> Repositorio: BusTrack Landing · Estado: Pendiente · Fecha: 2026-10-30.

## 1. Objetivo

Publicar el enlace de descarga solo cuando la app exista y esté disponible.

## 2. Contexto

La app móvil no está publicada; no hay enlace real.

## 3. Alcance

**Incluye:**

- Botón de descarga.
- Estado pendiente mientras no exista.
- Enlace real cuando se publique.

**No incluye:**

- Cambiar el stack objetivo.
- Desplegar recursos o ejecutar migraciones en esta fase.

## 4. Requisitos funcionales

1. No publicar enlaces inexistentes.
2. Marcar el estado como pendiente.
3. Abrir en nueva pestaña con rel seguro.

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
