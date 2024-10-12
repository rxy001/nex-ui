import type { StyleObject, Dictionary } from '../types'

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

export type SlotGroups = Dictionary<StyleObject>

export type BaseVariantGroups = Dictionary<Dictionary<StyleObject>>

export type SlotVariantGroups<S extends SlotGroups | string = string> = Record<
  string,
  Dictionary<Partial<Record<keyof S, StyleObject>>>
>

export type CompoundVariantsSelection<
  V extends BaseVariantGroups | SlotVariantGroups,
> = {
  [K in keyof V]?: BooleanMap<keyof V[K]> | BooleanMap<keyof V[K]>[]
}

export type VariantSelection<V extends BaseVariantGroups | SlotVariantGroups> =
  {
    [K in keyof V]?: BooleanMap<keyof V[K]>
  }

export type BaseStylesDefinition<
  V extends BaseVariantGroups = BaseVariantGroups,
> = {
  base: StyleObject
  variants?: V
  defaultVariants?: VariantSelection<V>
  compoundVariants?: Array<CompoundVariantsSelection<V> & { css?: StyleObject }>
}

export type SlotStylesDefinition<
  S extends SlotGroups = SlotGroups,
  V extends SlotVariantGroups<S> = SlotVariantGroups<S>,
> = {
  slots: S
  variants?: V
  defaultVariants?: VariantSelection<V>
  compoundVariants?: Array<
    CompoundVariantsSelection<V> & {
      css?: {
        [K in keyof S]?: StyleObject
      }
    }
  >
}

export type PickVariant<T, K extends keyof any> = K extends keyof T
  ? T[K]
  : never

export interface RuntimeFn<V extends BaseVariantGroups | SlotVariantGroups, R> {
  (variants: VariantSelection<V>): R
  splitVariantProps: <T extends Dictionary>(props: T) => PickVariant<T, keyof V>
}
