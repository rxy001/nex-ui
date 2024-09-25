import { forEach, isPlainObject, merge } from '@nex-ui/utils'
import type { CSSObject } from '@emotion/react'
import type { StyleObject } from './types'
import type { NormailizeFn } from './normalize'
import type { Breakpoints } from './breakpoints'
import type { Aliases } from './aliases'

interface CreateCssFnConfig {
  handleBreakpoints: Breakpoints['handleBreakpoints']
  getPropertiesByAlias: Aliases['getPropertiesByAlias']
  normalize: NormailizeFn
}

export type CssFn = (style: StyleObject, colorPalette?: string) => CSSObject

export const createCssFn = ({
  handleBreakpoints,
  getPropertiesByAlias,
  normalize,
}: CreateCssFnConfig) => {
  const css: CssFn = (style, colorPalette) => {
    const result: CSSObject = {}

    forEach(style, (propertyValue: any, alias: string) => {
      const mediaQueries = handleBreakpoints(alias, propertyValue)
      if (Object.keys(mediaQueries).length > 0) {
        merge(result, css(mediaQueries, colorPalette))
        return
      }

      let newPropertyValue = propertyValue

      if (isPlainObject(newPropertyValue)) {
        newPropertyValue = css(newPropertyValue, colorPalette)
      }

      // alias 可能有多个值
      const properties = getPropertiesByAlias(alias) ?? [alias]

      forEach(properties, (property: string) => {
        result[property] = normalize({
          propKey: property,
          propValue: newPropertyValue,
          colorPalette,
        })
      })
    })

    return result
  }

  return css
}
