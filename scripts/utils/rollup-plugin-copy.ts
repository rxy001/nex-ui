import fs from 'node:fs'
import path from 'node:path'
import { Plugin } from 'rollup'
import { GlobOptions, globSync } from 'glob'

type Options = {
  targets: ({ dest: string; pattern: string | string[] } & GlobOptions)[]
}

export const copy = (options: Options): Plugin => {
  const { targets } = options

  if (targets.length < 1) {
    return {
      name: 'rollup-plugin-copy',
    }
  }

  return {
    name: 'rollup-plugin-copy',
    buildEnd: () => {
      for (const target of targets) {
        const { dest, pattern, ...rest } = target
        const files = globSync(pattern, {
          ...rest,
          withFileTypes: false,
        })

        files.forEach((file) => {
          const destPath = path.resolve(dest, file)
          const { dir } = path.parse(destPath)

          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
          }

          // @ts-ignore
          fs.copyFileSync(path.resolve(rest?.cwd ?? '', file), destPath)
        })
      }
    },
  }
}
