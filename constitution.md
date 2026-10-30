---
version: 1.0.0
status: active
source_of_truth: ./constitution.md
project: BusTrack - Landing Page
team:
  - Fátima Ximena García González
  - Diego Parra Cruz
  - José De Jesús López Islas
  - Melanie Joliee Bonilla Domínguez
institution: Universidad Tecnológica de Tula-Tepeji
---

# Constitución — BusTrack Landing Page

> Rector técnico del proyecto web. Ante conflicto con otro artefacto, **manda esta constitución**.
> Filosofía madre: cada entrega de la landing page cumple con estándares de accesibilidad, seguridad y gobernanza SDD.

## 1. Propósito y alcance

- Página de aterrizaje y portal web institucional de BusTrack.
- Redirección y enlaces de descarga oficial de la aplicación móvil (Google Play).
- Publicación de Aviso de Privacidad y Términos de Manejo de Datos del Usuario vinculados con la app móvil.
- Integración de código de seguimiento y métricas con Google Analytics.
- Metodología SDD: toda funcionalidad o sección nueva nace de una especificación en `/specs`.

## 2. Principios no negociables

1. **Seguridad y Privacidad**:
   - Headers de seguridad estrictos (HSTS, X-Content-Type-Options: nosniff, Frame-Options, CSP seguro para scripts de Analytics).
   - Prohibido exponer secretos o credenciales en código fuente o repositorios (validado mediante Gitleaks).
2. **Claridad y Transparencia Legal**:
   - Aviso de privacidad visible, accesible y conforme a la normativa mexicana de protección de datos personales.
3. **Calidad y Compatibilidad**:
   - Diseño adaptable (*responsive*) para dispositivos móviles y de escritorio.
   - Rendimiento optimizado y carga rápida de recursos estáticos.
4. **Registro continuo**:
   - Todo cambio de diseño, arquitectura o integración de analíticas se registra en `Memoria.md`.

## 3. Gobernanza SDD y DevSecOps

- Cada cambio o Pull Request debe validar el `CHECKLIST_PR.md`.
- Reglas de seguridad SAST activas en `.semgrep/`.
- CI configurado en `.github/workflows/` para verificación de código en cada PR.
