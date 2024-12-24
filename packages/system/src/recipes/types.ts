/* eslint-disable no-use-before-define */
import type { StyleObject, Dictionary } from '../types'

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

export type SlotGroups = Dictionary<StyleObject>

export type BaseVariantGroups = Dictionary<Dictionary<StyleObject>>

export type SlotVariantGroups<S extends SlotGroups = SlotGroups> = Dictionary<
  Dictionary<Partial<Record<keyof S, StyleObject>>>
>

type CompoundVariantsSelection<
  V extends BaseVariantGroups | SlotVariantGroups,
> = {
  [K in keyof V]?: string extends K
    ? unknown
    : BooleanMap<keyof V[K]> | BooleanMap<keyof V[K]>[]
}

type VariantSelection<V extends BaseVariantGroups | SlotVariantGroups> = {
  [K in keyof V]?: string extends K ? unknown : BooleanMap<keyof V[K]>
}

interface RuntimeFn<V extends Record<string, any>, R> {
  (variants?: VariantSelection<V>): R
}

export type CombineVariants<
  V,
  E extends RecipeRuntimeFn | SlotRecipeRuntimeFn | undefined,
> = E extends RecipeRuntimeFn | SlotRecipeRuntimeFn
  ? V & E['__config']['variants']
  : V

export type UniteVariants<
  V,
  T extends RecipeRuntimeFn | SlotRecipeRuntimeFn | undefined,
  R,
  Key = T extends RecipeRuntimeFn | SlotRecipeRuntimeFn
    ? T['__config']['variants']
    : undefined,
> =
  | V
  | {
      [K in keyof Key]?: {
        [P in keyof Key[K]]?: R
      }
    }

export type RecipeConfig<
  V extends BaseVariantGroups = BaseVariantGroups,
  E extends RecipeRuntimeFn | undefined = undefined,
> = {
  base?: StyleObject
  variants?: UniteVariants<V, E, StyleObject>
  compoundVariants?: Array<
    CompoundVariantsSelection<CombineVariants<V, E>> & {
      css?: StyleObject
    }
  >
  defaultVariants?: VariantSelection<CombineVariants<V, E>>
}

export interface RecipeRuntimeFn<
  V extends BaseVariantGroups = BaseVariantGroups,
> extends RuntimeFn<V, StyleObject> {
  __recipe: true
  __config: RecipeConfig<V>
  variants: (keyof V)[]
}

export type UniteSlots<
  V,
  E extends SlotRecipeRuntimeFn | undefined,
  Key = E extends SlotRecipeRuntimeFn ? E['__config']['slots'] : undefined,
> =
  | V
  | {
      [K in keyof Key]: StyleObject
    }

type FilterIndexKey<T> = {
  [K in keyof T as string extends K ? never : K]: T[K]
}

export type CombineSlots<
  S,
  E extends SlotRecipeRuntimeFn | undefined,
  Key = E extends SlotRecipeRuntimeFn
    ? E['__config']['slots']
    : NonNullable<unknown>,
> = FilterIndexKey<
  S & {
    [K in keyof Key]: StyleObject
  }
>

export type SlotRecipeConfig<
  S extends SlotGroups = SlotGroups,
  E extends SlotRecipeRuntimeFn | undefined = undefined,
  V extends SlotVariantGroups<CombineSlots<S, E>> = SlotVariantGroups<
    CombineSlots<S, E>
  >,
> = {
  slots?: Partial<UniteSlots<S, E>>
  variants?: UniteVariants<
    V,
    E,
    {
      [K in keyof CombineSlots<S, E>]?: StyleObject
    }
  >
  compoundVariants?: Array<
    CompoundVariantsSelection<CombineVariants<V, E>> & {
      css?: {
        [K in keyof CombineSlots<S, E>]?: StyleObject
      }
    }
  >
  defaultVariants?: VariantSelection<CombineVariants<V, E>>
}

export interface SlotRecipeRuntimeFn<
  S extends SlotGroups = SlotGroups,
  V extends SlotVariantGroups<S> = SlotVariantGroups<S>,
> extends RuntimeFn<V, Record<keyof S, StyleObject>> {
  __slotRecipe: true
  __config: SlotRecipeConfig<S, undefined, V>
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
