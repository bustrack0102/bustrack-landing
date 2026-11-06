export interface AppConfig {
  readonly apiBaseUrl: string;
  readonly genaiBaseUrl: string;
  readonly requestTimeoutMs: number;
  readonly enableDemoAuth: boolean;
}

const rawApiUrl = import.meta.env?.VITE_API_BASE_URL ?? 'http://localhost:8000';
const rawGenaiUrl = import.meta.env?.VITE_GENAI_BASE_URL ?? 'http://localhost:8001';

export const appConfig: AppConfig = {
  apiBaseUrl: rawApiUrl.replace(/\/+$/, ''),
  genaiBaseUrl: rawGenaiUrl.replace(/\/+$/, ''),
  requestTimeoutMs: 15000,
  enableDemoAuth: (import.meta.env?.VITE_ENABLE_DEMO_AUTH ?? 'true') !== 'false',
};
