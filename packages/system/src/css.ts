import { walkObject, __DEV__, isPlainObject, get, merge } from '@nex-ui/utils'
import { memoizeFn, isSelector } from './utils'
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
import type { Aliases } from './aliases'

interface CreateCssFnConfig {
  getCustomizedSelector: Selectors['getCustomizedSelector']
  normalize: NormailizeFn
  isAlias: Aliases['isAlias']
}

export interface CssFn {
  (interpolation: Interpolation): EmotionInterpolation
}

const isCustomSelector = (key: string) => {
  return key.startsWith('_') && key !== '_DEFAULT'
}

export const createCssFn = ({
  normalize,
  isAlias,
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

    if (Array.isArray(interpolation)) {
      const arrayInterpolation = interpolation as ArrayInterpolation
      return arrayInterpolation.map((v: Interpolation) => css(v))
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
          .sort((a) => {
            // Filter out _DEFAULT first, ensure that those starting with letters are in front,
            // and those starting with _ are at the back, to support suffix selectors
            const charCode = a.charCodeAt(0)

            if (charCode > 64 && charCode < 91) {
              return -1
            }

            return 96 - a.charCodeAt(0)
          })
          .map((p) => {
            // 0 - 9
            if (p.charCodeAt(0) > 47 && p.charCodeAt(0) < 58) {
              const part = path.slice(0, path.length - 1)
              const prevValue = get(cssOjbect, part)
              const index = Number(p)

              if (!Number.isNaN(index) && Array.isArray(prevValue)) {
                // Handle array breakpoints
                return getCustomizedSelector(`_${index}`) ?? ''
              }
            }

            // Handle custom selectors and object breakpoints
            return isCustomSelector(p) ? (getCustomizedSelector(p) ?? p) : p
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
          if (Array.isArray(propValue)) {
            const selectors = path.map((p) =>
              isCustomSelector(p) ? (getCustomizedSelector(p) ?? p) : p,
            )
            const lastSelector = selectors[selectors.length - 1]
            mergeByPath(result, selectors, css(propValue), (v: string) =>
              v === lastSelector ? [] : {},
            )
            return
          }

          const prefix = path.slice(0, path.length - 1)

          if (path[path.length - 1] === 'colorPalette') {
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
          predicate: (v, path) => {
            const key = path[path.length - 2]

            return (
              Array.isArray(v) &&
              !isAlias(key) &&
              (isCustomSelector(key) || isSelector(key))
            )
          },
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

  path.forEach((k: string) => {
    if (!k) return
    if (!acc[k]) acc[k] = customizer ? customizer(k) : {}
    acc = acc[k]
  })

  return merge(acc, value)
}
