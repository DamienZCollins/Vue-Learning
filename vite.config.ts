import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { presetAttributify, presetUno, presetTypography } from 'unocss'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetTypography(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
