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

function camelToKebab(str: string) {
  return str.replace(/([A-Z])/g, (match) => {
    return `-${match.toLowerCase()}`
  })
}

function isDecimalString(str: string) {
  return /^\d+\.\d+$/.test(str)
}

export function createCssVarName(prefix: string, path: string[]) {
  return `--${prefix}-${path
    .map((k) => {
      if (isDecimalString(k)) {
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
  const recipes = JSON.parse(JSON.stringify(args))

  return mergeWith(
    {},
    ...recipes,
    (targetValue: unknown, srcValue: unknown, key: string) => {
      if (key === 'compoundVariants') {
        if (targetValue === undefined) {
          return srcValue
        }
        if (isArray(targetValue) && isArray(srcValue)) {
          return [...targetValue, ...srcValue]
        }
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

type Operand = string | number

type Operator = '+' | '-' | '*' | '/'

const toExpression = (operator: Operator, ...operands: Array<Operand>) =>
  operands.map(String).join(` ${operator} `).replace(/calc/g, '')

export const add = (...operands: Array<Operand>) =>
  `calc(${toExpression('+', ...operands)})`

export const subtract = (...operands: Array<Operand>) =>
  `calc(${toExpression('-', ...operands)})`

export const multiply = (...operands: Array<Operand>) =>
  `calc(${toExpression('*', ...operands)})`

export const divide = (...operands: Array<Operand>) =>
  `calc(${toExpression('/', ...operands)})`

export const negate = (x: number | string) => {
  const value = String(x)

  if (value != null && !Number.isNaN(parseFloat(value))) {
    if (Number(value) === 0) {
      return '0'
    }

    return value.startsWith('-') ? value.slice(1) : `-${value}`
  }

  return multiply(value, -1)
}
