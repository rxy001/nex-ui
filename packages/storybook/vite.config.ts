import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react-swc'
import { nexUIVitePlugin } from '@nex-ui/plugins'

const dirname = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig((config) => {
  return {
    plugins: [
      react(),
      nexUIVitePlugin({
        unstable_mode: config.mode === 'development' ? 'transform' : 'emitCss',
      }),
    ],
    resolve: {
      extensions: [
        '.mjs',
        '.js',
        '.mts',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.css',
      ],
      alias: {
        '@theme': '../../theme',
        '@vanilla-extract/css/fileScope': path.join(
          dirname,
          '../css-system',
          'node_modules/@vanilla-extract/css/fileScope',
        ),
      },
    },
  }
})
