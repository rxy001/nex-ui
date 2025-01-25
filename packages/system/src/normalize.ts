import { forEach, isString, reduce } from '@nex-ui/utils'
import type { CSSObject } from '@emotion/react'
import { extractTokenPlaceholders, pathToTokenName } from './utils'
import type { TokenCategories, Tokens } from './tokens'
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

function replaceColorPalette(colorPalette: string | undefined, value: string) {
  if (!colorPalette) {
    console.error('nex-system: The color palette was not provided.')
    return value
  }
  return value.replace('colorPalette', colorPalette)
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
    category: TokenCategories
    colorPalette?: string
  }) {
    const matches = extractTokenPlaceholders(originalTokenName)

    // 替换 token placeholders syntax
    if (matches.length) {
      return reduce(
        matches,
        (acc, match) => {
          const placeholder = match[0]
          let tokenName = match[1]

          if (includeColorPalette(tokenName)) {
            tokenName = replaceColorPalette(colorPalette, tokenName)
          }
          const token = getToken(tokenName)
          if (token) {
            return acc.replace(placeholder, token.value)
          }
          console.error(`nex-system: Unknown token ${tokenName}`)
          return acc.replace(placeholder, tokenName)
        },
        originalTokenName,
      )
    }

    let tokenName = pathToTokenName([category, originalTokenName])

    // 替换 colorPalette
    if (category === 'colors' && includeColorPalette(tokenName)) {
      tokenName = replaceColorPalette(colorPalette, tokenName)
    }

    const token = getToken(tokenName)
    return token?.value ?? originalTokenName
  }

  return ({ propKey, propValue, colorPalette }: NormalizeConfig) => {
    const result: CSSObject = {}

    const properties = getPropertiesByAlias(propKey) ?? [propKey]

    forEach(properties, (property: string) => {
      const category = getCategoryByProperty(property)

      let newPropValue = propValue

      // 只支持 string，避免使用 number 时也会映射到 token
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
}

export type NormailizeFn = ReturnType<typeof createNormalize>
