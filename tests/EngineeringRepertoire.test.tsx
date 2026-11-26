import { describe, it, expect, beforeEach } from 'vitest';
import {
  initAnalyticsIfConsented,
  isValidMeasurementId,
  resetAnalyticsForTests,
  trackPageView,
} from '../src/core/analytics/gtag';
import { appConfig } from '../src/core/config/env';

describe('BusTrack Landing — Repertorio de Ingeniería (10 Pilares)', () => {
  beforeEach(() => {
    resetAnalyticsForTests();
    document.head.querySelectorAll('script[data-bustrack-ga4]').forEach((el) => el.remove());
    delete window.gtag;
    delete window.dataLayer;
  });

  it('Property-based: isValidMeasurementId cumple invariantes para IDs válidos e inválidos', () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 20; i++) {
      let suffix = '';
      for (let j = 0; j < 10; j++) {
        suffix += chars[(i * 7 + j * 13) % chars.length];
      }
      expect(isValidMeasurementId(`G-${suffix}`)).toBe(true);
      expect(isValidMeasurementId(`X-${suffix}`)).toBe(false);
    }
  });

  it('Golden Master & Compatibilidad: appConfig mantiene esquema y GA4 por defecto', () => {
    expect(Object.keys(appConfig).sort()).toEqual([
      'apiBaseUrl',
      'enableDemoAuth',
      'gaMeasurementId',
      'genaiBaseUrl',
      'playStoreUrl',
      'requestTimeoutMs',
    ]);
    expect(appConfig.gaMeasurementId).toBe('G-XX5FZKDF1B');
  });

  it('Idempotencia: múltiples llamadas a initAnalyticsIfConsented crean un único script', () => {
    expect(initAnalyticsIfConsented('G-XX5FZKDF1B', true)).toBe(true);
    expect(initAnalyticsIfConsented('G-XX5FZKDF1B', true)).toBe(true);
    expect(initAnalyticsIfConsented('G-XX5FZKDF1B', true)).toBe(true);

    expect(document.head.querySelectorAll('script[data-bustrack-ga4]')).toHaveLength(1);
  });

  it('Fuzzing: entradas arbitrarias no provocan excepciones en gtag wrapper', () => {
    expect(initAnalyticsIfConsented('G-XX5FZKDF1B', true)).toBe(true);
    const payloads = ['', '\0', '<script>', '///?a=1&b=2', '🚀🔥', 'x'.repeat(500)];
    for (const p of payloads) {
      expect(() => isValidMeasurementId(p)).not.toThrow();
      expect(() => trackPageView(p)).not.toThrow();
    }
  });
});
