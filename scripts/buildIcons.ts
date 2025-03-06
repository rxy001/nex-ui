/* eslint-disable no-console */
import {
  readdirSync,
  statSync,
  writeFileSync,
  existsSync,
  readFileSync,
  mkdirSync,
  unlinkSync,
} from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, basename } from 'node:path'
import { forEach, map } from 'packages/utils/src'
import { pretty } from './utils'

function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

async function run() {
  const cwd = dirname(fileURLToPath(import.meta.url))

  const svgDirPath = resolve(cwd, '../packages/icons/src/svg')

  const componentsDirPath = resolve(cwd, '../packages/icons/src/components')

  const tsxFiles: Record<string, string[]> = {}

  console.log(`[build-icons] Building...`)

  await recursive(svgDirPath, generateTsx)

  await recursive(componentsDirPath, removeInvalidTsx, {
    skipDirs: ['__stories__'],
    skipFiles: ['index.tsx'],
  })

  await writeImports()

  console.log(`[build-icons] Generated files ✅`)

  async function recursive(
    dirPath: string,
    cb: (filePath: string, parentDir: string) => Promise<void>,
    options?: { skipDirs?: string[]; skipFiles?: string[] },
  ) {
    const { skipDirs, skipFiles } = options ?? {}

    const files = readdirSync(dirPath)
    const parentDir = basename(dirPath)

    await Promise.all(
      map(files, async (file: string) => {
        const filePath = resolve(dirPath, file)
        if (statSync(filePath).isDirectory()) {
          if (skipDirs?.includes(file)) {
            return
          }
          await recursive(filePath, cb, options)
        } else {
          if (skipFiles?.includes(file)) {
            return
          }
          await cb(filePath, parentDir)
        }
      }),
    )
  }

  async function generateTsx(svgFilePath: string, category: string) {
    const svgFileName = basename(svgFilePath, '.svg')

    const svgComponentName = svgFileName
      .split('-')
      .map((v) => upperFirst(v))
      .join('')

    const iconComponentName = `${svgComponentName}${upperFirst(category)}`

    const tsxName = `${iconComponentName}.tsx`

    const categoryDirPath = resolve(componentsDirPath, category)

    if (!existsSync(categoryDirPath)) {
      mkdirSync(categoryDirPath)
    }

    const tsxPath = resolve(categoryDirPath, tsxName)
    const tsx =
      `import ${svgComponentName} from '../../svg/${category}/${svgFileName}.svg'` +
      '\n' +
      '\n' +
      `export const ${iconComponentName} = ${svgComponentName}` +
      '\n' +
      '\n' +
      `${iconComponentName}.displayName='${iconComponentName}'`
    const prettiedTsx = await pretty(tsx)

    if (tsxFiles[category]) {
      tsxFiles[category].push(iconComponentName)
    } else {
      tsxFiles[category] = [iconComponentName]
    }

    if (existsSync(tsxPath)) {
      const oldTsx = readFileSync(tsxPath, {
        encoding: 'utf-8',
      })
      if (oldTsx === prettiedTsx) {
        return
      }
    }
    writeFileSync(tsxPath, prettiedTsx)
  }

  async function writeImports() {
    const indexPath = resolve(componentsDirPath, './index.tsx')

    let tsx = ''

    forEach(tsxFiles, (tsxs: string[], category: string) => {
      tsx =
        // eslint-disable-next-line prefer-template
        tsx +
        '\n' +
        map(
          tsxs,
          (name: string) => `export * from './${category}/${name}'`,
        ).join('\n')
    })

    writeFileSync(indexPath, await pretty(tsx))
  }

  async function removeInvalidTsx(tsxFilePath: string, category: string) {
    const tsxFileName = basename(tsxFilePath, '.tsx')

    const tsxs = tsxFiles[category]
    if (!tsxs.includes(tsxFileName)) {
      unlinkSync(tsxFilePath)
    }
  }
}

run()
