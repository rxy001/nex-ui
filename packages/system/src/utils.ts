import { isNumber, isString, memoize } from '@nex-ui/utils'
import type { Noop } from '@nex-ui/utils'

export function pathToName(path: string[]) {
  return path.join('.')
}

export function camelToKebab(str: string) {
  return str.replace(/([A-Z])/g, (match) => {
    return `-${match.toLowerCase()}`
  })
}

function isPositiveFloatNumber(str: string) {
  return /^\d+\.\d+$/.test(str)
}

export function createCssVarName(prefix: string, path: string[]) {
  return `--${prefix}-${path
    .map((k) => {
      if (isPositiveFloatNumber(k)) {
        return k.split('.').join('-')
      }
      return camelToKebab(k)
    })
    .join('-')}`
}

export function checkTokenValue(value: any, path: string[]) {
  if (!isString(value) && !isNumber(value)) {
    console.error(
      `system: The token value must be either a string or a number. ${path}: ${JSON.stringify(value)}`,
    )
    return false
  }
  return true
}

export function checkTokenCategory(category: string): boolean {
  switch (category) {
    case 'colors':
    case 'fontFamilies':
    case 'fontSizes':
    case 'fontWeights':
    case 'sizes':
    case 'spacing':
    case 'lineHeights':
    case 'borders':
    case 'radii':
      return true
    default:
      console.error(`system: Unknown token category: '${category}'`)
      return false
  }
}

export function memoizeFn<T extends Noop>(fn: T): T {
  return memoize(fn, (...args) => JSON.stringify(args))
}
