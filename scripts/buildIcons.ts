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
import { dirname, resolve, basename } from 'node:path'
import { forEach, map } from 'packages/utils/src'
import { pretty } from './utils'

const options: Record<string, any> = {
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

async function run() {
  const cwd = dirname(fileURLToPath(import.meta.url))

  const svgDirPath = resolve(cwd, '../packages/icons/src/svg')

  const componentsDirPath = resolve(cwd, '../packages/icons/src/components')

  const newTsxs: Record<string, string[]> = {}

  console.log(`[build-icons] Building...`)

  await recursive(svgDirPath, generateTsx)

  await writeImports()

  console.log(`[build-icons] Generated files ✅`)

  async function recursive(
    dirPath: string,
    cb: (filePath: string, parentDir: string) => Promise<void>,
  ) {
    const files = readdirSync(dirPath)
    const parentDir = basename(dirPath)

    await Promise.all(
      map(files, async (file: string) => {
        const filePath = resolve(dirPath, file)
        if (statSync(filePath).isDirectory()) {
          await recursive(filePath, cb)
        } else {
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

    const defaultProps = {
      className: `${svgFileName}-${category}`,
    }

    if (!existsSync(categoryDirPath)) {
      mkdirSync(categoryDirPath)
    }

    const tsxPath = resolve(categoryDirPath, tsxName)
    const tsx =
      "import { forwardRef, useMemo } from 'react'" +
      '\n' +
      "import { useNexIcons } from '../../utils/Context'" +
      '\n' +
      `import ${svgComponentName} from '../../svg/${category}/${svgFileName}.svg'` +
      '\n' +
      "import type { IconProps } from '../../types'" +
      '\n' +
      '\n' +
      `export const ${iconComponentName} = forwardRef<SVGSVGElement, IconProps>(` +
      '\n' +
      '  (props, ref) => {' +
      '\n' +
      '    const { createIcon } = useNexIcons()' +
      '\n' +
      `    const Icon = useMemo(() => createIcon(${svgComponentName}${
        options[iconComponentName]
          ? `,${JSON.stringify({ ...options[iconComponentName], ...defaultProps })}`
          : `,${JSON.stringify(defaultProps)}`
      }), [createIcon])` +
      '\n' +
      '    return <Icon {...props} ref={ref} />' +
      '\n' +
      '  }' +
      '\n' +
      ')' +
      '\n' +
      '\n' +
      `${iconComponentName}.displayName='${iconComponentName}'`
    const prettiedTsx = await pretty(tsx)

    if (existsSync(tsxPath)) {
      const oldTsx = readFileSync(tsxPath, {
        encoding: 'utf-8',
      })
      if (oldTsx !== prettiedTsx) {
        writeFileSync(tsxPath, prettiedTsx)
      }
      return
    }
    writeFileSync(tsxPath, prettiedTsx)
    if (newTsxs[category]) {
      newTsxs[category].push(iconComponentName)
    } else {
      newTsxs[category] = [iconComponentName]
    }
  }

  async function writeImports() {
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

    writeFileSync(indexPath, await pretty(tsx))
  }
}

run()
