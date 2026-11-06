import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
  GraduationCap,
  Lock,
  Cpu,
  MapPin,
  Clock,
  BarChart3,
} from 'lucide-react';

interface InteractivePillar {
  id: string;
  badge: string;
  title: string;
  summary: string;
  highlights: string[];
  previewTitle: string;
  previewSubtitle: string;
  previewNote: string;
}

const PROJECT_PILLARS: InteractivePillar[] = [
  {
    id: 'movilidad',
    badge: '01 · Claridad en Movilidad',
    title: 'Información confiable para estudiantes y ciudadanos',
    summary:
      'El proyecto BusTrack nace en la Universidad Tecnológica de Tula-Tepeji para organizar y transparentar la información de rutas, paradas autorizadas, horarios y tarifas del transporte público regional en una experiencia móvil intuitiva.',
    highlights: [
      'Consulta estructurada de corredores regionales (Tula, Tepeji, Atitalaquia, Tlahuelilpan).',
      'Diferenciación clara entre tarifas generales y preferenciales para estudiantes.',
      'Paradas georreferenciadas para facilitar la planificación diaria hacia el campus.',
    ],
    previewTitle: 'Planificación desde la App Móvil',
    previewSubtitle: 'Experiencia pensada para el traslado universitario y ciudadano',
    previewNote:
      'La consulta operativa de rutas, mapas y horarios se realiza directamente dentro de la aplicación móvil Android.',
  },
  {
    id: 'ocupacion',
    badge: '02 · Visión Artificial Anónima',
    title: 'Estimación de ocupación sin invadir tu privacidad',
    summary:
      'Mediante modelos de aprendizaje automático (Machine Learning), el sistema estima el nivel de aforo en las unidades (Baja, Moderada o Alta) para ayudar a tomar mejores decisiones de traslado sin capturar datos biométricos.',
    highlights: [
      'Conteo estadístico anónimo: cero reconocimiento facial.',
      'Procesamiento interno desacoplado de datos personales.',
      'Consentimiento explícito e informado en el uso de sensores.',
    ],
    previewTitle: 'Indicadores de Aforo Inteligente',
    previewSubtitle: 'Inferencia interna mediante microservicio FastAPI',
    previewNote:
      'El servicio de ML opera exclusivamente como motor interno; ningún usuario externo accede directamente a los modelos.',
  },
  {
    id: 'asistencia',
    badge: '03 · Asistencia Fundamentada',
    title: 'Orientación inteligente libre de alucinaciones',
    summary:
      'La arquitectura integra un servicio interno de IA generativa con Grounding estricto que responde dudas de traslado dentro de la app móvil basándose únicamente en los registros oficiales validados.',
    highlights: [
      'Prohibición estricta de inventar rutas, horarios, empresas o tarifas.',
      'Sanitización automática de datos sensibles antes de cualquier procesamiento.',
      'Comunicación exclusiva a través de la API central autorizada.',
    ],
    previewTitle: 'Grounding Verificado en Datos Reales',
    previewSubtitle: 'Cero invención de información operativa',
    previewNote:
      'Toda recomendación se genera en el backend y se entrega únicamente a los clientes autenticados de la plataforma.',
  },
];

