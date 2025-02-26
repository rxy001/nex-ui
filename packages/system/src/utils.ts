import {
  __DEV__,
  isArray,
  isNumber,
  isString,
  memoize,
  mergeWith,
  isPlainObject,
  every,
} from '@nex-ui/utils'
import type {
  SemanticTokenValue,
  TokenValue,
  ResponsiveColor,
  TokenCategory,
} from './tokens/types'

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

export function isResponsiveColor(value: any): value is ResponsiveColor {
  return isPlainObject(value) && (value._light || value._dark || value._DEFAULT)
}

export function isValidTokenValue(value: any): value is TokenValue {
  if (!isString(value) && !isNumber(value)) {
    return false
  }
  return true
}

export function isValidSemanticTokenValue(
  value: any,
): value is SemanticTokenValue {
  if (!isString(value) && !isNumber(value) && !isResponsiveColor(value)) {
    return false
  }
  return true
}

export function isValidTokenCategory(category: any): category is TokenCategory {
  if (!isString(category)) {
    return false
  }

  switch (category) {
    case 'colors':
    case 'fontFamilies':
    case 'fontSizes':
    case 'fontWeights':
    case 'sizes':
    case 'spaces':
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
      return false
  }
}

export function isValidAliasValue(value: any) {
  if (isString(value) || (isArray(value) && every(value, isString))) {
    return true
  }
  return false
}

export function isValidBreakpointValue(value: any) {
  if (isString(value) && parseInt(value, 10) >= 0) {
    return true
  }

  return false
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
