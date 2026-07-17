<!--
El título del PR debe seguir Conventional Commits (se mergea con squash, así
que el título será el mensaje del commit en main). Ej: feat(pricing): ...
-->

## Resumen

<!-- Qué cambia y por qué. Enlaza el issue si aplica (Closes #123). -->

## Tipo de cambio

- [ ] feat (nueva funcionalidad)
- [ ] fix (corrección de bug)
- [ ] refactor / chore / docs / ci / style / perf / test / build
- [ ] Cambio estructural (toca arquitectura, datos o config)

## Checklist

- [ ] `pnpm run format:check`, `pnpm run lint` y `pnpm run typecheck` pasan
- [ ] `pnpm run test` (y `test:e2e` si aplica) pasan
- [ ] Actualicé la documentación afectada en este mismo PR (regla anti-drift)
- [ ] Sin em-dash (`—`) en copy de UI
- [ ] No hay secretos ni claves reales en el diff

## Notas para el reviewer

<!-- Contexto, capturas, decisiones de diseño, o "N/A". -->