export const LandingPage: React.FC = () => {
  const [activePillar, setActivePillar] = useState<InteractivePillar>(PROJECT_PILLARS[0]);
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean | null>(null);

  return (
    <div id="contenido-principal" className="min-h-screen bg-grid-pattern">
      {/* HERO SECTION (SPEC 06) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                <span>Proyecto de Innovación Tecnológica · UTTT</span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.12]">
                El futuro del transporte público en{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Tula-Tepeji
                </span>
                .
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                <strong>BusTrack</strong> es la iniciativa tecnológica de la Universidad Tecnológica de Tula-Tepeji diseñada para modernizar la consulta y planificación de viajes en transporte público mediante una aplicación móvil segura, accesible y respetuosa de tu privacidad.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#descarga"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
                >
                  <Smartphone className="h-4 w-4" aria-hidden="true" />
                  <span>Ver Estado de la App Móvil</span>
                </a>
                <a
                  href="#proyecto"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-emerald-500/50 hover:text-white"
                >
                  <span>Conocer el Proyecto</span>
                  <ArrowRight className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-8 sm:gap-6">
                <div>
                  <p className="text-2xl font-extrabold text-white sm:text-3xl">SDD</p>
                  <p className="mt-1 text-xs text-slate-400">Diseño Guiado por Especificaciones</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-emerald-400 sm:text-3xl">DevSecOps</p>
                  <p className="mt-1 text-xs text-slate-400">Seguridad y Calidad Continua</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-cyan-400 sm:text-3xl">100%</p>
                  <p className="mt-1 text-xs text-slate-400">Sin Rastreo GPS Personal</p>
                </div>
              </div>
            </div>

            {/* INTERACTIVE VISUAL SHOWCASE CARD */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-slate-800 bg-slate-900/85 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                      <Smartphone className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Vista Previa Conceptual
                      </p>
                      <h2 className="text-sm font-bold text-white">
                        Ecosistema Móvil BusTrack
                      </h2>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                    Región Tula-Tepeji
                  </span>
                </div>

                <div className="mt-5 space-y-3.5">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-emerald-500/30">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-emerald-400 shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-xs font-bold text-white">
                          Corredores Regionales Documentados
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-400">
                          Conexión informativa entre Tula de Allende, Tepeji del Río, Atitalaquia, Tlahuelilpan y el Campus UTTT.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-cyan-500/30">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-cyan-400 shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-xs font-bold text-white">
                          Planificación de Tiempos y Tarifas
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-400">
                          Transparencia en horarios de salida, frecuencias estimadas y descuentos estudiantiles en la app móvil.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition hover:border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-purple-400 shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-xs font-bold text-white">
                          Privacidad y Ética de Datos
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-400">
                          Diseñado sin monitoreo invasivo de pasajeros ni almacenamiento de ubicaciones personales.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
                  <span>Universidad Tecnológica de Tula-Tepeji</span>
                  <Link
                    to="/privacidad"
                    className="font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    Política de Privacidad →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE BENEFITS & PILLARS SECTION (SPEC 06) */}
      <section id="beneficios" className="border-t border-slate-800/80 bg-[#0b101b] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Propuesta de Valor · Spec 06
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              ¿Cómo transforma BusTrack la experiencia de traslado?
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Selecciona cada pilar para explorar de forma interactiva los componentes que integran la solución tecnológica.
            </p>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-3"
            role="tablist"
            aria-label="Pilares de la propuesta de valor de BusTrack"
          >
            {PROJECT_PILLARS.map((pillar) => {
              const selected = activePillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActivePillar(pillar)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                    selected
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {pillar.badge}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            className="mt-8 grid grid-cols-1 gap-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 lg:grid-cols-12 items-center"
          >
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold text-emerald-400">
                {activePillar.badge}
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-white">
                {activePillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {activePillar.summary}
              </p>
              <ul className="mt-5 space-y-2.5">
                {activePillar.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>
                <h4 className="mt-4 text-base font-bold text-white">
                  {activePillar.previewTitle}
                </h4>
                <p className="mt-1 text-xs font-medium text-emerald-400">
                  {activePillar.previewSubtitle}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  {activePillar.previewNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT INFORMATION, TEAM, SCOPE & LIMITS (SPEC 07) */}
      <section id="proyecto" className="border-t border-slate-800/80 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Información del Proyecto · Spec 07
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Desarrollado en la Universidad Tecnológica de Tula-Tepeji
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                <strong>BusTrack</strong> es un proyecto académico e institucional de Ingeniería en Desarrollo y Gestión de Software (10mo Cuatrimestre) enfocado en resolver la asimetría de información sobre el transporte público en la zona metropolitana e industrial de Tula-Tepeji, Hidalgo.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Este portal web cumple exclusivamente la función de <strong>Landing Pública Informativa</strong> y punto de acceso administrativo autenticado, mientras que la experiencia de consulta para pasajeros reside en la aplicación móvil nativa.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <h3 className="text-sm font-bold text-white">Equipo de Desarrollo y Gobernanza</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  Célula multidisciplinaria de ingeniería de software de la UTTT trabajando bajo gobernanza Spec-Driven Development (SDD), dividiendo el ecosistema en 5 repositorios especializados: Portal Landing, API Central, Servicio ML, Servicio GenAI y Aplicación Móvil.
                </p>
              </div>
            </div>

            <div id="alcance" className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-6">
                <h3 className="flex items-center gap-2 text-base font-bold text-white">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                  Alcance del Sistema (Qué incluye)
                </h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-300">
                  <li>• Presentación pública veraz del proyecto, su arquitectura y estado real.</li>
                  <li>• Información de acceso a la futura aplicación móvil para Android.</li>
                  <li>• Aviso de privacidad transparente sobre uso de datos y sensores.</li>
                  <li>• Acceso corporativo autenticado contra la API central mediante HTTPS/REST.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-500/30 bg-slate-900/80 p-6">
                <h3 className="flex items-center gap-2 text-base font-bold text-white">
                  <XCircle className="h-5 w-5 text-rose-400" aria-hidden="true" />
                  Límites y Restricciones (Qué NO hace)
                </h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-300">
                  <li>• <strong>No realiza rastreo GPS continuo</strong> de usuarios ni de unidades en segundo plano.</li>
                  <li>• <strong>No recolecta sensores ni cámara</strong> sin consentimiento explícito e informado.</li>
                  <li>• <strong>No inventa rutas, tarifas ni horarios</strong> mediante inteligencia artificial.</li>
                  <li>• <strong>No expone bases de datos ni servicios internos</strong> directamente al navegador.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TECH STACK CARDS */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <Layers className="h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-white">Portal Web React + TS</h3>
              <p className="mt-1.5 text-xs text-slate-400">
                SPA moderna con React 19, TypeScript, Tailwind CSS, pruebas Vitest y despliegue continuo.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <Lock className="h-6 w-6 text-cyan-400" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-white">API Central (.NET 10)</h3>
              <p className="mt-1.5 text-xs text-slate-400">
                Única fuente autorizada de dominio, autenticación y persistencia NoSQL GeoJSON.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <Cpu className="h-6 w-6 text-purple-400" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-white">Servicios Internos IA / ML</h3>
              <p className="mt-1.5 text-xs text-slate-400">
                Microservicios FastAPI aislados para estimación de ocupación y recomendaciones con grounding.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <Smartphone className="h-6 w-6 text-amber-400" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-white">Cliente Móvil (Flutter)</h3>
              <p className="mt-1.5 text-xs text-slate-400">
                Aplicación móvil para pasajeros donde viven las consultas operativas de transporte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE APP DOWNLOAD SECTION (SPEC 08) */}
      <section id="descarga" className="border-t border-slate-800/80 bg-[#0b101b] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-[#0d1829] to-slate-900 p-8 sm:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                  Estado de Publicación: Pendiente · En Validación Académica (Spec 08)
                </span>
                <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                  Descarga la App Móvil BusTrack para Android
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                  Todas las herramientas de consulta de rutas, paradas cercanas, horarios y recomendaciones inteligentes para pasajeros estarán disponibles desde la aplicación móvil oficial. En cumplimiento con nuestra política de veracidad documental, el botón de descarga hacia <strong>Google Play Store</strong> permanece en estado pendiente hasta concluir la publicación oficial.
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    Sin enlaces falsos ni rotos
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    Android 8.0+ (Flutter + Dart)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    Distribución oficial planeada en Google Play
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start lg:col-span-4 lg:items-end">
                <div className="w-full max-w-xs rounded-2xl border border-slate-700/80 bg-slate-950/90 p-5 text-center">
                  <Smartphone className="mx-auto h-10 w-10 text-emerald-400" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-white">Google Play Store</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Estado: <strong className="text-amber-300">Pendiente de publicación</strong>
                  </p>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="mt-4 w-full cursor-not-allowed rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs font-semibold text-slate-300"
                  >
                    Próximamente en Google Play
                  </button>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Se habilitará con enlace seguro una vez publicada la app.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PRIVACY-RESPECTING ANALYTICS PREFERENCE (SPEC 11) */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-4 text-xs text-slate-300 sm:flex-row">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>
                <strong>Medición respetuosa de la privacidad (Spec 11):</strong> Este portal no utiliza cookies de rastreo publicitario ni recopila datos personales (PII).
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {analyticsConsent === null ? (
                <>
                  <button
                    type="button"
                    onClick={() => setAnalyticsConsent(true)}
                    className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 font-semibold text-emerald-300 hover:bg-emerald-500/30"
                  >
                    Permitir métricas anónimas
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnalyticsConsent(false)}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 font-medium text-slate-300 hover:bg-slate-700"
                  >
                    Desactivar
                  </button>
                </>
              ) : (
                <span className="font-semibold text-emerald-400">
                  {analyticsConsent
                    ? '✓ Métricas anónimas activadas (sin PII)'
                    : '✓ Medición desactivada'}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
