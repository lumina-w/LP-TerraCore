# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (localhost:4321)
npm run build        # production build → dist/
npm run preview      # serve dist/ locally
npm run typecheck    # astro check (TS + Astro template types)
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier write
npm run format:check # Prettier check (CI)
```

No test suite exists. Typecheck is the primary correctness gate.

## Architecture

Astro `static` output with a server adapter, no React. Static pages plus one server endpoint (`api/waitlist.ts` opts in via `export const prerender = false`). Routes: `index.astro` (landing), `terminos.astro`, `privacidad.astro`, `habeas-data.astro`, `404.astro`, and `api/waitlist.ts` (server-rendered POST). Deployed via `@astrojs/netlify` adapter.

**Render path:**
`index.astro` → `BaseLayout.astro` (head, GA4, fonts, Header, Footer, skip link) → `LandingTemplate.astro` (assembles all sections) → organisms/molecules/atoms. Legal pages use `LegalLayout.astro`, which wraps `BaseLayout`.

**Section order** (LandingTemplate):
Hero → ProofStrip → Modules → Impacto → Showcase → Benefits → SecuritySection → Pricing → MetricsBand → CaseStudies → Testimonials → FAQSection → CTAFooter, followed by `WaitlistModal`. MetricsBand, CaseStudies and Testimonials are validation-stage placeholders hidden (`display:none`) until real data exists.

**Atomic design layers** — import aliases enforce the hierarchy:

- `@atoms/*` — Eyebrow (only atom currently)
- `@molecules/*` — Brand (logo+name), FloatChip
- `@organisms/*` — all page sections, including Hero, Header, Footer, FAQSection, CTAFooter
- `@components/*` — catch-all root (ContactForm lives here)
- `@templates/*` — LandingTemplate
- `@utils/*` — constants, analytics, cn
- `@layouts/*` — BaseLayout, LegalLayout

**Styling approach:**

- `src/styles/globals.css` — all CSS custom properties (design tokens). Always use token names, never raw hex values. Imported once in BaseLayout via `@layer base/components/utilities`.
- Tailwind v3 configured in `tailwind.config.mjs`, processed via `postcss.config.mjs` (no `@astrojs/tailwind` integration; dropped in the Astro 6 upgrade). The `@tailwind base/components/utilities` directives live at the top of globals.css. Extends tokens from globals.css into Tailwind's theme. Prefer CSS custom properties over Tailwind utility classes for colors/spacing in component `<style>` blocks.
- Scoped `<style>` blocks in each component. Use `:global()` only for child selectors that cross component boundaries (e.g., float chip positioning from Hero.astro affecting FloatChip.astro).
- Keyframes `floatA` / `floatB` defined in globals.css, referenced in Hero.astro.

**Interactivity:**
All JS is vanilla, written in Astro `<script>` blocks (no framework). Key patterns:

- IntersectionObserver for scroll-triggered count-up (Hero); the shared `.reveal` class is wired by `src/scripts/reveal.ts`, imported once in LandingTemplate
- Dataset attributes (`data-count-to`, `data-faq`, `data-img`) drive JS behavior
- Mobile nav toggle in Header.astro uses `drawer.dataset.open` + aria attributes

**Static data:**
`src/utils/constants.ts` exports typed interfaces and arrays: `PLANS`, `PROBLEMS`, `FEATURES`, `FAQ`. Only `FAQ` is currently consumed (by `index.astro` to build the FAQPage JSON-LD); the section components still hold their copy inline. No CMS.

**Server endpoint:**
`src/pages/api/waitlist.ts` is a server-rendered POST route that forwards lead emails to Brevo. The `#demo` lead form (`ContactForm.astro`) submits to Supabase via the public anon key. Both require the env vars below.

**Analytics:**
GA4 wired in BaseLayout via `is:inline` scripts (excluded from Prettier — see `.prettierignore`). `window.trackEvent(name, params)` is available globally. `src/utils/analytics.ts` exports a typed `trackEvent` wrapper for use inside `<script>` blocks.

**Environment variables** (see `.env.example`):

- `PUBLIC_GA_ID` — GA4 measurement ID (optional; tracking disabled if absent)
- `PUBLIC_SITE_URL` — used for canonical/OG URLs
- `MAIN_CTA_URL` — primary CTA href (falls back to `/#demo` if absent)
- `CONTACT_WHATSAPP` — WhatsApp number without `+`
- `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY` — used by the `#demo` lead form (ContactForm.astro)
- `BREVO_API_KEY` / `BREVO_LIST_ID` — server-side only, used by `/api/waitlist`

**Icons:** `astro-icon` with `@iconify-json/lucide` and `@iconify-json/simple-icons`. Usage: `<Icon name="lucide:check" width={18} height={18} />`; brand marks use the `simple-icons:` prefix (e.g. `simple-icons:whatsapp`).

**Public assets:**

- `/logo.ico` — brand logo
- `/terracore.jpg` — default OG image (1200×630)
- `/images/terracore.webp` — farm photo
- `/screens/` — dashboard screenshot WebPs (dashboard-1/2, animales-1..3, insumos-1..5, produccion-1..4, salud-animal-1..6)
- `/videos/demo.mp4` — product demo video, H.264/AAC, faststart (referenced in Hero lightbox)
- `/robots.txt` — points crawlers at `sitemap-index.xml`

## Build & Deploy

`@astrojs/netlify` adapter; `netlify.toml` sets `command = "npm run build"`, `publish = "dist"`, `NODE_VERSION = 22`. `npm run build` emits static pages to `dist/` and the SSR function for `/api/waitlist` under `.netlify/`. `@astrojs/sitemap` generates `dist/sitemap-index.xml` during build. Set env vars in the Netlify panel.

## Key Constraints

- `src/layouts/BaseLayout.astro` is excluded from Prettier (`.prettierignore`) because Prettier 3 mangles `is:inline` script syntax. Edit it manually.
- `BaseLayout.astro` is also excluded from ESLint auto-fix for the same reason.
- No React, no client-side framework. All interactivity must be vanilla JS in `<script>` blocks.
- `tailwind.config.mjs` and `tailwind.config.ts` both exist — `postcss.config.mjs` loads the `.mjs` version (PostCSS resolves `tailwind.config.mjs` by convention).
- NEVER use the em-dash character (`—`) in user-facing UI copy (headings, leads, labels, button text, FAQ, plan descriptions, any rendered string). Use a comma, colon, period, or parentheses instead. This rule applies only to UI copy — em-dashes are fine in code comments and docs like this file.
