import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12 bg-[#fbf9f8]">
      <div className="max-w-md rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#cf1b1b] border border-[#ffdbc5]">
          <Compass className="h-8 w-8 text-[#cf1b1b]" aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-[#1b1c1c]">Página no encontrada</h1>
        <p className="mt-2 text-sm text-[#555555]">
          La ruta solicitada no existe en el portal BusTrack UTTT. Verifica la dirección o regresa a la página principal.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#cf1b1b] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-red-500/20 hover:bg-[#900d0d]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Ir al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
