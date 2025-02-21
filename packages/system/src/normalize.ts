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

function replaceColorPalette(colorPalette: string | undefined, value: string) {
  if (!colorPalette) {
    console.error('[Nex UI] colorPalette: The color palette was not provided.')
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
    category: TokenCategory
    colorPalette?: string
  }) {
    const matches = extractTokenPlaceholders(originalTokenName)

    // 替换 token reference syntax
    if (matches.length) {
      return reduce(
        matches,
        (acc: string, match: RegExpExecArray) => {
          const placeholder = match[0]
          let tokenName = match[1]

          if (includeColorPalette(tokenName)) {
            tokenName = replaceColorPalette(colorPalette, tokenName)
          }
          const token = getToken(tokenName)
          if (token) {
            return acc.replace(placeholder, token.value)
          }
          console.error(
            '[Nex UI] token reference syntax: An unknown token %s exists in the token reference syntax.',
            tokenName,
          )
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

  function normalze({ propKey, propValue, colorPalette }: NormalizeConfig) {
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

  return memoizeFn(normalze)
}

export type NormailizeFn = ReturnType<typeof createNormalize>
