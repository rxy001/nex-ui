import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import { nexUIRollupPlugin } from '@nex-ui/plugins'

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
      nexUIRollupPlugin(),
    ],
    input: './src/index.ts',
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-dom/client',
      '@nex-ui/utils',
      '@nex-ui/css-system',
      'classnames',
      'framer-motion',
      '@iconify/react',
      '@vanilla-extract/dynamic',
      '@vanilla-extract/css',
      '@vanilla-extract/css/functionSerializer',
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
