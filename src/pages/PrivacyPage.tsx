import React from 'react';
import { Shield, Lock, EyeOff, FileText, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 bg-[#fbf9f8]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#cf1b1b] hover:text-[#900d0d]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al inicio</span>
        </Link>
        <Link
          to="/manejo-datos"
          className="text-xs font-bold text-[#1b1c1c] underline underline-offset-4 hover:text-[#cf1b1b]"
        >
          Política de Manejo de Datos
        </Link>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff0e8] px-3.5 py-1 text-xs font-bold text-[#900d0d]">
          <Shield className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
          <span>Transparencia y Protección de Datos · Spec 09</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-[#1b1c1c]">
          Aviso de Privacidad y Términos de Uso
        </h1>
        <p className="mt-2 text-xs text-neutral-500">
          Última actualización: Noviembre 2026 · Proyecto Académico e Institucional — Universidad Tecnológica de Tula-Tepeji (UTTT).
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#555555]">
          <section className="rounded-2xl border border-neutral-200 bg-[#fbf9f8] p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b1c1c]">
              <Lock className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
              1. Responsable y Finalidad del Tratamiento
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#555555]">
              El ecosistema tecnológico <strong>BusTrack</strong> es desarrollado con fines académicos y de innovación en movilidad urbana dentro de la Región Tula-Tepeji y el estado de Hidalgo. Su única finalidad es facilitar la consulta pública de rutas, paradas, horarios y tarifas de transporte, así como ofrecer recomendaciones asistidas por Inteligencia Artificial basadas exclusivamente en el catálogo oficial verificado.
            </p>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-[#fbf9f8] p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b1c1c]">
              <EyeOff className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
              2. Política de Sensores, Ubicación y Visión Artificial
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs sm:text-sm text-[#555555]">
              <li>
                <strong>Sin rastreo GPS continuo:</strong> BusTrack no realiza seguimiento en segundo plano de la ubicación de los pasajeros ni almacena historiales de desplazamiento individual.
              </li>
              <li>
                <strong>Detección ética con Acelerómetro (ML):</strong> La inferencia móvil requiere consentimiento expreso del usuario y solo detecta paradas tentativas sujetas a validación administrativa humana.
              </li>
              <li>
                <strong>Sanitización en IA Generativa:</strong> Toda consulta enviada al asistente inteligente pasa por un filtro automático que enmascara datos sensibles antes de procesarse.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-[#fbf9f8] p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b1c1c]">
              <FileText className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
              3. Términos de Uso y Alcance de la Información
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#555555]">
              Los horarios y tiempos de recorrido mostrados representan estimaciones operativas basadas en datos oficiales de transportistas regionales. El portal utiliza almacenamiento de sesión temporal exclusivamente cuando un usuario autenticado inicia sesión en el panel corporativo.
            </p>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-[#fbf9f8] p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#1b1c1c]">
              <Mail className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
              4. Contacto Institucional
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#555555]">
              Para aclaraciones o solicitudes relativas al ejercicio de derechos ARCO en este proyecto de integradora, favor de comunicarse a través del correo institucional de la UTTT o de la coordinación de la carrera de IDGS.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
