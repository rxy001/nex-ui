import type { TokenValue, TokenCategory, SemanticTokenValue } from './types'

export class Token {
  path: string[]

  value: string

  name: string

  originalValue: TokenValue | SemanticTokenValue

  category: TokenCategory

  cssVar?: {
    var: string
    ref: string
  }

  conditions?: {
    base?: TokenValue
    light?: TokenValue
    dark?: TokenValue
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
