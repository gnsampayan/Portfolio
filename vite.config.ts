import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Listen on all network interfaces
    port: 5500,       // Optional: Set a specific port
    cors: true,
  },
  assetsInclude: ['**/*.gltf', '**/*.bin'],
  publicDir: 'public',
  build: {
    assetsInlineLimit: 0,
  }
})
