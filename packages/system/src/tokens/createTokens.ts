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

  function registerToken(workInProgress: Token) {
    tokenMap.set(workInProgress.name, workInProgress)
    return workInProgress
  }

  function resolveTokenReferences(value?: TokenValue) {
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
            '[Nex UI] system: An unknown token %s exists in the token reference syntax.',
            tokenName,
          )
          return acc.replace(placeholder, tokenName)
        },
        value,
      )
    }

    return value
  }

  function createConditions(workInProgress: Token): Token {
    const { originalValue } = workInProgress
    const conditions = isResponsiveColor(originalValue)
      ? {
          base: resolveTokenReferences(originalValue._DEFAULT),
          dark: resolveTokenReferences(originalValue._dark),
          light: resolveTokenReferences(originalValue._light),
        }
      : { base: resolveTokenReferences(originalValue) }

    return {
      ...workInProgress,
      conditions,
    }
  }

  function createCssVar(workInProgress: Token): Token {
    const { path } = workInProgress

    const variableName = createCssVarName(prefix, path)

    const newValue = `var(${variableName})`

    return {
      ...workInProgress,
      cssVar: {
        var: variableName,
        ref: newValue,
      },
      value: newValue,
    }
  }

  function registerNegativeToken(workInProgress: Token) {
    const { category, value, path, originalValue, cssVar } = workInProgress

    if (
      category !== 'spaces' ||
      originalValue === '0rem' ||
      originalValue === '0px' ||
      originalValue === 0
    ) {
      return workInProgress
    }

    const newPath = [...path.slice(0, -1), `-${path[path.length - 1]}`]

    registerToken(
      createToken({
        category,
        originalValue,
        path: newPath,
        name: pathToTokenName(newPath),
        value: negate(cssVar?.ref ?? value),
      }),
    )
  }

  function registerCssVars(workInProgress: Token) {
    const { conditions, cssVar } = workInProgress
    if (cssVar) {
      const variableName = cssVar.var
      forEach(
        conditions,
        // @ts-expect-error
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

    return workInProgress
  }

  function handleToken(token: Token) {
    const workInProgress = createCssVar(createConditions(token))

    registerCssVars(workInProgress)
    registerToken(workInProgress)
    registerNegativeToken(workInProgress)
  }

  function workloop() {
    walkObject(
      tokens,
      (value: TokenValue, path: string[]) => {
        if (__DEV__ && !isValidTokenCategory(path[0])) {
          console.error('[Nex-UI] system: Unknown token category: %s.', path[0])
          return
        }

        if (__DEV__ && !isValidTokenValue(value)) {
          console.error(
            '[Nex-UI] system: Expect the token value to be a string or a number. but what is currently received is %o.',
            value,
          )
          return
        }

        const category = path[0] as TokenCategory

        const token = createToken({
          path,
          category,
          value: '',
          name: pathToTokenName(path),
          originalValue: value,
        })

        handleToken(token)
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
          console.error('[Nex-UI] system: Unknown token category: %s.', path[0])
          return
        }
        if (__DEV__ && !isValidSemanticTokenValue(value)) {
          console.error(
            '[Nex-UI] system: Expect the semanticToken value to be a string, a number, or a responsive color. but what is currently received is %o.',
            value,
          )
          return
        }

        const category = path[0] as TokenCategory

        const newPath = filterDefault(path)

        const token = createToken({
          value: '',
          category,
          path: newPath,
          name: pathToTokenName(newPath),
          originalValue: value,
        })

        handleToken(token)
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
