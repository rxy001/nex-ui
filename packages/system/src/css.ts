import {
  forEach,
  merge,
  walkObject,
  get,
  isArray,
  __DEV__,
  map,
  isPlainObject,
  isFunction,
} from '@nex-ui/utils'
import { memoizeFn } from './utils'
import type {
  ComponentSelector,
  Keyframes,
  SerializedStyles,
  CSSObject as EmotionCSSObject,
  Interpolation as EmotionInterpolation,
} from '@emotion/react'
import type { NormailizeFn } from './normalize'
import type { Selectors } from './selectors'
import type {
  Interpolation,
  CSSObject,
  ArrayInterpolation,
  FunctionInterpolation,
} from './types'

interface CreateCssFnConfig {
  getCustomizedSelector: Selectors['getCustomizedSelector']
  normalize: NormailizeFn
}

export interface CssFn {
  (interpolation: Interpolation): EmotionInterpolation
}

const isCustomSelector = (key: string) => {
  return key.startsWith('_')
}

export const createCssFn = ({
  normalize,
  getCustomizedSelector,
}: CreateCssFnConfig) => {
  const css: CssFn = (interpolation) => {
    if (!interpolation) {
      return ''
    }

    const componentSelector = interpolation as ComponentSelector
    if (componentSelector.__emotion_styles !== undefined) {
      return componentSelector
    }

    if (isFunction(interpolation)) {
      const functionInterpolation = interpolation as FunctionInterpolation

      return css(functionInterpolation(undefined))
    }

    if (isArray(interpolation)) {
      const arrayInterpolation = interpolation as ArrayInterpolation
      return map(arrayInterpolation, (v: Interpolation) => css(v))
    }

    if (isPlainObject(interpolation)) {
      const keyframes = interpolation as Keyframes

      if (keyframes.anim === 1) {
        return keyframes
      }

      const serializedStyles = interpolation as SerializedStyles

      if (serializedStyles.styles !== undefined) {
        return serializedStyles
      }

      const cssOjbect = interpolation as CSSObject
      const { colorPalette, ...style } = cssOjbect

      const handlePath = (path: string[]) => {
        return path
          .filter((v) => v !== '_DEFAULT')
          .sort((a) => 96 - a.charCodeAt(0))
          .map((p) => {
            // 0 - 9
            if (p.charCodeAt(0) > 47 && p.charCodeAt(0) < 58) {
              const part = path.slice(0, path.length - 1)
              const prevValue = get(style, part)
              const index = Number(p)

              if (!Number.isNaN(index) && isArray(prevValue)) {
                // 处理数组 breakpoints
                return getCustomizedSelector(`_${index}`) ?? p
              }
            }
            if (isCustomSelector(p)) {
              // 处理自定义的 selectors 和 对象 breakpoints
              return getCustomizedSelector(p) ?? p
            }
            return p
          })
      }

      const result: EmotionCSSObject = {}

      walkObject(style, (propValue: string | number, path: string[]) => {
        const [propKey, ...selectors] = handlePath(path)

        const normalized = normalize({
          propKey,
          propValue,
          colorPalette,
        })

        mergeByPath(result, selectors, normalized)
      })

      return result
    }

    return interpolation as EmotionInterpolation
  }

  return memoizeFn(css)
}

function mergeByPath(target: Record<string, any>, path: string[], value: any) {
  let acc = target

  forEach(path, (k: string) => {
    if (!k) return
    if (!acc[k]) acc[k] = {}
    acc = acc[k]
  })

  merge(acc, value)
}
