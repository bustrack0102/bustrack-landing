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
import { BusTrackLogo } from '../shared/components/BusTrackLogo';

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

    if (!claveInput) {
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
        setFormError(result.message || 'Credenciales no reconocidas.');
      }
    } catch {
      setFormError('Ocurrió un error inesperado al procesar la autenticación.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-12 bg-[#fbf9f8]">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-block transition hover:scale-105" aria-label="Volver al inicio">
            <BusTrackLogo />
          </Link>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#cf1b1b] border border-[#ffdbc5]">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#1b1c1c]">Inicio de sesión corporativo</h1>
            <p className="mt-1.5 text-xs text-neutral-500">
              Ingresa tus credenciales autorizadas de BusTrack UTTT.
            </p>
          </div>

          {formError && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-medium text-rose-800"
            >
              <AlertTriangle className="h-4 w-4 shrink-0 text-[#cf1b1b] mt-0.5" aria-hidden="true" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="input-usuario"
                className="mb-1.5 block text-xs font-semibold text-[#1b1c1c]"
              >
                Usuario
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
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
                  className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm text-[#1b1c1c] placeholder-neutral-400 focus:border-[#cf1b1b] focus:outline-none focus:ring-2 focus:ring-[#cf1b1b]/20"
                />
              </div>
              {userError && (
                <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                  {userError}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="input-clave"
                className="mb-1.5 block text-xs font-semibold text-[#1b1c1c]"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
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
                  className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pl-10 pr-11 text-sm text-[#1b1c1c] placeholder-neutral-400 focus:border-[#cf1b1b] focus:outline-none focus:ring-2 focus:ring-[#cf1b1b]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowClave((prev) => !prev)}
                  aria-label="Mostrar u ocultar contraseña"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
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
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                  <span>Bloq Mayús activado</span>
                </div>
              )}

              {claveError && (
                <p className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
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
                  className="h-4 w-4 rounded border-neutral-300 text-[#cf1b1b] focus:ring-[#cf1b1b]"
                />
                <label htmlFor="input-recordarme" className="text-xs font-medium text-neutral-700">
                  Recordarme
                </label>
              </div>
              <p className="mt-1 text-[11px] text-neutral-500">
                Mantiene tu sesión activa en este equipo.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#cf1b1b] px-4 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-red-500/20 transition hover:bg-[#900d0d] disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>{submitting ? 'Verificando...' : 'Ingresar'}</span>
            </button>
          </form>

          <div className="mt-5 border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={handleFillDemo}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-[#fff0e8] hover:text-[#cf1b1b] hover:border-[#ffdbc5]"
            >
              <KeyRound className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
              <span>Cargar Credenciales Demo Evaluador UTTT</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500">
          <ShieldCheck className="h-3.5 w-3.5 text-[#cf1b1b]" aria-hidden="true" />
          <span>Datos protegidos</span>
          <span>·</span>
          <Link to="/privacidad" className="text-[#cf1b1b] font-semibold hover:underline">
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </div>
  );
};
