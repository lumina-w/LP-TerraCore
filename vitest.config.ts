/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/utils/**', 'src/scripts/**', 'src/pages/api/**'],
      // Contrato de cobertura (trinquete anti-regresión). La superficie
      // testeable es pequeña (constants + scripts), por eso los pisos de
      // funcs/branches son más bajos que el de líneas/statements. Subirlos a
      // medida que se agreguen tests, nunca bajarlos.
      thresholds: {
        statements: 80,
        lines: 80,
        functions: 60,
        branches: 45,
      },
    },
  },
});
