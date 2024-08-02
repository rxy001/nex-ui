import type {
  CSSProperties,
  CSSInterpolation,
  StyleObject,
} from '@nex-ui/system'
import type { defaultConfig } from './preset'

type Config = typeof defaultConfig

declare module '@nex-ui/system' {
  export interface SystemDefinition extends Config {}

  export interface OverwriteCSSProperties {
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
