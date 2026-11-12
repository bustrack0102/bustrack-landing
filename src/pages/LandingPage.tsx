import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { appConfig } from '../core/config/env';
import { initAnalyticsIfConsented, trackPlayStoreClick } from '../core/analytics/gtag';
import { fetchCatalogStatusWithCache, CatalogStatusSnapshot } from '../core/cache/publicStatusCache';
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
  ChevronLeft,
  DollarSign,
  Star,
  Activity,
  Award,
  Info,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Heart,
  QrCode,
  HardDriveDownload,
  Bell,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* TYPES & DATA                                                               */
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

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  tag: string;
  badgeColor: string;
  bio: string;
  contribution: string;
}

const HERO_ROUTE_MODES = [
  {
    id: 'uttt',
    title: 'Corredor UTTT Directo',
    tag: 'Ruta Universitaria',
    accentColor: '#cf1b1b',
    glowClass: 'glow-red',
    from: 'Central de Autobuses Tula',
    to: 'Campus UTTT',
    duration: '35 min',
    fare: '$12.00 MXN',
    studentFare: '$6.00 MXN',
    badge: 'Recomendada por IA',
  },
  {
    id: 'montana',
    title: 'Corredor de la Montaña',
    tag: 'Ruta Turística',
    accentColor: '#10b981',
    glowClass: 'glow-emerald',
    from: 'Pachuca Centro (Reloj)',
    to: 'Real del Monte',
    duration: '28 min',
    fare: '$18.00 MXN',
    studentFare: '$12.00 MXN',
    badge: 'Vía Panorámica',
  },
  {
    id: 'tepeji',
    title: 'Corredor Industrial Tepeji',
    tag: 'Conexión Metropolitana',
    accentColor: '#f59e0b',
    glowClass: 'glow-amber',
    from: 'Tepeji del Río Centro',
    to: 'Tula de Allende',
    duration: '40 min',
    fare: '$14.00 MXN',
    studentFare: '$8.00 MXN',
    badge: 'Alta Frecuencia',
  },
];

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
      'Proyección de cobertura que integra el Corredor de la Montaña, uniendo la capital hidalguense con los centros mineros históricos y el transporte metropolitano.',
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

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Fátima Ximena García González',
    role: 'Product Owner',
    initials: 'FX',
    tag: 'Visión & Liderazgo',
    badgeColor: '#cf1b1b',
    bio: 'Coordina la visión del producto, los requerimientos con transportistas regionales y la priorización de funcionalidades para estudiantes y usuarios de Hidalgo.',
    contribution: 'Definición del backlog del producto, investigación de campo en Tula y validación de usuarios.',
  },
  {
    name: 'Diego Parra Cruz',
    role: 'Scrum Master',
    initials: 'DP',
    tag: 'Gestión Ágil & Sprints',
    badgeColor: '#10b981',
    bio: 'Facilitador del marco de trabajo ágil, gestión de ceremonias Scrum, eliminación de bloqueos técnicos e integración continua de los módulos.',
    contribution: 'Seguimiento de entregables de integradora, orquestación de CI/CD y despliegue en nube.',
  },
  {
    name: 'José de Jesús López Islas',
    role: 'Pruebas y Calidad (QA)',
    initials: 'JL',
    tag: 'Aseguramiento de Calidad',
    badgeColor: '#3b82f6',
    bio: 'Responsable de la estrategia de pruebas automatizadas, pruebas de integración de API, análisis SAST de seguridad y validación de regresión.',
    contribution: 'Automatización con Vitest y xUnit, matrices de pruebas de carga y verificación Semgrep.',
  },
  {
    name: 'Melanie Joliee Bonilla Domínguez',
    role: 'Documentación y Gestión',
    initials: 'MB',
    tag: 'Arquitectura & Memorias',
    badgeColor: '#8b5cf6',
    bio: 'Elaboración de manuales de arquitectura, modelado entidad-relación, memorias técnicas del proyecto de software y especificaciones formales.',
    contribution: 'Documentación ASVS, diagramas de flujo de microservicios y especificaciones de diseño.',
  },
  {
    name: 'Ing. Angel Alvarado Estrada',
    role: 'Asesor Académico e Investigador',
    initials: 'AA',
    tag: 'Docente Titular UTTT',
    badgeColor: '#f59e0b',
    bio: 'Profesor asesor de la materia Integradora en la carrera de Ingeniería en Desarrollo y Gestión de Software, guiando la rigurosidad metodológica.',
    contribution: 'Revisión arquitectónica, lineamientos de calidad académica y supervisión del proyecto.',
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export const LandingPage: React.FC = () => {
  // Hero Interactive Route Switcher (Axis-style color & state morphing)
  const [heroMode, setHeroMode] = useState(HERO_ROUTE_MODES[0]);

  // Demo Route Simulator State
  const [originText, setOriginText] = useState('Tula Centro');
  const [destinationText, setDestinationText] = useState('Campus UTTT');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<RouteOption[]>([DEMO_ROUTES[0], DEMO_ROUTES[1]]);
  const [selectedRouteModal, setSelectedRouteModal] = useState<RouteOption | null>(null);

  // Live Bus Ride Simulator inside Demo section
  const [isSimulatingTrip, setIsSimulatingTrip] = useState(false);
  const [simStep, setSimStep] = useState(0);

  // Team 3D Coverflow Carousel State (ATLAS Studio style)
  const [teamIndex, setTeamIndex] = useState(0);

  // Coverage Map State
  const [activeZone, setActiveZone] = useState<CoverageZone>(COVERAGE_ZONES[0]);

  // Architecture Tabs State
  const [activeArchStage, setActiveArchStage] = useState(ARCHITECTURE_STAGES[0].id);

  // Privacy Telemetry State + Public Catalog SWR Cache
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [catalogStatus, setCatalogStatus] = useState<CatalogStatusSnapshot | null>(null);

  useEffect(() => {
    let active = true;
    fetchCatalogStatusWithCache().then((snap) => {
      if (active && snap) {
        setCatalogStatus(snap);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (cookieConsent === true) {
      initAnalyticsIfConsented(appConfig.gaMeasurementId, true);
    }
  }, [cookieConsent]);

  /* ------------------------------------------------------------------------ */
  /* INTEGRATED ANIMATION STATES & HOOKE'S SPRING PHYSICS REFS                */
  /* ------------------------------------------------------------------------ */

  // 1. Hero 3D Tilt with Hooke's Law Spring Physics & Radial Spotlight
  const heroPhoneRef = useRef<HTMLDivElement>(null);
  const heroSpotlightRef = useRef<HTMLDivElement>(null);
  const [, setHeroTiltCoords] = useState({ x: 0, y: 0 });
  const isHoverHeroTiltRef = useRef(false);
  const heroTiltPhysicsRef = useRef({
    targetRX: 0,
    targetRY: 0,
    currRX: 0,
    currRY: 0,
    velRX: 0,
    velRY: 0,
    targetScale: 1,
    currScale: 1,
    velScale: 0,
    spotX: 160,
    spotY: 280,
  });

  // 2. Hero Dynamic Island State (Inside Phone)
  const [heroIslandState, setHeroIslandState] = useState<0 | 1 | 2>(0);
  const [isHeroEqPaused, setIsHeroEqPaused] = useState(false);
  const [heroIslandFeedback, setHeroIslandFeedback] = useState('Toca un botón');

  // 3. Demo Elastic Squish Fare Switch
  const [isStudentFareMode, setIsStudentFareMode] = useState(false);

  // 4. Demo Micro-SVG Offline Sync State
  const [catalogSyncState, setCatalogSyncState] = useState<'idle' | 'spinning' | 'done'>('idle');

  // 5. Demo Tactile Route Recommendation (+1 Burst & Pop)
  const [routeLikes, setRouteLikes] = useState<{ [id: string]: number }>({
    'tula-uttt-01': 148,
    'coral-08': 92,
    'pachuca-real-03': 124,
  });
  const [likeBurstRings, setLikeBurstRings] = useState<{ [id: string]: number[] }>({});

  // 6. Magnetic Simulation Button Physics
  const simMagWrapRef = useRef<HTMLDivElement>(null);
  const simMagBtnRef = useRef<HTMLButtonElement>(null);
  const simMagPhysicsRef = useRef({
    magTX: 0,
    magTY: 0,
    magCX: 0,
    magCY: 0,
    magVX: 0,
    magVY: 0,
  });

  // 7. Cobertura Shockwave Ripples
  const [mapWaves, setMapWaves] = useState<{ id: number; x: number; y: number }[]>([]);

  /* ------------------------------------------------------------------------ */
  /* ANIMATION EVENT HANDLERS                                                 */
  /* ------------------------------------------------------------------------ */

  const handleHeroPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    isHoverHeroTiltRef.current = true;
    if (!heroPhoneRef.current || !heroSpotlightRef.current) return;
    const rect = heroPhoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroTiltPhysicsRef.current.spotX = x;
    heroTiltPhysicsRef.current.spotY = y;

    const normX = Math.max(-1.2, Math.min(1.2, (x / rect.width - 0.5) * 2));
    const normY = Math.max(-1.2, Math.min(1.2, (y / rect.height - 0.5) * 2));
    heroTiltPhysicsRef.current.targetRY = normX * 16;
    heroTiltPhysicsRef.current.targetRX = -normY * 14;

    heroSpotlightRef.current.style.opacity = '1';
    heroSpotlightRef.current.style.background = `radial-gradient(240px circle at ${x}px ${y}px, ${heroMode.accentColor}44, transparent 75%)`;
  };

  const handleHeroPointerLeave = () => {
    isHoverHeroTiltRef.current = false;
    heroTiltPhysicsRef.current.targetRX = 0;
    heroTiltPhysicsRef.current.targetRY = 0;
    heroTiltPhysicsRef.current.targetScale = 1;
    if (heroSpotlightRef.current) {
      heroSpotlightRef.current.style.opacity = '0';
    }
  };

  const handleHeroPointerDown = () => {
    heroTiltPhysicsRef.current.velScale -= 0.05;
  };

  const handleSimMagPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!simMagWrapRef.current) return;
    const bRect = simMagWrapRef.current.getBoundingClientRect();
    const bx = e.clientX - (bRect.left + bRect.width / 2);
    const by = e.clientY - (bRect.top + bRect.height / 2);
    const dist = Math.hypot(bx, by);
    if (dist < 100) {
      simMagPhysicsRef.current.magTX = bx * 0.35;
      simMagPhysicsRef.current.magTY = by * 0.35;
    } else {
      simMagPhysicsRef.current.magTX = 0;
      simMagPhysicsRef.current.magTY = 0;
    }
  };

  const handleSimMagPointerLeave = () => {
    simMagPhysicsRef.current.magTX = 0;
    simMagPhysicsRef.current.magTY = 0;
  };

  const handleRouteLike = (routeId: string) => {
    setRouteLikes((prev) => ({
      ...prev,
      [routeId]: (prev[routeId] || 0) + 1,
    }));

    const ringId = Date.now();
    setLikeBurstRings((prev) => ({
      ...prev,
      [routeId]: [...(prev[routeId] || []), ringId],
    }));

    setTimeout(() => {
      setLikeBurstRings((prev) => ({
        ...prev,
        [routeId]: (prev[routeId] || []).filter((id) => id !== ringId),
      }));
    }, 700);
  };

  const handleCatalogSync = () => {
    if (catalogSyncState !== 'idle') return;
    setCatalogSyncState('spinning');
    setTimeout(() => {
      setCatalogSyncState('done');
      setTimeout(() => {
        setCatalogSyncState('idle');
      }, 2000);
    }, 850);
  };

  const handleMapClick = (x: number, y: number) => {
    const waveId = Date.now() + Math.random();
    setMapWaves((prev) => [...prev, { id: waveId, x, y }]);
    setTimeout(() => {
      setMapWaves((prev) => prev.filter((w) => w.id !== waveId));
    }, 900);
  };

  // Unified 60 FPS Physics Loop for Hero Tilt & Magnetic Sim Button
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      // 1. Hero 3D Tilt Spring Physics
      if (heroPhoneRef.current) {
        const p = heroTiltPhysicsRef.current;
        if (!isHoverHeroTiltRef.current) {
          p.targetRY = Math.sin(now * 0.0016) * 5;
          p.targetRX = Math.cos(now * 0.0012) * 3;
        }
        const stiffness = 0.12;
        const damping = 0.76;

        p.velRX = (p.velRX + (p.targetRX - p.currRX) * stiffness) * damping;
        p.velRY = (p.velRY + (p.targetRY - p.currRY) * stiffness) * damping;
        p.currRX += p.velRX;
        p.currRY += p.velRY;

        p.velScale = (p.velScale + (p.targetScale - p.currScale) * 0.18) * 0.72;
        p.currScale += p.velScale;

        heroPhoneRef.current.style.transform = `rotateX(${p.currRX.toFixed(2)}deg) rotateY(${p.currRY.toFixed(2)}deg) scale(${p.currScale.toFixed(3)})`;
        setHeroTiltCoords({ x: Math.round(p.currRX), y: Math.round(p.currRY) });
      }

      // 2. Magnetic Simulation Button Physics
      if (simMagBtnRef.current) {
        const mag = simMagPhysicsRef.current;
        mag.magVX = (mag.magVX + (mag.magTX - mag.magCX) * 0.16) * 0.75;
        mag.magVY = (mag.magVY + (mag.magTY - mag.magCY) * 0.16) * 0.75;
        mag.magCX += mag.magVX;
        mag.magCY += mag.magVY;

        simMagBtnRef.current.style.transform = `translate(${mag.magCX.toFixed(2)}px, ${mag.magCY.toFixed(2)}px)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Handle Simulated Search
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

  // Bus Ride Simulator Animation Loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isSimulatingTrip) {
      interval = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= 6) {
            setIsSimulatingTrip(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulatingTrip]);

  return (
    <div id="contenido-principal" className="min-h-screen bg-[#0c0e12] text-neutral-100 selection:bg-[#cf1b1b] selection:text-white">
      {/* -------------------------------------------------------------------- */}
      {/* 1. HERO SECTION — VIBRANT 3D TRANSIT SHOWCASE                       */}
      {/* -------------------------------------------------------------------- */}
      <section id="inicio" className="relative min-h-[90vh] overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Dynamic Multi-layered Ambient Glows that adapt to heroMode */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-35 blur-[120px] transition-all duration-700"
          style={{
            background: `radial-gradient(circle, ${heroMode.accentColor} 0%, rgba(207,27,27,0.15) 50%, transparent 80%)`,
          }}
          aria-hidden="true"
        />

        {/* Ambient Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Eyebrow with pulsating radar badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-700 bg-neutral-900/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-300 shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#cf1b1b] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#cf1b1b]" />
                </span>
                <span>Movilidad Inteligente en Hidalgo · UTTT</span>
              </div>

              {/* Main Headline with Shimmer Gradient */}
              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]">
                Tu ruta,{' '}
                <span className="text-gradient-shimmer">
                  más clara.
                </span>
                <br />
                <span className="text-white">Tu viaje, más fácil.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base text-neutral-400 sm:text-lg leading-relaxed max-w-2xl">
                Compara rutas, horarios programados, paradas autorizadas y tarifas transparentes desglosadas por tramo en Hidalgo. Toda la certeza operativa en tu mano,{' '}
                <strong className="text-white font-semibold">sin rastreo GPS invasivo</strong>.
              </p>

              {/* Interactive Route Flavor Switcher (Inspired by the Axis/HALO video!) */}
              <div className="mt-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#cf1b1b]" />
                  <span>Explora una ruta en tiempo real:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {HERO_ROUTE_MODES.map((mode) => {
                    const isSelected = heroMode.id === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setHeroMode(mode)}
                        className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                          isSelected
                            ? 'bg-white text-neutral-900 shadow-lg scale-105'
                            : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white'
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: mode.accentColor }}
                        />
                        <span>{mode.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#proximamente"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-red-600/30 transition-all hover:scale-105 hover:shadow-red-600/50 active:scale-95"
                >
                  <Smartphone className="h-5 w-5" aria-hidden="true" />
                  <span>Próximamente en Google Play</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#demo"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-neutral-700 bg-neutral-900/80 px-6 py-4 text-sm font-bold text-neutral-200 backdrop-blur-md transition-all hover:border-[#cf1b1b] hover:bg-neutral-800 hover:text-white"
                >
                  <Play className="h-4 w-4 text-[#cf1b1b] fill-[#cf1b1b]" />
                  <span>Probar demo interactiva</span>
                </a>
              </div>

              {/* Social Proof Pill */}
              <div className="mt-10 flex items-center gap-4 border-t border-neutral-800/80 pt-6">
                <div className="flex -space-x-2.5">
                  {TEAM_MEMBERS.slice(0, 4).map((m) => (
                    <div
                      key={m.initials}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0c0e12] bg-gradient-to-br from-[#cf1b1b] to-[#900d0d] text-xs font-bold text-white shadow-md"
                      title={`${m.name} (${m.role})`}
                    >
                      {m.initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1 font-bold text-white">4.9 / 5.0</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Desarrollado en la Universidad Tecnológica de Tula-Tepeji
                  </p>
                </div>
              </div>
            </div>

            {/* Right: 3D Animated Interactive Phone Device with Hooke's Law Tilt & Dynamic Island */}
            <div
              onPointerMove={handleHeroPointerMove}
              onPointerLeave={handleHeroPointerLeave}
              onPointerDown={handleHeroPointerDown}
              className="perspective-stage relative flex justify-center lg:col-span-5 cursor-pointer select-none"
            >
              {/* Concentric Rotating Orbital Rings */}
              <div
                className="pointer-events-none absolute -inset-10 rounded-full border border-dashed border-[#cf1b1b]/30 animate-orbit"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -inset-4 rounded-full border border-neutral-700/50 animate-orbit-reverse"
                aria-hidden="true"
              />

              {/* Dynamic Aura Backlight */}
              <div
                className="absolute inset-0 -z-10 rounded-full opacity-60 blur-3xl transition-colors duration-700"
                style={{ backgroundColor: heroMode.accentColor }}
                aria-hidden="true"
              />

              {/* Floating Dynamic Badges */}
              <div className="absolute -left-6 top-8 z-30 hidden sm:flex items-center gap-3 rounded-2xl glass-panel-dark p-3.5 shadow-2xl animate-float-gentle border border-white/10">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md"
                  style={{ backgroundColor: heroMode.accentColor }}
                >
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Próxima salida
                  </div>
                  <div className="text-xs font-extrabold text-white">
                    08:15 hrs · {heroMode.duration}
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-16 z-30 hidden sm:flex items-center gap-3 rounded-2xl glass-panel-dark p-3.5 shadow-2xl animate-float-delayed border border-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#cf1b1b] to-amber-500 text-white shadow-md">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                    {heroMode.badge}
                  </div>
                  <div className="text-xs font-extrabold text-white">
                    Tarifa {heroMode.fare}
                  </div>
                </div>
              </div>

              {/* 3D Phone Chassis with Hooke's Law Spring Inertia */}
              <div
                ref={heroPhoneRef}
                className="preserve-3d relative z-20 w-[300px] sm:w-[325px] rounded-[52px] bg-[#16181f] p-3.5 shadow-2xl ring-1 ring-white/15"
              >
                {/* Dynamic Radial Spotlight following cursor */}
                <div
                  ref={heroSpotlightRef}
                  className="pointer-events-none absolute inset-0 rounded-[52px] opacity-0 transition-opacity duration-300"
                />

                {/* BusTrack Dynamic Island (Morphing Pill with spring cubic-bezier) */}
                <div className="relative mx-auto mb-2 flex justify-center z-layer-3">
                  <div
                    onClick={() => setHeroIslandState(((heroIslandState + 1) % 3) as 0 | 1 | 2)}
                    className="island-morph cursor-pointer overflow-hidden border border-neutral-700/80 bg-[#0a0c10] shadow-xl text-white"
                    style={{
                      width: heroIslandState === 0 ? '190px' : heroIslandState === 1 ? '260px' : '260px',
                      height: heroIslandState === 0 ? '34px' : heroIslandState === 1 ? '76px' : '84px',
                      borderRadius: heroIslandState === 0 ? '17px' : '18px',
                    }}
                    title="Toca para alternar la Isla Dinámica de Tránsito"
                  >
                    {/* State 0: Compact Pill */}
                    {heroIslandState === 0 && (
                      <div className="flex h-full w-full items-center justify-between px-3">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                          </span>
                          <span className="text-[11px] font-bold text-white whitespace-nowrap">UTTT en camino</span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400">v2.4 PWA</span>
                      </div>
                    )}

                    {/* State 1: Live Transit Activity Equalizer */}
                    {heroIslandState === 1 && (
                      <div className="flex h-full w-full flex-col justify-between p-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10">
                              <div className={`flex h-3 items-end gap-0.5 ${isHeroEqPaused ? 'eq-paused' : ''}`}>
                                <span className="eq-bar h-3 w-0.5 rounded-full bg-[#cf1b1b]" style={{ animationDelay: '0ms' }} />
                                <span className="eq-bar h-3 w-0.5 rounded-full bg-[#cf1b1b]" style={{ animationDelay: '180ms' }} />
                                <span className="eq-bar h-3 w-0.5 rounded-full bg-[#cf1b1b]" style={{ animationDelay: '320ms' }} />
                              </div>
                            </div>
                            <div className="leading-tight text-left">
                              <div className="text-[11px] font-bold text-white">Línea AVM · 4.2 km</div>
                              <div className="text-[10px] text-neutral-400">12 min restantes</div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsHeroEqPaused(!isHeroEqPaused);
                            }}
                            className="inline-flex items-center gap-1 rounded-md bg-neutral-800 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-neutral-700"
                          >
                            {isHeroEqPaused ? (
                              <>
                                <Play className="h-2.5 w-2.5 text-emerald-400 fill-emerald-400" />
                                <span>Reanudar</span>
                              </>
                            ) : (
                              <>
                                <Pause className="h-2.5 w-2.5 text-neutral-300" />
                                <span>Pausar</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-800">
                          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#cf1b1b] to-emerald-400" />
                        </div>
                      </div>
                    )}

                    {/* State 2: Quick Action Bento */}
                    {heroIslandState === 2 && (
                      <div className="flex h-full w-full flex-col justify-between p-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-neutral-300">Acceso Rápido PWA</span>
                          <span className="font-mono text-rose-400 font-semibold">{heroIslandFeedback}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHeroIslandFeedback('QR listo');
                            }}
                            className="flex items-center justify-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800/80 py-1 text-[10px] font-medium text-white hover:border-[#cf1b1b]"
                          >
                            <QrCode className="h-3 w-3 text-[#cf1b1b]" />
                            <span>QR</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHeroIslandFeedback('Offline OK');
                            }}
                            className="flex items-center justify-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800/80 py-1 text-[10px] font-medium text-white hover:border-emerald-500"
                          >
                            <HardDriveDownload className="h-3 w-3 text-emerald-400" />
                            <span>Offline</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHeroIslandFeedback('Alerta activa');
                            }}
                            className="flex items-center justify-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800/80 py-1 text-[10px] font-medium text-white hover:border-amber-500"
                          >
                            <Bell className="h-3 w-3 text-amber-400" />
                            <span>Alerta</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inner Screen */}
                <div className="overflow-hidden rounded-[40px] bg-[#0f1117] p-4 text-white border border-neutral-800 z-layer-2">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-bold text-neutral-300">BusTrack Móvil</span>
                    </div>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                      style={{ backgroundColor: heroMode.accentColor }}
                    >
                      {heroMode.tag}
                    </span>
                  </div>

                  {/* Route Destination Card */}
                  <div className="mt-3 rounded-2xl bg-neutral-900/90 p-3.5 border border-neutral-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Ruta Seleccionada
                    </div>
                    <div className="mt-1 font-bold text-sm text-white">{heroMode.title}</div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-neutral-400">{heroMode.from}</span>
                      <ArrowRight className="h-3 w-3 text-neutral-500" />
                      <span className="font-semibold text-rose-300">{heroMode.to}</span>
                    </div>
                  </div>

                  {/* Live Simulation Timeline inside Phone */}
                  <div className="mt-3 rounded-2xl bg-gradient-to-b from-neutral-900/80 to-black/60 p-3.5 border border-neutral-800">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                      <span className="font-bold">Trayecto en vivo</span>
                      <span className="text-emerald-400 font-semibold">Tiempo real</span>
                    </div>

                    <div className="relative pl-5 space-y-3 text-xs border-l-2 border-dashed border-rose-500/40">
                      <div className="relative">
                        <span className="absolute -left-[25px] top-1 h-3 w-3 rounded-full bg-[#cf1b1b]" />
                        <span className="text-neutral-300 font-medium">Terminal Origen</span>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[27px] top-0.5 flex h-4 w-4">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                          <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-500 border-2 border-[#0f1117]" />
                        </span>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <Bus className="h-3.5 w-3.5 text-amber-400" />
                          <span>Unidad en camino</span>
                        </div>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[25px] top-1 h-3 w-3 rounded-full bg-neutral-700" />
                        <span className="text-neutral-400">Campus UTTT</span>
                      </div>
                    </div>

                    {/* Fare Tag */}
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-neutral-950 p-2 text-xs">
                      <span className="text-neutral-400">Tarifa estudiante:</span>
                      <span className="font-extrabold text-emerald-400">{heroMode.studentFare}</span>
                    </div>
                  </div>

                  {/* Grounded AI Badge */}
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-950/40 p-2.5 text-[11px] text-rose-200 border border-rose-900/40">
                    <Sparkles className="h-4 w-4 shrink-0 text-[#cf1b1b]" />
                    <span>Grounding estricto: datos oficiales de transportistas de Hidalgo.</span>
                  </div>
                </div>

                {/* Bottom Home Pill */}
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-neutral-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-16 border-y border-neutral-800/80 bg-neutral-950/70 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-6 px-4 text-xs font-bold uppercase tracking-wider text-neutral-400 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="h-4 w-4 text-[#cf1b1b]" />
              Rutas y Paradas Claras
            </span>
            <span className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="h-4 w-4 text-[#cf1b1b]" />
              Horarios Confiables
            </span>
            <span className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="h-4 w-4 text-[#cf1b1b]" />
              Tarifas por Tramo
            </span>
            <span className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="h-4 w-4 text-[#cf1b1b]" />
              Recomendaciones con IA
            </span>
            <span className="flex items-center gap-2 text-neutral-300">
              <ShieldCheck className="h-4 w-4 text-[#cf1b1b]" />
              Sin Rastreo GPS Invasivo
            </span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. "CÓMO FUNCIONA" SECTION (3 STEPS)                                  */}
      {/* -------------------------------------------------------------------- */}
      <section id="como-funciona" className="py-24 bg-[#0e1117] border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-rose-950/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-300 border border-rose-900/50">
              Así de sencillo
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-white">
              Tu mejor ruta en <span className="text-[#cf1b1b]">tres pasos</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400">
              Diseñado para que cualquier estudiante, trabajador o turista consulte de forma inmediata el transporte disponible en la región.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="group relative rounded-3xl glass-panel-dark p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#cf1b1b]/50 hover:shadow-warm-lg">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-extrabold text-[#cf1b1b]">01</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/50 text-[#cf1b1b] border border-rose-900/40">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">
                Elige tu destino
              </h3>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Indica tu punto de origen y hacia dónde te diriges. Puedes usar nuestros accesos rápidos a la UTTT, terminales o zonas turísticas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-3xl glass-panel-dark p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#cf1b1b]/50 hover:shadow-warm-lg">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-extrabold text-[#cf1b1b]">02</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/50 text-[#cf1b1b] border border-rose-900/40">
                  <Compass className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">
                Consulta opciones
              </h3>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Compara líneas de autobuses y colectivos, tarifas por tramo, horarios programados, tiempo estimado de viaje y número de paradas.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative rounded-3xl glass-panel-dark p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#cf1b1b]/50 hover:shadow-warm-lg">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-extrabold text-[#cf1b1b]">03</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/50 text-[#cf1b1b] border border-rose-900/40">
                  <Navigation className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">
                Viaja mejor
              </h3>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Toma la unidad que mejor se adapte a tus tiempos y presupuesto. Disfruta de un traslado predecible y con total certeza de tarifas.
              </p>
            </div>
          </div>

          {/* Data Hierarchy Chain from Official UTTT Document */}
          <div className="mt-14 rounded-3xl bg-neutral-900/80 p-6 border border-neutral-800">
            <div className="text-center text-xs font-bold uppercase tracking-wider text-rose-300">
              Estructura Oficial de Datos BusTrack (Documentación UTTT)
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-white">
              <span className="rounded-xl bg-neutral-800 px-3.5 py-2 border border-neutral-700 shadow-sm">
                1. Empresa
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-xl bg-neutral-800 px-3.5 py-2 border border-neutral-700 shadow-sm">
                2. Transporte
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-xl bg-neutral-800 px-3.5 py-2 border border-neutral-700 shadow-sm">
                3. Ruta
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-xl bg-neutral-800 px-3.5 py-2 border border-neutral-700 shadow-sm">
                4. Paradas
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-xl bg-neutral-800 px-3.5 py-2 border border-neutral-700 shadow-sm">
                5. Horarios
              </span>
              <ChevronRight className="h-4 w-4 text-[#cf1b1b]" />
              <span className="rounded-xl bg-[#cf1b1b] text-white px-3.5 py-2 shadow-md shadow-red-600/30">
                6. Tarifas por Tramo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. TRAYECTO VIVO — ANIMATED JOURNEY THAT COMES TO LIFE ON SCROLL     */}
      {/* -------------------------------------------------------------------- */}
      <section id="trayecto-vivo" className="py-24 bg-[#0a0c10] relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-rose-950/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-300 border border-rose-900/50">
              Trayecto Vivo · Experiencia en Ruta
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-white">
              Una experiencia que <span className="text-[#cf1b1b]">cobra vida en cada kilómetro</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400">
              Observa cómo BusTrack acompaña cada momento de tu traslado universitario y regional.
            </p>
          </div>

          {/* Interactive Stepper Track */}
          <div className="mt-16 relative">
            {/* Center Connecting Glowing Line */}
            <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-1 -translate-x-1/2 bg-gradient-to-b from-[#cf1b1b] via-amber-500 to-emerald-500 rounded-full" />

            <div className="space-y-16">
              {/* Node 1: Left */}
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div className="lg:pr-12 lg:text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#cf1b1b]">
                    Kilómetro 00 · Planificación
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-white">
                    Consulta inteligente desde casa o terminal
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                    Escribe tu destino o selecciona el acceso directo a la UTTT. La plataforma localiza los puntos de ascenso autorizados y las unidades próximas a salir.
                  </p>
                </div>
                <div className="lg:pl-12">
                  <div className="rounded-3xl glass-panel-dark p-6 border border-neutral-800 shadow-xl">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span className="font-bold text-white">Parada: Central de Tula</span>
                      <span className="rounded bg-rose-950/80 px-2 py-0.5 text-rose-300">Salida 08:15</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#cf1b1b] text-white">
                        <Bus className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">AVM Directo UTTT</div>
                        <div className="text-xs text-neutral-400">14 paradas intermedias</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Node 2: Right */}
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div className="order-2 lg:order-1 lg:pr-12">
                  <div className="rounded-3xl glass-panel-dark p-6 border border-neutral-800 shadow-xl">
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                      <span className="font-bold text-white">Tarifario Transparente</span>
                      <span className="text-emerald-400 font-bold">Descuento UTTT Activo</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="rounded-2xl bg-neutral-900/90 p-3 border border-neutral-800">
                        <div className="text-[10px] uppercase text-neutral-400">Público General</div>
                        <div className="text-lg font-extrabold text-white">$12.00 MXN</div>
                      </div>
                      <div className="rounded-2xl bg-emerald-950/30 p-3 border border-emerald-500/30">
                        <div className="text-[10px] uppercase text-emerald-400 font-bold">Estudiantes UTTT</div>
                        <div className="text-lg font-extrabold text-emerald-400">$6.00 MXN</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 lg:pl-12">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Kilómetro 08 · Certeza Económica
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-white">
                    Tarifas fijas y transparentes por tramo
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                    Se terminaron los cobros indebidos. Cada tramo vial tiene estipulada su tarifa oficial con el beneficio estudiantil validado con credencial vigente.
                  </p>
                </div>
              </div>

              {/* Node 3: Left */}
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div className="lg:pr-12 lg:text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Kilómetro 15 · Asistencia Inteligente
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-white">
                    Recomendaciones fundamentadas en datos reales
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                    Si hay tráfico o una corrida cancelada, el asistente con Grounding estricto te sugiere alternativas viables sin inventar rutas fantasma.
                  </p>
                </div>
                <div className="lg:pl-12">
                  <div className="rounded-3xl glass-panel-dark p-6 border border-neutral-800 shadow-xl">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-300">Asistente de Movilidad UTTT</div>
                        <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                          "La corrida de las 08:25 tiene alta afluencia en San Marcos. Te sugerimos abordar la unidad de las 08:15 para llegar con 15 minutos de anticipación a clase."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Node 4: Right */}
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div className="order-2 lg:order-1 lg:pr-12">
                  <div className="rounded-3xl bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-neutral-900 p-6 border border-emerald-500/30 shadow-xl">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Destino Alcanzado con Éxito</span>
                    </div>
                    <div className="mt-3 text-base font-extrabold text-white">
                      Campus UTTT · Puerta Principal
                    </div>
                    <div className="mt-1 text-xs text-neutral-400">
                      Tiempo total de trayecto: 35 minutos · Puntual y seguro
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 lg:pl-12">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Kilómetro 22 · Llegada a Campus
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-white">
                    Puntualidad en tus clases universitarias
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                    Llegas a tiempo a tus materias en la UTTT habiendo invertido el tiempo y presupuesto exacto. La tecnología al servicio de tu educación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. INTERACTIVE ROUTE SIMULATOR & BUS LAB (#demo)                     */}
      {/* -------------------------------------------------------------------- */}
      <section id="demo" className="py-24 bg-[#11141c] text-white relative overflow-hidden border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full bg-rose-950/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-300 border border-rose-900/40">
                Pruébalo tú mismo
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-white">
                Encuentra una ruta{' '}
                <span className="text-[#cf1b1b]">en segundos.</span>
              </h2>
              <p className="mt-4 text-base text-neutral-300 leading-relaxed">
                Simula una búsqueda como si estuvieras en la aplicación móvil de BusTrack. Consulta horarios estimados, paradas del trayecto y las tarifas desglosadas.
              </p>

              {/* Disclaimer Badge */}
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl bg-neutral-900/90 p-4 text-xs text-neutral-300 border border-neutral-800">
                <Info className="h-5 w-5 text-amber-400 shrink-0" />
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
                    className="rounded-full bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-200 hover:bg-[#cf1b1b] hover:text-white transition"
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
                    className="rounded-full bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-200 hover:bg-[#cf1b1b] hover:text-white transition"
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
                    className="rounded-full bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-200 hover:bg-[#cf1b1b] hover:text-white transition"
                  >
                    Tepeji ↔ Tula Centro
                  </button>
                </div>
              </div>

              {/* Live Animated Bus Simulator Controller */}
              <div className="mt-8 rounded-3xl glass-panel-glow p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-300">
                    Simulador de Recorrido en Vivo
                  </div>
                  <span className="rounded-full bg-rose-950 px-2.5 py-0.5 text-[10px] font-bold text-rose-300">
                    Interactivo
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-300">
                  Haz clic para ver el bus avanzar estación por estación con actualización en tiempo real:
                </p>
                {/* Magnetic Interactive Bus Simulation Button */}
                <div
                  ref={simMagWrapRef}
                  onPointerMove={handleSimMagPointerMove}
                  onPointerLeave={handleSimMagPointerLeave}
                  className="mt-4 flex items-center gap-3"
                >
                  <button
                    ref={simMagBtnRef}
                    type="button"
                    onClick={() => setIsSimulatingTrip(true)}
                    disabled={isSimulatingTrip}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] py-2.5 text-xs font-bold text-white shadow-md transition-shadow hover:shadow-red-600/50 disabled:opacity-50 active:scale-95 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>{isSimulatingTrip ? 'Simulando viaje...' : 'Iniciar Simulación'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSimulatingTrip(false);
                      setSimStep(0);
                    }}
                    className="rounded-xl border border-neutral-700 bg-neutral-800 p-2.5 text-neutral-300 hover:text-white"
                    title="Reiniciar"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>

                {/* Progress bar of current simulated trip */}
                <div className="mt-4">
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span>Avance: {Math.round((simStep / 6) * 100)}%</span>
                    <span>
                      {simStep === 0 && 'En terminal'}
                      {simStep > 0 && simStep < 6 && `Parada ${simStep} de 6`}
                      {simStep === 6 && 'Llegada a Campus UTTT'}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#cf1b1b] to-emerald-400 transition-all duration-500 rounded-full"
                      style={{ width: `${(simStep / 6) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Simulator Panel */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl glass-panel-dark p-6 sm:p-8 shadow-2xl border border-neutral-800">
                {/* Search Inputs */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Origen
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-[#cf1b1b]" />
                      <input
                        type="text"
                        value={originText}
                        onChange={(e) => setOriginText(e.target.value)}
                        placeholder="Ej. Tula Centro"
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900/90 py-2.5 pl-10 pr-3 text-sm font-semibold text-white placeholder-neutral-500 focus:border-[#cf1b1b] focus:outline-none focus:ring-2 focus:ring-[#cf1b1b]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Destino
                    </label>
                    <div className="relative">
                      <Navigation className="absolute left-3.5 top-3.5 h-4 w-4 text-[#cf1b1b]" />
                      <input
                        type="text"
                        value={destinationText}
                        onChange={(e) => setDestinationText(e.target.value)}
                        placeholder="Ej. Campus UTTT"
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900/90 py-2.5 pl-10 pr-3 text-sm font-semibold text-white placeholder-neutral-500 focus:border-[#cf1b1b] focus:outline-none focus:ring-2 focus:ring-[#cf1b1b]/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Search Button */}
                <button
                  type="button"
                  onClick={() => handleRunSearch(originText, destinationText)}
                  disabled={isSearching}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] py-3 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition hover:brightness-110 disabled:opacity-75"
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

                {/* Micro-UI Controls: Elastic Squish Fare Switch & SVG Offline Cache Sync */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-neutral-900/90 p-3.5 border border-neutral-800">
                  {/* Elastic Squish Switch for Fares */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-neutral-300">Tarifa:</span>
                    <button
                      type="button"
                      aria-label="Alternar tarifa estudiante"
                      onClick={() => setIsStudentFareMode(!isStudentFareMode)}
                      className={`switch-btn relative flex h-7 w-14 items-center rounded-full border p-0.5 transition-colors duration-300 ${
                        isStudentFareMode
                          ? 'border-emerald-500/60 bg-emerald-500/20'
                          : 'border-red-500/60 bg-red-500/20'
                      }`}
                    >
                      <div
                        className={`switch-thumb flex h-5.5 w-5.5 items-center justify-center rounded-full text-white text-[10px] font-black shadow transition-all duration-300 ${
                          isStudentFareMode ? 'bg-emerald-500' : 'bg-[#cf1b1b]'
                        }`}
                        style={{
                          transform: isStudentFareMode ? 'translateX(26px)' : 'translateX(0px)',
                        }}
                      >
                        {isStudentFareMode ? '50%' : '$'}
                      </div>
                    </button>
                    <span className={`text-xs font-bold ${isStudentFareMode ? 'text-emerald-400' : 'text-neutral-400'}`}>
                      {isStudentFareMode ? 'Estudiante UTTT (-50%)' : 'Tarifa General'}
                    </span>
                  </div>

                  {/* Micro-SVG Checkmark Offline Sync */}
                  <button
                    type="button"
                    onClick={handleCatalogSync}
                    disabled={catalogSyncState !== 'idle'}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800/90 px-3 py-1.5 text-xs font-bold text-white transition-all hover:border-[#cf1b1b] active:scale-95 disabled:opacity-85"
                  >
                    {catalogSyncState === 'idle' && <HardDriveDownload className="h-3.5 w-3.5 text-neutral-300" />}
                    {catalogSyncState === 'spinning' && (
                      <svg className="h-3.5 w-3.5 animate-spin text-[#cf1b1b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    )}
                    {catalogSyncState === 'done' && (
                      <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path className="check-path check-drawn" d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                    <span>
                      {catalogSyncState === 'idle' && 'Guardar Offline'}
                      {catalogSyncState === 'spinning' && 'Sincronizando...'}
                      {catalogSyncState === 'done' && '¡Caché Lista!'}
                    </span>
                  </button>
                </div>

                {/* Search Results List */}
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-bold uppercase tracking-wider">
                      Resultados disponibles ({searchResults.length})
                    </span>
                    <span>Tarifas vigentes Estado de Hidalgo</span>
                  </div>

                  {searchResults.map((route) => {
                    const activeFare = isStudentFareMode ? route.fareStudent : route.fareRegular;
                    return (
                      <div
                        key={route.id}
                        className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 transition-all hover:border-[#cf1b1b]/50 hover:shadow-warm-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-base">
                              {route.name}
                            </span>
                            {route.isAiRecommended && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-rose-950 px-2.5 py-0.5 text-[11px] font-bold text-rose-300 border border-rose-900/50">
                                <Sparkles className="h-3 w-3 text-[#cf1b1b]" />
                                Recomendada
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className={`text-base font-extrabold ${isStudentFareMode ? 'text-emerald-400' : 'text-[#cf1b1b]'}`}>
                              ${activeFare.toFixed(2)} MXN
                            </span>
                            <span className="block text-[10px] text-neutral-400">
                              {isStudentFareMode ? 'Con credencial UTTT' : `Estudiantes: $${route.fareStudent.toFixed(2)}`}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-neutral-400">
                          {route.operator} · {route.type}
                        </div>

                        {/* Timeline & Stops summary + Tactile Reaction */}
                        <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3 text-xs text-neutral-400">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-white">
                              {route.departure} — {route.arrival}
                            </span>
                            <span className="rounded bg-neutral-800 px-2 py-0.5 font-medium text-neutral-300">
                              {route.durationMin} min
                            </span>
                            <span>{route.stopsCount} paradas</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Tactile Like Button with Burst Rings & +1 Float */}
                            <div className="relative flex items-center">
                              <button
                                type="button"
                                onClick={() => handleRouteLike(route.id)}
                                className="relative inline-flex items-center gap-1 rounded-xl border border-pink-500/30 bg-pink-500/10 px-2.5 py-1 text-xs font-bold text-pink-300 transition-all hover:bg-pink-500/20 active:scale-90"
                                title="Recomendar esta corrida"
                              >
                                <Heart className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
                                <span className="font-mono text-[11px]">{routeLikes[route.id] || 48}</span>
                              </button>

                              {/* Burst Layer */}
                              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                {(likeBurstRings[route.id] || []).map((ringId) => (
                                  <React.Fragment key={ringId}>
                                    <span className="ring-anim absolute h-8 w-8 rounded-full border-2 border-pink-500" />
                                    <span className="float-plus absolute font-mono text-[11px] font-bold text-pink-400">
                                      +1
                                    </span>
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setSelectedRouteModal(route)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#cf1b1b] hover:text-rose-400"
                            >
                              <span>Ver detalles</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Route Details Breakdown */}
        {selectedRouteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-[#141720] p-6 text-white shadow-2xl border border-neutral-700">
              <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#cf1b1b]">
                    Detalles de Ruta Oficial
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedRouteModal.name}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Operado por: {selectedRouteModal.operator}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRouteModal(null)}
                  className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  aria-label="Cerrar modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Route Summary Badges */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-neutral-900 p-3 border border-neutral-800">
                  <div className="text-[10px] font-bold uppercase text-neutral-400">Tiempo Est.</div>
                  <div className="text-base font-extrabold text-[#cf1b1b]">
                    {selectedRouteModal.durationMin} min
                  </div>
                </div>
                <div className="rounded-xl bg-neutral-900 p-3 border border-neutral-800">
                  <div className="text-[10px] font-bold uppercase text-neutral-400">Tarifa Gen.</div>
                  <div className="text-base font-extrabold text-white">
                    ${selectedRouteModal.fareRegular.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-xl bg-emerald-950/40 p-3 border border-emerald-900/40">
                  <div className="text-[10px] font-bold uppercase text-emerald-400">Estudiante</div>
                  <div className="text-base font-extrabold text-emerald-400">
                    ${selectedRouteModal.fareStudent.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Stop by Stop Vertical Timeline */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">
                  Secuencia de Paradas Autorizadas
                </h4>
                <div className="relative border-l-2 border-[#cf1b1b]/40 pl-5 space-y-3 text-xs">
                  {selectedRouteModal.stops.map((stop, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-[#141720] bg-[#cf1b1b]" />
                      <div className="font-semibold text-white">{stop}</div>
                      <div className="text-[10px] text-neutral-400">
                        Parada {idx + 1} de {selectedRouteModal.stops.length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Segment Fares Calculator */}
              <div className="mt-6 border-t border-neutral-800 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Desglose de Tarifas por Tramo
                </h4>
                <div className="space-y-1.5 text-xs text-neutral-300">
                  {selectedRouteModal.segmentFares.map((seg, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-neutral-900 p-2 border border-neutral-800"
                    >
                      <span>
                        {seg.from} → {seg.to}
                      </span>
                      <span className="font-bold text-emerald-400">
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
      {/* 5. "FUNCIONES" BENTO GRID (NEON GLASS DESIGN)                         */}
      {/* -------------------------------------------------------------------- */}
      <section id="funciones" className="py-24 bg-[#0a0c10] border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-rose-950/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-300 border border-rose-900/50">
              Todo en un solo lugar
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-white">
              Información que te ayuda a <span className="text-[#cf1b1b]">decidir mejor</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400">
              Funcionalidades construidas con base en las necesidades reales del transporte en Hidalgo.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Bento Card 1: Consulta de Rutas */}
            <div className="group rounded-3xl glass-panel-dark p-8 border border-neutral-800 transition-all duration-300 hover:border-[#cf1b1b]/50 hover:shadow-warm-lg flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/80 text-[#cf1b1b] border border-rose-900/40">
                  <Navigation className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  Consulta de rutas y paradas
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  Encuentra opciones claras para llegar a tu destino con rutas georreferenciadas y trazados oficiales.
                </p>
              </div>

              {/* Route line A -> B */}
              <div className="mt-6 rounded-2xl bg-neutral-900/90 p-4 border border-neutral-800">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-200 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#cf1b1b]" />
                    Punto A (Origen)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Punto B (UTTT)
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-2/3 bg-gradient-to-r from-[#cf1b1b] via-amber-500 to-emerald-400 rounded-full" />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-neutral-400">
                  <span>14 paradas intermedias</span>
                  <span>35 min est.</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Mapa interactivo GeoJSON */}
            <div className="group rounded-3xl glass-panel-dark p-8 border border-neutral-800 transition-all duration-300 hover:border-[#cf1b1b]/50 hover:shadow-warm-lg flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-950/80 text-[#cf1b1b] border border-rose-900/40">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  Mapa interactivo GeoJSON
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  Visualiza los corredores viales, terminales y puntos de ascenso y descenso en alta precisión.
                </p>
              </div>

              {/* Road grid with moving bus */}
              <div className="mt-6 h-28 rounded-2xl bg-neutral-900/90 relative overflow-hidden border border-neutral-800 flex items-center justify-center">
                <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 200 100">
                  <line x1="0" y1="50" x2="200" y2="50" stroke="#cf1b1b" strokeWidth="3" className="animated-dashed-line" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                <div className="relative flex items-center gap-1.5 rounded-full bg-neutral-950 px-3.5 py-1.5 shadow-md border border-rose-900/50">
                  <Bus className="h-4 w-4 text-[#cf1b1b]" />
                  <span className="text-xs font-bold text-white">Corredor Tula-Tepeji</span>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Horarios y calculadora de tarifas */}
            <div className="group rounded-3xl glass-panel-dark p-8 border border-neutral-800 transition-all duration-300 hover:border-[#cf1b1b]/50 hover:shadow-warm-lg flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  Horarios y tarifas por tramo
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  Compara costos y frecuencias antes de salir. Cero sorpresas en cobros de pasaje.
                </p>
              </div>

              {/* Time pills */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="rounded-xl bg-neutral-800 px-3 py-1.5 text-xs font-bold text-white">
                  08:15 hrs
                </span>
                <span className="rounded-xl bg-neutral-800 px-3 py-1.5 text-xs font-bold text-white">
                  09:00 hrs
                </span>
                <span className="rounded-xl bg-[#cf1b1b] px-3 py-1.5 text-xs font-bold text-white">
                  $12.00 MXN
                </span>
              </div>
            </div>

            {/* Bento Card 4: Recomendaciones con IA Explicada (2 cols) */}
            <div className="group rounded-3xl glass-panel-dark p-8 border border-neutral-800 transition-all duration-300 hover:border-[#cf1b1b]/50 hover:shadow-warm-lg lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#cf1b1b] to-amber-500 text-white shadow-md">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  Recomendaciones explicadas con IA
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed max-w-xl">
                  Asistencia inteligente con <strong>Grounding estricto</strong> sobre datos oficiales. Cada recomendación se fundamenta en horarios, costos y calificaciones reales sin inventar información.
                </p>
              </div>

              {/* Rating Card */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-neutral-900/90 p-4 border border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Línea Mejor Calificada</div>
                    <div className="text-[11px] text-neutral-400">Ruta Coral 08 · 4.8 / 5.0</div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300">
                  Validado por la comunidad
                </span>
              </div>
            </div>

            {/* Bento Card 5: Machine Learning */}
            <div className="group rounded-3xl glass-panel-dark p-8 border border-neutral-800 transition-all duration-300 hover:border-[#cf1b1b]/50 hover:shadow-warm-lg flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  Detección ML con Acelerómetro
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  Identifica paradas informales con sensores móviles y consentimiento explícito, sujeto a validación humana.
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-neutral-900/90 p-3 text-xs text-neutral-400 border border-neutral-800">
                <div className="font-bold text-white">Inferencia Ética:</div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Cero captura de rostros o datos personales · Supervisión humana.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 6. ARCHITECTURE & 4-STAGE ROADMAP                                    */}
      {/* -------------------------------------------------------------------- */}
      <section id="arquitectura" className="py-24 bg-[#0e1117] border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-rose-950/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-300 border border-rose-900/50">
              Arquitectura Tecnológica · UTTT
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-white">
              Diseño modular en <span className="text-[#cf1b1b]">cuatro etapas</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400">
              Documentación técnica oficial del proyecto de software, diseñada con microservicios independientes y despliegue en la nube de Microsoft Azure.
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
                  className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] text-white shadow-lg shadow-red-600/30 scale-105'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white'
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
              <div className="mt-8 rounded-3xl glass-panel-dark p-8 border border-neutral-800 shadow-2xl sm:p-10">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <span className="rounded-full bg-rose-950/80 px-3.5 py-1 text-xs font-bold text-rose-300 border border-rose-900/40">
                      {currentStage.badge}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">
                      {currentStage.title}
                    </h3>
                    <p className="mt-3 text-base text-neutral-300 leading-relaxed">
                      {currentStage.summary}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {currentStage.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-neutral-200">
                          <CheckCircle2 className="h-5 w-5 text-[#cf1b1b] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-neutral-900/90 p-6 border border-neutral-800 shadow-xl">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300 mb-4">
                        <Cpu className="h-4 w-4 text-[#cf1b1b]" />
                        <span>Garantía de Diseño de Sistema</span>
                      </div>
                      <div className="space-y-3 text-xs">
                        <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800">
                          <span className="font-bold text-white block">Azure Container Instances</span>
                          <span className="text-neutral-400">
                            Despliegue contenerizado en región North Central US con FQDN público.
                          </span>
                        </div>
                        <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800">
                          <span className="font-bold text-white block">Grounding Sin Alucinaciones</span>
                          <span className="text-neutral-400">
                            Respuestas conversacionales restringidas al modelo relacional verificado.
                          </span>
                        </div>
                        <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800">
                          <span className="font-bold text-white block">Cumplimiento ASVS & Semgrep</span>
                          <span className="text-neutral-400">
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
      {/* 7. INTERACTIVE "COBERTURA EN HIDALGO" MAP SECTION                    */}
      {/* -------------------------------------------------------------------- */}
      <section id="cobertura" className="py-24 bg-[#0a0c10] border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Interactive SVG Map Visual */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[36px] glass-panel-dark p-6 shadow-2xl border border-neutral-800">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#cf1b1b]" />
                    <span className="text-xs font-bold text-white">Mapa Interactivo de Hidalgo</span>
                  </div>
                  <span className="text-[11px] font-semibold text-rose-300">
                    Haz clic en los nodos
                  </span>
                </div>

                {/* Night-mode SVG Map with Interactive Shockwaves */}
                <div className="mt-4 relative h-72 sm:h-80 w-full rounded-2xl bg-neutral-950 overflow-hidden border border-neutral-800 flex items-center justify-center">
                  <svg
                    viewBox="0 0 360 300"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 360;
                      const y = ((e.clientY - rect.top) / rect.height) * 300;
                      handleMapClick(x, y);
                    }}
                    className="h-full w-full select-none cursor-crosshair"
                    aria-label="Mapa cartográfico de corredores de transporte en Hidalgo"
                  >
                    {/* Background terrain silhouettes */}
                    <path
                      d="M 50 150 Q 80 80, 160 90 T 280 80 Q 330 140, 310 220 T 170 280 Q 90 260, 50 150 Z"
                      fill="#1a1e28"
                      opacity="0.6"
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
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                      opacity="0.8"
                    />

                    {/* Dynamic Shockwaves on Click */}
                    {mapWaves.map((wave) => (
                      <circle
                        key={wave.id}
                        cx={wave.x}
                        cy={wave.y}
                        r="35"
                        fill="none"
                        stroke="#cf1b1b"
                        strokeWidth="2.5"
                        className="ring-anim"
                      />
                    ))}

                    {/* Clickable zone nodes */}
                    {COVERAGE_ZONES.map((zone) => {
                      const isSelected = activeZone.id === zone.id;
                      return (
                        <g
                          key={zone.id}
                          className="cursor-pointer transition-transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveZone(zone);
                            handleMapClick(zone.coordinates.x, zone.coordinates.y);
                          }}
                        >
                          {isSelected && (
                            <circle
                              cx={zone.coordinates.x}
                              cy={zone.coordinates.y}
                              r="18"
                              fill="#cf1b1b"
                              opacity="0.3"
                              className="animate-ping"
                            />
                          )}
                          <circle
                            cx={zone.coordinates.x}
                            cy={zone.coordinates.y}
                            r={isSelected ? 10 : 7}
                            fill={isSelected ? '#cf1b1b' : '#374151'}
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <text
                            x={zone.coordinates.x}
                            y={zone.coordinates.y - 14}
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill="#ffffff"
                            className="pointer-events-none drop-shadow"
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
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        activeZone.id === z.id
                          ? 'bg-[#cf1b1b] text-white shadow-md'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
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
              <span className="inline-block rounded-full bg-rose-950/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-300 border border-rose-900/40">
                Nuestra Cobertura
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-white">
                Comenzamos en <span className="text-[#cf1b1b]">Hidalgo, México.</span>
              </h2>
              <p className="mt-4 text-base text-neutral-300 leading-relaxed">
                Construimos una forma más clara de entender el transporte público, comenzando desde casa. Nuestra primera fase cubre los corredores vitales de la región Tula-Tepeji con expansión hacia Pachuca.
              </p>

              {/* Dynamic Zone Preview Panel */}
              <div className="mt-6 rounded-3xl glass-panel-dark p-6 shadow-xl border border-neutral-800">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-rose-950 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-900/50">
                    {activeZone.tag}
                  </span>
                  <span className="text-xs font-bold text-neutral-400">
                    {activeZone.routesCount} rutas activas
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-white">
                  {activeZone.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                  {activeZone.description}
                </p>

                <div className="mt-4 border-t border-neutral-800 pt-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Paradas clave registradas:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeZone.keyStops.map((stop, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-200 border border-neutral-800"
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
      {/* 8. 3D TEAM COVERFLOW CAROUSEL (Direct from the user's ATLAS video!)  */}
      {/* -------------------------------------------------------------------- */}
      <section id="equipo" className="py-24 bg-[#0e1117] border-t border-neutral-800 relative overflow-hidden perspective-1500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-950/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-300 border border-rose-900/50">
              <GraduationCap className="h-4 w-4" />
              <span>Universidad Tecnológica de Tula-Tepeji · IDGS 10mo</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-white">
              Equipo de <span className="text-[#cf1b1b]">Desarrollo e Innovación</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400">
              Estudiantes de Ingeniería en Desarrollo y Gestión de Software, asesorados por el <strong>Ing. Angel Alvarado Estrada</strong>.
            </p>
          </div>

          {/* 3D Perspective Coverflow Carousel Container */}
          <div className="mt-14 flex flex-col items-center">
            {/* Cards Stage */}
            <div className="relative h-[430px] w-full max-w-4xl flex items-center justify-center overflow-visible">
              {TEAM_MEMBERS.map((member, idx) => {
                const offset = idx - teamIndex;
                const isCenter = offset === 0;

                // 3D Transform calculations inspired by the ATLAS video!
                const translateX = offset * 210; // horizontal separation
                const rotateY = offset * -25;    // perspective angle
                const scale = isCenter ? 1.05 : Math.max(0.75, 0.88 - Math.abs(offset) * 0.06);
                const zIndex = 30 - Math.abs(offset) * 5;
                const opacity = isCenter ? 1 : Math.max(0.2, 0.7 - Math.abs(offset) * 0.18);

                return (
                  <div
                    key={member.name}
                    onClick={() => setTeamIndex(idx)}
                    className={`absolute cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-500 ease-out select-none ${
                      isCenter
                        ? 'w-[300px] sm:w-[350px] glass-panel-glow glow-red border-rose-500/50'
                        : 'w-[280px] sm:w-[320px] bg-neutral-900/90 border border-neutral-800'
                    }`}
                    style={{
                      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                  >
                    {/* Member Initials Avatar Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-xl"
                        style={{ backgroundColor: member.badgeColor }}
                      >
                        {member.initials}
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-sm"
                        style={{ backgroundColor: `${member.badgeColor}33`, borderColor: member.badgeColor, borderWidth: '1px' }}
                      >
                        {member.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-black text-white leading-tight">
                      {member.name}
                    </h3>

                    <div className="mt-1 text-xs font-bold uppercase tracking-wider text-rose-300">
                      {member.role}
                    </div>

                    <p className="mt-3 text-xs text-neutral-300 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>

                    <div className="mt-4 border-t border-neutral-800 pt-3 text-[11px] text-neutral-400">
                      <strong className="text-white block mb-0.5">Aporte Principal:</strong>
                      {member.contribution}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Controls: Arrows & Progress Bar (Just like the ATLAS video!) */}
            <div className="mt-8 flex items-center gap-6">
              <button
                type="button"
                onClick={() => setTeamIndex((prev) => Math.max(0, prev - 1))}
                disabled={teamIndex === 0}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white transition hover:bg-[#cf1b1b] disabled:opacity-40"
                aria-label="Miembro anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Progress Line */}
              <div className="flex items-center gap-2">
                {TEAM_MEMBERS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTeamIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === teamIndex ? 'w-8 bg-[#cf1b1b]' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                    aria-label={`Ir a miembro ${i + 1}`}
                  />
                ))}
              </div>

              <span className="text-xs font-bold text-neutral-400 font-mono">
                0{teamIndex + 1} / 0{TEAM_MEMBERS.length}
              </span>

              <button
                type="button"
                onClick={() => setTeamIndex((prev) => Math.min(TEAM_MEMBERS.length - 1, prev + 1))}
                disabled={teamIndex === TEAM_MEMBERS.length - 1}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white transition hover:bg-[#cf1b1b] disabled:opacity-40"
                aria-label="Siguiente miembro"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 9. "PRÓXIMAMENTE EN GOOGLE PLAY" CTA BANNER                          */}
      {/* -------------------------------------------------------------------- */}
      <section id="proximamente" className="py-20 bg-[#0a0c10] border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[44px] bg-gradient-to-br from-[#cf1b1b] via-[#900d0d] to-[#410001] p-8 text-white shadow-2xl sm:p-14 glow-red">
            {/* Background bus watermark */}
            <Bus className="pointer-events-none absolute -bottom-10 -right-10 h-80 w-80 text-white/10 animate-float-gentle" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-100 backdrop-blur-md">
                Tu próximo viaje empieza aquí
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-white">
                Muévete con más <span className="underline decoration-[#ffdbc5] decoration-4">confianza.</span>
              </h2>
              <p className="mt-4 text-base text-rose-100 sm:text-lg leading-relaxed">
                BusTrack llegará próximamente a Google Play. Diseñado para simplificar tu movilidad diaria, ahorrarte tiempo y darte certeza en cada traslado en Hidalgo.
              </p>

              {/* White Google Play Pill CTA */}
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                {appConfig.playStoreUrl ? (
                  <a
                    href={appConfig.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPlayStoreClick('landing_banner')}
                    aria-label="Descargar BusTrack en Google Play"
                    className="inline-flex items-center gap-3.5 rounded-2xl bg-white px-7 py-4 text-neutral-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20"
                  >
                    <Smartphone className="h-7 w-7 text-[#cf1b1b]" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Disponible en
                      </div>
                      <div className="text-lg font-black text-[#1b1c1c]">
                        Google Play
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-3.5 rounded-2xl bg-white px-7 py-4 text-neutral-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20">
                    <Smartphone className="h-7 w-7 text-[#cf1b1b]" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Próximamente en
                      </div>
                      <div className="text-lg font-black text-[#1b1c1c]">
                        Google Play
                      </div>
                    </div>
                  </div>
                )}

                <span className="text-xs text-rose-200">
                  {appConfig.playStoreUrl
                    ? `Versión catálogo activa: ${catalogStatus?.versionCatalogo ?? 'v0.9.0'}`
                    : 'El enlace oficial se habilitará al publicarse la aplicación en la tienda.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 10. PRIVACY & TELEMETRY CONSENT BANNER                               */}
      {/* -------------------------------------------------------------------- */}
      {cookieConsent === null && (
        <aside
          role="region"
          aria-label="Consentimiento de privacidad y telemetría"
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-3xl rounded-2xl glass-panel-dark p-4 shadow-2xl border border-neutral-700 sm:bottom-6 sm:p-5"
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#cf1b1b] shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-300 leading-relaxed">
                En <strong>BusTrack UTTT</strong> respetamos tu privacidad. No realizamos rastreo GPS continuo ni recopilamos datos personales invasivos. Consulta nuestro{' '}
                <Link
                  to="/privacidad"
                  className="font-bold text-rose-300 underline hover:text-white"
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
                className="flex-1 sm:flex-none rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-700"
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
