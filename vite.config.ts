import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/elf-cosmetics-dashboard/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
