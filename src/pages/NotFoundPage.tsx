import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12">
      <div className="max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 text-center shadow-xl">
        <Compass className="mx-auto h-12 w-12 text-emerald-400" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-extrabold text-white">Página no encontrada</h1>
        <p className="mt-2 text-sm text-slate-400">
          La ruta solicitada no existe en el portal BusTrack UTTT. Verifica la dirección o regresa a la página principal.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
