import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin'
import del from 'rollup-plugin-delete'
import typescript from '@rollup/plugin-typescript'

const dirname = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig({
  plugins: [
    del({
      targets: './dist/*',
    }),
    typescript({
      tsconfig: path.resolve(dirname, 'tsconfig.json'),
    }),
    vanillaExtractPlugin(),
  ],
  input: './src/index.ts',
  external: [
    '@wui/theme',
    '@vanilla-extract/dynamic',
    '@vanilla-extract/css',
    '@vanilla-extract/css/functionSerializer',
  ],
  output: {
    preserveModules: true,
    assetFileNames({ name }) {
      return name?.replace(/^src\//, '') ?? ''
    },
    format: 'es',
    dir: './dist',
  },
})
