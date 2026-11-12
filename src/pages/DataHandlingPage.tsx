import React from 'react';
import { Database, ShieldCheck, Cpu, Trash2, Sparkles, ArrowLeft, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DataHandlingPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 bg-[#fbf9f8]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#cf1b1b] hover:text-[#900d0d]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Volver al inicio</span>
        </Link>
        <Link
          to="/privacidad"
          className="text-xs font-bold text-[#1b1c1c] underline underline-offset-4 hover:text-[#cf1b1b]"
        >
          Ver Aviso de Privacidad
        </Link>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff0e8] px-3.5 py-1 text-xs font-bold text-[#900d0d]">
          <Database className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
          <span>Política de Manejo de Datos · BusTrack UTTT (Req. 16 y 17)</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-[#1b1c1c]">
          Manejo y Ciclo de Vida de Datos
        </h1>
        <p className="mt-2 text-xs text-neutral-500">
          Vigente para la aplicación móvil Android y el portal público BusTrack · Actualizado Noviembre 2026.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#555555]">
          <section className="rounded-2xl border border-neutral-200 bg-[#fbf9f8] p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b1c1c]">
              <Smartphone className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
              1. Permisos Mínimos y Caché Local Offline
            </h2>
            <p className="mt-2 text-xs sm:text-sm">
              La app móvil utiliza ubicación puntual bajo demanda del mapa y nunca ejecuta rastreo GPS continuo en segundo plano. Los catálogos públicos de rutas, paradas, horarios y destinos se almacenan localmente en SQLite cifrado por sesión para garantizar consulta sin conexión.
            </p>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-[#fbf9f8] p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b1c1c]">
              <Cpu className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
              2. Telemetría de Acelerómetro (ML) con Anonimización SHA-256
            </h2>
            <p className="mt-2 text-xs sm:text-sm">
              Solo si el pasajero otorga consentimiento explícito en la aplicación (revocable en cualquier momento vía <code>DELETE /api/v1/consentimientos/me</code>), las ventanas de acelerómetro se procesan con hash criptográfico unidireccional sin incluir correo, nombre ni historial personal.
            </p>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-[#fbf9f8] p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b1c1c]">
              <Sparkles className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
              3. Moderación Cloud Previa y Grounding de IA
            </h2>
            <p className="mt-2 text-xs sm:text-sm">
              Todo texto, imagen o video enviado en reseñas o reportes es evaluado antes de su almacenamiento por Azure AI Content Safety y reglas locales anti-XSS/PII/Prompt Injection. Las recomendaciones generativas utilizan exclusivamente catálogos verificados de BusTrack.
            </p>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-[#fbf9f8] p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b1c1c]">
              <ShieldCheck className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
              4. Analítica Web Respetuosa
            </h2>
            <p className="mt-2 text-xs sm:text-sm">
              La medición de visitas en la Landing (Google Analytics 4) se activa únicamente tras consentimiento del visitante, con enmascaramiento de IP y sin almacenar identificadores personales ni publicidad personalizada.
            </p>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-[#fbf9f8] p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b1c1c]">
              <Trash2 className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
              5. Eliminación Definitiva de Cuenta y Datos (ARCO)
            </h2>
            <p className="mt-2 text-xs sm:text-sm">
              Desde la sección Perfil de la app móvil puedes ejecutar la baja definitiva (<code>DELETE /api/v1/usuarios/me</code>), lo cual anonimiza inmediatamente el perfil en MongoDB Atlas, revoca tokens activos en Redis y elimina la caché privada local del dispositivo.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
