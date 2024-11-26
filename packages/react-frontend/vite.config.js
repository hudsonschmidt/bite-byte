import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any required alias if needed
    },
  },
  build: {
    outDir: "build",
    rollupOptions: {
      external: [
        'bootstrap/dist/css/bootstrap.min.css',
      ],
    },
    base: './', // Use relative paths for assets
  },
});

