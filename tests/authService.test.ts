import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  computeBoundedExpiry,
  loadStoredSession,
  saveStoredSession,
  clearStoredSession,
  loginWithApi,
  logoutFromApi,
} from '../src/core/services/authService';

describe('AuthService — Contratos y Seguridad de Sesión', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('acota la expiración a un máximo de 24 horas', () => {
    const future48h = new Date(Date.now() + 48 * 3600 * 1000).toISOString();
    const bounded = computeBoundedExpiry(future48h);
    expect(bounded).not.toBeNull();
    const diffHours = (Date.parse(bounded!) - Date.now()) / (3600 * 1000);
    expect(diffHours).toBeLessThanOrEqual(24.05);
    expect(diffHours).toBeGreaterThan(23.9);
  });

  it('rechaza fechas de expiración en el pasado devolviendo null', () => {
    const pastIso = new Date(Date.now() - 60_000).toISOString();
    expect(computeBoundedExpiry(pastIso)).toBeNull();
  });

  it('almacena, recupera y limpia la sesión en sessionStorage', () => {
    const futureIso = new Date(Date.now() + 3600 * 1000).toISOString();
    saveStoredSession({
      userName: 'operador01',
      bearerValue: 'jwt-valid-sample',
      expiresAtIso: futureIso,
      rememberMe: true,
    });

    const loaded = loadStoredSession();
    expect(loaded).not.toBeNull();
    expect(loaded?.userName).toBe('operador01');

    clearStoredSession();
    expect(loadStoredSession()).toBeNull();
  });

  it('procesa login exitoso 200 OK desde la API central', async () => {
    const futureIso = new Date(Date.now() + 2 * 3600 * 1000).toISOString();
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          strToken: 'bearer-xyz-987',
          dteExpira: futureIso,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    );

    const res = await loginWithApi('usuario.uttt', 'ClaveValida1!', false);
    expect(res.succeeded).toBe(true);
    expect(res.kind).toBe('None');
    expect(res.session?.userName).toBe('usuario.uttt');
  });

  it('mapea 401 Unauthorized como Invalid sin filtrar detalles internos', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(null, { status: 401 })
    );

    const res = await loginWithApi('usuario.uttt', 'Incorrecta', false);
    expect(res.succeeded).toBe(false);
    expect(res.kind).toBe('Invalid');
    expect(res.message).toBe('Usuario o contraseña no válidos.');
  });

  it('mapea 429 Too Many Requests como RateLimited', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(null, { status: 429 })
    );

    const res = await loginWithApi('usuario.uttt', 'Incorrecta', false);
    expect(res.succeeded).toBe(false);
    expect(res.kind).toBe('RateLimited');
    expect(res.message).toContain('Demasiados intentos');
  });

  it('garantiza limpieza local en logout incluso si la red falla', async () => {
    const futureIso = new Date(Date.now() + 3600 * 1000).toISOString();
    saveStoredSession({
      userName: 'operador01',
      bearerValue: 'jwt-to-revoke',
      expiresAtIso: futureIso,
      rememberMe: false,
    });

    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network down'));

    const ok = await logoutFromApi('jwt-to-revoke');
    expect(ok).toBe(false);
    expect(loadStoredSession()).toBeNull();
  });
});
