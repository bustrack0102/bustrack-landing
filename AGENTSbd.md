# Resumen de Avance, Estado Global y Análisis de Base de Datos — BusTrack

> **Documento de transferencia y sincronización técnica para el equipo BusTrack y agentes de IA.**  
> **Fecha de corte:** 10 de noviembre de 2026  
> **Institución:** Universidad Tecnológica de Tula-Tepeji (10mo Cuatrimestre)  
> **Integrantes del equipo:**
> * Fátima Ximena García González
> * Diego Parra Cruz
> * José De Jesús López Islas
> * Melanie Joliee Bonilla Domínguez

---

## 1. Contexto Global y Estructura Creada

Se configuraron, homogeneizaron y sincronizaron con GitHub los **5 repositorios oficiales** del proyecto bajo la cuenta única `bustrack0102` con arquitectura **Spec-Driven Development (SDD)** y prácticas de **DevSecOps**:

1. **`bustrack-api`**: API REST central del ecosistema.
2. **`bustrack-mobile`**: Aplicación móvil para consulta y trazado de rutas.
3. **`bustrack-landing`**: Landing page institucional y avisos de privacidad.
4. **`bustrack-ml`**: Microservicio de Machine Learning para análisis cinemático de acelerómetro.
5. **`bustrack-genai`**: Microservicio de IA generativa para explicaciones fundamentadas con datos reales.

Ruta física local en el entorno:
`C:\Users\loij0\Documents\Uttt\10mo Cuatrimestre\BusTrack\`

---

## 2. Alerta Crítica Arquitectónica: Base de Datos y Requerimiento 14

### 2.1 El Conflicto
* **Lineamiento Oficial de la Materia (Punto 14):**
  > *"La(s) bases de datos deberán de ser de tipo NoSQL, dependerá del tipo de proyecto el número de diferentes bases de datos a utilizar."*
* **Código Heredado en `bustrack-api`:**
  * Implementado actualmente con **Entity Framework Core sobre SQL Server** (migraciones `AddInitialSDDUsuario`, `AddSegBloqueo`, tablas relacionales con `RowVersion`).
  * El health check `/health/ready` valida una conexión relacional SQL Server (`ConnectionStrings:Default`).
* **Riesgo:** Conectar y entregar en Azure sobre **Azure SQL / SQL Server tradicional incumple la regla 14**, ya que SQL Server es relacional, no NoSQL.

### 2.2 Decisiones del Equipo vs. Estado Actual
* En las especificaciones creadas por el equipo (`specs/12-migracion-de-persistencia-a-cosmos-db`) y contratos (`docs/contratos-integracion.md`), se planificó la migración hacia **Azure Cosmos DB for NoSQL** (o alternativamente **MongoDB Atlas / Cosmos DB Mongo API**).
* **Acción para el siguiente chat/agente:**
  * Si se busca un despliegue provisional o demo de salud para la API heredada, SQL Server puede responder temporalmente.
  * **Sin embargo**, para el cumplimiento de evaluación final, es mandatorio ejecutar la migración a **NoSQL (Cosmos DB o MongoDB)** modificando la capa de persistencia y el health check de `/health/ready`.

---

## 3. Inventario Real de Endpoints y Código Actual

Al contrastar la documentación (`specs-endpoints/`) contra el código fuente implementado, este es el estado exacto:

### 3.1 `bustrack-api` (C# / .NET 10)
* **Endpoints con código real:**
  * `POST /api/v1/auth/login` (Auth JWT)
  * `POST /api/v1/auth/logout` (Revocación de token en caché)
  * `GET /health` (Liveness probe)
  * `GET /health/ready` (Readiness probe - actualmente apunta a SQL Server)
  * `GET/POST /api/v1/sddusuarios` (CRUD usuarios paginado)
  * `GET/PUT/DELETE /api/v1/sddusuarios/{id}` (Usuario individual con control de concurrencia)
  * `GET /api/v1/ping`
  * `GET /api/v1/probe/*` (Pruebas de error/concurrencia solo fuera de producción)
* **Endpoints solo en especificación (`specs-endpoints/` sin código aún):**
  * `/api/v1/empresas`, `/api/v1/rutas`, `/api/v1/rutas/{id}/paradas`, `/api/v1/rutas/{id}/horarios`, `/api/v1/rutas/{id}/tarifas`, `/api/v1/calificaciones`.
* **Inconsistencias a resolver:**
  1. El controlador expone `/api/v1/sddusuarios` mientras que las specs lo llaman `/api/v1/usuarios`.
  2. Mobile espera `GET /api/v1/destinos` y `POST /api/v1/sensores/lotes`, pero la API aún no tiene specs para esas dos rutas.

### 3.2 `bustrack-mobile` (Kotlin / Gradle actualmente; planeado a Flutter)
* **Implementado en código:**
  * Consumo de `POST /api/v1/Auth/login` y `POST /api/v1/Auth/logout` vía Retrofit.
* **Pendiente:** Migración de interfaz/lógica a Flutter y consumo de rutas de transporte cuando existan en la API.

### 3.3 `bustrack-landing` (ASP.NET Core Razor Pages; planeado a Angular)
* **Implementado en código:**
  * Páginas `Index`, `Login`, `Logout`, `Privacy`, `Error`, `Denegado`.
  * Clientes HTTP de consumo para autenticación.
  * Health checks `/health` y `/health/ready`.

### 3.4 `bustrack-ml` (FastAPI / Python)
* **Estado:** Esqueleto SDD, configuración de CI (`ci-pr.yml` tolerante), requerimientos y carpetas `src/api`, `src/models`, etc. listas para implementar los endpoints `GET /health` y `POST /inference`.

### 3.5 `bustrack-genai` (FastAPI / Python)
* **Estado:** Esqueleto SDD con guardrails anti prompt-injection en especificaciones, dependencias `requirements.txt` y carpetas preparadas para implementar `GET /health` y `POST /recommendations`.

---

## 4. Hoja de Ruta Inmediata para el Siguiente Agente

1. **Resolver la persistencia NoSQL:** Decidir si la base de datos de producción será **Azure Cosmos DB (NoSQL)** o **MongoDB Atlas**, y actualizar el proveedor de base de datos en `bustrack-api/API_SDD`.
2. **Homogeneizar rutas:** Unificar la ruta de usuarios (`/api/v1/usuarios` vs `/api/v1/sddusuarios`) y formalizar en la API las rutas `/api/v1/destinos` y `/api/v1/sensores/lotes`.
3. **Despliegue en Azure:** Configurar el recurso de base de datos NoSQL e inyectar las variables de entorno en Azure Container Apps para pasar a verde `/health/ready`.
