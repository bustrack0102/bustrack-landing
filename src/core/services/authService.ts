import { appConfig } from '../config/env';
import type {
  AuthFailureKind,
  AuthResult,
  LoginRequestDto,
  LoginResponseDto,
  UserSession,
} from '../models/auth';

const SESSION_STORAGE_KEY = 'bustrack_active_session_v2';
const MAX_SESSION_MS = 24 * 60 * 60 * 1000;

function mapFailureMessage(kind: AuthFailureKind): string {
  switch (kind) {
    case 'RateLimited':
      return 'Demasiados intentos. Por favor, inténtalo más tarde.';
    case 'Locked':
      return 'Tu cuenta se encuentra temporalmente bloqueada por seguridad.';
    case 'Network':
      return 'No logramos conectarnos. Por favor, verifica tu conexión a internet o inténtalo más tarde.';
    case 'Invalid':
    default:
      return 'Usuario o contraseña no válidos.';
  }
}

export function computeBoundedExpiry(remoteExpiryIso?: string): string | null {
  const nowMs = Date.now();
  const maxMs = nowMs + MAX_SESSION_MS;

  if (!remoteExpiryIso) {
    return new Date(maxMs).toISOString();
  }

  const parsedMs = Date.parse(remoteExpiryIso);
  if (Number.isNaN(parsedMs)) {
    return new Date(maxMs).toISOString();
  }

  if (parsedMs <= nowMs) {
    return null;
  }

  const boundedMs = Math.min(parsedMs, maxMs);
  return new Date(boundedMs).toISOString();
}

export function loadStoredSession(): UserSession | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as UserSession;
    if (
      !parsed ||
      typeof parsed.userName !== 'string' ||
      typeof parsed.bearerValue !== 'string' ||
      typeof parsed.expiresAtIso !== 'string'
    ) {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    if (Date.parse(parsed.expiresAtIso) <= Date.now()) {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveStoredSession(session: UserSession): void {
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Fallback silent if sessionStorage is restricted
  }
}

export function clearStoredSession(): void {
  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Ignore storage cleanup error
  }
}

export async function loginWithApi(
  rawUser: string,
  rawPass: string,
  rememberMe: boolean
): Promise<AuthResult> {
  const cleanUser = rawUser.trim();
  if (!cleanUser || rawPass.length === 0) {
    return {
      succeeded: false,
      kind: 'Invalid',
      message: mapFailureMessage('Invalid'),
    };
  }

  const payload: LoginRequestDto = {
    strNombreUsuario: cleanUser,
    strPWD: rawPass,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), appConfig.requestTimeoutMs);

  try {
    const response = await fetch(`${appConfig.apiBaseUrl}/api/v1/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.status === 200) {
      let body: LoginResponseDto | null = null;
      try {
        body = (await response.json()) as LoginResponseDto;
      } catch {
        return {
          succeeded: false,
          kind: 'Network',
          message: mapFailureMessage('Network'),
        };
      }

      const bearerCandidate = body?.strToken?.trim();
      if (!bearerCandidate) {
        return {
          succeeded: false,
          kind: 'Network',
          message: mapFailureMessage('Network'),
        };
      }

      const boundedExpiry = computeBoundedExpiry(body?.dteExpira);
      if (!boundedExpiry) {
        return {
          succeeded: false,
          kind: 'Network',
          message: mapFailureMessage('Network'),
        };
      }

      const session: UserSession = {
        userName: cleanUser,
        bearerValue: bearerCandidate,
        expiresAtIso: boundedExpiry,
        rememberMe,
      };
      saveStoredSession(session);
      return {
        succeeded: true,
        kind: 'None',
        session,
      };
    }

    if (
      response.status === 400 ||
      response.status === 401 ||
      response.status === 403 ||
      response.status === 404
    ) {
      return {
        succeeded: false,
        kind: 'Invalid',
        message: mapFailureMessage('Invalid'),
      };
    }

    if (response.status === 423) {
      return {
        succeeded: false,
        kind: 'Locked',
        message: mapFailureMessage('Locked'),
      };
    }

    if (response.status === 429) {
      return {
        succeeded: false,
        kind: 'RateLimited',
        message: mapFailureMessage('RateLimited'),
      };
    }

    return {
      succeeded: false,
      kind: 'Network',
      message: mapFailureMessage('Network'),
    };
  } catch {
    if (
      appConfig.enableDemoAuth &&
      cleanUser.toLowerCase() === 'admin.uttt' &&
      rawPass === 'BusTrack#2026'
    ) {
      const expiresAtIso = new Date(Date.now() + MAX_SESSION_MS).toISOString();
      const demoSession: UserSession = {
        userName: cleanUser,
        bearerValue: 'demo-session-uttt-verified',
        expiresAtIso,
        rememberMe,
      };
      saveStoredSession(demoSession);
      return {
        succeeded: true,
        kind: 'None',
        session: demoSession,
      };
    }

    return {
      succeeded: false,
      kind: 'Network',
      message: mapFailureMessage('Network'),
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function logoutFromApi(bearerValue?: string): Promise<boolean> {
  clearStoredSession();

  if (!bearerValue || !bearerValue.trim()) {
    return true;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), appConfig.requestTimeoutMs);

  try {
    const response = await fetch(`${appConfig.apiBaseUrl}/api/v1/Auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerValue}`,
      },
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
