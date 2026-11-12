import { appConfig } from '../config/env';

export interface CatalogStatusSnapshot {
  versionCatalogo: string;
  actualizadoEnUtc: string;
  totalEmpresas: number;
  totalRutas: number;
  totalParadas: number;
  totalDestinos: number;
  fromCache?: boolean;
}

const STORAGE_KEY = 'bustrack:public:catalog-status:v1';
const CACHE_TTL_MS = 60_000;

interface CachedEnvelope {
  storedAtMs: number;
  data: CatalogStatusSnapshot;
}

let memoryEnvelope: CachedEnvelope | null = null;

export function readCachedCatalogStatus(nowMs: number = Date.now()): CatalogStatusSnapshot | null {
  if (memoryEnvelope && nowMs - memoryEnvelope.storedAtMs <= CACHE_TTL_MS) {
    return { ...memoryEnvelope.data, fromCache: true };
  }

  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as CachedEnvelope;
    if (nowMs - parsed.storedAtMs <= CACHE_TTL_MS) {
      memoryEnvelope = parsed;
      return { ...parsed.data, fromCache: true };
    }
  } catch {
    return null;
  }

  return null;
}

export function writeCachedCatalogStatus(data: CatalogStatusSnapshot, nowMs: number = Date.now()): void {
  const envelope: CachedEnvelope = { storedAtMs: nowMs, data };
  memoryEnvelope = envelope;

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
    }
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export async function fetchCatalogStatusWithCache(
  fetcher: typeof fetch = fetch
): Promise<CatalogStatusSnapshot | null> {
  const cached = readCachedCatalogStatus();
  if (cached) {
    return cached;
  }

  try {
    const resp = await fetcher(`${appConfig.apiBaseUrl}/api/v1/catalogos/estado-actualizacion`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!resp.ok) {
      return null;
    }

    const raw = (await resp.json()) as Record<string, unknown>;
    const normalized: CatalogStatusSnapshot = {
      versionCatalogo: String(raw.VersionCatalogo ?? raw.versionCatalogo ?? '1.0'),
      actualizadoEnUtc: String(raw.ActualizadoEnUtc ?? raw.actualizadoEnUtc ?? new Date().toISOString()),
      totalEmpresas: Number(raw.TotalEmpresas ?? raw.totalEmpresas ?? 3),
      totalRutas: Number(raw.TotalRutas ?? raw.totalRutas ?? 4),
      totalParadas: Number(raw.TotalParadas ?? raw.totalParadas ?? 6),
      totalDestinos: Number(raw.TotalDestinos ?? raw.totalDestinos ?? 4),
      fromCache: false,
    };

    writeCachedCatalogStatus(normalized);
    return normalized;
  } catch {
    return null;
  }
}

export function clearCatalogStatusCacheForTests(): void {
  memoryEnvelope = null;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}
