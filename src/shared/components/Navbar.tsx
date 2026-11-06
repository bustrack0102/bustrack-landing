import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, LayoutDashboard, Smartphone } from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { BusTrackLogo } from './BusTrackLogo';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Cómo funciona', href: '/#como-funciona' },
    { label: 'Funciones', href: '/#funciones' },
    { label: 'Demo interactiva', href: '/#demo' },
    { label: 'Arquitectura', href: '/#arquitectura' },
    { label: 'Cobertura', href: '/#cobertura' },
    { label: 'Equipo UTTT', href: '/#equipo' },
    { label: 'Privacidad', href: '/privacidad' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100/60 glass-header">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-[#cf1b1b] focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-white shadow-lg"
      >
        Saltar al contenido principal
      </a>

      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center transition-transform hover:scale-[1.02]"
          aria-label="BusTrack, ir al inicio"
        >
          <BusTrackLogo withTagline={true} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[#333333] transition-colors hover:bg-[#fff0e8] hover:text-[#cf1b1b]"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/panel"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-[#1b1c1c] shadow-sm transition hover:border-[#cf1b1b]/40 hover:text-[#cf1b1b]"
              >
                <LayoutDashboard className="h-4 w-4 text-[#cf1b1b]" aria-hidden="true" />
                <span>Panel ({session?.userName || 'Admin'})</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full border border-transparent p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                title="Cerrar sesión"
                aria-label="Cerrar sesión de administrador"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-[#333333] transition hover:bg-neutral-100 hover:text-[#cf1b1b]"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>Acceso</span>
            </Link>
          )}

          {/* Primary CTA: Descargar app */}
          <a
            href="/#proximamente"
            className="inline-flex items-center gap-2 rounded-full bg-[#cf1b1b] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-red-500/20 transition-all hover:bg-[#900d0d] hover:shadow-lg hover:shadow-red-500/30 active:scale-95"
          >
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            <span>Descargar app</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-700 hover:bg-neutral-100 hover:text-[#cf1b1b] focus:outline-none focus:ring-2 focus:ring-[#cf1b1b]"
            aria-expanded={mobileOpen}
            aria-label="Abrir menú de navegación"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="border-t border-rose-100/60 bg-white/95 px-4 pt-3 pb-6 sm:hidden">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-medium text-[#333333] hover:bg-[#fff0e8] hover:text-[#cf1b1b]"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/panel"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-900"
                  >
                    <LayoutDashboard className="h-4 w-4 text-[#cf1b1b]" />
                    <span>Panel de Control ({session?.userName})</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-800 hover:text-[#cf1b1b]"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Acceso Corporativo</span>
                </Link>
              )}

              <a
                href="/#proximamente"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#cf1b1b] px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-red-500/20"
              >
                <Smartphone className="h-4 w-4" />
                <span>Descargar app (Google Play)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
