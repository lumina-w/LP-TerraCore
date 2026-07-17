# Política de seguridad

## Reportar una vulnerabilidad

Si encuentras una vulnerabilidad en este proyecto, **no abras un issue público**.

Canal preferido: **GitHub Private Vulnerability Reporting**. En la pestaña
**Security** del repositorio, usa "Report a vulnerability". Requiere que la
opción esté habilitada en `Settings → Code security → Private vulnerability
reporting`.

Como alternativa, escribe a **wavival.dev@luminaw.co** (idealmente configurar un
alias dedicado `security@luminaw.co`). Incluye:

- Descripción de la vulnerabilidad y su impacto.
- Pasos para reproducirla (PoC si es posible).
- Versión / commit afectado.

Nos comprometemos a acusar recibo en un plazo razonable y a mantenerte al tanto
del avance de la corrección.

## Alcance

Este repositorio es una landing page estática (Astro) que se despliega en
Netlify. Áreas de interés:

- El formulario de contacto (`ContactForm.astro`) que envía a Supabase con la
  anon key pública (pública por diseño, protegida por RLS del lado de Supabase).
- Cualquier fuga de secretos reales (claves de servidor, tokens) en el bundle o
  el historial de git.

## Buenas prácticas ya activas

- Secret scanning en CI (trufflehog, `--only-verified`) y auditoría de
  dependencias (`pnpm audit --audit-level=high`).
- Dependabot para actualizaciones de dependencias y GitHub Actions.
- Solo variables con prefijo `PUBLIC_*` llegan al cliente; `.env` está ignorado.

Ver `docs/GOVERNANCE.md` para el estándar de seguridad de la organización.
