import { optimize } from 'svgo'
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

function hyphenToCamelCase(string: string) {
  return string
    .split('-')
    .map((word, index) => {
      if (index === 0) {
        return word
      }
      return upperFirst(word)
    })
    .join('')
}

async function run() {
  const cwd = dirname(fileURLToPath(import.meta.url))

  const svgDirPath = resolve(cwd, '../packages/icons/src/svg')

  const componentsDirPath = resolve(cwd, '../packages/icons/src/components')

  const tsxFiles: Record<string, string[]> = {}

  console.log(`[build-icons] Building...`)

  await recursive(svgDirPath, generateTsx)

  await recursive(componentsDirPath, removeInvalidTsx, {
    skipDirs: ['__stories__', 'utils'],
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

  async function readSvgPaths(svgFilePath: string) {
    const data = readFileSync(svgFilePath, { encoding: 'utf-8' })

    let childrenAsArray = false

    const result = optimize(data, {
      multipass: true,
      plugins: ['removeStyleElement', 'removeScriptElement'],
    })

    const paths = optimize(result.data, {
      plugins: [
        {
          name: 'svgAsReactFragment',
          fn: () => {
            return {
              root: {
                enter(root) {
                  const [svg, ...rootChildren] = root.children
                  if (rootChildren.length > 0) {
                    throw new Error('Expected a single child of the root')
                  }
                  if (svg.type !== 'element' || svg.name !== 'svg') {
                    // console.log(svgFileName, svg)
                    throw new Error('Expected an svg element as the root child')
                  }
                  if (svg.children.length > 1) {
                    childrenAsArray = true
                  }
                  root.children = svg.children
                },
              },
              element: {
                enter: (node, parentNode) => {
                  if (
                    parentNode.type === 'root' &&
                    parentNode.children.length > 1
                  ) {
                    const index = parentNode.children.findIndex(
                      (child) => child === node,
                    )
                    node.attributes.key = `${index}`
                  }

                  const attributes: Record<string, string> = {}
                  for (const key in node.attributes) {
                    if (
                      Object.prototype.hasOwnProperty.call(node.attributes, key)
                    ) {
                      attributes[hyphenToCamelCase(key)] = node.attributes[key]
                    }
                  }
                  node.attributes = attributes
                },
              },
            }
          },
        },
      ],
    }).data

    if (childrenAsArray) {
      return `[${paths.replace(/key="\d+"\/>/g, '$&,')}]`
    }

    return paths
  }

  async function generateTsx(svgFilePath: string, category: string) {
    const svgFileName = basename(svgFilePath, '.svg')

    const paths = await readSvgPaths(svgFilePath)

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
      "'use client'" +
      '\n' +
      '\n' +
      `import { createIcon } from '../utils'` +
      '\n' +
      '\n' +
      `export const ${iconComponentName} = createIcon(${paths}, '${iconComponentName}')` +
      '\n'
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
