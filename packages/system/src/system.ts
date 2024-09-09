import { forEach, isPlainObject, isString, merge } from '@nex-ui/utils'
import type { CSSObject } from '@emotion/react'
import { pathToName, memoizeFn } from './utils'
import type { SystemConfig, NormalizeFn } from './types'
import { createStylesFn } from './styles'
import { createTokens } from './tokens'
import { createScales } from './scales'
import { createAliases } from './aliases'
import { createBreakpoints } from './breakpoints'

export const createSystem = (config: SystemConfig) => {
  const {
    cssVarsPrefix = 'system',
    scales,
    aliases,
    breakpoints,
    ...tokens
  } = config
  const { getToken, getCssVars } = createTokens({
    tokens,
    prefix: cssVarsPrefix,
  })

  const { getCategoryBasedOnProperty } = createScales({ scales })

  const { getPropertiesBasedOnAlias } = createAliases({ aliases })

  const { handleBreakpoints } = createBreakpoints(breakpoints)

  const normalizeImpl: NormalizeFn = (style, specifiedColorPalette) => {
    const result: CSSObject = {}

    forEach(style, (propertyValue: any, alias: string) => {
      const mediaQueries = handleBreakpoints(alias, propertyValue)
      if (Object.keys(mediaQueries).length > 0) {
        merge(result, normalizeImpl(mediaQueries, specifiedColorPalette))
        return
      }

      let newPropertyValue = propertyValue

      if (isPlainObject(newPropertyValue)) {
        newPropertyValue = normalizeImpl(
          newPropertyValue,
          specifiedColorPalette,
        )
      }

      // alias 可能有多个值
      const properties = getPropertiesBasedOnAlias(alias) ?? [alias]

      forEach(properties, (property: string) => {
        const category = getCategoryBasedOnProperty(property)
        if (category) {
          switch (category) {
            case 'colors':
              if (isString(newPropertyValue)) {
                newPropertyValue = specifiedColorPalette
                  ? newPropertyValue.replace(
                      /^colorPalette(?=\.)/,
                      specifiedColorPalette,
                    )
                  : newPropertyValue
              }
              break
            default:
              break
          }
          const token = getToken(pathToName([category, newPropertyValue]))
          result[property] = token?.value ?? newPropertyValue
        } else {
          result[property] = newPropertyValue
        }
      })
    })

    return result
  }

  const normalize = memoizeFn(normalizeImpl)

  const styles = memoizeFn(createStylesFn())

  return {
    styles,
    normalize,
    globalCssVars: {
      ':root': getCssVars(),
    },
  }
}
