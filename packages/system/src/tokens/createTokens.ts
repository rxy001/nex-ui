import { forEach, isPlainObject, isString, walkObject } from '@nex-ui/utils'
import type { Noop } from '@nex-ui/utils'
import type { Config, TokenMap, CssVarMap, TokenCategories } from './types'
import { negate } from '../calc'
import { createToken } from './createToken'
import {
  createCssVarName,
  pathToName,
  checkTokenValue,
  checkTokenCategory,
} from '../utils'
import type { Token } from './createToken'
import type { Dictionary } from '../types'

function filterDefault(path: string[]) {
  if (path[0] === 'DEFAULT') return path
  return path.filter((item) => item !== 'DEFAULT')
}

export function createTokens(config: Config) {
  const { tokens, semanticTokens, prefix } = config

  const tokenMap: TokenMap = new Map()

  const cssVarMap: CssVarMap = new Map()

  let workInProgress: Token | null = null

  function addToTokens() {
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

      addToTokens()
    }
  }

  function buildCssVars() {
    if (workInProgress) {
      const { conditions, cssVar } = workInProgress

      const variableName = cssVar?.var as string

      forEach(conditions, (value, condition) => {
        if (!value) {
          return
        }

        if (!cssVarMap.has(condition)) {
          cssVarMap.set(condition, new Map())
        }

        cssVarMap.get(condition)!.set(variableName, value)
      })
    }
  }

  function handleToken() {
    if (workInProgress) {
      createCssVar()
      buildCssVars()
      addToTokens()

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
    }
  }

  function transform(category: TokenCategories) {
    return <T>(value: T) => {
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
        const category = path[0] as TokenCategories

        if (!checkTokenCategory(category)) {
          return
        }

        const newPath = filterDefault(path)

        const t = transform(category)

        const conditions = isPlainObject(value)
          ? pick(value as Dictionary, ['base', 'light', 'dark'], t)
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
        predicate: (value: any) =>
          isPlainObject(value) && (value.light || value.dark || value.base),
      },
    )
  }

  workloop()

  return {
    getToken: (key: string) => tokenMap.get(key),
    getGlobalCssVars: () => {
      const result: Dictionary = {}

      const globalPrefix = ':root'
      cssVarMap.forEach((value, key) => {
        const cssVar = Object.fromEntries(value.entries())

        if (Object.keys(cssVar).length === 0) {
          return
        }

        if (key === 'base') {
          result[globalPrefix] = cssVar
        } else {
          result[`${globalPrefix} .${key}`] = cssVar
        }
      })

      return result
    },
  }
}

function pick<T extends Dictionary, K extends keyof T>(
  obj: T,
  keys: K[],
  t: Noop,
) {
  const result = {} as Pick<T, K>

  forEach(keys, (key) => {
    if (obj[key]) {
      result[key] = t(obj[key])
    }
  })

  return result
}

export type Tokens = ReturnType<typeof createTokens>
