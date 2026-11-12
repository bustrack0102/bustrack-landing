import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../src/App';
import {
  initAnalyticsIfConsented,
  resetAnalyticsForTests,
  trackPageView,
} from '../src/core/analytics/gtag';
import {
  clearCatalogStatusCacheForTests,
  fetchCatalogStatusWithCache,
} from '../src/core/cache/publicStatusCache';

describe('BusTrack Landing Etapa 4 — Manejo de Datos, GA4 Consentido y Caché SWR', () => {
  beforeEach(() => {
    resetAnalyticsForTests();
    clearCatalogStatusCacheForTests();
    window.sessionStorage?.clear?.();
    if (typeof window.localStorage?.clear === 'function') {
      window.localStorage.clear();
    }
    document.head.querySelectorAll('script[data-bustrack-ga4]').forEach((el) => el.remove());
  });

  it('renderiza la ruta pública /manejo-datos con encabezados accesibles', () => {
    render(
      <MemoryRouter initialEntries={['/manejo-datos']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Manejo y Ciclo de Vida de Datos/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/DELETE \/api\/v1\/usuarios\/me/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver Aviso de Privacidad/i })).toBeInTheDocument();
  });

  it('solo inicializa Google Analytics 4 cuando existe consentimiento y Measurement ID válido', () => {
    expect(initAnalyticsIfConsented('G-BUSTRACK01', false)).toBe(false);
    expect(document.head.querySelector('script[data-bustrack-ga4]')).toBeNull();

    expect(initAnalyticsIfConsented('INVALIDO', true)).toBe(false);

    expect(initAnalyticsIfConsented('G-BUSTRACK01', true)).toBe(true);
    const script = document.head.querySelector('script[data-bustrack-ga4="G-BUSTRACK01"]');
    expect(script).not.toBeNull();

    trackPageView('/privacidad?email=omitido');
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });

  it('utiliza caché local SWR antes de volver a consultar la API pública', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        VersionCatalogo: '1.42.10',
        ActualizadoEnUtc: '2026-11-12T00:00:00Z',
        TotalEmpresas: 3,
        TotalRutas: 4,
        TotalParadas: 6,
        TotalDestinos: 4,
      }),
    });

    const first = await fetchCatalogStatusWithCache(fetchMock as unknown as typeof fetch);
    const second = await fetchCatalogStatusWithCache(fetchMock as unknown as typeof fetch);

    expect(first?.versionCatalogo).toBe('1.42.10');
    expect(second?.fromCache).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
