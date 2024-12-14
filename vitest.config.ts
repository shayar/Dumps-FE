import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'json', 'clover'],
    },
  },
  resolve: {
    alias: {
      src: path.resolve('src/'),
      '@dumps': path.resolve('src'),
      '@dumps/icons': path.resolve('components/common/icons'),
      '@dumps/components': path.resolve('components'),
      '@dumps/theme': path.resolve('theme'),
      '@dumps/assets': path.resolve('assets'),
      '@dumps/routes': path.resolve('routes'),
      '@dumps/hooks': path.resolve('hooks'),
    },
  },
});
