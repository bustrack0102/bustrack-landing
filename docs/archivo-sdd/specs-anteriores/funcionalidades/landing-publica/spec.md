# Landing pública, descarga, privacidad y accesibilidad

> Repositorio: BusTrack Landing · Ruta: `specs/funcionalidades/landing-publica/` · Estado: Pendiente · Fecha: 2026-10-30.

## 1. Identificador y nombre

- **ID:** `funcionalidades/landing-publica`
- **Nombre:** Landing pública, descarga, privacidad y accesibilidad
- **Repositorio:** BusTrack Landing

## 2. Objetivo

Especificar la landing pública, el enlace de descarga, el aviso de privacidad y la accesibilidad.

## 3. Contexto

El código actual es un portal de login; no hay landing pública, enlaces de tienda ni aviso legal real.

## 4. Alcance

**Incluye:**

- Página principal con propuesta de valor.
- Información del proyecto.
- Enlace a Google Play.
- Aviso de privacidad y términos.
- Accesibilidad.

**No incluye:**

- Analítica con datos personales sin consentimiento.
- Enlaces a tiendas inexistentes.
- Contenido legal inventado sin revisión.

## 5. Requisitos funcionales

1. Presentar información veraz del proyecto.
2. Publicar el enlace de descarga solo cuando la app exista.
3. Someter el aviso legal a revisión.
4. Cumplir accesibilidad básica.

## 6. Requisitos no funcionales

1. Documentación verificable y sin secretos.
2. Cambios incrementales y reversibles.
3. Trazabilidad spec -> tarea -> prueba.

## 7. Reglas de negocio

- Angular + TypeScript es la tecnología objetivo; Razor Pages queda como referencia funcional.
- La landing presenta el producto, enlaces de descarga, privacidad y acceso autenticado.
- La API central sigue siendo responsable de autenticación y lógica de negocio.

## 8. Criterios de aceptación

- [ ] Secciones solicitadas presentes.
- [ ] Enlace de descarga marcado como pendiente si no existe.
- [ ] Aviso legal con estado explícito.
- [ ] Checklist de accesibilidad.

## 9. Restricciones

- No implementar en esta fase.
- No afirmar que la app está publicada.

## 10. Dependencias

- specs/migraciones/angular/
- docs/contratos-integracion.md

## 11. Trazabilidad

- Plan: `plan.md` · Tareas: `task.md` · Diagramas: `chart.md`.
- Estado real: `../../Memoria.md`.
- Contratos: `../../docs/contratos-integracion.md`.
