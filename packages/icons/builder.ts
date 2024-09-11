/* eslint-disable no-console */
import {
  readdirSync,
  statSync,
  writeFileSync,
  existsSync,
  readFileSync,
  mkdirSync,
} from 'node:fs'
import { fileURLToPath } from 'node:url'
import { forEach, map } from '@nex-ui/utils'
import { dirname, resolve, basename } from 'node:path'
import type { IconProps } from './src/utils'

const options: Record<string, IconProps> = {
  LoadingOutlined: {
    spin: true,
  },
  Loading3QuartersOutlined: {
    spin: true,
  },
}

function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function run() {
  const cwd = dirname(fileURLToPath(import.meta.url))

  const svgDirPath = resolve(cwd, './src/svg')

  const componentsDirPath = resolve(cwd, './src/components')

  const newTsxs: Record<string, string[]> = {}

  console.log(`[builder] Building...`)

  recursive(svgDirPath, generateTsx)

  writeImports()

  console.log(`[builder] Generated files ✅`)

  function recursive(
    dirPath: string,
    cb: (filePath: string, parentDir: string) => void,
  ) {
    const files = readdirSync(dirPath)
    const parentDir = basename(dirPath)

    forEach(files, (file: string) => {
      const filePath = resolve(dirPath, file)
      if (statSync(filePath).isDirectory()) {
        recursive(filePath, cb)
      } else {
        cb(filePath, parentDir)
      }
    })
  }

  function generateTsx(svgFilePath: string, category: string) {
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

    if (!existsSync(tsxPath)) {
      const tsx =
        `import { createIcon } from '../../utils'` +
        '\n' +
        `import ${svgComponentName} from '../../svg/${category}/${svgFileName}.svg'` +
        '\n\n' +
        `export const ${iconComponentName} = createIcon(${svgComponentName}${
          options[iconComponentName]
            ? `,${JSON.stringify(options[iconComponentName])}`
            : ''
        })` +
        '\n'

      writeFileSync(tsxPath, tsx)

      if (newTsxs[category]) {
        newTsxs[category].push(iconComponentName)
      } else {
        newTsxs[category] = [iconComponentName]
      }
    }
  }

  function writeImports() {
    const indexPath = resolve(componentsDirPath, './index.tsx')

    let tsx = ''
    if (existsSync(indexPath)) {
      tsx = readFileSync(indexPath, {
        encoding: 'utf-8',
      })
    }

    forEach(newTsxs, (tsxs: string[], category: string) => {
      tsx =
        // eslint-disable-next-line prefer-template
        tsx +
        '\n' +
        map(
          tsxs,
          (name: string) => `export * from './${category}/${name}'`,
        ).join('\n')
    })

    writeFileSync(indexPath, tsx)
  }
}

run()
