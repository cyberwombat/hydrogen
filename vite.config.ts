/// <reference types="vitest" />
import hydrogen from '@shopify/hydrogen/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [hydrogen()],
  resolve: {
    alias: [{ find: /^~\/(.*)/, replacement: '/src/$1' }]
  },
  optimizeDeps: {
    include: ['@headlessui/react', 'clsx', 'react-use', 'typographic-base']
  }
})
