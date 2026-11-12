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
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/80 px-3.5 py-1.5 text-xs text-neutral-300">
              <MapPin className="h-3.5 w-3.5 text-[#cf1b1b]" />
              <span>Región Tula-Tepeji & Pachuca · Hidalgo, México</span>
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
