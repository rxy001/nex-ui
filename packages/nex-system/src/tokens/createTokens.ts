import { walkObject } from '@nex-ui/utils'
import type {
  CreateTokensConfig,
  TokenMap,
  CssVarMap,
  TokenCategory,
} from './types'
import { negate } from '../calc'
import { createToken } from './createToken'
import { checkTokenValue, createCssVarName, pathToName } from '../utils'
import type { Token } from './createToken'

export function createTokens(config: CreateTokensConfig) {
  const { tokens: paramTokens, prefix } = config

  const tokens: Array<Token> = []

  const tokenMap: TokenMap = new Map()

  const cssVarMap: CssVarMap = new Map()

  let currentToken: Token | null = null

  function pushToTokens() {
    tokens.push(currentToken!)
    tokenMap.set(currentToken!.name, currentToken!)
  }

  function createCssVar() {
    if (currentToken) {
      const { path, originalValue } = currentToken

      const variableName = createCssVarName(prefix, path)

      const newValue = `var(${variableName})`

      currentToken.cssVar = {
        var: variableName,
        ref: newValue,
      }

      currentToken.value = newValue

      cssVarMap.set(variableName, originalValue)
    }
  }

  function createNegativeToken() {
    if (currentToken) {
      const { category, value, path, originalValue, cssVar } = currentToken
      const newPath = [...path]
      newPath.push(`-${newPath.pop()}`)

      currentToken = createToken({
        category,
        originalValue,
        path: newPath,
        name: pathToName(newPath),
        value: negate(cssVar?.ref ?? value),
        derivative: true,
      })
    }
  }

  function processToken() {
    while (currentToken) {
      const { category, value, derivative } = currentToken

      pushToTokens()

      if (derivative === true) {
        return
      }

      createCssVar()

      switch (category) {
        case 'spacing':
          if (value === '0rem' || value === 0) {
            return
          }
          createNegativeToken()
          break
        default:
          currentToken = null
          break
      }
    }
  }

  function processTokens() {
    function callback(value: string | number, path: string[]) {
      if (!checkTokenValue(value, path)) return

      const dependend = tokenMap.get(String(value))

      const dependendValue = dependend?.cssVar?.ref || dependend?.value

      const category = path[0]

      if (!checkTokenCategory) {
        return
      }

      currentToken = createToken({
        path,
        category: category as TokenCategory,
        value: dependendValue ?? value,
        name: pathToName(path),
        originalValue: value,
        derivative: !!dependendValue,
      })

      processToken()
    }

    walkObject(paramTokens, callback)

    // walkObject({ semanticTokens }, callback)
  }

  processTokens()

  return {
    getToken: (key: string) => tokenMap.get(key),
    getCssVars: () => Object.fromEntries(cssVarMap.entries()),
  }
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
