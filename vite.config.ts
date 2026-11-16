import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const injectViteEntry = (html: string) =>
  html
    .replace(/<script[^>]*data-standalone-boot[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(
      /<!--\s*VITE_ENTRY_MOUNT\s*-->/g,
      '<script type="module" src="/src/main.tsx"></script>'
    );

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      {
        name: 'papies-entry-resolver',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('.html')) {
            return injectViteEntry(code);
          }
          return null;
        },
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return injectViteEntry(html);
          },
        },
      },
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
