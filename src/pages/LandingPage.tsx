import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  Bus,
  Search,
  CheckCircle2,
  X,
  Navigation,
  Compass,
  Cpu,
  GraduationCap,
  ChevronRight,
  DollarSign,
  Star,
  Activity,
  Award,
  Info,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* TYPES & MOCK DATA                                                          */
/* -------------------------------------------------------------------------- */

interface RouteOption {
  id: string;
  name: string;
  operator: string;
  type: string;
  isAiRecommended: boolean;
  departure: string;
  durationMin: number;
  arrival: string;
  fareRegular: number;
  fareStudent: number;
  stopsCount: number;
  rating: number;
  stops: string[];
  segmentFares: { from: string; to: string; fare: number }[];
}

interface CoverageZone {
  id: string;
  name: string;
  title: string;
  tag: string;
  description: string;
  routesCount: number;
  stopsCount: number;
  keyStops: string[];
  coordinates: { x: number; y: number };
}

const DEMO_ROUTES: RouteOption[] = [
  {
    id: 'tula-uttt-01',
    name: 'Ruta Tula – UTTT Directo',
    operator: 'Autotransportes Valle del Mezquital (AVM)',
    type: 'Corredor Universitario',
    isAiRecommended: true,
    departure: '08:15',
    durationMin: 35,
    arrival: '08:50',
    fareRegular: 12.0,
    fareStudent: 6.0,
    stopsCount: 14,
    rating: 4.9,
    stops: [
      'Central de Autobuses Tula',
      'Puente Melchor Ocampo',
      'San Marcos Centro',
      'El Carmen',
      'Cruce Refinería Miguel Hidalgo',
      'Parque Industrial Atitalaquia',
      'Campus UTTT Puerta Principal',
    ],
    segmentFares: [
      { from: 'Central de Autobuses Tula', to: 'San Marcos Centro', fare: 8.0 },
      { from: 'San Marcos Centro', to: 'Parque Industrial', fare: 10.0 },
      { from: 'Central de Autobuses Tula', to: 'Campus UTTT', fare: 12.0 },
    ],
  },
  {
    id: 'coral-08',
    name: 'Ruta Coral 08 · Colectivo Regional',
    operator: 'Líneas Unidas del Río Tula',
    type: 'Ruta Colectiva Local',
    isAiRecommended: false,
    departure: '08:25',
    durationMin: 45,
    arrival: '09:10',
    fareRegular: 10.0,
    fareStudent: 6.0,
    stopsCount: 22,
    rating: 4.7,
    stops: [
      'Tula Centro (Jardín Principal)',
      'Mercado Felipe Ángeles',
      'San José',
      'San Marcos Cruz Azul',
      'Teocalco',
      'Entronque UTTT El Tablón',
    ],
    segmentFares: [
      { from: 'Tula Centro', to: 'San José', fare: 7.0 },
      { from: 'Tula Centro', to: 'Teocalco', fare: 9.0 },
      { from: 'Tula Centro', to: 'Campus UTTT', fare: 10.0 },
    ],
  },
  {
    id: 'pachuca-real-monte',
    name: 'Pachuca – Real del Monte Express',
    operator: 'Transportes Montaña y Valle',
    type: 'Corredor Turístico',
    isAiRecommended: true,
    departure: '09:00',
    durationMin: 28,
    arrival: '09:28',
    fareRegular: 18.0,
    fareStudent: 12.0,
    stopsCount: 8,
    rating: 4.8,
    stops: [
      'Plaza Independencia (Reloj Monumental)',
      'Loreto',
      'Corredor de la Montaña',
      'Monumento al Minero',
      'Pueblo Mágico Real del Monte',
    ],
    segmentFares: [
      { from: 'Pachuca Centro', to: 'Loreto', fare: 10.0 },
      { from: 'Pachuca Centro', to: 'Real del Monte', fare: 18.0 },
    ],
  },
];

const COVERAGE_ZONES: CoverageZone[] = [
  {
    id: 'tula',
    name: 'Tula de Allende & UTTT',
    title: 'Corredor Tula Centro · Campus UTTT',
    tag: 'Núcleo Universitario',
    description:
      'Conexión primordial para la comunidad estudiantil de la Universidad Tecnológica de Tula-Tepeji, uniendo la central de autobuses, el centro histórico y las comunidades intermedias.',
    routesCount: 8,
    stopsCount: 46,
    keyStops: ['Campus UTTT', 'Central de Autobuses Tula', 'San Marcos', 'El Tablón'],
    coordinates: { x: 120, y: 190 },
  },
  {
    id: 'tepeji',
    name: 'Tepeji del Río',
    title: 'Zona Industrial y Conexión México–Querétaro',
    tag: 'Corredor Metropolitano',
    description:
      'Rutas estratégicas que enlazan Tepeji del Río con Tula y la autopista México-Querétaro, facilitando el traslado obrero y estudiantil.',
    routesCount: 6,
    stopsCount: 38,
    keyStops: ['Centro de Tepeji', 'Parque Industrial', 'El Salto', 'Tlaxcoapan'],
    coordinates: { x: 140, y: 250 },
  },
  {
    id: 'arqueologica',
    name: 'Zona Arqueológica Tula',
    title: 'Patrimonio Cultural y Turístico de Hidalgo',
    tag: 'Destino Turístico',
    description:
      'Paradas programadas y trayectos organizados para visitantes que viajan hacia los legendarios Atlantes de Tula y el Museo Arqueológico Jorge R. Acosta.',
    routesCount: 3,
    stopsCount: 16,
    keyStops: ['Entrada Zona Arqueológica', 'Museo de Sitio', 'Andador Turístico'],
    coordinates: { x: 105, y: 160 },
  },
  {
    id: 'pachuca',
    name: 'Pachuca & Mineral del Monte',
    title: 'Capital del Estado y Pueblos Mágicos',
    tag: 'Expansión Regional',
    description:
      'Proyección de cobertura que integra el Corredor de la Montaña, uniendo la capital hidalguense con los centros mineros históricos y el transporte metropolitano Tuzobús.',
    routesCount: 12,
    stopsCount: 82,
    keyStops: ['Reloj Monumental Pachuca', 'Real del Monte Centro', 'Plaza Juárez'],
    coordinates: { x: 260, y: 130 },
  },
];

