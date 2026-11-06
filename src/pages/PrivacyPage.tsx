import React from 'react';
import { Shield, Lock, EyeOff, FileText, Mail } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          <Shield className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Transparencia y Protección de Datos · Spec 09</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-white">
          Aviso de Privacidad y Términos de Uso
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          Última actualización: Noviembre 2026 · Proyecto Académico e Institucional — Universidad Tecnológica de Tula-Tepeji (UTTT).
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
          <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <Lock className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              1. Responsable y Finalidad del Tratamiento
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              El ecosistema tecnológico <strong>BusTrack</strong> es desarrollado con fines académicos y de innovación en movilidad urbana dentro de la Región Tula-Tepeji. Su única finalidad es facilitar la consulta pública de rutas, paradas, horarios y tarifas de transporte, así como ofrecer recomendaciones asistidas por Inteligencia Artificial basadas exclusivamente en el catálogo oficial verificado.
            </p>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <EyeOff className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              2. Política de Sensores, Ubicación y Visión Artificial
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs sm:text-sm text-slate-300">
              <li>
                <strong>Sin rastreo GPS continuo:</strong> BusTrack no realiza seguimiento en segundo plano de la ubicación de los pasajeros ni almacena historiales de desplazamiento individual.
              </li>
              <li>
                <strong>Estimación de ocupación anónima (ML):</strong> El módulo de visión artificial procesa conteos estadísticos de aforo sin realizar reconocimiento facial ni almacenar imágenes biométricas de los usuarios.
              </li>
              <li>
                <strong>Sanitización en IA Generativa:</strong> Toda consulta enviada al asistente inteligente pasa por un filtro automático que enmascara correos electrónicos, teléfonos y CURP antes de procesarse.
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <FileText className="h-4 w-4 text-amber-400" aria-hidden="true" />
              3. Términos de Uso y Alcance de la Información
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Los horarios y tiempos de recorrido mostrados representan estimaciones operativas sujetas a condiciones viales en los municipios de Tula de Allende, Tepeji del Río, Atitalaquia y Tlahuelilpan. El portal utiliza almacenamiento de sesión temporal exclusivamente cuando un usuario autenticado inicia sesión en el panel corporativo.
            </p>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <Mail className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              4. Contacto Institucional y Derechos ARCO
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Para dudas sobre privacidad, ejercicio de derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO), o reportes técnicos del proyecto, puedes comunicarte con la coordinación del proyecto en la Universidad Tecnológica de Tula-Tepeji (Av. Universidad Tecnológica No. 1000, Col. El Carmen, Tula de Allende, Hgo.).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
