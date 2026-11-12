/**
 * Google Analytics 4 (gtag.js) consent-aware wrapper without PII tracking (Req. 17 & Spec 11).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_SCRIPT_ATTR = 'data-bustrack-ga4';
let initializedId: string | null = null;

export function isValidMeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]{6,16}$/i.test(id.trim());
}

export function initAnalyticsIfConsented(measurementId: string, hasConsent: boolean): boolean {
  if (!hasConsent || !isValidMeasurementId(measurementId)) {
    return false;
  }

  const cleanId = measurementId.trim();
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  if (initializedId === cleanId) {
    return true;
  }

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtagProxy(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  if (!document.querySelector(`script[${GA_SCRIPT_ATTR}="${cleanId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanId)}`;
    script.setAttribute(GA_SCRIPT_ATTR, cleanId);
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', cleanId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  initializedId = cleanId;
  return true;
}

export function trackPageView(path: string): void {
  if (!initializedId || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const safePath = path.split('?')[0] || '/';
  window.gtag('event', 'page_view', {
    page_path: safePath,
    send_to: initializedId,
  });
}

export function trackPlayStoreClick(placement: string): void {
  if (!initializedId || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'play_store_redirect', {
    event_category: 'engagement',
    event_label: placement,
  });
}

export function resetAnalyticsForTests(): void {
  initializedId = null;
}