const ARCHITECTURE_STAGES = [
  {
    id: 'etapa-1',
    badge: 'Etapa 1 · Base MVP',
    title: 'Catálogo Estructurado y Consulta Operativa',
    summary:
      'Modelado de datos relacional para empresas, vehículos, rutas, paradas autorizadas, horarios programados y tarifas transparentes con cartografía GeoJSON.',
    bullets: [
      'Backend ASP.NET Core 9 / EF Core con SQL Server en Azure.',
      'Endpoints públicos protegidos con Rate Limiting y validación RFC 9457.',
      'Visualización cartográfica en frontend sin rastreo invasivo de GPS.',
      'Pruebas unitarias e integración con Vitest y xUnit.',
    ],
  },
  {
    id: 'etapa-2',
    badge: 'Etapa 2 · Rendimiento y Operación',
    title: 'Calificaciones de Calidad y Caché Distribuido',
    summary:
      'Módulo de reseñas ciudadanas para calificar puntualidad, seguridad y limpieza, complementado con capa de caché Redis para consultas de alta concurrencia.',
    bullets: [
      'Caché Redis en Azure para respuestas de rutas y horarios menores a 50ms.',
      'Sistema de reputación y opiniones de la comunidad para cada línea de transporte.',
      'Dashboard administrativo con analítica operativa y reportes de incidencias.',
      'Auditoría y control de roles RBAC con tokens JWT de corta duración.',
    ],
  },
  {
    id: 'etapa-3',
    badge: 'Etapa 3 · Machine Learning',
    title: 'Detección de Paradas y Estimación de Aforo',
    summary:
      'Algoritmos de aprendizaje automático alimentados por sensores de acelerómetro móvil (con consentimiento explícito) para sugerir nuevas paradas y aforo aproximado.',
    bullets: [
      'Microservicio especializado FastAPI en Python para inferencia analítica.',
      'Cero reconocimiento facial ni captura de datos biométricos o identificadores personales.',
      'Flujo de validación humana obligatoria: los administradores autorizan cada nueva parada sugerida.',
      'Detección de patrones de frenado y ascenso de pasajeros sin rastrear usuarios individuales.',
    ],
  },
  {
    id: 'etapa-4',
    badge: 'Etapa 4 · IA Explicada',
    title: 'Asistencia Conversacional con Grounding Estricto',
    summary:
      'Integración de Modelos de Lenguaje (LLM) anclados exclusivamente a la base de datos oficial, garantizando cero alucinaciones en tarifas y horarios.',
    bullets: [
      'Grounding estricto: la IA no inventa rutas, empresas ni costos.',
      'Sanitización de lenguaje e indicaciones de traslado con lenguaje natural.',
      'Entrega segura a través de la API Gateway institucional.',
      'Modo offline y sincronización inteligente en la aplicación móvil.',
    ],
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Fátima Ximena García González',
    role: 'Product Owner',
    initials: 'FX',
    description: 'Definición de visión del producto, requerimientos de transporte regional y coordinación con transportistas.',
  },
  {
    name: 'Diego Parra Cruz',
    role: 'Scrum Master',
    initials: 'DP',
    description: 'Gestión de sprints, metodologías ágiles, remoción de bloqueos e integración de componentes.',
  },
  {
    name: 'José de Jesús López Islas',
    role: 'Pruebas y Calidad (QA)',
    initials: 'JL',
    description: 'Estrategia de aseguramiento de calidad, automatización de pruebas unitarias, SAST y validación de seguridad.',
  },
  {
    name: 'Melanie Joliee Bonilla Domínguez',
    role: 'Documentación y Gestión',
    initials: 'MB',
    description: 'Documentación de arquitectura, diagramas de datos, manuales de usuario y memorias técnicas.',
  },
];

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export const LandingPage: React.FC = () => {
  // Demo Route Simulator State
  const [originText, setOriginText] = useState('Tula Centro');
  const [destinationText, setDestinationText] = useState('Campus UTTT');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<RouteOption[]>([DEMO_ROUTES[0], DEMO_ROUTES[1]]);
  const [selectedRouteModal, setSelectedRouteModal] = useState<RouteOption | null>(null);

  // Coverage Interactive Map State
  const [activeZone, setActiveZone] = useState<CoverageZone>(COVERAGE_ZONES[0]);

  // Architecture Tabs State
  const [activeArchStage, setActiveArchStage] = useState(ARCHITECTURE_STAGES[0].id);

  // Analytics Consent Banner State
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

  // Handle Simulated Route Search
  const handleRunSearch = (origin: string, destination: string) => {
    setIsSearching(true);
    setTimeout(() => {
      if (
        origin.toLowerCase().includes('pachuca') ||
        destination.toLowerCase().includes('monte') ||
        destination.toLowerCase().includes('pachuca')
      ) {
        setSearchResults([DEMO_ROUTES[2], DEMO_ROUTES[0]]);
      } else {
        setSearchResults([DEMO_ROUTES[0], DEMO_ROUTES[1]]);
      }
      setIsSearching(false);
    }, 600);
  };

  return (
    <div id="contenido-principal" className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] selection:bg-[#cf1b1b] selection:text-white">
      {/* -------------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                      */}
      {/* -------------------------------------------------------------------- */}
      <section
        id="inicio"
        className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 hero-glow"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#cf1b1b]/20 bg-[#fff0e8] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#900d0d]">
                <span className="h-2 w-2 rounded-full bg-[#cf1b1b] animate-ping" />
                <span>Movilidad Inteligente en Hidalgo · UTTT</span>
              </div>

              {/* Headline */}
              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-[#1b1c1c] sm:text-5xl lg:text-6xl">
                Tu ruta,{' '}
                <span className="text-[#cf1b1b] underline decoration-[#ffdbc5] decoration-wavy decoration-2">
                  más clara.
                </span>
                <br />
                Tu viaje, más fácil.
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-lg leading-relaxed text-[#555555] sm:text-xl">
                Compara rutas, horarios oficiales, paradas autorizadas, destinos turísticos y tarifas desglosadas por tramo en Hidalgo. Todo en un solo lugar, con asistencia de IA explicada y{' '}
                <strong className="font-bold text-[#1b1c1c]">sin rastreo GPS invasivo</strong>.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#proximamente"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#cf1b1b] px-6 py-4 text-base font-bold text-white shadow-lg shadow-red-500/25 transition hover:bg-[#900d0d] hover:shadow-xl hover:shadow-red-500/30 active:scale-95"
                >
                  <Smartphone className="h-5 w-5" aria-hidden="true" />
                  <span>Próximamente en Google Play</span>
                </a>

                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-4 text-base font-bold text-[#1b1c1c] shadow-sm transition hover:border-[#cf1b1b] hover:bg-[#fff8f4] hover:text-[#cf1b1b]"
                >
                  <Navigation className="h-5 w-5 text-[#cf1b1b]" aria-hidden="true" />
                  <span>Probar demo interactiva</span>
                </a>
              </div>

              {/* Social Proof / Team Credit Pill */}
              <div className="mt-10 flex items-center gap-4 border-t border-neutral-200/80 pt-6">
                <div className="flex -space-x-2">
                  {TEAM_MEMBERS.map((m) => (
                    <div
                      key={m.initials}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#cf1b1b] to-[#900d0d] text-xs font-bold text-white shadow-sm"
                      title={`${m.name} (${m.role})`}
                    >
                      {m.initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1 text-xs font-bold text-neutral-800">4.9 / 5.0</span>
                  </div>
                  <p className="text-xs font-medium text-neutral-600">
                    Desarrollado en la Universidad Tecnológica de Tula-Tepeji
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Senior 3D Interactive Phone Mockup */}
            <div className="relative flex justify-center lg:col-span-5">
              {/* Concentric Animated Orbit Rings */}
              <div
                className="pointer-events-none absolute h-[460px] w-[460px] rounded-full border border-dashed border-[#cf1b1b]/20 animate-orbit"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute h-[380px] w-[380px] rounded-full border border-[#ffdbc5]/60 animate-orbit-reverse"
                aria-hidden="true"
              />

              {/* Floating Badge 1 (Top-Left) */}
              <div className="absolute -left-4 top-10 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-warm-md border border-neutral-100 animate-float-slow">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff0e8] text-[#cf1b1b]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Próxima salida
                  </div>
                  <div className="text-sm font-extrabold text-[#1b1c1c]">08:15 hrs · AVM</div>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom-Right) */}
              <div className="absolute -right-4 bottom-14 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-warm-md border border-neutral-100 animate-float-delayed">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#cf1b1b] to-[#900d0d] text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#cf1b1b]">
                    Recomendada por IA
                  </div>
                  <div className="text-sm font-extrabold text-[#1b1c1c]">Mejor opción sin trasbordos</div>
                </div>
              </div>

              {/* Physical Phone Chassis */}
              <div className="relative z-10 w-[300px] sm:w-[320px] rounded-[48px] bg-[#181818] p-3.5 phone-ambient-shadow">
                {/* Speaker Notch & Camera */}
                <div className="mx-auto mb-3 flex h-4 w-28 items-center justify-center rounded-full bg-[#111111]">
                  <div className="h-1.5 w-10 rounded-full bg-neutral-800" />
                  <div className="ml-2 h-2.5 w-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
                </div>

                {/* Inner Phone Screen */}
                <div className="overflow-hidden rounded-[36px] bg-[#fffaf7] p-4 text-[#1b1c1c] border border-neutral-200">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-[#cf1b1b]" />
                      <span className="text-xs font-bold text-[#1b1c1c]">BusTrack Móvil</span>
                    </div>
                    <span className="rounded-full bg-[#ffdbc5] px-2 py-0.5 text-[10px] font-bold text-[#900d0d]">
                      Hidalgo
                    </span>
                  </div>

                  {/* Destination Input Preview */}
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs text-neutral-600 shadow-sm border border-neutral-200">
                    <Search className="h-3.5 w-3.5 text-[#cf1b1b]" />
                    <span className="font-semibold text-[#1b1c1c]">Destino: Campus UTTT</span>
                  </div>

                  {/* Active Route Mini Card */}
                  <div className="mt-3 rounded-2xl bg-white p-3 shadow-sm border border-rose-100">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-[#fff0e8] px-2 py-0.5 text-[10px] font-bold text-[#cf1b1b]">
                        Ruta Tula–UTTT
                      </span>
                      <span className="text-xs font-bold text-[#cf1b1b]">$12.00 MXN</span>
                    </div>

                    <div className="mt-2 text-xs font-bold text-[#1b1c1c]">
                      Salida en 6 minutos
                    </div>

                    {/* Timeline visualization */}
                    <div className="mt-3 relative pl-4 text-[11px] text-neutral-600 space-y-2 border-l-2 border-dashed border-[#cf1b1b]/40">
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[#cf1b1b]" />
                        <span className="font-medium text-[#1b1c1c]">Central de Tula</span>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
                        <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                        <span className="font-bold text-[#cf1b1b]">San Marcos (En camino)</span>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-neutral-300" />
                        <span className="font-medium text-neutral-500">Campus UTTT</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Explanation Pill */}
                  <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#fff0e8] p-2.5 text-[11px] leading-snug text-[#900d0d]">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#cf1b1b] mt-0.5" />
                    <span>
                      <strong>Recomendación IA:</strong> Opción con menor tiempo y tarifa preferencial para estudiantes con credencial UTTT.
                    </span>
                  </div>
                </div>

                {/* Bottom Home Indicator */}
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-neutral-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-16 border-y border-neutral-200/80 bg-white/70 py-4 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-6 px-4 text-xs font-bold uppercase tracking-wider text-neutral-600 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#cf1b1b]" />
              Rutas y Paradas Claras
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#cf1b1b]" />
              Horarios Confiables
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#cf1b1b]" />
              Tarifas por Tramo
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#cf1b1b]" />
              Recomendaciones con IA
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#cf1b1b]" />
              Sin Rastreo GPS Invasivo
            </span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. "CÓMO FUNCIONA" SECTION (3 STEPS)                                  */}
      {/* -------------------------------------------------------------------- */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#fff0e8] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#900d0d]">
              Así de sencillo
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-[#1b1c1c] sm:text-4xl">
              Tu mejor ruta en <span className="text-[#cf1b1b]">tres pasos</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#555555]">
              Diseñado para que cualquier estudiante, trabajador o turista consulte de forma inmediata el transporte disponible en la región.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="group relative rounded-3xl bg-[#fbf9f8] p-8 border border-neutral-200 transition-all hover:-translate-y-1 hover:shadow-warm-md hover:border-[#cf1b1b]/40">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-[#cf1b1b]">01</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#cf1b1b]">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#1b1c1c]">
                Elige tu destino
              </h3>
              <p className="mt-3 text-sm text-[#555555] leading-relaxed">
                Indica tu punto de origen y hacia dónde te diriges. Puedes usar nuestros accesos rápidos a la UTTT, terminales o zonas turísticas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-3xl bg-[#fbf9f8] p-8 border border-neutral-200 transition-all hover:-translate-y-1 hover:shadow-warm-md hover:border-[#cf1b1b]/40">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-[#cf1b1b]">02</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#cf1b1b]">
                  <Compass className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#1b1c1c]">
                Consulta opciones
              </h3>
              <p className="mt-3 text-sm text-[#555555] leading-relaxed">
                Compara líneas de autobuses y colectivos, tarifas por tramo, horarios programados, tiempo estimado de viaje y número de paradas.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative rounded-3xl bg-[#fbf9f8] p-8 border border-neutral-200 transition-all hover:-translate-y-1 hover:shadow-warm-md hover:border-[#cf1b1b]/40">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-[#cf1b1b]">03</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#cf1b1b]">
                  <Navigation className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#1b1c1c]">
                Viaja mejor
              </h3>
              <p className="mt-3 text-sm text-[#555555] leading-relaxed">
                Toma la unidad que mejor se adapte a tus tiempos y presupuesto. Disfruta de un traslado predecible y con total certeza de tarifas.
              </p>
            </div>
          </div>

          {/* Data Hierarchy Chain from Official UTTT Document */}
          <div className="mt-12 rounded-2xl bg-[#fff8f4] p-6 border border-[#ffdbc5]/80">
            <div className="text-center text-xs font-bold uppercase tracking-wider text-[#900d0d]">
              Estructura Oficial de Datos BusTrack (Documentación UTTT)
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-[#1b1c1c]">
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-sm border border-rose-200">
                1. Empresa
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-sm border border-rose-200">
                2. Transporte
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-sm border border-rose-200">
                3. Ruta
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-sm border border-rose-200">
                4. Paradas
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-sm border border-rose-200">
                5. Horarios
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-lg bg-[#cf1b1b] text-white px-3 py-1.5 shadow-sm">
                6. Tarifas por Tramo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. INTERACTIVE ROUTE SIMULATOR & MINI-MAP SECTION                    */}
      {/* -------------------------------------------------------------------- */}
      <section id="demo" className="py-20 bg-[#262626] text-white relative overflow-hidden">
        {/* Glow ambient */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#cf1b1b]/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#ffdbc5]">
                Pruébalo tú mismo
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl text-white">
                Encuentra una ruta{' '}
                <span className="text-[#cf1b1b]">en segundos.</span>
              </h2>
              <p className="mt-4 text-base text-neutral-300 leading-relaxed">
                Simula una búsqueda como si estuvieras en la aplicación móvil de BusTrack. Consulta horarios estimados, paradas del trayecto y las tarifas desglosadas.
              </p>

              {/* Disclaimer Badge */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-neutral-800/90 p-3 text-xs text-neutral-300 border border-neutral-700">
                <Info className="h-4 w-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Demo ilustrativa:</strong> Simulación interactiva de cómo BusTrack te ayuda a comparar opciones antes de viajar.
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="mt-8">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Accesos rápidos de prueba:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOriginText('Tula Centro');
                      setDestinationText('Campus UTTT');
                      handleRunSearch('Tula Centro', 'Campus UTTT');
                    }}
                    className="rounded-full bg-neutral-800 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:bg-[#cf1b1b] hover:text-white transition"
                  >
                    Tula ↔ Campus UTTT
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOriginText('Pachuca Centro');
                      setDestinationText('Mineral del Monte');
                      handleRunSearch('Pachuca Centro', 'Mineral del Monte');
                    }}
                    className="rounded-full bg-neutral-800 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:bg-[#cf1b1b] hover:text-white transition"
                  >
                    Pachuca ↔ Mineral del Monte
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOriginText('Tepeji del Río');
                      setDestinationText('Tula Centro');
                      handleRunSearch('Tepeji del Río', 'Tula Centro');
                    }}
                    className="rounded-full bg-neutral-800 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:bg-[#cf1b1b] hover:text-white transition"
                  >
                    Tepeji ↔ Tula Centro
                  </button>
                </div>
              </div>
            </div>

            {/* Right Interactive Simulator Panel */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-[#fffaf7] p-6 text-[#1b1c1c] shadow-2xl border border-neutral-200 sm:p-8">
                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Origen
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#cf1b1b]" />
                      <input
                        type="text"
                        value={originText}
                        onChange={(e) => setOriginText(e.target.value)}
                        placeholder="Ej. Tula Centro"
                        className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pl-9 pr-3 text-sm font-semibold text-[#1b1c1c] focus:border-[#cf1b1b] focus:outline-none focus:ring-1 focus:ring-[#cf1b1b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                      Destino
                    </label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-3 h-4 w-4 text-[#cf1b1b]" />
                      <input
                        type="text"
                        value={destinationText}
                        onChange={(e) => setDestinationText(e.target.value)}
                        placeholder="Ej. Campus UTTT"
                        className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pl-9 pr-3 text-sm font-semibold text-[#1b1c1c] focus:border-[#cf1b1b] focus:outline-none focus:ring-1 focus:ring-[#cf1b1b]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Search Button */}
                <button
                  type="button"
                  onClick={() => handleRunSearch(originText, destinationText)}
                  disabled={isSearching}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#cf1b1b] py-3 text-sm font-bold text-white shadow-md shadow-red-500/20 transition hover:bg-[#900d0d] disabled:opacity-75"
                >
                  {isSearching ? (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-white animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                      <span className="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                      <span className="ml-2">Buscando rutas oficiales...</span>
                    </div>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span>Buscar rutas disponibles</span>
                    </>
                  )}
                </button>

                {/* Search Results List */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-bold uppercase tracking-wider">
                      Resultados disponibles ({searchResults.length})
                    </span>
                    <span>Tarifas actualizadas 2025</span>
                  </div>

                  {searchResults.map((route) => (
                    <div
                      key={route.id}
                      className="rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:border-[#cf1b1b]/50 hover:shadow-warm-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1b1c1c] text-base">
                            {route.name}
                          </span>
                          {route.isAiRecommended && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff0e8] px-2.5 py-0.5 text-[11px] font-bold text-[#900d0d]">
                              <Sparkles className="h-3 w-3 text-[#cf1b1b]" />
                              Recomendada
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-base font-extrabold text-[#cf1b1b]">
                            ${route.fareRegular.toFixed(2)} MXN
                          </span>
                          <span className="block text-[10px] text-neutral-500">
                            Estudiantes: ${route.fareStudent.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-neutral-600">
                        {route.operator} · {route.type}
                      </div>

                      {/* Timeline & Stops summary */}
                      <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-600">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-[#1b1c1c]">
                            {route.departure} — {route.arrival}
                          </span>
                          <span className="rounded bg-neutral-100 px-2 py-0.5 font-medium">
                            {route.durationMin} min
                          </span>
                          <span>{route.stopsCount} paradas</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedRouteModal(route)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#cf1b1b] hover:text-[#900d0d]"
                        >
                          <span>Ver detalles</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Route Details Breakdown */}
        {selectedRouteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 text-[#1b1c1c] shadow-2xl">
              <div className="flex items-start justify-between border-b border-neutral-200 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#cf1b1b]">
                    Detalles de Ruta Oficial
                  </span>
                  <h3 className="text-xl font-extrabold text-[#1b1c1c]">
                    {selectedRouteModal.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Operado por: {selectedRouteModal.operator}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRouteModal(null)}
                  className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Cerrar modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Route Summary Badges */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-[#fff8f4] p-3 border border-[#ffdbc5]">
                  <div className="text-[10px] font-bold uppercase text-neutral-500">Tiempo Est.</div>
                  <div className="text-base font-extrabold text-[#cf1b1b]">
                    {selectedRouteModal.durationMin} min
                  </div>
                </div>
                <div className="rounded-xl bg-[#fff8f4] p-3 border border-[#ffdbc5]">
                  <div className="text-[10px] font-bold uppercase text-neutral-500">Tarifa Gen.</div>
                  <div className="text-base font-extrabold text-[#1b1c1c]">
                    ${selectedRouteModal.fareRegular.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-xl bg-[#fff8f4] p-3 border border-[#ffdbc5]">
                  <div className="text-[10px] font-bold uppercase text-neutral-500">Estudiante</div>
                  <div className="text-base font-extrabold text-[#900d0d]">
                    ${selectedRouteModal.fareStudent.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Stop by Stop Vertical Timeline */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
                  Secuencia de Paradas Autorizadas
                </h4>
                <div className="relative border-l-2 border-[#cf1b1b]/30 pl-5 space-y-3 text-xs">
                  {selectedRouteModal.stops.map((stop, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[#cf1b1b]" />
                      <div className="font-semibold text-[#1b1c1c]">{stop}</div>
                      <div className="text-[10px] text-neutral-500">
                        Parada {idx + 1} de {selectedRouteModal.stops.length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Segment Fares Calculator */}
              <div className="mt-6 border-t border-neutral-100 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Desglose de Tarifas por Tramo
                </h4>
                <div className="space-y-1.5 text-xs text-neutral-600">
                  {selectedRouteModal.segmentFares.map((seg, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-neutral-50 p-2"
                    >
                      <span>
                        {seg.from} → {seg.to}
                      </span>
                      <span className="font-bold text-[#1b1c1c]">
                        ${seg.fare.toFixed(2)} MXN
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRouteModal(null)}
                className="mt-6 w-full rounded-xl bg-[#cf1b1b] py-3 text-sm font-bold text-white hover:bg-[#900d0d]"
              >
                Entendido, cerrar detalles
              </button>
            </div>
          </div>
        )}
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. "FUNCIONES" BENTO GRID SECTION                                    */}
      {/* -------------------------------------------------------------------- */}
      <section id="funciones" className="py-20 bg-[#fbf9f8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#fff0e8] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#900d0d]">
              Todo en un solo lugar
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-[#1b1c1c] sm:text-4xl">
              Información que te ayuda a <span className="text-[#cf1b1b]">decidir mejor</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#555555]">
              Funcionalidades construidas con base en las necesidades reales del transporte en Hidalgo.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Bento Card 1: Consulta de Rutas y Paradas (Coral Background) */}
            <div className="group rounded-3xl bg-[#fff0e8] p-8 border border-[#ffdbc5] transition-all hover:shadow-warm-md flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#cf1b1b] shadow-sm">
                  <Navigation className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#1b1c1c]">
                  Consulta de rutas y paradas
                </h3>
                <p className="mt-2 text-sm text-[#555555] leading-relaxed">
                  Encuentra opciones claras para llegar a tu destino con rutas georreferenciadas y trazados oficiales.
                </p>
              </div>

              {/* Micro-Illustration: Route line A -> B */}
              <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm border border-rose-200/60">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#cf1b1b]" />
                    Punto A (Origen)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    Punto B (Campus UTTT)
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-2/3 bg-gradient-to-r from-[#cf1b1b] to-amber-500 rounded-full" />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-neutral-500">
                  <span>14 paradas intermedias</span>
                  <span>35 min est.</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Mapa interactivo GeoJSON (Clean Warm White) */}
            <div className="group rounded-3xl bg-white p-8 border border-neutral-200 transition-all hover:shadow-warm-md flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#cf1b1b] shadow-sm">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#1b1c1c]">
                  Mapa interactivo GeoJSON
                </h3>
                <p className="mt-2 text-sm text-[#555555] leading-relaxed">
                  Visualiza los corredores viales, terminales y puntos de ascenso y descenso en alta precisión.
                </p>
              </div>

              {/* Micro-Illustration: Road grid with pulsing bus */}
              <div className="mt-6 h-28 rounded-2xl bg-neutral-100 relative overflow-hidden border border-neutral-200 flex items-center justify-center">
                <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 200 100">
                  <line x1="0" y1="50" x2="200" y2="50" stroke="#cf1b1b" strokeWidth="3" className="animated-dashed-line" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="#900d0d" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                <div className="relative flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-md border border-rose-200">
                  <Bus className="h-4 w-4 text-[#cf1b1b]" />
                  <span className="text-xs font-bold text-[#1b1c1c]">Corredor Tula-Tepeji</span>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Horarios y calculadora de tarifas (Dark Accent) */}
            <div className="group rounded-3xl bg-[#2a2a2a] p-8 text-white transition-all hover:shadow-warm-md flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#ffdbc5]">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  Horarios y tarifas por tramo
                </h3>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                  Compara costos y frecuencias antes de salir. Cero sorpresas en cobros de pasaje.
                </p>
              </div>

              {/* Time pills and fare tag */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
                  08:15 hrs
                </span>
                <span className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
                  09:00 hrs
                </span>
                <span className="rounded-xl bg-[#cf1b1b] px-3 py-1.5 text-xs font-bold text-white">
                  $12.00 MXN
                </span>
              </div>
            </div>

            {/* Bento Card 4: Recomendaciones con IA Explicada (Soft Peach) */}
            <div className="group rounded-3xl bg-gradient-to-br from-[#fff8f4] to-[#ffdbc5]/40 p-8 border border-[#ffdbc5] transition-all hover:shadow-warm-md lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#cf1b1b] text-white shadow-md shadow-red-500/20">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#1b1c1c]">
                  Recomendaciones explicadas con IA
                </h3>
                <p className="mt-2 text-sm text-[#555555] leading-relaxed max-w-xl">
                  Asistencia inteligente con <strong>Grounding estricto</strong> sobre datos oficiales. Cada recomendación se fundamenta en horarios, costos y calificaciones reales sin inventar información.
                </p>
              </div>

              {/* Rating Card Simulation */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm border border-rose-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1b1c1c]">Línea Mejor Calificada</div>
                    <div className="text-[11px] text-neutral-500">Ruta Coral 08 · 4.8 / 5.0</div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  Validado por la comunidad
                </span>
              </div>
            </div>

            {/* Bento Card 5: Machine Learning & Acelerómetro (Tech Focus) */}
            <div className="group rounded-3xl bg-white p-8 border border-neutral-200 transition-all hover:shadow-warm-md flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#cf1b1b]">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#1b1c1c]">
                  Detección ML con Acelerómetro
                </h3>
                <p className="mt-2 text-sm text-[#555555] leading-relaxed">
                  Identifica paradas informales con sensores móviles y consentimiento explícito, sujeto a validación humana.
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-neutral-50 p-3 text-xs text-neutral-600 border border-neutral-200">
                <div className="font-bold text-[#1b1c1c]">Inferencia Ética:</div>
                <div className="text-[11px] text-neutral-500 mt-1">
                  Cero captura de rostros o datos personales · Supervisión administrativa humana.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. ARCHITECTURE & 4-STAGE ROADMAP                                    */}
      {/* -------------------------------------------------------------------- */}
      <section id="arquitectura" className="py-20 bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#fff0e8] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#900d0d]">
              Arquitectura Tecnológica · UTTT
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-[#1b1c1c] sm:text-4xl">
              Diseño modular en <span className="text-[#cf1b1b]">cuatro etapas</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#555555]">
              Documentación técnica oficial del proyecto de software, diseñada con microservicios independientes, alta seguridad y despliegue en la nube de Microsoft Azure.
            </p>
          </div>

          {/* Interactive Stage Tabs */}
          <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
            {ARCHITECTURE_STAGES.map((stage) => {
              const isActive = activeArchStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveArchStage(stage.id)}
                  className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#cf1b1b] text-white shadow-md shadow-red-500/25'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-[#fff0e8] hover:text-[#cf1b1b]'
                  }`}
                >
                  {stage.badge}
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Card */}
          {(() => {
            const currentStage =
              ARCHITECTURE_STAGES.find((s) => s.id === activeArchStage) ||
              ARCHITECTURE_STAGES[0];
            return (
              <div className="mt-8 rounded-3xl bg-[#fbf9f8] p-8 border border-neutral-200 shadow-sm sm:p-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-bold text-[#900d0d]">
                      {currentStage.badge}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-extrabold text-[#1b1c1c] sm:text-3xl">
                      {currentStage.title}
                    </h3>
                    <p className="mt-3 text-base text-neutral-600 leading-relaxed">
                      {currentStage.summary}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {currentStage.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#1b1c1c]">
                          <CheckCircle2 className="h-5 w-5 text-[#cf1b1b] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-white p-6 shadow-md border border-neutral-200">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">
                        <Cpu className="h-4 w-4 text-[#cf1b1b]" />
                        <span>Garantía de Diseño de Sistema</span>
                      </div>
                      <div className="space-y-3 text-xs">
                        <div className="rounded-xl bg-neutral-50 p-3">
                          <span className="font-bold text-[#1b1c1c] block">Azure Container Instances</span>
                          <span className="text-neutral-500">
                            Despliegue contenerizado en región North Central US con FQDN público.
                          </span>
                        </div>
                        <div className="rounded-xl bg-neutral-50 p-3">
                          <span className="font-bold text-[#1b1c1c] block">Grounding Sin Alucinaciones</span>
                          <span className="text-neutral-500">
                            Respuestas conversacionales restringidas al modelo relacional verificado.
                          </span>
                        </div>
                        <div className="rounded-xl bg-neutral-50 p-3">
                          <span className="font-bold text-[#1b1c1c] block">Cumplimiento ASVS & Semgrep</span>
                          <span className="text-neutral-500">
                            Cero secretos quemados, análisis estático SAST y protección contra SSRF.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 6. INTERACTIVE "COBERTURA EN HIDALGO" MAP SECTION                    */}
      {/* -------------------------------------------------------------------- */}
      <section id="cobertura" className="py-20 bg-[#fff2eb] border-y border-[#ffdbc5]/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Interactive SVG Map Visual */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[36px] bg-white p-6 shadow-xl border border-[#ffdbc5]">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#cf1b1b]" />
                    <span className="text-xs font-bold text-[#1b1c1c]">Mapa Interactivo de Hidalgo</span>
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-500">
                    Haz clic en los nodos
                  </span>
                </div>

                {/* Stylized SVG Map */}
                <div className="mt-4 relative h-72 sm:h-80 w-full rounded-2xl bg-[#fffaf7] overflow-hidden border border-rose-100 flex items-center justify-center">
                  <svg
                    viewBox="0 0 360 300"
                    className="h-full w-full select-none"
                    aria-label="Mapa cartográfico de corredores de transporte en Hidalgo"
                  >
                    {/* Background terrain silhouettes */}
                    <path
                      d="M 50 150 Q 80 80, 160 90 T 280 80 Q 330 140, 310 220 T 170 280 Q 90 260, 50 150 Z"
                      fill="#ffe8dc"
                      opacity="0.45"
                    />

                    {/* Animated connecting transit routes */}
                    <line
                      x1="120"
                      y1="190"
                      x2="140"
                      y2="250"
                      stroke="#cf1b1b"
                      strokeWidth="3"
                      className="animated-dashed-line"
                    />
                    <line
                      x1="120"
                      y1="190"
                      x2="105"
                      y2="160"
                      stroke="#cf1b1b"
                      strokeWidth="2.5"
                      className="animated-dashed-line"
                    />
                    <line
                      x1="120"
                      y1="190"
                      x2="260"
                      y2="130"
                      stroke="#900d0d"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      opacity="0.8"
                    />

                    {/* Clickable zone nodes */}
                    {COVERAGE_ZONES.map((zone) => {
                      const isSelected = activeZone.id === zone.id;
                      return (
                        <g
                          key={zone.id}
                          className="cursor-pointer transition-transform hover:scale-110"
                          onClick={() => setActiveZone(zone)}
                        >
                          {/* Pulsing halo */}
                          {isSelected && (
                            <circle
                              cx={zone.coordinates.x}
                              cy={zone.coordinates.y}
                              r="16"
                              fill="#cf1b1b"
                              opacity="0.25"
                              className="animate-ping"
                            />
                          )}
                          <circle
                            cx={zone.coordinates.x}
                            cy={zone.coordinates.y}
                            r={isSelected ? 9 : 7}
                            fill={isSelected ? '#cf1b1b' : '#900d0d'}
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <text
                            x={zone.coordinates.x}
                            y={zone.coordinates.y - 12}
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill="#1b1c1c"
                            className="pointer-events-none"
                          >
                            {zone.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Zone Quick-Switcher Pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {COVERAGE_ZONES.map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setActiveZone(z)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        activeZone.id === z.id
                          ? 'bg-[#cf1b1b] text-white shadow-sm'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-[#fff0e8]'
                      }`}
                    >
                      {z.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Zone Details Card */}
            <div className="lg:col-span-6">
              <span className="inline-block rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#900d0d] shadow-sm">
                Nuestra Cobertura
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-[#1b1c1c] sm:text-4xl">
                Comenzamos en <span className="text-[#cf1b1b]">Hidalgo, México.</span>
              </h2>
              <p className="mt-3 text-base text-[#555555] leading-relaxed">
                Construimos una forma más clara de entender el transporte público, comenzando desde casa. Nuestra primera fase cubre los corredores vitales de la región Tula-Tepeji con expansión hacia Pachuca.
              </p>

              {/* Dynamic Zone Preview Panel */}
              <div className="mt-6 rounded-3xl bg-white p-6 shadow-md border border-[#ffdbc5]">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#fff0e8] px-2.5 py-1 text-xs font-bold text-[#cf1b1b]">
                    {activeZone.tag}
                  </span>
                  <span className="text-xs font-bold text-neutral-500">
                    {activeZone.routesCount} rutas activas
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-[#1b1c1c]">
                  {activeZone.title}
                </h3>
                <p className="mt-2 text-sm text-[#555555] leading-relaxed">
                  {activeZone.description}
                </p>

                <div className="mt-4 border-t border-neutral-100 pt-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                    Paradas clave registradas:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeZone.keyStops.map((stop, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-neutral-50 px-2.5 py-1 text-xs font-medium text-[#1b1c1c] border border-neutral-200"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 7. ACADEMIC & TEAM SHOWCASE (UTTT)                                   */}
      {/* -------------------------------------------------------------------- */}
      <section id="equipo" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fff0e8] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#900d0d]">
              <GraduationCap className="h-4 w-4" />
              <span>Universidad Tecnológica de Tula-Tepeji</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-[#1b1c1c] sm:text-4xl">
              Equipo de <span className="text-[#cf1b1b]">Desarrollo e Innovación</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#555555]">
              Estudiantes de 10mo Cuatrimestre de la carrera de <strong>Ingeniería en Desarrollo y Gestión de Software</strong>.
              <br />
              <span className="text-xs text-neutral-500">
                Asesor Académico: <strong>Ing. Angel Alvarado Estrada</strong>
              </span>
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.initials}
                className="group rounded-3xl bg-[#fbf9f8] p-6 border border-neutral-200 transition-all hover:-translate-y-1 hover:shadow-warm-md hover:border-[#cf1b1b]/40"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#cf1b1b] to-[#900d0d] text-lg font-extrabold text-white shadow-md shadow-red-500/20">
                  {member.initials}
                </div>
                <h3 className="mt-5 text-base font-bold text-[#1b1c1c] leading-snug">
                  {member.name}
                </h3>
                <div className="mt-1 inline-block rounded-full bg-[#fff0e8] px-2.5 py-0.5 text-xs font-bold text-[#900d0d]">
                  {member.role}
                </div>
                <p className="mt-3 text-xs text-[#555555] leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 8. "PRÓXIMAMENTE EN GOOGLE PLAY" CTA BANNER                          */}
      {/* -------------------------------------------------------------------- */}
      <section id="proximamente" className="py-16 bg-[#fbf9f8]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#cf1b1b] via-[#900d0d] to-[#750b0b] p-8 text-white shadow-2xl sm:p-14">
            {/* Background bus watermark */}
            <Bus className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 text-white/5" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-100">
                Tu próximo viaje empieza aquí
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-white">
                Muévete con más <span className="underline decoration-[#ffdbc5]">confianza.</span>
              </h2>
              <p className="mt-4 text-base text-rose-100 sm:text-lg leading-relaxed">
                BusTrack llegará próximamente a Google Play. Diseñado para simplificar tu movilidad diaria, ahorrarte tiempo y darte certeza en cada traslado.
              </p>

              {/* White Google Play Pill CTA */}
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <div className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-neutral-900 shadow-xl transition-transform hover:scale-105">
                  <Smartphone className="h-6 w-6 text-[#cf1b1b]" />
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      Próximamente en
                    </div>
                    <div className="text-base font-extrabold text-[#1b1c1c]">
                      Google Play
                    </div>
                  </div>
                </div>

                <span className="text-xs text-rose-200">
                  El enlace oficial se habilitará al publicarse la aplicación en la tienda.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 9. PRIVACY & TELEMETRY CONSENT BANNER                                */}
      {/* -------------------------------------------------------------------- */}
      {cookieConsent === null && (
        <aside
          role="region"
          aria-label="Consentimiento de privacidad y telemetría"
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-3xl rounded-2xl bg-white/95 p-4 shadow-2xl border border-neutral-200 backdrop-blur-md sm:bottom-6 sm:p-5"
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#cf1b1b] shrink-0 mt-0.5" />
              <p className="text-xs text-[#555555] leading-relaxed">
                En <strong>BusTrack UTTT</strong> respetamos tu privacidad. No realizamos rastreo GPS continuo ni recopilamos datos personales invasivos. Consulta nuestro{' '}
                <Link
                  to="/privacidad"
                  className="font-bold text-[#cf1b1b] underline hover:text-[#900d0d]"
                >
                  Aviso de Privacidad
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setCookieConsent(true)}
                className="flex-1 sm:flex-none rounded-xl bg-[#cf1b1b] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#900d0d]"
              >
                Aceptar
              </button>
              <button
                type="button"
                onClick={() => setCookieConsent(false)}
                className="flex-1 sm:flex-none rounded-xl border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Solo Necesarias
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
