import { isNumber, isString, memoize } from '@nex-ui/utils'
import type { Noop } from '@nex-ui/utils'
import type { TokenValue } from './tokens/types'

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

export function checkTokenValue(
  value: any,
  path: string[],
): value is TokenValue {
  if (!isString(value) && !isNumber(value)) {
    console.error(
      `nex-system: The token value must be either a string or a number. but currently received is ${typeof value} (${path.join('.')})`,
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
    case 'breakpoints':
      return true
    default:
      console.error(`nex-system: Unknown token category: '${category}'`)
      return false
  }
}

export function memoizeFn<T extends Noop>(fn: T): T {
  return memoize(fn, (...args) => {
    return JSON.stringify(args, (key, value) => {
      if (
        value &&
        (value.$$typeof ||
          typeof value === 'function' ||
          key.startsWith('__react'))
      ) {
        return undefined
      }
      return value
    })
  })
}
