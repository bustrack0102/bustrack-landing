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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-[#0d192b] to-slate-900 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Sesión protegida
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              Bienvenido {session?.userName}!!
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Sesión iniciada correctamente en el Portal BusTrack UTTT.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-2.5 text-xs font-bold text-rose-200 transition hover:bg-rose-500/25"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span>Cerrar sesión segura</span>
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <UserCheck className="h-6 w-6 text-emerald-400" aria-hidden="true" />
          <h2 className="mt-3 text-base font-bold text-white">Cuenta</h2>
          <p className="mt-1 text-sm text-slate-300">
            Usuario: <span className="font-semibold text-white">{session?.userName}</span>
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Acceso autenticado contra la API central de BusTrack.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <ShieldCheck className="h-6 w-6 text-cyan-400" aria-hidden="true" />
          <h2 className="mt-3 text-base font-bold text-white">Seguridad</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            Tu sesión está protegida con expiración máxima de 24 horas y cierre local garantizado.
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-emerald-400">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Expira: {session?.expiresAtIso ? new Date(session.expiresAtIso).toLocaleString('es-MX') : '24h'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <Layers className="h-6 w-6 text-purple-400" aria-hidden="true" />
          <h2 className="mt-3 text-base font-bold text-white">Contratos Activos</h2>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span>POST /api/v1/Auth/login</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span>POST /api/v1/Auth/logout</span>
            </li>
          </ul>
          <div className="mt-3">
            <Link to="/privacidad" className="text-xs font-semibold text-emerald-400 hover:underline">
              Consultar Aviso de Privacidad →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
