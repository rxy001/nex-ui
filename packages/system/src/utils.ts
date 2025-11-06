import {
  isString,
  memoize,
  kebabCase,
  camelCase,
  isPlainObject,
  mergeWith,
  __DEV__,
} from '@nex-ui/utils'
import serialize from '@x1ngyu/serialize-javascript'
import { all as CSSProperties } from 'known-css-properties'
import type {
  SemanticTokenValue,
  TokenValue,
  ResponsiveColor,
  TokenCategory,
} from './tokens/types'

export function pathToTokenName(path: string[]) {
  return path.join('.')
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
      return kebabCase(k)
    })
    .join('-')}`
}

export function isResponsiveColor(value: any): value is ResponsiveColor {
  return isPlainObject(value) && (value._light || value._dark || value._DEFAULT)
}

export function isValidTokenValue(value: any): value is TokenValue {
  if (!isString(value) && typeof value !== 'number') {
    return false
  }
  return true
}

export function isValidSemanticTokenValue(
  value: any,
): value is SemanticTokenValue {
  if (
    !isString(value) &&
    typeof value !== 'number' &&
    !isResponsiveColor(value)
  ) {
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
    case 'zIndices':
      return true
    default:
      return false
  }
}

export function isValidAliasValue(value: any) {
  if (isString(value) || (Array.isArray(value) && value.every(isString))) {
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
        if (Array.isArray(targetValue) && Array.isArray(srcValue)) {
          return [...targetValue, ...srcValue]
        }
      }

      if (
        typeof targetValue !== typeof srcValue ||
        Array.isArray(targetValue) !== Array.isArray(srcValue) ||
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

const ALL_CSS_PROPERTIES = new Set(CSSProperties.map(camelCase))

const isCSSProperty = (key: string) => {
  // CSS variable
  if (key.startsWith('--')) return true

  return ALL_CSS_PROPERTIES.has(key)
}

export const isSelector = (key: string) => {
  // start with &
  if (/&/.test(key)) {
    return true
  }

  // combinators
  if (/^(?!.*@)(?!.*\()(\s*[>+~]\s*|[a-zA-Z]\s+[a-zA-Z])/.test(key)) {
    return true
  }

  // special rules
  if (/^@(media|keyframes|supports|import|namespace|layer)/.test(key)) {
    return true
  }

  // id or class selector
  if (/^[#.]/.test(key)) {
    return true
  }

  // attribute selector
  if (/\[[^\]]*[=~|^$*]?[^\]]*\]/.test(key)) {
    return true
  }

  // multiple selectors
  if (/,/.test(key)) {
    return true
  }

  // wildcard selector
  if (/\*/.test(key)) {
    return true
  }

  if (isCSSProperty(key)) {
    return false
  }

  return true
}
