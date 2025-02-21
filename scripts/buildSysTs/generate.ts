import { walkObject } from 'packages/utils/src'
import { isResponsiveColor } from 'packages/system/src/utils'
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
      import type { UniteTokens } from '../utils'

      export interface SemanticTokensOverrides {}

      export type SemanticTokens = UniteTokens<
        DefaultSemanticTokens,
        SemanticTokensOverrides
      >

      export interface DefaultSemanticTokens {
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
      import type { UniteTokens } from '../utils'

      export interface TokensOverrides {}

      export type Tokens = UniteTokens<DefaultTokens, TokensOverrides>

      export interface DefaultTokens {
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
      import type { Overwrite } from '../utils'
      
      export interface AliasesOverrides {}
      
      export type Aliases = Overwrite<DefaultAliases, AliasesOverrides>

      export interface DefaultAliases {
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
      import type { Overwrite } from '../utils'
      
      export interface ScalesOverrides {}
      
      export type Scales = Overwrite<DefaultScales, ScalesOverrides>

      export interface DefaultScales {
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
      import type { Overwrite } from '../utils'
      
      export interface SelectorsOverrides {}
      
      export type Selectors = Overwrite<DefaultSelectors, SelectorsOverrides>

      export interface DefaultSelectors {
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

export async function generateBreakpoints(sys: any) {
  const keys = Object.keys(sys.breakpoints)

  const result = `
      import type { Overwrite } from '../utils'
      
      export interface BreakpointsOverrides {}
      
      export type Breakpoints = Overwrite<DefaultBreakpoints, BreakpointsOverrides>

      export interface DefaultBreakpoints {
        ${keys
          .map((key) => {
            return `'${key}'?: string`
          })
          .join('\n')}
      }
      `

  return pretty(result)
}
