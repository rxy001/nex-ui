import { walkObject, filter } from 'packages/utils/src'
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
  const keys = Object.keys(sys.semanticTokens)

  const result = `
      export interface SemanticTokens {
       ${keys
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
  const keys = Object.keys(sys.tokens)

  let result = `
      export interface Tokens {
        ${keys
          .map((tokenCategory) => {
            const token = sys.tokens[tokenCategory]

            const types: string[] = []

            Object.keys(token).forEach((k) => {
              if (
                typeof token[k] === 'string' ||
                typeof token[k] === 'number'
              ) {
                types.push(`'${k}'`)
              }

              if (typeof token[k] === 'object') {
                Object.keys(token[k]).forEach((j) => {
                  types.push(`'${k}.${j}'`)
                })
              }
            })
            if (tokenCategory === 'spacing') {
              types.push(...types.map((v) => `'-${v.replaceAll("'", '')}'`))
            }
            return `${tokenCategory}: ${unionType(types)}`
          })
          .join('\n')}
      }
      `
  result += keys
    .map((tokenCategory) => {
      const token = sys.tokens[tokenCategory]

      return `
        export interface ${capitalize(tokenCategory)} {
          ${Object.keys(token)
            .map(
              (key) =>
                `${key}?: ${
                  typeof token[key] === 'object'
                    ? `{${Object.keys(token[key])
                        .map((k) => `${k}?: '${token[key][k]}'`)
                        .join('\n')} }`
                    : `'${token[key]}'`
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
  const scaleKeys = Object.keys(sys.scales)
  const selectorKeys = Object.keys(sys.selectors)
  const aliasKeys = Object.keys(sys.aliases)
  const { semanticTokens } = sys

  function extraType(category: string) {
    return filter(
      [
        `Tokens['${category}']`,
        semanticTokens[category] ? `SemanticTokens['${category}']` : '',
        category === 'colors' ? 'VirtualColors' : '',
      ],
      Boolean,
    )
  }

  const result = `
  import type { RawCSSProperties, CSSInterpolation } from '@nex-ui/system'
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

  export interface NexCSSProperties extends RawCSSProperties {
    ${selectorKeys
      .map((key) => {
        return `_${key}?: CSSInterpolation`
      })
      .join('\n')}
    ${scaleKeys
      .map((key) => {
        const category = sys.scales[key]
        return `${key}?: ${unionType([`RawCSSProperties['${key}']`, ...extraType(category)])}`
      })
      .join('\n')}
    ${aliasKeys
      .map((key) => {
        let value = sys.aliases[key]
        value = Array.isArray(value) ? value[0] : value

        const category = sys.scales[value]
        if (category) {
          return `${key}?: ${unionType([`RawCSSProperties['${value}']`, ...extraType(category)])}`
        }
        return `${key}?: RawCSSProperties['${value}']}`
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
            return `${key}?: '${sys.breakpoints[key]}'`
          })
          .join('\n')}
      }
      `

  return pretty(result)
}
