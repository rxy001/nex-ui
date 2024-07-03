import type { TokenValue, TokenCategory } from './types'

export class Token {
  path: string[]

  value: TokenValue

  name: string

  originalValue: TokenValue

  category: TokenCategory

  derivative: boolean

  cssVar?: {
    var: string
    ref: string
  }

  constructor({
    path,
    value,
    category,
    name,
    originalValue,
    derivative,
    cssVar,
  }: Token) {
    this.path = path
    this.value = value
    this.category = category
    this.name = name
    this.originalValue = originalValue
    this.derivative = derivative
    this.cssVar = cssVar
  }
}

export function createToken(config: Token) {
  return new Token(config)
}
