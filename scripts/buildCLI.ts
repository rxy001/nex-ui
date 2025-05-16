import swc from '@rollup/plugin-swc'
import path from 'node:path'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import fs from 'node:fs'
import type { RollupOptions } from 'rollup'
import { rollup, copy } from './utils'

build()

async function build() {
  fs.rmSync('./dist', { recursive: true, force: true })

  const config: RollupOptions = {
    input: './src/index.ts',
    plugins: [
      commonjs(),
      nodeResolve({
        extensions: ['.ts', '.js'],
      }),
      json(),
      swc({
        swc: {
          jsc: {
            parser: { tsx: false, syntax: 'typescript' },
          },
        },
      }),
      copy({
        targets: [
          {
            pattern: '**',
            dest: './dist',
            cwd: path.resolve(import.meta.dirname, '../examples'),
            nodir: true,
            dot: true,
            ignore: [
              '.gitignore',
              '**/node_modules/**',
              '**/package-lock.json',
              '**/.next/**',
            ],
          },
        ],
      }),
    ],
    output: {
      format: 'es',
      dir: 'dist/',
    },
  }

  console.log(`[CLI] Building...`)

  await rollup(config)

  console.log(`[CLI] Built successfully ✅`)
}
