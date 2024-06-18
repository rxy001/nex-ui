import { defineConfig } from 'rollup'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin'

export default defineConfig([
  {
    plugins: [
      del({
        targets: './dist/*',
      }),
      vanillaExtractPlugin(),
    ],
    input: ['./src/index.js'],
    external: [
      '@vanilla-extract/rollup-plugin',
      '@vanilla-extract/vite-plugin',
    ],
    output: [
      {
        preserveModules: true,
        format: 'es',
        dir: './dist/es',
        assetFileNames({ name }) {
          return name?.replace(/^src\//, '') ?? ''
        },
      },
      {
        preserveModules: true,
        format: 'cjs',
        dir: './dist/lib',
        assetFileNames({ name }) {
          return name?.replace(/^src\//, '') ?? ''
        },
      },
    ],
  },
  {
    plugins: [dts()],
    input: './src/index.ts',
    output: {
      dir: './dist/types',
      format: 'es',
      preserveModules: true,
    },
  },
])
