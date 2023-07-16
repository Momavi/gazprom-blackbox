import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  server: {
    proxy: {
      // Пример настройки прокси для перенаправления запросов с "/api" на "http://localhost:3000/api"
      '/files': {
        target: 'http://localhost:9090/files',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  resolve: {
    alias: {
      '@stores': path.resolve(__dirname, './src/stores'),
    },
  },
  plugins: [ vue() ],
});
