import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url)).toString(),
)

const dirname = fileURLToPath(new URL('./', import.meta.url))

const tsconfig = path.resolve(dirname, 'tsconfig.json')

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  'react/jsx-runtime',
  'react-dom/client',
  '@emotion/cache',
  '@emotion/serialize',
]

export default defineConfig([
  {
    plugins: [
      del({
        targets: './dist/*',
      }),
      typescript({
        tsconfig,
      }),
    ],
    input: './src/index.ts',
    external,
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
    external,
    plugins: [
      dts({
        tsconfig,
        respectExternal: true,
      }),
    ],
    input: './src/index.ts',
    output: { dir: './dist/types', format: 'es', preserveModules: true },
  },
])
