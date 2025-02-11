import { isArray, isNumber, isString, memoize, mergeWith } from '@nex-ui/utils'
import type { TokenValue } from './tokens/types'

export function pathToTokenName(path: string[]) {
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
      `nex-system: The token value must be either a string or a string[]. but currently received is ${typeof value} (${path.join('.')})`,
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
    case 'shadows':
    case 'transitions':
    case 'borderWidths':
    case 'zIndexes':
      return true
    default:
      console.error(`nex-system: Unknown token category: '${category}'.`)
      return false
  }
}

export function memoizeFn<T extends (...args: any[]) => any>(fn: T): T {
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

export function extractTokenPlaceholders(value: string) {
  const regex = /\{(.*?)\}/g
  const matches = value.matchAll(regex)
  return [...matches]
}

export function mergeRecipe<Recipe, Source>(recipe: Recipe, source: Source) {
  return mergeWith(
    {},
    recipe,
    source,
    (recipeValue: any, srcValue: any, key: string) => {
      if (key === 'compoundVariants') {
        if (recipeValue === undefined) {
          return srcValue
        }
        if (isArray(recipeValue) && isArray(srcValue)) {
          return [...recipeValue, ...srcValue]
        }
        return recipeValue
      }
      if (isArray(recipeValue)) {
        return srcValue
      }
    },
  )
}
