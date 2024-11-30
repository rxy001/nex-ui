import { forEach, isString, walkObject } from '@nex-ui/utils'
import type {
  CreateTokensConfig,
  TokenMap,
  CssVarMap,
  TokenCategories,
} from './types'
import { negate } from '../calc'
import { createToken } from './createToken'
import {
  createCssVarName,
  pathToName,
  checkTokenValue,
  checkTokenCategory,
  isResponsiveColor,
} from '../utils'
import type { Token } from './createToken'

function filterDefault(path: string[]) {
  if (path[0] === 'DEFAULT') return path
  return path.filter((item) => item !== 'DEFAULT')
}

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
        name: pathToName(newPath),
        value: negate(cssVar?.ref ?? value),
      })

      addToTokenMap()
    }
  }

  function buildCssVars() {
    if (workInProgress) {
      const { conditions, cssVar } = workInProgress

      const variableName = cssVar?.var as string

      forEach(
        conditions,
        (value: string | number | undefined, condition: string) => {
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

      const { category, value } = workInProgress

      switch (category) {
        case 'spacing':
          if (value === '0rem' || value === 0) {
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

  function getTokenValueByCategory(category: TokenCategories) {
    return (value: string) => {
      if (isString(value)) {
        const regex = /\{(.*?)\}/
        const match = value.match(regex)
        if (match && match[1]) {
          const token = tokenMap.get(`${category}.${match[1]}`)

          return token?.value ?? value
        }
      }

      return value
    }
  }

  function workloop() {
    walkObject(
      tokens,
      (value: string | number, path: string[]) => {
        if (!checkTokenValue(value, path)) return

        const category = path[0]

        if (!checkTokenCategory(category)) {
          return
        }

        workInProgress = createToken({
          path,
          value,
          category: category as TokenCategories,
          name: pathToName(path),
          originalValue: value,
          conditions: {
            base: value,
          },
        })

        handleToken()
      },
      {
        predicate: (_: any, path: string[]) => {
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
      (value: any, path: string[]) => {
        if (!checkTokenCategory(path[0])) {
          return
        }

        const category = path[0] as TokenCategories

        const newPath = filterDefault(path)

        const t = getTokenValueByCategory(category)

        const conditions = isResponsiveColor(value)
          ? {
              base: t(value._DEFAULT),
              dark: t(value._dark),
              light: t(value._light),
            }
          : { base: t(value) }

        workInProgress = createToken({
          value,
          category,
          conditions,
          path: newPath,
          name: pathToName(newPath),
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
