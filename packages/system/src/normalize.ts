import { isString } from '@nex-ui/utils'
import { pathToName } from './utils'
import type { Tokens } from './tokens'
import type { Scales } from './scales'

interface CreateNormalizeConfig {
  getToken: Tokens['getToken']
  getCategoryByProperty: Scales['getCategoryByProperty']
}

interface NormalizeConfig {
  propKey: string
  propValue: any
  colorPalette?: string
}

export const createNormalize = ({
  getCategoryByProperty,
  getToken,
}: CreateNormalizeConfig) => {
  return ({ propKey, propValue, colorPalette }: NormalizeConfig) => {
    const category = getCategoryByProperty(propKey)

    let newPropValue = propValue

    if (category) {
      switch (category) {
        case 'colors':
          if (isString(newPropValue)) {
            newPropValue = colorPalette
              ? newPropValue.replace(/^colorPalette(?=\.)/, colorPalette)
              : newPropValue
          }
          break
        default:
          break
      }
      const token = getToken(pathToName([category, newPropValue]))

      return token?.value ?? newPropValue
    }

    return newPropValue
  }
}

export type NormailizeFn = ReturnType<typeof createNormalize>
