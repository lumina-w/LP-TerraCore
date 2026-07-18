/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID: string;
  readonly MAIN_CTA_URL: string;
  readonly PUBLIC_SITE_URL: string;
  readonly CONTACT_WHATSAPP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
  trackEvent: (name: string, params?: Record<string, unknown>) => void;
}
