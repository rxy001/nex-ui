import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'

const dirname = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig([
  {
    plugins: [
      del({
        targets: './dist/*',
      }),

      typescript({
        tsconfig: path.resolve(dirname, 'tsconfig.json'),
      }),
    ],
    input: './src/index.ts',
    external: ['react'],
    output: [
      {
        format: 'es',
        dir: './dist/es',
        preserveModules: true,
      },
      {
        format: 'cjs',
        preserveModules: true,
        dir: './dist/lib',
      },
    ],
  },
  {
    plugins: [dts()],
    input: './src/index.ts',
    output: { dir: './dist/types', format: 'es', preserveModules: true },
  },
])
