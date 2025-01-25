import { forEach, merge, walkObject, get, isArray } from '@nex-ui/utils'
import type { CSSObject } from '@emotion/react'
import { memoizeFn } from './utils'
import type { StyleObject } from './types'
import type { NormailizeFn } from './normalize'
import type { Selectors } from './selectors'

interface CreateCssFnConfig {
  getCustomizedSelector: Selectors['getCustomizedSelector']
  normalize: NormailizeFn
}

export interface CssFn {
  (styles: StyleObject | StyleObject[]): CSSObject
}

export const createCssFn = ({
  normalize,
  getCustomizedSelector,
}: CreateCssFnConfig) => {
  const css: CssFn = (stylesProps) => {
    const styles = Array.isArray(stylesProps) ? stylesProps : [stylesProps]

    const result: CSSObject = {}

    forEach(styles, (styleProps: StyleObject) => {
      const { colorPalette, ...style } = styleProps

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
            if (p.startsWith('_')) {
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
