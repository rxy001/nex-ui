import {
  forEach,
  merge,
  walkObject,
  get,
  isArray,
  __DEV__,
} from '@nex-ui/utils'
import type { CSSObject as EmotionCSSObject } from '@emotion/react'
import { memoizeFn } from './utils'
import type { CSSObject } from './types'
import type { NormailizeFn } from './normalize'
import type { Selectors } from './selectors'

interface CreateCssFnConfig {
  getCustomizedSelector: Selectors['getCustomizedSelector']
  normalize: NormailizeFn
}

type ValidStyleType = CSSObject | undefined | false | null

export type CssFnParams = ValidStyleType | ValidStyleType[]

export interface CssFn {
  (styles: CssFnParams): EmotionCSSObject
}

const isCustomSelector = (key: string) => {
  return key.startsWith('_')
}

export const createCssFn = ({
  normalize,
  getCustomizedSelector,
}: CreateCssFnConfig) => {
  const css: CssFn = (stylesProp) => {
    const styles = Array.isArray(stylesProp) ? stylesProp : [stylesProp]

    const result: EmotionCSSObject = {}

    forEach(styles, (styleProp: ValidStyleType) => {
      if (!styleProp) {
        return
      }

      const { colorPalette, ...style } = styleProp

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

      walkObject(style, (propValue: string | number, path: string[]) => {
        const [propKey, ...selectors] = handlePath(path)

        const normalized = normalize({
          propKey,
          propValue,
          colorPalette,
        })

        mergeByPath(result, selectors, normalized)
      })
    })

    return result
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
