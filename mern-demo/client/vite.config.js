import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
    allowedHosts: [
      'mern-frontend-237957.onrender.com'
    ],

    proxy: {
      '/api': {
        target: 'http://mern-backend:5000',
        changeOrigin: true
      }
    }
  }
})