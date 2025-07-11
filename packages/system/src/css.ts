import {
  forEach,
  merge,
  walkObject,
  get,
  isArray,
  __DEV__,
  map,
  isPlainObject,
  some,
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
import type { Interpolation, CSSObject, ArrayInterpolation } from './types'

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

    // TODO: unused
    const componentSelector = interpolation as ComponentSelector
    if (componentSelector.__emotion_styles !== undefined) {
      return componentSelector
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

      // TODO: unused
      const serializedStyles = interpolation as SerializedStyles
      if (serializedStyles.styles !== undefined) {
        return serializedStyles
      }

      const cssOjbect = interpolation as CSSObject

      const handlePath = (path: string[]) => {
        return path
          .filter((v) => v !== '_DEFAULT')
          .sort((a) => 96 - a.charCodeAt(0))
          .map((p) => {
            // 0 - 9
            if (p.charCodeAt(0) > 47 && p.charCodeAt(0) < 58) {
              const part = path.slice(0, path.length - 1)
              const prevValue = get(cssOjbect, part)
              const index = Number(p)

              if (!Number.isNaN(index) && isArray(prevValue)) {
                // 处理数组 breakpoints
                return getCustomizedSelector(`_${index}`) ?? ''
              }
            }

            if (isCustomSelector(p)) {
              // 处理自定义的 selectors 和 对象 breakpoints
              return getCustomizedSelector(p) ?? p
            }
            return p
          })
      }

      const getColorPalette = (path: string[]): string | undefined => {
        if (path.length === 0) {
          return cssOjbect['colorPalette']
        }

        return get(
          cssOjbect,
          [...path, 'colorPalette'],
          getColorPalette(path.slice(0, path.length - 1)),
        )
      }

      const result: EmotionCSSObject = {}

      walkObject(
        cssOjbect,
        (propValue: string | number, path: string[]) => {
          const prop = path[path.length - 1]

          // FIXME: 暂时解决自定义选择器时 CSSObject 数组. 如果数组中都为基础类型，将会作为 breakpoints 处理
          if (isArray(propValue) && some(propValue, isPlainObject)) {
            mergeByPath(result, path, css(propValue), (v: string) => {
              if (v === prop) return []
            })
            return
          }

          const prefix = path.slice(0, path.length - 1)
          if (prop === 'colorPalette') {
            return
          }

          const colorPalette = getColorPalette(prefix)

          const [propKey, ...selectors] = handlePath(path)

          const normalized = normalize({
            propKey,
            propValue,
            colorPalette,
          })

          mergeByPath(result, selectors, normalized)
        },
        {
          predicate: (v) => isArray(v) && some(v, isPlainObject),
        },
      )

      return result
    }

    return interpolation as EmotionInterpolation
  }

  return memoizeFn(css)
}

function mergeByPath(
  target: Record<string, any>,
  path: string[],
  value: any,
  customizer?: Function,
) {
  let acc = target

  forEach(path, (k: string) => {
    if (!k) return
    if (!acc[k]) acc[k] = customizer ? customizer(k) : {}
    acc = acc[k]
  })

  merge(acc, value)
}
