import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../src/App';
import {
  initAnalyticsIfConsented,
  isValidMeasurementId,
  resetAnalyticsForTests,
  trackPageView,
} from '../src/core/analytics/gtag';

describe('BusTrack Landing — Seguridad Fintech, Anti-XSS y Cabeceras HTTP', () => {
  beforeEach(() => {
    resetAnalyticsForTests();
    document.head.querySelectorAll('script[data-bustrack-ga4]').forEach((el) => el.remove());
    delete window.gtag;
    delete window.dataLayer;
  });

  it('bloquea inicialización de GA4 sin consentimiento explícito o con ID malicioso (anti-XSS)', () => {
    expect(isValidMeasurementId('G-XX5FZKDF1B')).toBe(true);
    expect(isValidMeasurementId('G-12345"><script>alert(1)</script>')).toBe(false);
    expect(isValidMeasurementId('javascript:alert(1)')).toBe(false);

    expect(initAnalyticsIfConsented('G-XX5FZKDF1B', false)).toBe(false);
    expect(document.head.querySelector('script[data-bustrack-ga4]')).toBeNull();

    expect(initAnalyticsIfConsented('G-BAD"><img onerror=alert(1)>', true)).toBe(false);
    expect(document.head.querySelector('script[data-bustrack-ga4]')).toBeNull();
  });

  it('elimina query strings con posible PII/tokens antes de enviar page_view a GA4', () => {
    expect(initAnalyticsIfConsented('G-XX5FZKDF1B', true)).toBe(true);
    const events: unknown[] = [];
    window.gtag = (...args: unknown[]) => {
      events.push(args);
    };

    trackPageView('/panel?token=secret.jwt&email=user@uttt.edu.mx');

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual([
      'event',
      'page_view',
      {
        page_path: '/panel',
        send_to: 'G-XX5FZKDF1B',
      },
    ]);
  });

  it('garantiza rel="noopener noreferrer" y ausencia de javascript: en todos los enlaces externos', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    for (const link of links) {
      const href = link.getAttribute('href') ?? '';
      expect(href.toLowerCase()).not.toContain('javascript:');
      if (link.getAttribute('target') === '_blank') {
        const rel = link.getAttribute('rel') ?? '';
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
    }
  });

  it('impide acceso directo a /panel sin sesión autenticada (fail-closed)', () => {
    render(
      <MemoryRouter initialEntries={['/panel']}>
        <App />
      </MemoryRouter>
    );

    // Debe redirigir fuera de /panel hacia /login o /denegado sin exponer el panel
    expect(screen.queryByText(/Cerrar Sesión/i)).toBeNull();
  });

  it('rechaza cargas útiles XSS o inválidas en el simulador interactivo de rutas sin inyectar DOM', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Ver más/i }));
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
    fireEvent.change(inputs[0], { target: { value: '<img src=x onerror=alert(1)>' } });
    expect(document.querySelector('img[onerror]')).toBeNull();
  });

  it('no almacena credenciales en texto plano en localStorage/sessionStorage tras carga inicial', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    const dump = JSON.stringify({ ...localStorage, ...sessionStorage }).toLowerCase();
    expect(dump).not.toContain('password');
    expect(dump).not.toContain('secret');
  });
});
