import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:3333/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 不可以省略rewrite
      },
    },
  },
});
