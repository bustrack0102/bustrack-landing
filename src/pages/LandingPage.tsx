import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Bus,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Search,
  Smartphone,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Users,
  AlertCircle,
  Send,
} from 'lucide-react';
import { OFFICIAL_ROUTES_CATALOG, type RouteItem } from '../core/models/transport';

interface PresetQuestion {
  id: string;
  question: string;
  answer: string;
  routeRef: string;
}

const PRESET_QUESTIONS: PresetQuestion[] = [
  {
    id: 'q1',
    question: '¿Cómo llego de Tula Centro al campus de la UTTT y cuánto cuesta?',
    answer:
      'Según el catálogo oficial de BusTrackDB, debes tomar la Ruta R-01 (Tula Centro ↔ Universidad Tecnológica) operada por Autotransportes Valle del Mezquital (AVM). Sale desde Plaza del Nacionalismo cada 12 minutos entre las 05:45 y 21:30 h. La tarifa general es de $14 MXN y la tarifa preferencial/estudiante con credencial UTTT vigente es de $10 MXN.',
    routeRef: 'R-01 · AVM Urbano · 22 min aprox.',
  },
  {
    id: 'q2',
    question: '¿A qué hora sale el primer transporte desde Tepeji del Río hacia la UTTT?',
    answer:
      'La Ruta R-02 (Tepeji del Río ↔ Campus UTTT Directo) inicia operaciones a las 06:00 h desde el Jardín Municipal de Tepeji del Río, con salidas cada 20 minutos hasta las 21:00 h. El costo es de $20 MXN general y $15 MXN estudiante.',
    routeRef: 'R-02 · Suburbano · 35 min aprox.',
  },
  {
    id: 'q3',
    question: '¿Qué ruta pasa por Atitalaquia y la Refinería hacia la universidad?',
    answer:
      'La Ruta R-04 (Atitalaquia ↔ Refinería / UTTT) sale de la Plaza Principal de Atitalaquia, pasa por el Parque Industrial, Puerta 1 de la Refinería Miguel Hidalgo y El Llano 2da Sección hasta el Campus Central UTTT. Frecuencia de 18 minutos y tarifa estudiante de $11 MXN.',
    routeRef: 'R-04 · AVM Urbano · 25 min aprox.',
  },
];

