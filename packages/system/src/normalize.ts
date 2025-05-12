import { forEach, isString, reduce } from '@nex-ui/utils'
import type { CSSObject } from '@emotion/react'
import { extractTokenPlaceholders, memoizeFn, pathToTokenName } from './utils'
import type { TokenCategory, Tokens } from './tokens'
import type { Scales } from './scales'
import type { Aliases } from './aliases'

interface CreateNormalizeConfig {
  getToken: Tokens['getToken']
  getCategoryByProperty: Scales['getCategoryByProperty']
  getPropertiesByAlias: Aliases['getPropertiesByAlias']
}

interface NormalizeConfig {
  propKey: string
  propValue: string | number
  colorPalette?: string
}

function includeColorPalette(value: string) {
  const colorPaletteRegExp = /(?:colors\.)?colorPalette(?:\.\d+)?/

  return colorPaletteRegExp.test(value)
}

function includeColorOpacityModifier(value: string) {
  return /\//.test(value)
}

function replaceColorPalette(colorPalette: string | undefined, value: string) {
  if (!colorPalette) {
    console.error('[Nex UI] colorPalette: The color palette was not provided.')
    return value
  }
  return value.replace('colorPalette', colorPalette)
}

function colorMix(color: string, percent: string) {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`
}

export const createNormalize = ({
  getPropertiesByAlias,
  getCategoryByProperty,
  getToken,
}: CreateNormalizeConfig) => {
  function normalizePropValue({
    propValue: originalPropValue,
    category,
    colorPalette,
  }: {
    propValue: string
    category: TokenCategory
    colorPalette?: string
  }) {
    let propValue = originalPropValue
    let opacity = null

    if (category === 'colors') {
      if (includeColorOpacityModifier(propValue)) {
        const pair = propValue.split('/')

        const percent = Number(pair[1])
        if (
          pair.length === 2 &&
          !isNaN(percent) &&
          percent >= 0 &&
          percent <= 100
        ) {
          ;[propValue, opacity] = pair
        }
      }

      if (includeColorPalette(propValue)) {
        propValue = replaceColorPalette(colorPalette, propValue)
      }
    }

    const tokenName = pathToTokenName([category, propValue])

    const token = getToken(tokenName)

    if (opacity) {
      return colorMix(token?.value ?? propValue, opacity)
    }

    return token?.value ?? propValue
  }

  function normalze({ propKey, propValue, colorPalette }: NormalizeConfig) {
    const result: CSSObject = {}

    const properties = getPropertiesByAlias(propKey) ?? [propKey]

    forEach(properties, (property: string) => {
      if (isString(propValue)) {
        // Only string values are supported. Avoid using numbers, as they may inadvertently map to tokens.

        const matches = extractTokenPlaceholders(propValue)
        if (matches.length) {
          // Handle token reference syntax replacements
          result[property] = reduce(
            matches,
            (acc: string, match: RegExpExecArray) => {
              const placeholder = match[0]
              const [category, ...rest] = match[1].split('.')
              return acc.replace(
                placeholder,
                normalizePropValue({
                  colorPalette,
                  category: category as TokenCategory,
                  propValue: rest.join('.'),
                }),
              )
            },
            propValue,
          )
          return
        }

        const category = getCategoryByProperty(property)

        if (category) {
          result[property] = normalizePropValue({
            colorPalette,
            category,
            propValue,
          })
          return
        }
      }

      result[property] = propValue
    })
    return result
  }

  return memoizeFn(normalze)
}

export type NormailizeFn = ReturnType<typeof createNormalize>
