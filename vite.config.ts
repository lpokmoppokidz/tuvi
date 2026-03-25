// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: { host: 'localhost', port: 3000 },
      watch: { usePolling: true, interval: 100 },
    },

    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },

    build: {
      // Target modern browsers — smaller output, no legacy polyfills
      target: 'es2020',

      // esbuild is built-in — no terser install needed
      minify: 'esbuild',

      // Warn when a chunk exceeds 600 KB
      chunkSizeWarningLimit: 600,

      rollupOptions: {
        output: {
          // Section 3: manual chunks — vendor libs cached separately
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'motion':        ['motion/react'],
            'zustand':       ['zustand'],
            'query':         ['@tanstack/react-query'],
            'i18n':          ['react-i18next', 'i18next'],
            'icons':         ['lucide-react'],
          },
        },
      },
    },

    // Section 3: esbuild drop console/debugger in prod
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : [],
      // Smaller output — remove legal comments in prod
      legalComments: isProd ? 'none' : 'inline',
    },
  };
});
