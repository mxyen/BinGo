import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'BinGo - Clasifica, recicla y gana',
        short_name: 'BinGo',
        description: 'Clasifica tus residuos con IA, recicla y gana recompensas.',
        lang: 'es',
        theme_color: '#2e9d4f',
        background_color: '#f2f7f3',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Se guarda todo en caché al instalar, incluido el modelo de IA,
        // para que la app funcione completamente sin conexión.
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}', 'models/**/*.{json,bin}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
  // TensorFlow.js es pesado, pero solo se carga al usar "Foto con IA".
  build: { chunkSizeWarningLimit: 1000 },
});
