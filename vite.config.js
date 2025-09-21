import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss()],
  server: {
    allowedHosts: [
      '6c2673ad81eb.ngrok-free.app' // add your ngrok domain here
    ]
  }
})
