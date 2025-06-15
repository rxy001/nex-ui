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
import serialize from '@x1ngyu/serialize-javascript'
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
  return memoize(fn, (...args: any[]) => serialize(args))
}

export function extractTokenPlaceholders(value: string) {
  const regex = /\{(.*?)\}/g
  const matches = value.matchAll(regex)
  return [...matches]
}

// TODO 明确 CSS 合并规则
export function mergeRecipeConfigs<T, B>(...args: [T, B]) {
  return mergeWith(
    {},
    ...args,
    (targetValue: unknown, srcValue: unknown, key: string) => {
      if (key === 'compoundVariants') {
        if (targetValue === undefined) {
          return srcValue
        }
        if (isArray(targetValue) && isArray(srcValue)) {
          return [...targetValue, ...srcValue]
        }
        return targetValue
      }

      if (
        typeof targetValue !== typeof srcValue ||
        isArray(targetValue) !== isArray(srcValue) ||
        isPlainObject(targetValue) !== isPlainObject(srcValue)
      ) {
        return srcValue
      }
    },
  )
}
