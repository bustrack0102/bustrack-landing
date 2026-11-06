import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Bus,
  Menu,
  X,
  ShieldCheck,
  LogIn,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, session, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate('/');
  };

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Rutas y Tarifas', href: '/#rutas' },
    { label: 'Asistente IA', href: '/#asistente-ia' },
    { label: 'Proyecto UTTT', href: '/#proyecto' },
    { label: 'App Móvil', href: '/#descarga' },
    { label: 'Privacidad', href: '/privacidad' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090d16]/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        <Link
          to="/"
          className="flex items-center gap-3 text-slate-100 transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20">
            <Bus className="h-5 w-5 stroke-[2.2]" aria-hidden="true" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Bus<span className="text-emerald-400">Track</span>
            </span>
            <span className="ml-2 hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 sm:inline-block">
              UTTT · Tula-Tepeji
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === location.pathname ||
              (item.href !== '/' && location.hash && item.href.endsWith(location.hash));
            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/panel"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
              >
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                <span>{session?.userName}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-300"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span>Salir</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/20 transition hover:bg-emerald-400"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>Acceso Corporativo</span>
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Abrir menú de navegación"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-800 bg-[#0c1220] px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/70 hover:text-emerald-400"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/panel"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-300"
                  >
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    <span>Panel ({session?.userName})</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    <span>Cerrar sesión</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  <span>Iniciar sesión</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
