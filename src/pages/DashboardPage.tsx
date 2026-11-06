import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  UserCheck,
  Lock,
  LogOut,
  CheckCircle2,
  Clock,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../core/context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-[#fbf9f8] min-h-[calc(100vh-140px)]">
      <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-[#fff0e8] via-white to-[#fff8f4] p-6 sm:p-8 shadow-warm-md">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cf1b1b]/30 bg-[#fff0e8] px-3 py-1 text-xs font-bold text-[#900d0d]">
              <Lock className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
              Sesión protegida
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-[#1b1c1c] sm:text-3xl">
              Bienvenido {session?.userName}!!
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Sesión iniciada correctamente en el Portal BusTrack UTTT.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#cf1b1b] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-red-500/20 transition hover:bg-[#900d0d]"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span>Cerrar sesión segura</span>
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e8] text-[#cf1b1b]">
            <UserCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-base font-bold text-[#1b1c1c]">Cuenta</h2>
          <p className="mt-1 text-sm text-neutral-700">
            Usuario: <span className="font-bold text-[#cf1b1b]">{session?.userName}</span>
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            Acceso autenticado contra la API central de BusTrack.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e8] text-[#cf1b1b]">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-base font-bold text-[#1b1c1c]">Seguridad</h2>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600">
            Tu sesión está protegida con expiración de 24 horas y token Bearer seguro.
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#900d0d]">
            <Clock className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
            Expira: {session?.expiresAtIso ? new Date(session.expiresAtIso).toLocaleString('es-MX') : '24h'}
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e8] text-[#cf1b1b]">
            <Layers className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-base font-bold text-[#1b1c1c]">Contratos Activos</h2>
          <ul className="mt-2 space-y-1.5 text-xs text-neutral-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
              <span>Spec 13 · Endpoint Login</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
              <span>Spec 14 · Endpoint Logout</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
              <span>Spec 15 · Consulta Pública</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#cf1b1b] hover:text-[#900d0d]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al inicio de BusTrack</span>
        </Link>
      </div>
    </div>
  );
};
