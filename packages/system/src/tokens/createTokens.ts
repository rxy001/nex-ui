import { forEach, isString, walkObject, reduce, __DEV__ } from '@nex-ui/utils'
import { negate } from '../calc'
import { createToken } from './createToken'
import {
  pathToTokenName,
  createCssVarName,
  extractTokenPlaceholders,
  isValidTokenCategory,
  isValidTokenValue,
  isValidSemanticTokenValue,
  isResponsiveColor,
} from '../utils'
import type {
  CreateTokensConfig,
  TokenMap,
  CssVarMap,
  TokenCategory,
  ConditionKey,
  SemanticTokenValue,
  TokenValue,
} from './types'
import type { Token } from './createToken'

export function createTokens(config: CreateTokensConfig) {
  const { tokens, semanticTokens = {}, prefix } = config

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
        case 'spaces':
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
          console.error(
            '[Nex UI] token reference syntax: An unknown token %s exists in the token reference syntax.',
            tokenName,
          )
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
        if (__DEV__ && !isValidTokenCategory(path[0])) {
          console.error('[Nex-UI] tokens: Unknown token category: %s.', path[0])
          return
        }

        if (__DEV__ && !isValidTokenValue(value)) {
          console.error(
            '[Nex-UI] tokens: Expect the token value to be a string or a number. but what is currently received is %o.',
            value,
          )
          return
        }

        const category = path[0] as TokenCategory

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
        if (__DEV__ && !isValidTokenCategory(path[0])) {
          console.error(
            '[Nex-UI] semanticTokens: Unknown token category: %s.',
            path[0],
          )
          return
        }
        if (__DEV__ && !isValidSemanticTokenValue(value)) {
          console.error(
            '[Nex-UI] semanticTokens: Expect the semanticToken value to be a string, a number, or a responsive color. but what is currently received is %o.',
            value,
          )
          return
        }

        const category = path[0] as TokenCategory

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
  return path.filter((item) => item !== 'DEFAULT')
}
