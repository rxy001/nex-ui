import { isString } from '@nex-ui/utils'
import {
  extractTokenPlaceholders,
  isValidTokenCategory,
  pathToTokenName,
} from './utils'
import type { CSSObject } from '@emotion/react'
import type { Scales } from './scales'
import type { Aliases } from './aliases'
import type { TokenCategory, Tokens } from './tokens'

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

function resolveColorPalette(colorPalette: string | undefined, value: string) {
  if (!colorPalette) {
    console.error('[Nex UI] system: The color palette was not provided.')
    return value
  }
  return value.replace('colorPalette', colorPalette)
}

function colorMix(color: string, percent: string) {
  return `color-mix(in oklab, ${color} ${percent}%, transparent)`
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
        propValue = resolveColorPalette(colorPalette, propValue)
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

    properties.forEach((property: string) => {
      if (isString(propValue) && !propValue.startsWith('_EMO_animation')) {
        // Only string values are supported. Avoid using numbers, as they may inadvertently map to tokens.
        const matches = extractTokenPlaceholders(propValue)
        if (matches.length) {
          // Handle token reference syntax replacements
          result[property] = matches.reduce(
            (acc: string, match: RegExpExecArray) => {
              const [placeholder] = match
              const [category, ...rest] = match[1].split('.')
              if (isValidTokenCategory(category)) {
                return acc.replace(
                  placeholder,
                  normalizePropValue({
                    colorPalette,
                    category: category as TokenCategory,
                    propValue: rest.join('.'),
                  }),
                )
              }
              return acc
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

  return normalze
}

export type NormailizeFn = ReturnType<typeof createNormalize>
