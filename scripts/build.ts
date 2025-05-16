import argsParse from 'yargs-parser'
import path from 'node:path'
import dts from 'rollup-plugin-dts'
import swc from '@rollup/plugin-swc'
import fs from 'node:fs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { preserveDirectives } from 'rollup-plugin-preserve-directives'
import type { RollupOptions } from 'rollup'
import { rollup } from './utils'

type SharedConfigs = { external: (string | RegExp)[]; name: string }

build()

async function build() {
  const args = argsParse(process.argv.slice(2))

  const cwd = process.cwd()

  const pkg = JSON.parse(
    fs.readFileSync(path.resolve(cwd, 'package.json')).toString(),
  )

  const { name } = pkg

  const external = [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
    /node_modules/,
  ]

  console.log(`[${name}] Building...`)

  if (args.clean) {
    const distDir = path.join(cwd, 'dist')
    fs.rmSync(distDir, { recursive: true, force: true })
  }

  await generateModules({ external, name })

  if (args.dts) {
    await generateTypes({ external, name })
  }
}

async function generateModules({ external, name }: SharedConfigs) {
  const config: RollupOptions = {
    external,
    input: './src/index.ts',
    plugins: [
      nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      swc({
        swc: {
          jsc: {
            parser: { tsx: true, syntax: 'typescript' },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      }),
      preserveDirectives(),
    ],
    output: [
      {
        format: 'es',
        entryFileNames: '[name].mjs',
        dir: 'dist/esm',
        preserveModules: true,
      },
      {
        format: 'cjs',
        entryFileNames: '[name].cjs',
        dir: 'dist/cjs',
        preserveModules: true,
        interop: 'auto',
      },
    ],
    onwarn(warning, warn) {
      // Suppress "Module level directives cause errors when bundled" warnings
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return
      }
      warn(warning)
    },
  }
  await rollup(config)

  console.log(`[${name}] [JS] Generated CJS and ESM files ✅`)
}

async function generateTypes({ external, name }: SharedConfigs) {
  const cwd = process.cwd()

  const config: RollupOptions = {
    external,
    input: './src/index.ts',
    plugins: [
      nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      dts({
        tsconfig: path.resolve(cwd, './tsconfig.json'),
        respectExternal: true,
        compilerOptions: {
          preserveSymlinks: true,
        },
      }),
    ],
    output: { dir: './dist/types', format: 'es', preserveModules: true },
  }
  await rollup(config)

  console.log(`[${name}] [DTS] Generated type definitions ✅`)
}
