// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: "__tla",
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: i => `__tla_${i}`
      })
  ],
})