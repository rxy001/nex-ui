import { forEach, isPlainObject, isString } from '@nex-ui/utils'
import { pathToName } from './utils'
import type { SystemConfig, StyleObject } from './types'
import { createStylesFn } from './styles'
import { createTokens } from './tokens'
import { createScales } from './scales'
import { createAliases } from './aliases'

export const createSystem = (config: SystemConfig) => {
  const { cssVarsPrefix = 'system', scales, aliases, ...tokens } = config

  const { getToken, getCssVars } = createTokens({
    tokens,
    prefix: cssVarsPrefix,
  })

  const { getPropScale } = createScales({ scales })

  const { getProperties } = createAliases({ aliases })

  function normalize<T extends StyleObject>(
    style: T,
    specifiedColorPalette?: string,
  ) {
    const result: StyleObject = {}

    forEach(style, (value: T[keyof T], key: string) => {
      const properties = getProperties(key) ?? [key]

      forEach(properties, (property: string) => {
        const category = getPropScale(property)
        if (category) {
          let newValue = value as any
          switch (category) {
            case 'colors':
              if (isString(newValue)) {
                newValue = specifiedColorPalette
                  ? newValue.replace(
                      /^colorPalette(?=\.)/,
                      specifiedColorPalette,
                    )
                  : newValue
              }

              break
            default:
              break
          }

          const token = getToken(pathToName([category, newValue]))
          result[property] = token?.value ?? value
        } else if (isPlainObject(value)) {
          // cssobject
          result[property] = normalize(value as StyleObject)
        } else {
          // 标准 css 值
          result[property] = value
        }
      })
    })

    return result as T
  }

  const styles = createStylesFn({
    normalize,
  })

  return {
    styles,
    normalize,
    globalCssVars: {
      ':root': getCssVars(),
    },
  }
}
