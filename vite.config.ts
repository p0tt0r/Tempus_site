import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Только для `npm run dev`: на проде /api и /uploads проксирует Nginx
  server: {
    proxy: {
      '/api': { target: 'https://umc-tempus.ru', changeOrigin: true },
      '/uploads': { target: 'https://umc-tempus.ru', changeOrigin: true },
    },
  },
})
