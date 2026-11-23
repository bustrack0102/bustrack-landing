import React from 'react';
import { Link } from 'react-router-dom';
import { BusTrackLogo } from './BusTrackLogo';
import { Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-[#1f1f1f] text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block" aria-label="BusTrack inicio">
              <BusTrackLogo isDark={true} withTagline={true} />
            </Link>
            <p className="mt-4 text-sm font-medium leading-relaxed text-neutral-400">
              Entiende tus rutas. Disfruta más tu camino.
            </p>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed max-w-sm">
              Plataforma tecnológica de información y planificación de transporte público para el estado de Hidalgo. Desarrollada por estudiantes de la Universidad Tecnológica de Tula-Tepeji.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/80 px-3.5 py-1.5 text-xs text-neutral-300">
                <MapPin className="h-3.5 w-3.5 text-[#cf1b1b]" />
                <span>Región Tula-Tepeji & Pachuca · Hidalgo, México</span>
              </div>
              <a
                href="https://www.facebook.com/share/1CfjGyzDY8/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BusTrack en Facebook"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/80 hover:bg-[#1877F2] hover:border-[#1877F2] px-3.5 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white transition"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/bustrack0102/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BusTrack en Instagram"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/80 hover:bg-gradient-to-tr hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:border-pink-400 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white transition"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Col 1: Explora */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-100">
              Explora
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="/#como-funciona"
                  className="transition hover:text-white hover:underline underline-offset-4"
                >
                  Cómo funciona
                </a>
              </li>
              <li>
                <a
                  href="/#funciones"
                  className="transition hover:text-white hover:underline underline-offset-4"
                >
                  Funciones clave
                </a>
              </li>
              <li>
                <a
                  href="/#demo"
                  className="transition hover:text-white hover:underline underline-offset-4"
                >
                  Demo interactiva
                </a>
              </li>
              <li>
                <a
                  href="/#arquitectura"
                  className="transition hover:text-white hover:underline underline-offset-4"
                >
                  Arquitectura y Etapas
                </a>
              </li>
              <li>
                <a
                  href="/#cobertura"
                  className="transition hover:text-white hover:underline underline-offset-4"
                >
                  Mapa de Cobertura
                </a>
              </li>
              <li>
                <a
                  href="/#proximamente"
                  className="transition hover:text-white hover:underline underline-offset-4"
                >
                  Descargar app
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: UTTT & Proyecto */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-100">
              Información
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="/#equipo"
                  className="transition hover:text-white hover:underline underline-offset-4"
                >
                  Equipo de desarrollo
                </a>
              </li>
              <li>
                <span className="text-neutral-400">UTTT · IDGS 10mo</span>
              </li>
              <li>
                <span className="text-neutral-400">Proyecto de Integradora</span>
              </li>
              <li>
                <span className="text-neutral-400">Asesor: Ing. Angel Alvarado</span>
              </li>
              <li>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white"
                >
                  <span>Acceso Corporativo</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Privacidad */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-100">
              Legal y Ética
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/privacidad"
                  className="transition hover:text-white hover:underline underline-offset-4"
                >
                  Aviso de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/manejo-datos"
                  className="transition hover:text-white hover:underline underline-offset-4"
                >
                  Manejo de Datos
                </Link>
              </li>
              <li>
                <span className="text-neutral-400">Sin rastreo GPS de usuarios</span>
              </li>
              <li>
                <span className="text-neutral-400">Grounding estricto de IA</span>
              </li>
              <li>
                <span className="text-neutral-400">Consentimiento de sensores</span>
              </li>
              <li>
                <span className="text-neutral-400">Validación humana de paradas</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row text-xs text-neutral-400">
          <p className="flex items-center gap-1.5">
            <span>© 2025 BusTrack · Universidad Tecnológica de Tula-Tepeji.</span>
            <span className="hidden sm:inline">· Todos los derechos reservados.</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <span>Hecho con</span>
              <Heart className="h-3.5 w-3.5 text-[#cf1b1b] fill-[#cf1b1b]" />
              <span>en Hidalgo, México</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
