# BusTrack · Landing Page — Spec-Driven Web Project

> Página de Aterrizaje y Portal Web de BusTrack — **Universidad Tecnológica de Tula-Tepeji**
> Desarrollado con **Spec-Driven Development (SDD)** y asegurado bajo prácticas de **DevSecOps** desde el día uno.

---

## 👥 Equipo de Desarrollo (BusTrack)
* **Fátima Ximena García González**
* **Diego Parra Cruz**
* **José De Jesús López Islas**
* **Melanie Joliee Bonilla Domínguez**

---

## 📋 Resumen del Repositorio
Este repositorio contiene la **Landing Page oficial** del proyecto BusTrack. Su función es presentar la propuesta de valor de la plataforma de movilidad y transporte, proporcionar enlaces de redirección para la descarga de la aplicación móvil en tiendas (Google Play), albergar el aviso de privacidad y las políticas de tratamiento de datos personales, así como recopilar métricas de visitas e interacción mediante Google Analytics.

* **Metodología:** Spec-Driven Development (SDD) con especificaciones en `/specs`.
* **Seguridad y DevSecOps:** Headers de seguridad (CSP, HSTS, X-Content-Type-Options), escaneo de secretos (Gitleaks), análisis estático de código (SAST) y pipelines de CI.
* **Integración:** Enlaces hacia tiendas de aplicaciones móviles y vinculación de avisos legales requeridos por la app móvil.

---

## 🏛️ Componentes de Gobernanza y SDD

| Componente | Ruta | Propósito |
|---|---|---|
| **Constitución (Fuente de verdad)** | `constitution.md` | Principios no negociables de la web y directrices técnicas |
| **Manual operativo para Agentes** | `AGENTS.md` | Lineamientos para agentes de IA (roles, flujo de trabajo, calidad) |
| **Especificaciones (Specs)** | `specs/` | Especificaciones de funcionalidades (`000-base-config`, `001-hardening`, etc.) con plantillas en `specs/templates/` |
| **Agentes y Habilidades IA** | `.opencode/agents/` y `.opencode/skills/` | Configuración de agentes OpenCode / WARP |
| **Seguridad SAST** | `.semgrep/semgrep.yaml` y `.gitleaks.toml` | Reglas de análisis estático y prevención de fuga de credenciales |
| **Scripts de Calidad** | `scripts/` | Verificación de cobertura, validación de endpoints y critic guardrails |
| **Checklist de PR** | `CHECKLIST_PR.md` | Validación obligatoria de calidad previa a la fusión de código |
| **Memoria técnica** | `Memoria.md` | Registro de decisiones arquitectónicas, lecciones aprendidas y estado |

---

## 🧪 Pruebas y Aseguramiento
* `UnitTest/`: Pruebas de renderizado y lógica de componentes.
* `IntegrationTest/`: Pruebas de integración, navegación y enlaces externos.
* `SecurityTest/`: Verificación de cabeceras seguras, protección contra XSS y validación de cookies.
* CI configurado en `.github/workflows/` para ejecución de comprobaciones en cada Pull Request.
