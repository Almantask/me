import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The site is served from https://almantask.github.io/me/ — every asset URL is
// resolved against this. Anything referenced as "/foo" instead of
// `${import.meta.env.BASE_URL}foo` works in dev and 404s in production.
export const BASE = '/me/'

export default defineConfig({
  base: BASE,
  plugins: [
    react({
      // React Compiler 1.0 via the oxc transform. Auto-memoization matters here
      // because animation refs and handlers are where hand-written useMemo goes wrong.
      compiler: true,
    }),
    tailwindcss(),
  ],
  build: {
    target: 'es2023',
    cssMinify: 'lightningcss',
    reportCompressedSize: true,
    rolldownOptions: {
      output: {
        // React and GSAP are grouped because they are needed eagerly and change far
        // less often than the content. Motion is deliberately NOT grouped — forcing
        // it into one chunk would undo the lazy feature-bundle split in App.tsx.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules\/(react|react-dom|scheduler)\// },
            { name: 'gsap', test: /node_modules\/(gsap|@gsap)\// },
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    globals: true,
    coverage: { reporter: ['text', 'lcov'], include: ['src/**/*.{ts,tsx}'] },
  },
})
