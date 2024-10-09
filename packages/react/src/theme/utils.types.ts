import type { StyleObject } from '@nex-ui/system'

export type DeepMerge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? K extends keyof A
      ? B[K] extends object
        ? A[K] extends object
          ? DeepMerge<A[K], B[K]>
          : B[K]
        : B[K]
      : B[K]
    : K extends keyof A
      ? A[K]
      : never
}

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

type ExtractStylesType<T> = 'slots' extends keyof T
  ? { [S in keyof T['slots']]?: StyleObject }
  : StyleObject

export type ExtractComponentStyles<T> = ('base' extends keyof T
  ? { base?: StyleObject }
  : unknown) &
  ('slots' extends keyof T
    ? {
        slots?: ExtractStylesType<T>
      }
    : unknown) &
  ('variants' extends keyof T
    ? T['variants'] extends infer U
      ? {
          variants?: {
            [L in keyof U]?: {
              [J in keyof U[L]]?: ExtractStylesType<T>
            } & {
              [K: string]: ExtractStylesType<T>
            }
          } & {
            [K: string]: {
              [J: string]: ExtractStylesType<T>
            }
          }
          compoundVariants?: Array<
            {
              [L in keyof U]?:
                | Array<BooleanMap<keyof U[L]>>
                | BooleanMap<keyof U[L]>
            } & {
              css?: ExtractStylesType<T>
            }
          >
        }
      : never
    : unknown)

export type ExtractComponentVariants<T> = T extends { variants?: infer V }
  ? {
      [K in keyof V]?: BooleanMap<keyof V[K]>
    }
  : unknown

export type ComponentThemeFn<P, S = undefined> = (
  ownerState: P,
) => 'slots' extends keyof S
  ? {
      [k in keyof S['slots']]?: StyleObject
    }
  : StyleObject
