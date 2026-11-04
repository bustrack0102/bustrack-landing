# 11-analitica-y-medicion — Analítica y medición

> Repositorio: BusTrack Landing · Estado: Pendiente · Fecha: 2026-10-30.

## 1. Objetivo

Definir analítica respetuosa de la privacidad para la landing.

## 2. Contexto

No existe analítica implementada.

## 3. Alcance

**Incluye:**

- Eventos mínimos.
- Consentimiento.
- Sin datos personales.
- Alternativa sin cookies.

**No incluye:**

- Rastreo invasivo.
- Analítica con PII sin consentimiento.

## 4. Requisitos funcionales

1. Consentimiento cuando aplique.
2. Eventos documentados.
3. Sin PII.
4. Fácil de desactivar.

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
