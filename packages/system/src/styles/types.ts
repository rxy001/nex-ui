import type { StyleObject, Dictionary } from '../types'

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

export type SlotGroups = Dictionary<StyleObject>

export type BaseVariantGroups = Dictionary<Dictionary<StyleObject>>

export type SlotVariantGroups<S extends SlotGroups = SlotGroups> = Record<
  string,
  Dictionary<Partial<Record<keyof S, StyleObject>>>
>

export type CompoundVariantsSelection<
  V extends BaseVariantGroups | SlotVariantGroups,
> = {
  [K in keyof V]?: string extends K
    ? unknown
    : BooleanMap<keyof V[K]> | BooleanMap<keyof V[K]>[]
}

export type VariantSelection<V extends BaseVariantGroups | SlotVariantGroups> =
  {
    [K in keyof V]?: string extends K ? unknown : BooleanMap<keyof V[K]>
  }

export type BaseRecipeDefinition<
  V extends BaseVariantGroups = BaseVariantGroups,
> = {
  base: StyleObject
  variants?: V
  defaultVariants?: VariantSelection<V>
  compoundVariants?: Array<CompoundVariantsSelection<V> & { css?: StyleObject }>
  extend?: BaseRecipeDefinition
}

export type SlotRecipeDefinition<
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
  extend?: SlotRecipeDefinition
}

export interface RuntimeFn<V extends BaseVariantGroups | SlotVariantGroups, R> {
  (variants?: VariantSelection<V>): R
  variants: keyof V
}
