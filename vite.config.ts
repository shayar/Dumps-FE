import { defineConfig } from 'vite';
import path from 'path';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({ eslint: { lintCommand: 'eslint src' }, overlay: false }),
  ],
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
