import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Shield, Lock, ExternalLink, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060911] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
                <Bus className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-white">
                Bus<span className="text-emerald-400">Track</span> UTTT
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              Plataforma de consulta y planificación de transporte público para la Región Tula-Tepeji. Desarrollada bajo metodología SDD + DevSecOps en la Universidad Tecnológica de Tula-Tepeji.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1">
                <Shield className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                Sin rastreo GPS personal
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1">
                <Lock className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                IA con Grounding Verificado
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navegación
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <a href="/#rutas" className="hover:text-emerald-400 transition-colors">
                  Rutas y Tarifas Oficiales
                </a>
              </li>
              <li>
                <a href="/#asistente-ia" className="hover:text-emerald-400 transition-colors">
                  Asistente GenAI
                </a>
              </li>
              <li>
                <a href="/#proyecto" className="hover:text-emerald-400 transition-colors">
                  Arquitectura y Alcance
                </a>
              </li>
              <li>
                <a href="/#descarga" className="hover:text-emerald-400 transition-colors">
                  Aplicación Móvil Android
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Legal y Acceso
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <Link to="/privacidad" className="hover:text-emerald-400 transition-colors">
                  Aviso de Privacidad y Términos
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition-colors">
                  Portal Corporativo (Login)
                </Link>
              </li>
              <li>
                <a
                  href="https://www.uttt.edu.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Portal Institucional UTTT</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800/70 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 BusTrack — Universidad Tecnológica de Tula-Tepeji. Todos los derechos reservados.</p>
          <p className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
            <span>El Carmen, Tula de Allende, Hidalgo, México</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
