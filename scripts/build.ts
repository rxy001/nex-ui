/* eslint-disable no-console */

import argsParse from 'yargs-parser'
import path from 'node:path'
import dts from 'rollup-plugin-dts'
import typescript from '@rollup/plugin-typescript'
import fs from 'node:fs'
import svgr from '@svgr/rollup'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import type { RollupOptions, RollupBuild } from 'rollup'

type SharedConfigs = { external: string[]; tsconfig: string; name: string }

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
    'react',
    'react/jsx-runtime',
    'react-dom/client',
    '@emotion/cache',
    '@emotion/serialize',
  ]

  let tsconfig = path.resolve(cwd, 'tsconfig.build.json')

  try {
    fs.accessSync(tsconfig)
  } catch (err) {
    tsconfig = path.resolve(cwd, 'tsconfig.json')
  }

  console.log(`[${name}] Building...`)

  if (args.clean) {
    const distDir = path.join(cwd, 'dist')
    fs.rmSync(distDir, { recursive: true, force: true })
  }

  await generateModules({ tsconfig, external, name })

  if (args.dts) {
    await generateTypes({ tsconfig, external, name })
  }
}

async function generateModules({ external, tsconfig, name }: SharedConfigs) {
  const config: RollupOptions = {
    external,
    input: './src/index.ts',
    plugins: [
      svgr(),
      nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      typescript({
        tsconfig,
      }),
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
  await runRollup(config)

  console.log(`[${name}] [JS] Generated CJS and ESM files ✅`)
}

async function generateTypes({ external, tsconfig, name }: SharedConfigs) {
  const config: RollupOptions = {
    external,
    input: './src/index.ts',
    plugins: [
      nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      dts({
        tsconfig,
        respectExternal: true,
      }),
    ],
    output: { dir: './dist/types', format: 'es', preserveModules: true },
  }
  await runRollup(config)

  console.log(`[${name}] [DTS] Generated type definitions ✅`)
}

async function runRollup(config: RollupOptions) {
  let bundle: RollupBuild
  try {
    bundle = await rollup(config)

    const output = Array.isArray(config.output)
      ? config.output
      : [config.output]

    await Promise.all(output.map((o) => bundle.write(o!)))
  } catch (error: any) {
    throw new Error(error)
  }

  if (bundle) {
    await bundle.close()
  }
}
