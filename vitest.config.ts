import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/__tests__/**',
        'src/types/**',
        'src/app/_og-template.tsx',
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'src/app/ecosystem/page.tsx',
        'src/app/ecosystem/opengraph-image.tsx',
        'src/app/enterprise/page.tsx',
        'src/app/enterprise/opengraph-image.tsx',
        'src/app/features/page.tsx',
        'src/app/features/opengraph-image.tsx',
        'src/app/pricing/page.tsx',
        'src/app/pricing/opengraph-image.tsx',
        'src/app/pt/page.tsx',
        'src/app/pt/opengraph-image.tsx',
        'src/app/roadmap/page.tsx',
        'src/app/roadmap/opengraph-image.tsx',
        'src/app/startups/page.tsx',
        'src/app/startups/opengraph-image.tsx',
        'src/app/opengraph-image.tsx',
        'src/pages/_error.tsx',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'server-only': resolve(__dirname, './src/__tests__/mocks/server-only.ts'),
    },
  },
});
