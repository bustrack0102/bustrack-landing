# 06-landing-publica — Landing pública

> Repositorio: BusTrack Landing · Estado: Pendiente · Fecha: 2026-10-30.

## 1. Objetivo

Construir la página principal pública con propuesta de valor e información del proyecto.

## 2. Contexto

El sitio actual es un portal de login; no existe landing pública.

## 3. Alcance

**Incluye:**

- Hero y propuesta de valor.
- Secciones informativas.
- Llamados a la acción.
- Diseño responsive.

**No incluye:**

- Cambiar el stack objetivo.
- Desplegar recursos o ejecutar migraciones en esta fase.

## 4. Requisitos funcionales

1. Contenido veraz del proyecto.
2. Sin afirmar que la app está publicada.
3. Responsive.
4. Estados de carga mínimos.

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
