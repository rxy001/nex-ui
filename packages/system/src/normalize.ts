import { forEach, isString } from '@nex-ui/utils'
import type { CSSObject } from '@emotion/react'
import { pathToName } from './utils'
import type { Tokens } from './tokens'
import type { Scales } from './scales'
import type { Aliases } from './aliases'

interface CreateNormalizeConfig {
  getToken: Tokens['getToken']
  getCategoryByProperty: Scales['getCategoryByProperty']
  getPropertiesByAlias: Aliases['getPropertiesByAlias']
}

interface NormalizeConfig {
  propKey: string
  propValue: any
  colorPalette?: string
}

export const createNormalize = ({
  getPropertiesByAlias,
  getCategoryByProperty,
  getToken,
}: CreateNormalizeConfig) => {
  return ({ propKey, propValue, colorPalette }: NormalizeConfig) => {
    const result: CSSObject = {}

    const properties = getPropertiesByAlias(propKey) ?? [propKey]

    forEach(properties, (property: string) => {
      const category = getCategoryByProperty(property)

      let newPropValue = propValue

      // 只支持 string，避免使用 number 时也会映射到 token
      if (category && isString(propValue)) {
        switch (category) {
          case 'colors':
            // eslint-disable-next-line no-case-declarations
            const regExp = /^colorPalette(?=\.?)/

            if (isString(newPropValue) && regExp.test(newPropValue)) {
              if (!colorPalette) {
                console.error('nex-system: The color palette was not provided.')
              }

              newPropValue = colorPalette
                ? newPropValue.replace(regExp, colorPalette)
                : newPropValue
            }

            break
          default:
            break
        }
        const token = getToken(pathToName([category, newPropValue]))

        newPropValue = token?.value ?? newPropValue
      }

      result[property] = newPropValue
    })

    return result
  }
}

export type NormailizeFn = ReturnType<typeof createNormalize>
