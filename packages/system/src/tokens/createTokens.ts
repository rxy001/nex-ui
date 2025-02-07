import {
  forEach,
  isString,
  walkObject,
  isPlainObject,
  reduce,
} from '@nex-ui/utils'
import type {
  CreateTokensConfig,
  TokenMap,
  CssVarMap,
  TokenCategories,
  ConditionKey,
  SemanticTokenValue,
  TokenValue,
  ResponsiveColor,
} from './types'
import { negate } from '../calc'
import { createToken } from './createToken'
import {
  pathToTokenName,
  checkTokenValue,
  createCssVarName,
  checkTokenCategory,
  extractTokenPlaceholders,
} from '../utils'
import type { Token } from './createToken'

export function createTokens(config: CreateTokensConfig) {
  const { tokens, semanticTokens, prefix } = config

  const tokenMap: TokenMap = new Map()

  const cssVarMap: CssVarMap = new Map()

  let workInProgress: Token | null = null

  function addToTokenMap() {
    if (workInProgress) {
      tokenMap.set(workInProgress.name, workInProgress)
    }
  }

  function createCssVar() {
    if (workInProgress) {
      const { path } = workInProgress

      const variableName = createCssVarName(prefix, path)

      const newValue = `var(${variableName})`

      workInProgress.cssVar = {
        var: variableName,
        ref: newValue,
      }

      workInProgress.value = newValue
    }
  }

  function addNegativeToken() {
    if (workInProgress) {
      const { category, value, path, originalValue, cssVar } = workInProgress
      const newPath = [...path]
      newPath.push(`-${newPath.pop()}`)

      workInProgress = createToken({
        category,
        originalValue,
        path: newPath,
        name: pathToTokenName(newPath),
        value: negate(cssVar?.ref ?? value),
      })

      addToTokenMap()
    }
  }

  function buildCssVars() {
    if (workInProgress) {
      const { conditions, cssVar } = workInProgress

      const variableName = cssVar!.var
      forEach(
        conditions,
        // @ts-ignore
        (value: string | number | undefined, condition: ConditionKey) => {
          if (!value) {
            return
          }

          if (!cssVarMap.has(condition)) {
            cssVarMap.set(condition, new Map())
          }

          cssVarMap.get(condition)!.set(variableName, value)
        },
      )
    }
  }

  function handleToken() {
    if (workInProgress) {
      createCssVar()

      buildCssVars()

      addToTokenMap()

      const { category, originalValue } = workInProgress

      switch (category) {
        case 'spacing':
          if (originalValue === '0rem' || originalValue === 0) {
            return
          }
          addNegativeToken()
          break
        default:
          break
      }

      workInProgress = null
    }
  }

  function replaceTokenPlaceholders(value?: TokenValue) {
    if (isString(value)) {
      const matches = extractTokenPlaceholders(value)
      return reduce(
        matches,
        (acc: string, match: RegExpExecArray) => {
          const [placeholder, tokenName] = match

          const token = tokenMap.get(tokenName)

          if (token) {
            return acc.replace(placeholder, token.value)
          }
          console.error(`nex-system: Unknown token ${tokenName}`)
          return acc.replace(placeholder, tokenName)
        },
        value,
      )
    }

    return value
  }

  function workloop() {
    walkObject(
      tokens,
      (value: TokenValue, path: string[]) => {
        if (!checkTokenCategory(path[0]) || !checkTokenValue(value, path))
          return

        const category = path[0] as TokenCategories

        workInProgress = createToken({
          path,
          category,
          value: '',
          name: pathToTokenName(path),
          originalValue: value,
          conditions: {
            base: replaceTokenPlaceholders(value),
          },
        })

        handleToken()
      },
      {
        predicate: (_, path: string[]) => {
          const category = path[0]
          switch (category) {
            case 'colors':
              return path.length > 3
            default:
              return path.length > 2
          }
        },
      },
    )

    walkObject(
      semanticTokens,
      (value: SemanticTokenValue, path: string[]) => {
        if (!checkTokenCategory(path[0])) {
          return
        }

        const category = path[0] as TokenCategories

        const newPath = filterDefault(path)

        const conditions = isResponsiveColor(value)
          ? {
              base: replaceTokenPlaceholders(value._DEFAULT),
              dark: replaceTokenPlaceholders(value._dark),
              light: replaceTokenPlaceholders(value._light),
            }
          : { base: replaceTokenPlaceholders(value) }

        workInProgress = createToken({
          value: '',
          category,
          conditions,
          path: newPath,
          name: pathToTokenName(newPath),
          originalValue: value,
        })

        handleToken()
      },
      {
        predicate: isResponsiveColor,
      },
    )
  }

  workloop()

  return {
    getToken: (key: string) => tokenMap.get(key),
    getGlobalCssVars: () => cssVarMap,
  }
}

export type Tokens = ReturnType<typeof createTokens>

function filterDefault(path: string[]) {
  if (path[0] === 'DEFAULT') return path
  return path.filter((item) => item !== 'DEFAULT')
}

export function isResponsiveColor(value: any): value is ResponsiveColor {
  return isPlainObject(value) && (value._light || value._dark || value._DEFAULT)
}
