# 09-aviso-de-privacidad-y-terminos — Aviso de privacidad y términos

> Repositorio: BusTrack Landing · Estado: Pendiente · Fecha: 2026-10-30.

## 1. Objetivo

Publicar aviso de privacidad y términos revisados legalmente.

## 2. Contexto

No existe aviso legal real; no se debe inventar contenido normativo.

## 3. Alcance

**Incluye:**

- Aviso de privacidad.
- Términos de uso.
- Consentimiento de sensores.
- Contacto.

**No incluye:**

- Cambiar el stack objetivo.
- Desplegar recursos o ejecutar migraciones en esta fase.

## 4. Requisitos funcionales

1. Contenido sujeto a revisión legal.
2. Explicar datos y sensores.
3. No afirmar cumplimiento no verificado.
4. Enlazar desde la landing.

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
