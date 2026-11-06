import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  HardDriveDownload,
  QrCode,
  Bell,
  Zap,
  Heart,
  Play,
  Pause,
} from 'lucide-react';

type TabKey = 'tilt' | 'island' | 'canvas' | 'micro';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Wave {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

const TAB_TIPS: Record<TabKey, string> = {
  tilt: 'Mueve el cursor o haz clic en la tarjeta 3D: cada capa flota en un eje Z distinto con inercia física real y foco radial.',
  island: 'Toca la isla dinámica o usa los selectores para alternar entre píldora compacta, monitoreo de ruta y panel bento.',
  canvas: 'Acerca el cursor al botón magnético de parada y haz clic sobre el lienzo para emitir ondas de choque cartográficas.',
  micro: 'Prueba cada micro-control SVG: sincronización con trazo animado, switch elástico de tarifa y botón háptico con partículas.',
};

export const PwaPhysicsLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('tilt');

  /* ------------------------------------------------------------------------ */
  /* TAB 1: 3D TILT STATE & REFS                                              */
  /* ------------------------------------------------------------------------ */
  const tiltStageRef = useRef<HTMLDivElement>(null);
  const tiltCardRef = useRef<HTMLDivElement>(null);
  const tiltSpotRef = useRef<HTMLDivElement>(null);
  const [tiltCoords, setTiltCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isHoverTiltRef = useRef(false);
  const tiltPhysicsRef = useRef({
    targetRX: 0,
    targetRY: 0,
    currRX: 0,
    currRY: 0,
    velRX: 0,
    velRY: 0,
    targetScale: 1,
    currScale: 1,
    velScale: 0,
    spotX: 150,
    spotY: 85,
  });

  /* ------------------------------------------------------------------------ */
  /* TAB 2: DYNAMIC ISLAND STATE                                              */
  /* ------------------------------------------------------------------------ */
  const [islandState, setIslandState] = useState<0 | 1 | 2>(0);
  const [isEqPaused, setIsEqPaused] = useState(false);
  const [islandFeedback, setIslandFeedback] = useState('Toca una opción');

  /* ------------------------------------------------------------------------ */
  /* TAB 3: CANVAS PARTICLES & MAGNETIC BUTTON STATE                          */
  /* ------------------------------------------------------------------------ */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magWrapRef = useRef<HTMLDivElement>(null);
  const magBtnRef = useRef<HTMLButtonElement>(null);
  const magTextRef = useRef<HTMLSpanElement>(null);
  const [waveCount, setWaveCount] = useState(0);
  const canvasSizeRef = useRef({ cw: 0, ch: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const pointerRef = useRef({ x: -999, y: -999 });
  const magPhysicsRef = useRef({
    magTX: 0,
    magTY: 0,
    magCX: 0,
    magCY: 0,
    magVX: 0,
    magVY: 0,
  });

  /* ------------------------------------------------------------------------ */
  /* TAB 4: MICRO-INTERACTIONS STATE                                          */
  /* ------------------------------------------------------------------------ */
  const [syncState, setSyncState] = useState<'idle' | 'spinning' | 'done'>('idle');
  const [isStudentFare, setIsStudentFare] = useState(false);
  const [likesCount, setLikesCount] = useState(48);
  const [isHeartPopping, setIsHeartPopping] = useState(false);
  const [burstRings, setBurstRings] = useState<number[]>([]);

  /* ------------------------------------------------------------------------ */
  /* 3D TILT POINTER HANDLERS                                                 */
  /* ------------------------------------------------------------------------ */
  const handleTiltPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    isHoverTiltRef.current = true;
    if (!tiltCardRef.current || !tiltSpotRef.current) return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tiltPhysicsRef.current.spotX = x;
    tiltPhysicsRef.current.spotY = y;

    const normX = Math.max(-1.2, Math.min(1.2, (x / rect.width - 0.5) * 2));
    const normY = Math.max(-1.2, Math.min(1.2, (y / rect.height - 0.5) * 2));
    tiltPhysicsRef.current.targetRY = normX * 18;
    tiltPhysicsRef.current.targetRX = -normY * 16;

    tiltSpotRef.current.style.opacity = '1';
    tiltSpotRef.current.style.background = `radial-gradient(220px circle at ${x}px ${y}px, rgba(207, 27, 27, 0.35), rgba(99, 102, 241, 0.15) 50%, transparent 75%)`;
  };

  const handleTiltPointerLeave = () => {
    isHoverTiltRef.current = false;
    tiltPhysicsRef.current.targetRX = 0;
    tiltPhysicsRef.current.targetRY = 0;
    tiltPhysicsRef.current.targetScale = 1;
    if (tiltSpotRef.current) {
      tiltSpotRef.current.style.opacity = '0';
    }
  };

  const handleTiltPointerDown = () => {
    tiltPhysicsRef.current.velScale -= 0.08;
  };

  /* ------------------------------------------------------------------------ */
  /* CANVAS & MAGNET POINTER HANDLERS                                         */
  /* ------------------------------------------------------------------------ */
  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = e.currentTarget;
    const r = stage.getBoundingClientRect();
    pointerRef.current.x = e.clientX - r.left;
    pointerRef.current.y = e.clientY - r.top;

    if (magWrapRef.current) {
      const bRect = magWrapRef.current.getBoundingClientRect();
      const bx = e.clientX - (bRect.left + bRect.width / 2);
      const by = e.clientY - (bRect.top + bRect.height / 2);
      const dist = Math.hypot(bx, by);
      if (dist < 120) {
        magPhysicsRef.current.magTX = bx * 0.42;
        magPhysicsRef.current.magTY = by * 0.42;
      } else {
        magPhysicsRef.current.magTX = 0;
        magPhysicsRef.current.magTY = 0;
      }
    }
  };

  const handleCanvasPointerLeave = () => {
    pointerRef.current.x = -999;
    pointerRef.current.y = -999;
    magPhysicsRef.current.magTX = 0;
    magPhysicsRef.current.magTY = 0;
  };

  const triggerShockwave = (x: number, y: number) => {
    wavesRef.current.push({ x, y, r: 8, alpha: 0.95 });
    setWaveCount((prev) => prev + 1);

    // Push away nearby particles
    particlesRef.current.forEach((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      const d = Math.max(18, Math.hypot(dx, dy));
      if (d < 180) {
        const force = (180 - d) / 26;
        p.vx += (dx / d) * force;
        p.vy += (dy / d) * force;
      }
    });
  };

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = e.currentTarget;
    const r = stage.getBoundingClientRect();
    const wx = e.clientX - r.left;
    const wy = e.clientY - r.top;
    triggerShockwave(wx, wy);
  };

  /* ------------------------------------------------------------------------ */
  /* MICRO-INTERACTIONS ACTIONS                                               */
  /* ------------------------------------------------------------------------ */
  const handleStartSync = () => {
    if (syncState !== 'idle') return;
    setSyncState('spinning');
    setTimeout(() => {
      setSyncState('done');
      setTimeout(() => {
        setSyncState('idle');
      }, 1800);
    }, 900);
  };

  const handleLikeClick = () => {
    setLikesCount((prev) => prev + 1);
    setIsHeartPopping(true);
    setTimeout(() => setIsHeartPopping(false), 200);

    const ringId = Date.now();
    setBurstRings((prev) => [...prev, ringId]);
    setTimeout(() => {
      setBurstRings((prev) => prev.filter((id) => id !== ringId));
    }, 700);
  };

  /* ------------------------------------------------------------------------ */
  /* UNIFIED 60 FPS ANIMATION LOOP VIA requestAnimationFrame                  */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      // 1. Tilt Spring Physics
      if (activeTab === 'tilt' && tiltCardRef.current) {
        const p = tiltPhysicsRef.current;
        if (!isHoverTiltRef.current) {
          p.targetRY = Math.sin(now * 0.0018) * 6;
          p.targetRX = Math.cos(now * 0.0014) * 4;
        }
        const stiffness = 0.12;
        const damping = 0.76;

        p.velRX = (p.velRX + (p.targetRX - p.currRX) * stiffness) * damping;
        p.velRY = (p.velRY + (p.targetRY - p.currRY) * stiffness) * damping;
        p.currRX += p.velRX;
        p.currRY += p.velRY;

        p.velScale = (p.velScale + (p.targetScale - p.currScale) * 0.18) * 0.72;
        p.currScale += p.velScale;

        tiltCardRef.current.style.transform = `rotateX(${p.currRX.toFixed(2)}deg) rotateY(${p.currRY.toFixed(2)}deg) scale(${p.currScale.toFixed(3)})`;
        setTiltCoords({
          x: Math.round(p.currRX),
          y: Math.round(p.currRY),
        });
      }

      // 2. Canvas Particles & Magnetic Button Physics
      if (activeTab === 'canvas' && canvasRef.current) {
        const cvs = canvasRef.current;
        const ctx = cvs.getContext('2d');
        const { cw, ch } = canvasSizeRef.current;

        if (ctx && cw > 0 && ch > 0) {
          ctx.clearRect(0, 0, cw, ch);

          // Shockwaves
          for (let i = wavesRef.current.length - 1; i >= 0; i--) {
            const w = wavesRef.current[i];
            w.r += 4.5;
            w.alpha *= 0.94;
            ctx.beginPath();
            ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(207, 27, 27, ${w.alpha})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            if (w.alpha < 0.03) {
              wavesRef.current.splice(i, 1);
            }
          }

          // Particles & Transit Lines
          const parts = particlesRef.current;
          for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            const dx = pointerRef.current.x - p.x;
            const dy = pointerRef.current.y - p.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 120 && dist > 1) {
              p.vx += (dx / dist) * 0.055;
              p.vy += (dy / dist) * 0.055;
            }

            p.vx *= 0.985;
            p.vy *= 0.985;

            if (Math.hypot(p.vx, p.vy) < 0.25) {
              p.vx += (Math.random() - 0.5) * 0.08;
              p.vy += (Math.random() - 0.5) * 0.08;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = cw;
            if (p.x > cw) p.x = 0;
            if (p.y < 0) p.y = ch;
            if (p.y > ch) p.y = 0;

            // Draw Transit Station Node
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 100, 100, 0.85)';
            ctx.fill();

            // Connect neighboring transit nodes
            for (let j = i + 1; j < parts.length; j++) {
              const p2 = parts[j];
              const d2 = Math.hypot(p.x - p2.x, p.y - p2.y);
              if (d2 < 82) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(207, 27, 27, ${(1 - d2 / 82) * 0.35})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
              }
            }
          }

          // Magnetic button spring physics
          const mag = magPhysicsRef.current;
          mag.magVX = (mag.magVX + (mag.magTX - mag.magCX) * 0.16) * 0.75;
          mag.magVY = (mag.magVY + (mag.magTY - mag.magCY) * 0.16) * 0.75;
          mag.magCX += mag.magVX;
          mag.magCY += mag.magVY;

          if (magBtnRef.current) {
            magBtnRef.current.style.transform = `translate(${mag.magCX.toFixed(2)}px, ${mag.magCY.toFixed(2)}px)`;
          }
          if (magTextRef.current) {
            magTextRef.current.style.transform = `translate(${(mag.magCX * 0.35).toFixed(2)}px, ${(mag.magCY * 0.35).toFixed(2)}px)`;
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  /* ------------------------------------------------------------------------ */
  /* CANVAS RESIZE OBSERVER & PARTICLE POPULATION                             */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    if (activeTab !== 'canvas' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const handleResize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      canvasSizeRef.current = { cw: w, ch: h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      if (particlesRef.current.length === 0) {
        const count = Math.min(48, Math.max(24, Math.floor(w / 18)));
        const newParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
          newParticles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            r: Math.random() * 2 + 1.4,
          });
        }
        particlesRef.current = newParticles;
      }
    };

    handleResize();
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(handleResize);
      observer.observe(parent);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [activeTab]);

  return (
    <div className="relative mx-auto max-w-5xl rounded-3xl border border-neutral-800 bg-[#12151c]/90 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
      {/* Top Header + Navigation Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800/80 pb-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#cf1b1b] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#cf1b1b]" />
          </span>
          <div>
            <h3 className="text-base font-bold text-white sm:text-lg">
              Laboratorio de Micro-Física & Experiencia PWA
            </h3>
            <p className="text-xs text-neutral-400">
              Interacciones táctiles con resortes físicos de Hooke y renderizado fluido a 120 FPS
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div
          className="flex items-center gap-1 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-1.5 shadow-inner"
          role="tablist"
        >
          <button
            type="button"
            onClick={() => setActiveTab('tilt')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
              activeTab === 'tilt'
                ? 'bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            1. 3D + Foco
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('island')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
              activeTab === 'island'
                ? 'bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            2. Isla Dinámica
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('canvas')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
              activeTab === 'canvas'
                ? 'bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            3. Canvas + Imán
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('micro')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-300 ${
              activeTab === 'micro'
                ? 'bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            4. Micro-SVG
          </button>
        </div>
      </div>

      {/* Interactive Main Stage (Fixed 300px height for sleek inline playground) */}
      <div className="relative mt-5 h-[300px] w-full overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#0a0c10] sm:h-[320px]">
        {/* ================================================================== */}
        {/* TAB 1: 3D TILT CARD + HOOKE'S SPRING + SPOTLIGHT                   */}
        {/* ================================================================== */}
        {activeTab === 'tilt' && (
          <div
            ref={tiltStageRef}
            onPointerMove={handleTiltPointerMove}
            onPointerLeave={handleTiltPointerLeave}
            onPointerDown={handleTiltPointerDown}
            className="perspective-stage dot-grid-subtle relative flex h-full w-full cursor-pointer items-center justify-center p-4"
          >
            <div
              ref={tiltCardRef}
              className="preserve-3d relative w-full max-w-[340px] rounded-2xl border border-neutral-700/80 bg-neutral-900/90 p-5 shadow-2xl transition-shadow duration-300 hover:shadow-red-600/20"
            >
              {/* Dynamic Radial Spotlight */}
              <div
                ref={tiltSpotRef}
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
              />

              {/* Depth Layer 1 (Z = 20px) */}
              <div className="z-layer-1 mb-3.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  PWA Offline-First
                </span>
                <span className="font-mono text-xs font-bold text-neutral-400">120 FPS</span>
              </div>

              {/* Depth Layer 2 (Z = 38px) */}
              <div className="z-layer-2 mb-4">
                <h4 className="text-lg font-extrabold text-white">
                  BusTrack Core Telemetría
                </h4>
                <p className="mt-1 text-xs text-neutral-400">
                  Sincronización en segundo plano con base de datos local SQLite / IndexedDB sin rastreo GPS invasivo.
                </p>
              </div>

              {/* Depth Layer 3 (Z = 54px) */}
              <div className="z-layer-3 flex items-center justify-between border-t border-neutral-800 pt-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-[#cf1b1b]/40 bg-[#cf1b1b]/10 px-2 py-0.5 text-[11px] font-bold text-rose-300">
                    preserve-3d
                  </span>
                  <span className="rounded-md border border-indigo-500/40 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-bold text-indigo-300">
                    Resorte Hooke
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-neutral-400">
                  {tiltCoords.x}°, {tiltCoords.y}°
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: DYNAMIC ISLAND MORPHING                                     */}
        {/* ================================================================== */}
        {activeTab === 'island' && (
          <div className="dot-grid-subtle relative flex h-full w-full flex-col items-center justify-between p-4 sm:p-6">
            <div className="flex flex-1 w-full items-center justify-center">
              {/* Morphing Dynamic Island Container */}
              <div
                onClick={() => setIslandState(((islandState + 1) % 3) as 0 | 1 | 2)}
                className="island-morph cursor-pointer overflow-hidden border border-neutral-700/80 bg-neutral-900/95 shadow-2xl transition-all"
                style={{
                  width: islandState === 0 ? '240px' : islandState === 1 ? '330px' : '340px',
                  height: islandState === 0 ? '48px' : islandState === 1 ? '118px' : '140px',
                  borderRadius: islandState === 0 ? '24px' : islandState === 1 ? '22px' : '24px',
                }}
              >
                {/* State 0: Compact Pill */}
                {islandState === 0 && (
                  <div className="flex h-full w-full items-center justify-between px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>
                      <span className="text-xs font-bold text-white">Unidad UTTT Sincronizada</span>
                    </div>
                    <span className="font-mono text-[11px] text-neutral-400">v2.4 PWA</span>
                  </div>
                )}

                {/* State 1: Live Transit Equalizer */}
                {islandState === 1 && (
                  <div className="flex h-full w-full flex-col justify-between p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10">
                          <div className={`flex h-4 items-end gap-0.5 ${isEqPaused ? 'eq-paused' : ''}`}>
                            <span className="eq-bar h-4 w-1 rounded-full bg-[#cf1b1b]" style={{ animationDelay: '0ms' }} />
                            <span className="eq-bar h-4 w-1 rounded-full bg-[#cf1b1b]" style={{ animationDelay: '180ms' }} />
                            <span className="eq-bar h-4 w-1 rounded-full bg-[#cf1b1b]" style={{ animationDelay: '320ms' }} />
                            <span className="eq-bar h-4 w-1 rounded-full bg-[#cf1b1b]" style={{ animationDelay: '120ms' }} />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Corredor Tula – UTTT</div>
                          <div className="text-[11px] text-neutral-400">En ruta · 4.2 km restantes (12 min)</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEqPaused(!isEqPaused);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-bold text-white transition-all hover:bg-neutral-700 active:scale-95"
                      >
                        {isEqPaused ? <Play className="h-3 w-3 text-emerald-400" /> : <Pause className="h-3 w-3 text-neutral-300" />}
                        <span>{isEqPaused ? 'Reanudar' : 'Pausar'}</span>
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono mb-1">
                        <span>Central Tula</span>
                        <span>Parada UTTT</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#cf1b1b] to-red-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* State 2: Quick Actions Bento */}
                {islandState === 2 && (
                  <div className="flex h-full w-full flex-col justify-between p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Acciones Rápidas BusTrack</span>
                      <span className="font-mono text-[11px] text-rose-400 font-semibold">{islandFeedback}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIslandFeedback('✓ Escáner QR abierto');
                        }}
                        className="flex flex-col items-center gap-1 rounded-xl border border-neutral-700 bg-neutral-800/80 p-2 text-center transition-all hover:border-[#cf1b1b] active:scale-90"
                      >
                        <QrCode className="h-4 w-4 text-[#cf1b1b]" />
                        <span className="text-[11px] font-medium text-white">Escanear</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIslandFeedback('✓ Catálogo offline listo');
                        }}
                        className="flex flex-col items-center gap-1 rounded-xl border border-neutral-700 bg-neutral-800/80 p-2 text-center transition-all hover:border-emerald-500 active:scale-90"
                      >
                        <HardDriveDownload className="h-4 w-4 text-emerald-400" />
                        <span className="text-[11px] font-medium text-white">Offline</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIslandFeedback('✓ Alerta configurada');
                        }}
                        className="flex flex-col items-center gap-1 rounded-xl border border-neutral-700 bg-neutral-800/80 p-2 text-center transition-all hover:border-amber-500 active:scale-90"
                      >
                        <Bell className="h-4 w-4 text-amber-400" />
                        <span className="text-[11px] font-medium text-white">Alertas</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Island State Selector Pills */}
            <div className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/90 px-2 py-1 shadow-inner">
              <button
                type="button"
                onClick={() => setIslandState(0)}
                className={`rounded-full px-3 py-0.5 text-xs font-bold transition-all ${
                  islandState === 0
                    ? 'bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                1. Píldora
              </button>
              <button
                type="button"
                onClick={() => setIslandState(1)}
                className={`rounded-full px-3 py-0.5 text-xs font-bold transition-all ${
                  islandState === 1
                    ? 'bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                2. Tránsito
              </button>
              <button
                type="button"
                onClick={() => setIslandState(2)}
                className={`rounded-full px-3 py-0.5 text-xs font-bold transition-all ${
                  islandState === 2
                    ? 'bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                3. Bento
              </button>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: CANVAS PARTICLES & MAGNETIC BUTTON                          */}
        {/* ================================================================== */}
        {activeTab === 'canvas' && (
          <div
            onPointerMove={handleCanvasPointerMove}
            onPointerLeave={handleCanvasPointerLeave}
            onPointerDown={handleCanvasPointerDown}
            className="relative flex h-full w-full cursor-crosshair items-center justify-center overflow-hidden"
          >
            {/* 2D Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            {/* Magnetic Button */}
            <div ref={magWrapRef} className="relative z-10 p-6">
              <button
                ref={magBtnRef}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (canvasRef.current) {
                    const rect = canvasRef.current.getBoundingClientRect();
                    triggerShockwave(rect.width / 2, rect.height / 2);
                  }
                }}
                className="group relative flex items-center gap-2.5 rounded-full border border-red-500/40 bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] px-6 py-3 text-xs font-bold text-white shadow-xl shadow-red-600/30 transition-shadow hover:shadow-red-600/50 active:scale-95"
              >
                <span ref={magTextRef} className="inline-flex items-center gap-2 pointer-events-none">
                  <Zap className="h-4 w-4 text-amber-300" />
                  <span>Botón Magnético de Parada · ({waveCount} ondas)</span>
                </span>
              </button>
            </div>

            {/* Canvas Badge Indicator */}
            <div className="pointer-events-none absolute top-3 right-3 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 py-1 font-mono text-[11px] text-neutral-400 backdrop-blur-md">
              Red Cartográfica · Nodos Dinámicos
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: MICRO-INTERACTIONS & SVG MORPH                              */}
        {/* ================================================================== */}
        {activeTab === 'micro' && (
          <div className="dot-grid-subtle grid h-full w-full grid-cols-1 gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
            {/* Micro 1: Sincronización Local */}
            <div className="flex flex-col items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 text-center shadow-lg">
              <span className="text-xs font-bold text-white">Sincronización de Catálogo</span>
              <button
                type="button"
                onClick={handleStartSync}
                disabled={syncState !== 'idle'}
                className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-85"
              >
                {syncState === 'idle' && <Zap className="h-4 w-4" />}
                {syncState === 'spinning' && (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                )}
                {syncState === 'done' && (
                  <svg className="h-4 w-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path className="check-path check-drawn" d="M20 6 9 17l-5-5" />
                  </svg>
                )}
                <span>
                  {syncState === 'idle' && 'Sincronizar'}
                  {syncState === 'spinning' && 'Descargando...'}
                  {syncState === 'done' && '¡Actualizado!'}
                </span>
              </button>
              <span className="text-[11px] text-neutral-400">Trazo SVG stroke-dashoffset</span>
            </div>

            {/* Micro 2: Switch Elástico de Tarifa */}
            <div className="flex flex-col items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 text-center shadow-lg">
              <span className="text-xs font-bold text-white">Tarifa Dinámica</span>
              <button
                type="button"
                aria-label="Alternar tarifa de estudiante"
                onClick={() => setIsStudentFare(!isStudentFare)}
                className={`switch-btn relative flex h-9 w-18 items-center rounded-full border p-1 transition-colors duration-300 ${
                  isStudentFare
                    ? 'border-emerald-500/60 bg-emerald-500/20'
                    : 'border-red-500/60 bg-red-500/20'
                }`}
              >
                <div
                  className={`switch-thumb flex h-7 w-7 items-center justify-center rounded-full text-white shadow transition-all duration-300 ${
                    isStudentFare ? 'bg-emerald-500' : 'bg-[#cf1b1b]'
                  }`}
                  style={{
                    transform: isStudentFare ? 'translateX(34px)' : 'translateX(0px)',
                  }}
                >
                  <span className="text-xs font-black">{isStudentFare ? '50%' : '$'}</span>
                </div>
              </button>
              <div className="text-center">
                <div className="text-xs font-bold text-white">
                  {isStudentFare ? 'Tarifa Estudiante UTTT ($6.00)' : 'Tarifa General ($12.00)'}
                </div>
                <span className="text-[10px] text-neutral-400">Switch elástico con rebote</span>
              </div>
            </div>

            {/* Micro 3: Feedback Táctil con Pop & Burst */}
            <div className="flex flex-col items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 text-center shadow-lg">
              <span className="text-xs font-bold text-white">Calificar Servicio</span>
              <div className="relative flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleLikeClick}
                  className="relative inline-flex items-center gap-2 rounded-xl border border-pink-500/40 bg-pink-500/15 px-4 py-2 text-xs font-bold text-pink-300 transition-all hover:bg-pink-500/25 active:scale-90"
                >
                  <Heart
                    className={`h-4 w-4 fill-pink-500 text-pink-500 transition-transform duration-200 ${
                      isHeartPopping ? 'scale-150' : 'scale-100'
                    }`}
                  />
                  <span className="font-mono text-xs">{likesCount}</span>
                </button>

                {/* Burst Layer */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  {burstRings.map((id) => (
                    <React.Fragment key={id}>
                      <span className="ring-anim absolute h-10 w-10 rounded-full border-2 border-pink-500" />
                      <span className="float-plus absolute font-mono text-xs font-bold text-pink-400">
                        +1
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-neutral-400">Feedback táctil con burst</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Tip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>{TAB_TIPS[activeTab]}</span>
        </span>
        <span className="font-mono text-[11px] text-neutral-400">React 19 + Tailwind + HTML5 Canvas</span>
      </div>
    </div>
  );
};
