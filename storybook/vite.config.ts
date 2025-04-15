import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'node:path'

export default defineConfig(() => {
  return {
    plugins: [
      svgr({
        include: '**/*.svg',
      }),
      react(),
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
      conditions: ['source', 'import', 'module', 'browser'],
      alias: {
        '@emotion/react': resolve(__dirname, 'node_modules/@emotion/react'),
      },
    },
  }
})