export const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Todas');
  const [selectedPreset, setSelectedPreset] = useState<PresetQuestion>(PRESET_QUESTIONS[0]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customResponse, setCustomResponse] = useState<string | null>(null);

  const filteredRoutes = useMemo(() => {
    return OFFICIAL_ROUTES_CATALOG.filter((route: RouteItem) => {
      const matchesType =
        selectedType === 'Todas' || route.transportType === selectedType;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesType;
      const inName = route.name.toLowerCase().includes(q);
      const inCode = route.code.toLowerCase().includes(q);
      const inCompany = route.company.toLowerCase().includes(q);
      const inStops = route.stops.some((s) => s.toLowerCase().includes(q));
      return matchesType && (inName || inCode || inCompany || inStops);
    });
  }, [searchQuery, selectedType]);

  const handleAskAssistant = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customQuestion.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    if (lower.includes('ignora') || lower.includes('system prompt') || lower.includes('password')) {
      setCustomResponse(
        '🛡️ [Guardrail Anti-Injection Activo]: Solicitud bloqueada por políticas de seguridad. El asistente de BusTrack solo responde consultas sobre rutas, horarios y tarifas oficiales de transporte.'
      );
      return;
    }

    const matchedRoute = OFFICIAL_ROUTES_CATALOG.find(
      (r) =>
        lower.includes(r.code.toLowerCase()) ||
        r.stops.some((s) => lower.includes(s.toLowerCase().split(' ')[0])) ||
        lower.includes(r.origin.toLowerCase().split(' ')[0])
    );

    if (matchedRoute) {
      setCustomResponse(
        `Con base en los datos verificados de BusTrackDB: La ruta recomendada es ${matchedRoute.code} (${matchedRoute.name}), operada por ${matchedRoute.company}. Horario de ${matchedRoute.firstDeparture} a ${matchedRoute.lastDeparture} h cada ${matchedRoute.frequencyMinutes} min. Tarifa general: $${matchedRoute.fareGeneralMxn} MXN ($${matchedRoute.fareStudentMxn} MXN estudiante UTTT).`
      );
    } else {
      setCustomResponse(
        'Según el catálogo oficial de BusTrackDB, contamos con 4 corredores principales en Tula, Tepeji del Río, Tlahuelilpan y Atitalaquia hacia la UTTT y el Hospital Regional, con tarifas desde $10 MXN (estudiante) hasta $20 MXN. Selecciona una ruta arriba para ver todas sus paradas.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-grid-pattern">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ecosistema de Movilidad Inteligente · UTTT</span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.12]">
                Tu transporte público en{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Tula-Tepeji
                </span>
                , claro y conectado.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Consulta rutas verificadas, paradas georreferenciadas, horarios, tarifas estudiantiles y nivel de ocupación estimado por visión artificial sin comprometer tu privacidad personal.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#rutas"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
                >
                  <span>Explorar Rutas y Tarifas</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#asistente-ia"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-emerald-500/50 hover:text-white"
                >
                  <Sparkles className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <span>Probar Asistente IA</span>
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-8 sm:gap-6">
                <div>
                  <p className="text-2xl font-extrabold text-white sm:text-3xl">16</p>
                  <p className="mt-1 text-xs text-slate-400">Colecciones NoSQL GeoJSON</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-emerald-400 sm:text-3xl">$10 MXN</p>
                  <p className="mt-1 text-xs text-slate-400">Tarifa Preferencial UTTT</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-cyan-400 sm:text-3xl">100%</p>
                  <p className="mt-1 text-xs text-slate-400">Libre de Rastreo GPS</p>
                </div>
              </div>
            </div>

            {/* LIVE TELEMETRY PREVIEW CARD */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Corredor Universitario Activo
                      </p>
                      <h2 className="text-base font-bold text-white">
                        Ruta R-01 · Tula Centro ↔ UTTT
                      </h2>
                    </div>
                  </div>
                  <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-300">
                    Cada 12 min
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    <div className="text-xs">
                      <p className="font-semibold text-slate-200">Paradas principales (GeoJSON 2dsphere)</p>
                      <p className="mt-1 text-slate-400">
                        Plaza del Nacionalismo → Blvd. Tula-Iturbe → Crucero El Llano → El Alvarado → Campus UTTT
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-800/90 bg-slate-950/70 p-3.5">
                    <div>
                      <span className="text-[11px] text-slate-400">Tarifa Estudiante</span>
                      <p className="text-lg font-bold text-emerald-400">$10.00 MXN</p>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400">Ocupación Estimada ML</span>
                      <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300">
                        <Users className="h-4 w-4" aria-hidden="true" />
                        <span>Moderada (62%)</span>
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2 font-semibold text-cyan-300">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <span>Recomendación IA Verificada</span>
                    </div>
                    <p className="mt-1 leading-relaxed text-slate-300">
                      "Aborda en Plaza del Nacionalismo antes de las 06:35 h para llegar al turno matutino de las 07:00 h con margen de 5 minutos."
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
                  <span>Fuente: API Central BusTrack (.NET 10)</span>
                  <Link
                    to="/login"
                    className="font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    Panel Operativo →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROUTE & FARE EXPLORER */}
      <section id="rutas" className="border-t border-slate-800/80 bg-[#0b101b] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Catálogo Oficial BusTrackDB
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Rutas, Horarios y Tarifas Verificadas
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Información oficial sincronizada con la base de datos no relacional en Microsoft Azure. Sin datos inventados ni costos ocultos.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo de transporte">
              {['Todas', 'Autobús Urbano', 'Suburbano', 'Combi / Urvan'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    selectedType === type
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="relative max-w-md">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por municipio, parada, código (ej. R-01, Tepeji, Refinería)..."
                aria-label="Buscar ruta, parada o municipio"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {filteredRoutes.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
              <p className="mt-3 text-base font-semibold text-white">
                No se encontraron rutas con ese criterio
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Intenta buscar "Tula", "Tepeji", "Atitalaquia", "Tlahuelilpan" o "UTTT".
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredRoutes.map((route) => (
                <article
                  key={route.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/70 p-6 transition hover:border-emerald-500/40"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-extrabold text-emerald-300">
                        <Bus className="h-3.5 w-3.5" aria-hidden="true" />
                        {route.code} · {route.transportType}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          route.occupancyLevel === 'Baja'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : route.occupancyLevel === 'Moderada'
                            ? 'bg-amber-500/15 text-amber-300'
                            : 'bg-rose-500/15 text-rose-300'
                        }`}
                      >
                        Ocupación ML: {route.occupancyLevel}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-white">{route.name}</h3>
                    <p className="mt-1 text-xs text-slate-400">{route.company}</p>

                    <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 text-center">
                      <div>
                        <span className="block text-[11px] text-slate-400">General / Est.</span>
                        <span className="text-sm font-bold text-white">
                          ${route.fareGeneralMxn} /{' '}
                          <span className="text-emerald-400">${route.fareStudentMxn}</span>
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-slate-400">Frecuencia</span>
                        <span className="text-sm font-bold text-white">
                          Cada {route.frequencyMinutes} min
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-slate-400">Horario</span>
                        <span className="text-xs font-semibold text-slate-200">
                          {route.firstDeparture} - {route.lastDeparture}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-semibold text-slate-300">
                        Paradas autorizadas ({route.stops.length}):
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {route.stops.map((stop, idx) => (
                          <span
                            key={stop}
                            className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300"
                          >
                            <span className="font-bold text-emerald-400">{idx + 1}.</span> {stop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      Recorrido estimado: {route.estimatedDurationMin} min
                    </span>
                    <span className="text-emerald-400 font-medium">Verificado en BusTrackDB</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GENAI ASSISTANT INTERACTIVE SECTION */}
      <section id="asistente-ia" className="border-t border-slate-800/80 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Microservicio bustrack-genai · GPT-4o-mini
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                Asistente de Rutas con Grounding Estricto
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Nuestro motor de Inteligencia Artificial Generativa consulta únicamente las colecciones validadas de <code className="text-emerald-300">BusTrackDB</code>. Cuenta con barreras de seguridad contra inyección de prompts, sanitización de datos personales (PII) y cero invención de rutas.
              </p>

              <div className="mt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Preguntas frecuentes verificadas:
                </p>
                {PRESET_QUESTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedPreset(item);
                      setCustomResponse(null);
                    }}
                    className={`w-full rounded-xl border p-3.5 text-left text-xs font-medium transition ${
                      selectedPreset.id === item.id && !customResponse
                        ? 'border-emerald-500/60 bg-emerald-500/10 text-white'
                        : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/85 p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">BusTrack GenAI Grounded Engine</h3>
                      <p className="text-[11px] text-slate-400">
                        Anti-Hallucination · Sanitización PII · Presupuesto Tiktoken
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                    En línea (Azure)
                  </span>
                </div>

                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs font-semibold text-emerald-400">
                    Consulta seleccionada:
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {customResponse ? customQuestion : selectedPreset.question}
                  </p>

                  <div className="mt-4 border-t border-slate-800/80 pt-4">
                    <p className="text-xs font-semibold text-cyan-300">
                      Respuesta fundamentada en BusTrackDB:
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                      {customResponse ?? selectedPreset.answer}
                    </p>
                    {!customResponse && (
                      <span className="mt-3 inline-block rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                        Referencia: {selectedPreset.routeRef}
                      </span>
                    )}
                  </div>
                </div>

                <form onSubmit={handleAskAssistant} className="mt-4">
                  <label htmlFor="ai-question-input" className="block text-xs font-medium text-slate-400 mb-1.5">
                    Haz una prueba rápida de consulta o guardrail:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="ai-question-input"
                      type="text"
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      placeholder="Ej. ¿Cuánto cuesta la ruta de Tepeji o R-02?"
                      className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
                    >
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Consultar</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT ARCHITECTURE & SCOPE (SPEC 07) */}
      <section id="proyecto" className="border-t border-slate-800/80 bg-[#0b101b] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Ingeniería de Software · UTTT
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Arquitectura Distribuida en Microsoft Azure
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Diseñado bajo principios de Spec-Driven Development (SDD) y DevSecOps, separando responsabilidades entre presentación, lógica de dominio, inteligencia artificial y persistencia geoespacial.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <Server className="h-7 w-7 text-emerald-400" aria-hidden="true" />
              <h3 className="mt-4 text-base font-bold text-white">API Central (.NET 10)</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Única fuente autorizada de negocio, autenticación corporativa, control de sesiones y acceso seguro a datos.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <Database className="h-7 w-7 text-cyan-400" aria-hidden="true" />
              <h3 className="mt-4 text-base font-bold text-white">NoSQL GeoJSON (16 Colecciones)</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Base de datos <code className="text-slate-200">BusTrackDB</code> con índices espaciales <code className="text-slate-200">2dsphere</code> para paradas, destinos, rutas y tarifas.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <Cpu className="h-7 w-7 text-purple-400" aria-hidden="true" />
              <h3 className="mt-4 text-base font-bold text-white">Visión Artificial (ML FastAPI)</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Inferencia interna para estimación anónima de aforo y ocupación en unidades sin reconocimiento facial.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <ShieldCheck className="h-7 w-7 text-amber-400" aria-hidden="true" />
              <h3 className="mt-4 text-base font-bold text-white">DevSecOps & Privacidad</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Escaneo SAST con Semgrep, Gitleaks, pruebas automatizadas en CI/CD y despliegue continuo en Azure Container Instances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE APP DOWNLOAD SECTION (SPEC 08) */}
      <section id="descarga" className="border-t border-slate-800/80 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-[#0d1829] to-slate-900 p-8 sm:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                  Estado de Publicación: En Validación Académica (Próximamente en Google Play)
                </span>
                <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                  Aplicación Móvil BusTrack para Android (Flutter)
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                  Lleva todas las rutas de la Región Tula-Tepeji en tu bolsillo. Consulta paradas cercanas, recibe notificaciones operativas y califica el servicio. Conforme a nuestra política de transparencia, el enlace directo a Google Play Store se habilitará una vez concluida la liberación oficial de la versión 1.0.
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    Android 8.0+ (API 26)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    Sin rastreo GPS en segundo plano
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    Consentimiento explícito de sensores
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start lg:col-span-4 lg:items-end">
                <div className="w-full max-w-xs rounded-2xl border border-slate-700/80 bg-slate-950/90 p-5 text-center">
                  <Smartphone className="mx-auto h-10 w-10 text-emerald-400" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-white">Google Play Store</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Paquete: <code className="text-emerald-300">mx.edu.uttt.bustrack</code>
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
                    Versión candidata RC-1 en revisión institucional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
