import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // This allows the Tailscale URL to access the dev server
    allowedHosts: ['.ts.net', 'ubuntu-server.tailad172a.ts.net']
  }
})