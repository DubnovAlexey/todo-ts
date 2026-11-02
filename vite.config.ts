import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative paths: the build works on GitHub Pages (/todo-ts/) and inside an iframe in UNIVERSE
  base: './',
})
