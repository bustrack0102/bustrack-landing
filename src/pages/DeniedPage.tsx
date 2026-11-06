import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';

export const DeniedPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12 bg-[#fbf9f8]">
      <div className="max-w-md rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-[#cf1b1b] border border-rose-200">
          <ShieldAlert className="h-8 w-8 text-[#cf1b1b]" aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-[#1b1c1c]">Acceso denegado</h1>
        <p className="mt-2 text-sm text-[#555555]">
          No cuentas con los permisos necesarios para acceder a este recurso o tu sesión ha expirado.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#cf1b1b] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-red-500/20 hover:bg-[#900d0d]"
          >
            <LogIn className="h-4 w-4" />
            <span>Iniciar sesión</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
