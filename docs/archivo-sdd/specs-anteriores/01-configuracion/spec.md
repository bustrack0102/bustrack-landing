# 01 — Configuración del entorno

> Repositorio: BusTrack Landing · Ruta: `specs/01-configuracion/` · Estado: Parcial · Fecha: 2026-10-30.

## 1. Identificador y nombre

- **ID:** `01-configuracion`
- **Nombre:** 01 — Configuración del entorno
- **Repositorio:** BusTrack Landing

## 2. Objetivo

Definir la configuración reproducible de BusTrack Landing sin secretos en el repositorio.

## 3. Contexto

Debe distinguirse entre valores de ejemplo, secretos locales y variables de despliegue.

## 4. Alcance

**Incluye:**

- Archivos de ejemplo y variables de entorno.
- Comandos de instalación/build.
- Separación dev/test/prod.
- Documentación de claves sin valores reales.

**No incluye:**

- Provisionar recursos Azure.
- Publicar secretos reales.
- Cambiar el stack.

## 5. Requisitos funcionales

1. Documentar todas las claves usadas por el código.
2. Mantener archivos de ejemplo sin secretos.
3. Definir variables de entorno para CI y despliegue.
4. Verificar que un clon limpio sepa qué configurar.

## 6. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad spec -> tarea -> prueba.

## 7. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 8. Criterios de aceptación

- [ ] Existe documento de variables por entorno.
- [ ] Un desarrollador puede configurar el proyecto siguiendo el documento.
- [ ] CI no requiere secretos para lint/tests unitarios.
- [ ] No hay claves reales en el repositorio.

## 9. Restricciones

- No ejecutar migraciones ni despliegues en esta fase.
- No cambiar el stack objetivo sin autorización.
- No incluir secretos ni PII.

## 10. Dependencias

- `constitution.md`
- `specs/azure/`

## 11. Trazabilidad

- Plan: `plan.md` · Tareas: `task.md` · Diagramas: `chart.md`.
- Estado real: `../../Memoria.md`.
- Contratos: `../../docs/contratos-integracion.md`.
