import type {
  BaseStylesDefinition,
  SlotStylesDefinition,
  StyleObject,
  RawCSSProperties,
} from '@nex-ui/system'

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

type DefineComponentStyles<
  T extends BaseStylesDefinition | SlotStylesDefinition,
  S,
  Q = Exclude<T['variants'], undefined>,
> = (T extends SlotStylesDefinition ? { slots?: S } : { base?: S }) & {
  variants?: {
    [V in keyof Q]?: {
      [K in keyof Q[V]]?: S
    } & {
      [K: string]: S
    }
  } & {
    [V: string]: {
      [K: string]: S
    }
  }
  compoundVariants?: Array<
    {
      [L in keyof Q]?: Array<BooleanMap<keyof Q[L]>> | BooleanMap<keyof Q[L]>
    } & {
      css?: S
    }
  >
}

export type ExtractComponentStyles<T> = T extends BaseStylesDefinition
  ? DefineComponentStyles<T, StyleObject>
  : T extends SlotStylesDefinition
    ? DefineComponentStyles<
        T,
        {
          [S in keyof T['slots']]?: StyleObject
        }
      >
    : never

export type StylesVariantProps<
  T extends BaseStylesDefinition | SlotStylesDefinition,
  V = Exclude<T['variants'], undefined>,
> = {
  [K in keyof V]?: BooleanMap<keyof V[K]>
}

export type ComponentThemeFn<P, S> = (
  ownerState: P,
) => S extends SlotStylesDefinition
  ? {
      [K in keyof S['slots']]?: StyleObject
    }
  : S extends BaseStylesDefinition
    ? StyleObject
    : never

export type TokenDefinition<T, K> = {
  [V in keyof T]: K extends { [key: string]: infer A } ? A : never
} & K

export type ReplaceValuesWithColor<T> = {
  [K in keyof T]: Exclude<T[K], undefined> extends object
    ? ReplaceValuesWithColor<T[K]>
    : RawCSSProperties['color']
}
