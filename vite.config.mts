import path from 'path';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
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
      '@dumps/api-hooks': path.resolve('api-hooks'),
      '@dumps/api-schemas': path.resolve('api-schemas'),
    },
  },
});
