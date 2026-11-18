import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // TensorFlow.js es grande, pero se carga bajo demanda solo al usar "Foto con IA".
  build: { chunkSizeWarningLimit: 1000 },
});
