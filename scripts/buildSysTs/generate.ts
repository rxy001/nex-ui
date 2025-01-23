import { walkObject, filter } from 'packages/utils/src'
import { isResponsiveColor } from 'packages/system/src/tokens/createTokens'
import { pretty } from '../utils'

function capitalize(str: string) {
  return str.replace(/^\w/, (c) => c.toUpperCase())
}

function unionType(types: any[]) {
  return types.join(' | ')
}

function filterDefault(path: string[]) {
  if (path[0] === 'DEFAULT') return path
  return path.filter((item) => item !== 'DEFAULT')
}

export async function generateSemanticTokens(sys: any) {
  const tokenCategories = Object.keys(sys.semanticTokens)

  const result = `
      export interface SemanticTokens {
       ${tokenCategories
         .map((tokenCategory) => {
           const token = sys.semanticTokens[tokenCategory]
           const types: string[] = []
           walkObject(
             token,
             (_value: string | number, path: string[]) => {
               types.push(`'${filterDefault(path).join('.')}'`)
             },
             {
               predicate: isResponsiveColor,
             },
           )

           return `${tokenCategory}: ${unionType(types)}`
         })
         .join('\n')}
      }
  `

  return pretty(result)
}

export async function generateTokens(sys: any) {
  const tokenCategories = Object.keys(sys.tokens)

  let result = `
      import type { CSSProperties } from '@nex-ui/system'

      export interface Tokens {
        ${tokenCategories
          .map((tokenCategory) => {
            const token = sys.tokens[tokenCategory]

            const types: string[] = []

            Object.keys(token).forEach((key) => {
              const value = token[key]
              const valueType = typeof value
              if (valueType === 'string' || valueType === 'number') {
                types.push(`'${key}'`)
              }

              if (valueType === 'object') {
                Object.keys(value).forEach((sub) => {
                  types.push(`'${key}.${sub}'`)
                })
              }
            })

            if (tokenCategory === 'spacing') {
              types.push(...types.map((v) => `'-${v.replaceAll("'", '')}'`))
            }

            if (!types.length) {
              return ''
            }

            return `${tokenCategory}: ${unionType(types)}`
          })
          .join('\n')}
      }
      `

  const typeMap: Record<string, string> = {
    borders: 'string | number',
    spacing: 'string | number',
    colors: "CSSProperties['color']",
    sizes: 'string | number',
    fontFamilies: 'string',
    fontSizes: 'string | number',
    fontWeights: 'string | number',
    lineHeights: 'string | number',
    radii: 'string | number',
    borderWidths: 'string | number',
    transitions: 'string',
    shadows: 'string',
    zIndexes: 'string | number',
  }

  result += tokenCategories
    .map((tokenCategory) => {
      const token = sys.tokens[tokenCategory]

      const keys = Object.keys(token)

      return `

        export interface ${capitalize(tokenCategory)}Token {
          ${keys
            .map(
              (key) =>
                `'${key}'?: ${
                  typeof token[key] === 'object'
                    ? `{${Object.keys(token[key])
                        .map((sub) => `${sub}?: ${typeMap[tokenCategory]}`)
                        .join('\n')} }`
                    : typeMap[tokenCategory]
                }`,
            )
            .join('\n')}
        }
      `
    })
    .join('\n')

  return pretty(result)
}

export async function generateAliases(sys: any) {
  const keys = Object.keys(sys.aliases)

  const result = `
      export interface Aliases {
        ${keys
          .map((key) => {
            const value = sys.aliases[key]
            return `${key}?: ${Array.isArray(value) ? `[${value.map((v) => `'${v}'`).join(',')}]` : `'${value}'`}`
          })
          .join('\n')}
      }
      `

  return pretty(result)
}

export async function generateScales(sys: any) {
  const keys = Object.keys(sys.scales)

  const result = `
      export interface Scales {
        ${keys
          .map((key) => {
            const value = sys.scales[key]
            return `${key}?: '${value}'`
          })
          .join('\n')}
      }
      `

  return pretty(result)
}

export async function generateSelectors(sys: any) {
  const keys = Object.keys(sys.selectors)

  const result = `
      export interface Selectors {
        ${keys
          .map((key) => {
            const value = sys.selectors[key]
            return `${key}?: '${value}'`
          })
          .join('\n')}
        }
      `

  return pretty(result)
}

export async function generateCSSProperties(sys: any) {
  const { semanticTokens, tokens, scales, selectors, aliases } = sys
  const scaleKeys = Object.keys(scales)
  const selectorKeys = Object.keys(selectors)
  const aliasKeys = Object.keys(aliases)

  function extraType(category: string) {
    return filter(
      [
        tokens[category] && Object.keys(tokens[category]).length
          ? `Tokens['${category}']`
          : '',
        semanticTokens[category] && Object.keys(semanticTokens[category]).length
          ? `SemanticTokens['${category}']`
          : '',
        category === 'colors' ? 'VirtualColors' : '',
      ],
      Boolean,
    )
  }

  const result = `
  import type { CSSInterpolation, CSSProperties } from '@nex-ui/system'
  import type { Tokens } from './tokens'
  import type { SemanticTokens } from './semanticTokens'
  import type { Breakpoints } from './breakpoints'

  type ResponsiveColor<T> = {
    _DEFAULT?: T
    _dark?: T
    _light?: T
  }

  type BreakpointObject<T> = {
    [K in keyof Breakpoints as \`_\${K}\`]: T
  }

  type BreakpointArray= (string | number)[] | readonly (string | number)[]

  
  type TransformColors<T> = T extends \`\${string}.\${infer U}\`
    ? \`colorPalette.\${U}\`
    : 'colorPalette'

  type VirtualColors = TransformColors<Tokens['colors']> | TransformColors<SemanticTokens['colors']> 

  export interface NexCSSProperties extends CSSProperties {
    ${selectorKeys
      .map((key) => {
        return `_${key}?: CSSInterpolation`
      })
      .join('\n')}
    ${scaleKeys
      .map((key) => {
        const category = sys.scales[key]
        return `${key}?: ${unionType([`CSSProperties['${key}']`, ...extraType(category)])}`
      })
      .join('\n')}
    ${aliasKeys
      .map((key) => {
        let value = sys.aliases[key]
        value = Array.isArray(value) ? value[0] : value

        const category = sys.scales[value]
        if (category) {
          return `${key}?: ${unionType([`CSSProperties['${value}']`, ...extraType(category)])}`
        }
        return `${key}?: CSSProperties['${value}']}`
      })
      .join('\n')}
    }

  type ExtraCSSPropertyValue<T> = {
    [K in keyof T]?:
      | T[K]
      | BreakpointArray
      | ResponsiveColor<T[K]>
      | BreakpointObject<T[K]>
  }

  export type StyleObjectOverrides = ExtraCSSPropertyValue<NexCSSProperties>

  `

  return pretty(result)
}

export async function generateBreakpoints(sys: any) {
  const keys = Object.keys(sys.breakpoints)

  const result = `
      export interface Breakpoints {
        ${keys
          .map((key) => {
            return `'${key}'?: string`
          })
          .join('\n')}
      }
      `

  return pretty(result)
}
