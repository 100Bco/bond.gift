import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

/*
 * Chạy độc lập (Vercel, máy local) không cần biến môi trường.
 * PORT và BASE_PATH vẫn được hỗ trợ nếu môi trường cung cấp (ví dụ Replit).
 */
const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
  },
  server: { port, host: '0.0.0.0', allowedHosts: true },
  preview: { port, host: '0.0.0.0', allowedHosts: true },
});
