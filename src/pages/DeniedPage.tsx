import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const DeniedPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12">
      <div className="max-w-md rounded-2xl border border-rose-500/30 bg-slate-900/90 p-8 text-center shadow-xl">
        <ShieldAlert className="mx-auto h-12 w-12 text-rose-400" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-extrabold text-white">Acceso denegado</h1>
        <p className="mt-2 text-sm text-slate-300">
          No cuentas con los permisos necesarios para acceder a este recurso o tu sesión ha expirado.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
