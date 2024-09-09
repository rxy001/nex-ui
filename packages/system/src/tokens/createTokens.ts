import { walkObject } from '@nex-ui/utils'
import type {
  CreateTokensConfig,
  TokenMap,
  CssVarMap,
  TokenCategory,
} from './types'
import { negate } from '../calc'
import { createToken } from './createToken'
import {
  createCssVarName,
  pathToName,
  checkTokenValue,
  checkTokenCategory,
} from '../utils'
import type { Token } from './createToken'

export function createTokens(config: CreateTokensConfig) {
  const { tokens, prefix } = config

  const tokenMap: TokenMap = new Map()

  const cssVarMap: CssVarMap = new Map()

  let workInProgress: Token | null = null

  function createCssVar() {
    if (workInProgress) {
      const { path, originalValue } = workInProgress

      const variableName = createCssVarName(prefix, path)

      const newValue = `var(${variableName})`

      workInProgress.cssVar = {
        var: variableName,
        ref: newValue,
      }

      workInProgress.value = newValue

      cssVarMap.set(variableName, originalValue)
    }
  }

  function createNegativeToken() {
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
        derivative: true,
      })
    }
  }

  function handleToken() {
    while (workInProgress) {
      const { category, value, derivative } = workInProgress

      tokenMap.set(workInProgress.name, workInProgress)

      if (derivative === true) {
        workInProgress = null
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
          workInProgress = null
          break
      }
    }
  }

  function workloop() {
    function callback(value: string | number, path: string[]) {
      if (!checkTokenValue(value, path)) return

      const category = path[0]

      if (!checkTokenCategory(category)) {
        return
      }

      const dependend =
        tokenMap.get(String(value)) ??
        tokenMap.get(pathToName([category, String(value)]))

      const dependendValue = dependend?.cssVar?.ref || dependend?.value

      workInProgress = createToken({
        path,
        category: category as TokenCategory,
        value: dependendValue ?? value,
        name: pathToName(path),
        originalValue: value,
        derivative: !!dependendValue,
      })

      handleToken()
    }

    function predicate(_: any, path: string[]) {
      const category = path[0]

      // 过滤掉不被支持的类型
      switch (category) {
        case 'colors':
          return path.length > 3
        default:
          return path.length > 2
      }
    }

    const { ...other } = tokens

    walkObject(other, callback, {
      predicate,
    })

    // walkObject({ ...semantic }, callback, {
    //   predicate,
    // })
  }

  workloop()

  return {
    getToken: (key: string) => tokenMap.get(key),
    getCssVars: () => Object.fromEntries(cssVarMap.entries()),
  }
}
