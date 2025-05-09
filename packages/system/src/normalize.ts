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
    tokenName: originalTokenName,
    category,
    colorPalette,
  }: {
    tokenName: string
    category: TokenCategory
    colorPalette?: string
  }) {
    const matches = extractTokenPlaceholders(originalTokenName)

    if (matches.length) {
      // Handle token reference syntax replacements
      return reduce(
        matches,
        (acc: string, match: RegExpExecArray) => {
          const placeholder = match[0]
          let tokenName = match[1]

          if (includeColorPalette(tokenName)) {
            tokenName = replaceColorPalette(colorPalette, tokenName)
          }

          const token = getToken(tokenName)
          if (!token) {
            console.error(
              '[Nex UI] token reference syntax: An unknown token %s exists in the token reference syntax.',
              tokenName,
            )
            return acc.replace(placeholder, tokenName)
          }

          return acc.replace(placeholder, token.value)
        },
        originalTokenName,
      )
    }

    let tokenName = originalTokenName
    let opacity: string | null = null
    if (category === 'colors') {
      if (includeColorOpacityModifier(tokenName)) {
        const pair = tokenName.split('/')

        const percent = Number(pair[1])
        if (
          pair.length === 2 &&
          !isNaN(percent) &&
          percent >= 0 &&
          percent <= 100
        ) {
          ;[tokenName, opacity] = pair
        }
      }

      if (includeColorPalette(tokenName)) {
        tokenName = replaceColorPalette(colorPalette, tokenName)
      }
    }

    const token = getToken(pathToTokenName([category, tokenName]))

    if (opacity) {
      return colorMix(token?.value ?? tokenName, opacity)
    }

    return token?.value ?? tokenName
  }

  function normalze({ propKey, propValue, colorPalette }: NormalizeConfig) {
    const result: CSSObject = {}

    const properties = getPropertiesByAlias(propKey) ?? [propKey]

    forEach(properties, (property: string) => {
      const category = getCategoryByProperty(property)

      let newPropValue = propValue

      // Only string values are supported. Avoid using numbers, as they may inadvertently map to tokens.
      if (category && isString(newPropValue)) {
        newPropValue = normalizePropValue({
          colorPalette,
          category,
          tokenName: newPropValue,
        })
      }

      result[property] = newPropValue
    })
    return result
  }

  return memoizeFn(normalze)
}

export type NormailizeFn = ReturnType<typeof createNormalize>
