import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, LayoutDashboard, Smartphone } from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { BusTrackLogo } from './BusTrackLogo';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isAuthenticated, session, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Cómo funciona', href: '/#como-funciona' },
    { label: 'Trayecto Vivo', href: '/#trayecto-vivo' },
    { label: 'Simulador', href: '/#demo' },
    { label: 'Laboratorio PWA', href: '/#laboratorio' },
    { label: 'Funciones', href: '/#funciones' },
    { label: 'Arquitectura', href: '/#arquitectura' },
    { label: 'Cobertura', href: '/#cobertura' },
    { label: 'Equipo UTTT', href: '/#equipo' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-header">
      {/* Scroll-Driven Transit Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900/50 overflow-hidden">
        <div
          className="relative h-full bg-gradient-to-r from-[#900d0d] via-[#cf1b1b] to-amber-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Glowing Bus Head at the tip of the progress bar */}
          <div className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md shadow-red-500/80">
            <span className="h-2 w-2 rounded-full bg-[#cf1b1b]" />
          </div>
        </div>
      </div>

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
          <BusTrackLogo isDark={true} withTagline={true} />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-neutral-300 transition-all hover:bg-white/10 hover:text-white"
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
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/90 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:border-[#cf1b1b] hover:text-[#cf1b1b]"
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
                <span>Panel ({session?.userName || 'Admin'})</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full border border-transparent p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                title="Cerrar sesión"
                aria-label="Cerrar sesión de administrador"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-neutral-300 transition hover:bg-white/10 hover:text-white"
            >
              <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Acceso</span>
            </Link>
          )}

          {/* Primary CTA: Descargar app */}
          <a
            href="/#proximamente"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cf1b1b] to-[#900d0d] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-500/25 transition-all hover:shadow-red-500/40 hover:scale-105 active:scale-95"
          >
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Descargar app</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            aria-expanded={mobileOpen}
            aria-label="Abrir menú de navegación"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-neutral-800 bg-[#0c0e12]/95 px-4 pt-3 pb-6 sm:hidden backdrop-blur-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-300 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/panel"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-xl bg-neutral-800 px-4 py-3 text-xs font-bold text-white"
                  >
                    <LayoutDashboard className="h-4 w-4 text-[#cf1b1b]" />
                    <span>Panel de Control ({session?.userName})</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-rose-400 hover:bg-neutral-800"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-neutral-800/80 px-4 py-2.5 text-xs font-bold text-neutral-200 hover:text-white"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Acceso Corporativo</span>
                </Link>
              )}

              <a
                href="/#proximamente"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#cf1b1b] px-4 py-3 text-xs font-bold text-white shadow-md shadow-red-500/25"
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
