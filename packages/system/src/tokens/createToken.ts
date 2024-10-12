import type { TokenValue, TokenCategories } from './types'

export class Token {
  path: string[]

  value: TokenValue

  name: string

  originalValue: TokenValue

  category: TokenCategories

  cssVar?: {
    var: string
    ref: string
  }

  conditions?: {
    base?: string | number
    light?: string | number
    dark?: string | number
  }

  constructor({
    path,
    value,
    category,
    name,
    originalValue,
    cssVar,
    conditions,
  }: Token) {
    this.path = path
    this.value = value
    this.category = category
    this.name = name
    this.originalValue = originalValue
    this.cssVar = cssVar
    this.conditions = conditions
  }
}

export function createToken(config: Token) {
  return new Token(config)
}
