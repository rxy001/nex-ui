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

export type CssFn = (style: StyleObject, colorPalette?: string) => CSSObject

export const createCssFn = ({
  normalize,
  getCustomizedSelector,
}: CreateCssFnConfig) => {
  const css: CssFn = (style, colorPalette) => {
    const result: CSSObject = {}

    const handlePaths = (paths: string[]) => {
      return paths
        .filter((v) => v !== 'DEFAULT')
        .sort((a) => 96 - a.charCodeAt(0))
        .map((p) => {
          // 0 - 9
          if (p.charCodeAt(0) > 47 && p.charCodeAt(0) < 58) {
            const part = paths.slice(0, paths.length - 1)
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

    walkObject(style, (propValue: any, paths: string[]) => {
      const [propKey, ...selectors] = handlePaths(paths)

      const transformed = normalize({
        propKey,
        propValue,
        colorPalette,
      })

      mergeByPath(result, selectors, transformed)
    })

    return result
  }

  return memoizeFn(css)
}

function mergeByPath(target: any, paths: string[], value: any) {
  let acc = target

  forEach(paths, (path) => {
    if (!path) return
    if (!acc[path]) acc[path] = Object.create(null)
    acc = acc[path]
  })

  merge(acc, value)
}
