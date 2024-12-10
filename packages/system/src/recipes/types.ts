import type { StyleObject, Dictionary } from '../types'

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

export type SlotGroups = Dictionary<StyleObject>

export type BaseVariantGroups = Dictionary<Dictionary<StyleObject>>

export type SlotVariantGroups<S extends SlotGroups = SlotGroups> = Dictionary<
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

export type RecipeConfig<V extends BaseVariantGroups = BaseVariantGroups> = {
  base?: StyleObject
  variants?: V
  defaultVariants?: VariantSelection<V>
  compoundVariants?: Array<CompoundVariantsSelection<V> & { css?: StyleObject }>
  // eslint-disable-next-line no-use-before-define
  extend?: RecipeRuntimeFn
}

export type SlotRecipeConfig<
  S extends SlotGroups = SlotGroups,
  V extends SlotVariantGroups<S> = SlotVariantGroups<S>,
> = {
  slots?: S
  variants?: V
  defaultVariants?: VariantSelection<V>
  compoundVariants?: Array<
    CompoundVariantsSelection<V> & {
      css?: {
        [K in keyof S]?: StyleObject
      }
    }
  >
  // eslint-disable-next-line no-use-before-define
  extend?: SlotRecipeRuntimeFn
}

export interface RuntimeFn<V extends Record<string, any>, R> {
  (variants?: VariantSelection<V>): R
}

export interface RecipeRuntimeFn<
  V extends BaseVariantGroups = BaseVariantGroups,
> extends RuntimeFn<V, StyleObject> {
  __recipe: true
  __config: RecipeConfig<V>
  variants: (keyof V)[]
}

export interface SlotRecipeRuntimeFn<
  S extends SlotGroups = SlotGroups,
  V extends SlotVariantGroups<S> = SlotVariantGroups<S>,
> extends RuntimeFn<V, Record<keyof S, StyleObject>> {
  __slotRecipe: true
  __config: SlotRecipeConfig<S, V>
  variants: (keyof V)[]
  slots: (keyof S)[]
}

export type RecipeVariants<
  RecipeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn,
  V = Parameters<RecipeFn>[0],
> = Exclude<
  {
    [Key in keyof V]: V[Key]
  } & NonNullable<unknown>,
  undefined
>
