import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeManifestIcons: false,
      manifest: {
        name: 'Technican — notatki INF.04',
        short_name: 'Technican',
        description: 'Ściąga ze składni na egzamin INF.04',
        lang: 'pl',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        background_color: '#F3F3EF',
        theme_color: '#F3F3EF',
        icons: [
          { src: 'ikona-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'ikona-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'ikona-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Fonty mają też podzbiory cyrylicy, greki itd. Do offline wystarczy łaciński z polskimi znakami.
        globPatterns: ['**/*.{js,css,html,svg,png}', '**/*latin*.woff2'],
        // Z Firebase główny plik JS ma ponad 1,5 MB, a powyżej domyślnych 2 MB Workbox
        // po cichu pomija plik i aplikacja przestaje działać offline.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
})
