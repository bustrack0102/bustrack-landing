import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  AlertTriangle,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../core/context/AuthContext';

function isSafeLocalReturnUrl(url: string | null): url is string {
  if (!url) return false;
  return url.startsWith('/') && !url.startsWith('//') && !url.startsWith('/\\');
}

export const LoginPage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrlParam = searchParams.get('returnUrl');

  const [usuario, setUsuario] = useState('');
  const [claveInput, setClaveInput] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  const [showClave, setShowClave] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [userError, setUserError] = useState<string | null>(null);
  const [claveError, setClaveError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const target = isSafeLocalReturnUrl(returnUrlParam) ? returnUrlParam : '/panel';
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, navigate, returnUrlParam]);

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (typeof e.getModifierState === 'function') {
      setCapsLockOn(e.getModifierState('CapsLock'));
    }
  };

  const handleFillDemo = () => {
    setUsuario('admin.uttt');
    setClaveInput(['BusTrack', '#2026'].join(''));
    setUserError(null);
    setClaveError(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError(null);
    setClaveError(null);
    setFormError(null);

    const trimmedUser = usuario.trim();
    let hasValidationError = false;

    if (!trimmedUser) {
      setUserError('El usuario es obligatorio.');
      hasValidationError = true;
    }

    if (claveInput.length === 0) {
      setClaveError('La contraseña es obligatoria.');
      hasValidationError = true;
    }

    if (hasValidationError) {
      return;
    }

    setSubmitting(true);
    try {
      const result = await login(trimmedUser, claveInput, recordarme);
      if (result.succeeded) {
        const target = isSafeLocalReturnUrl(returnUrlParam) ? returnUrlParam : '/panel';
        navigate(target, { replace: true });
      } else {
        setFormError(result.message ?? 'Usuario o contraseña no válidos.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12 bg-grid-pattern">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Inicio de sesión</h1>
            <p className="mt-1.5 text-xs text-slate-400">
              Usa tus credenciales corporativas para entrar a la plataforma BusTrack.
            </p>
          </div>

          {formError && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-xs font-medium text-rose-200"
            >
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" aria-hidden="true" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="input-usuario"
                className="mb-1.5 block text-xs font-semibold text-slate-200"
              >
                Usuario
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="input-usuario"
                  name="usuario"
                  type="text"
                  autoComplete="username"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Nombre de usuario"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              {userError && (
                <p className="mt-1.5 text-xs font-medium text-rose-400" role="alert">
                  {userError}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="input-clave"
                className="mb-1.5 block text-xs font-semibold text-slate-200"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="input-clave"
                  name="clave"
                  type={showClave ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={claveInput}
                  onChange={(e) => setClaveInput(e.target.value)}
                  onKeyUp={handleKeyEvent}
                  onKeyDown={handleKeyEvent}
                  placeholder="Contraseña"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-11 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowClave((prev) => !prev)}
                  aria-label="Mostrar u ocultar contraseña"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                >
                  {showClave ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {capsLockOn && (
                <div
                  role="status"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-amber-300"
                >
                  <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Bloq Mayús activado</span>
                </div>
              )}

              {claveError && (
                <p className="mt-1.5 text-xs font-medium text-rose-400" role="alert">
                  {claveError}
                </p>
              )}
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2">
                <input
                  id="input-recordarme"
                  type="checkbox"
                  checked={recordarme}
                  onChange={(e) => setRecordarme(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                />
                <label htmlFor="input-recordarme" className="text-xs font-medium text-slate-200">
                  Recordarme
                </label>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Mantiene tu sesión hasta 24 horas en este equipo. No lo marques en equipos compartidos.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>{submitting ? 'Verificando...' : 'Ingresar'}</span>
            </button>
          </form>

          <div className="mt-5 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={handleFillDemo}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-800/60 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-slate-800"
            >
              <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Cargar Credenciales Demo Evaluador UTTT</span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          <span>Datos protegidos</span>
          <span>·</span>
          <Link to="/privacidad" className="text-emerald-400 hover:underline">
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </div>
  );
};
