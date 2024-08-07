import type {
  CSSProperties,
  CSSInterpolation,
  StyleObject,
  ColorsDefinition,
  SpacingDefinition,
  SizesDefinition,
  FontFamiliesDefinition,
  FontSizesDefinition,
  FontWeightsDefinition,
  LineHeightsDefinition,
  BordersDefinition,
  RadiiDefinition,
  AliasesDefinition,
  ScalesDefinition,
} from '@nex-ui/system'
import type { defaultTheme } from './preset'
import type { ButtonComponentStyles, ButtonVariants } from './components'

type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? K extends keyof A
      ? B[K] extends object
        ? A[K] extends object
          ? Merge<A[K], B[K]>
          : B[K]
        : B[K]
      : B[K]
    : K extends keyof A
      ? A[K]
      : never
}

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

export type ExtractComponentType<T> = ('base' extends keyof T
  ? { base?: StyleObject }
  : unknown) &
  ('slots' extends keyof T
    ? {
        slots?: {
          [L in keyof T['slots']]: StyleObject
        }
      }
    : unknown) &
  ('variants' extends keyof T
    ? T['variants'] extends infer U
      ? {
          variants?: {
            [L in keyof U]?: {
              [J in keyof U[L]]?: 'slots' extends keyof T
                ? { [S in keyof T['slots']]?: StyleObject }
                : StyleObject
            }
          }
          defaultVariants?: {
            [L in keyof U]?: BooleanMap<keyof U[L]>
          }
          compoundVariants?: Array<
            {
              [L in keyof U]?:
                | Array<BooleanMap<keyof U[L]>>
                | BooleanMap<keyof U[L]>
            } & {
              css?: 'slots' extends keyof T
                ? {
                    [S in keyof T['slots']]: StyleObject
                  }
                : StyleObject
            }
          >
        }
      : never
    : unknown)

export type ExtractVariants<T> = T extends { variants?: infer V }
  ? {
      [K in keyof V]?: BooleanMap<keyof V[K]>
    }
  : unknown

export type ComponentThemeFn<P> = (
  ownerState: Required<P>,
) => StyleObject | void

type DefaultTheme = typeof defaultTheme

export type BasicTheme = {
  aliases?: AliasesDefinition & Partial<DefaultTheme['aliases']>
  borders?: BordersDefinition & Partial<DefaultTheme['borders']>
  spacing?: SpacingDefinition & Partial<DefaultTheme['spacing']>
  colors?: ColorsDefinition & Partial<DefaultTheme['colors']>
  sizes?: SizesDefinition & Partial<DefaultTheme['sizes']>
  fontFamilies?: FontFamiliesDefinition & Partial<DefaultTheme['fontFamilies']>
  fontSizes?: FontSizesDefinition & Partial<DefaultTheme['fontSizes']>
  fontWeights?: FontWeightsDefinition & Partial<DefaultTheme['fontWeights']>
  lineHeights?: LineHeightsDefinition & Partial<DefaultTheme['lineHeights']>
  radii?: RadiiDefinition & Partial<DefaultTheme['radii']>
  scales?: ScalesDefinition & Partial<DefaultTheme['scales']>
}

export type ComponentTheme = {
  button?: ButtonComponentStyles | ComponentThemeFn<ButtonVariants>
}

export interface Theme {}

export interface Aliases {
  _hover?: CSSInterpolation
  _active?: CSSInterpolation
  _disabled?: CSSInterpolation

  _bg?: CSSProperties['backgroundColor']
  _fs?: CSSProperties['fontSize']
  _lh?: CSSProperties['lineHeight']
  _w?: CSSProperties['width']
  _h?: CSSProperties['height']

  _py?: CSSProperties['paddingTop']
  _px?: CSSProperties['paddingLeft']
  _pt?: CSSProperties['paddingTop']
  _pb?: CSSProperties['paddingBottom']
  _pl?: CSSProperties['paddingLeft']
  _pr?: CSSProperties['paddingRight']
  _p?: CSSProperties['padding']

  _mt?: CSSProperties['marginTop']
  _mb?: CSSProperties['marginBottom']
  _ml?: CSSProperties['marginLeft']
  _mr?: CSSProperties['marginRight']
  _mx?: CSSProperties['marginLeft']
  _my?: CSSProperties['marginTop']
  _m?: CSSProperties['margin']
}

declare module '@nex-ui/system' {
  interface SystemDefinition extends Merge<DefaultTheme, Theme> {}

  interface OverwriteCSSProperties extends Aliases {}
}
