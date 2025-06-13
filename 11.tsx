import type { CSSObject, Dictionary } from '../types'

export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false

type FilterEmptyObject<T> = Equal<T, {}> extends true ? never : T

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

export type SlotGroups = Dictionary<CSSObject>

export type BaseVariantGroups = Dictionary<Dictionary<CSSObject>>

export type SlotVariantGroups<S extends SlotGroups = SlotGroups> = Dictionary<
  Dictionary<Partial<Record<keyof S, CSSObject>>>
>

type CompoundVariantsSelection<
  Variants extends BaseVariantGroups | SlotVariantGroups,
  RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn | undefined,
  Value,
  ExtendedVariants = RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn
    ? Exclude<RuntimeFn['__config']['variants'], undefined>
    : {},
> = {
  [K in keyof Variants | keyof ExtendedVariants as string extends K
    ? never
    : K]?: string extends K
    ? unknown
    :
          | (K extends keyof Variants ? keyof Variants[K] : never)
          | (K extends keyof ExtendedVariants
              ? keyof ExtendedVariants[K]
              : never) extends infer L
      ? BooleanMap<L> | BooleanMap<L>[]
      : never
} extends infer L
  ? Equal<L, {}> extends true
    ? []
    : (L & { css: Value })[]
  : []

type VariantsSelection<
  Variants extends BaseVariantGroups | SlotVariantGroups,
  RuntimeFn extends
    | RecipeRuntimeFn
    | SlotRecipeRuntimeFn
    | undefined = undefined,
  ExtendedVariants = RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn
    ? Exclude<RuntimeFn['__config']['variants'], undefined>
    : {},
> = FilterEmptyObject<{
  [K in keyof Variants | keyof ExtendedVariants as string extends K
    ? never
    : K]?: string extends K
    ? unknown
    : BooleanMap<
        | (K extends keyof Variants ? keyof Variants[K] : never)
        | (K extends keyof ExtendedVariants ? keyof ExtendedVariants[K] : never)
      >
}>

interface RuntimeFn<V extends Record<string, any>, R> {
  (variants?: VariantsSelection<V>): R
  splitVariantProps: (props: Record<string, any>) => VariantsSelection<V>
}

export type RuntimeFnVariants<
  RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn | undefined,
  Value,
> = RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn
  ? Exclude<RuntimeFn['__config']['variants'], undefined> extends infer L
    ? {
        [K in keyof L]?: {
          [P in keyof L[K]]?: Value
        }
      }
    : never
  : never

type IndexType<T> = { [k: string]: any } extends T ? true : false

export type MergeVariants<
  Variants,
  RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn | undefined,
> = RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn
  ? Exclude<RuntimeFn['__config']['variants'], undefined> extends infer V
    ? IndexType<V> extends true
      ? IndexType<Variants> extends true
        ? {}
        : Variants
      : IndexType<Variants> extends true
        ? V
        : V & Variants
    : {}
  : IndexType<Variants> extends true
    ? {}
    : Variants

export type RecipeConfig<
  Variants extends BaseVariantGroups,
  RuntimeFn extends RecipeRuntimeFn | undefined = undefined,
> = {
  base?: CSSObject
  variants?: Variants | RuntimeFnVariants<RuntimeFn, CSSObject>
  compoundVariants?: CompoundVariantsSelection<Variants, RuntimeFn, CSSObject>
  defaultVariants?: VariantsSelection<Variants, RuntimeFn>
  extends?: RuntimeFn
}

export interface RecipeRuntimeFn<
  Variants extends BaseVariantGroups = BaseVariantGroups,
> extends RuntimeFn<Variants, CSSObject> {
  __recipe: true
  __config: RecipeConfig<Variants>
  variants: (keyof Variants)[]
}

type RuntimeFnSlots<
  RuntimeFn,
  Keys = RuntimeFn extends SlotRecipeRuntimeFn
    ? RuntimeFn['__config']['slots']
    : {},
> = {
  [K in keyof Keys]?: CSSObject
}

type FilterIndexType<T> = {
  [K in keyof T as string extends K ? never : K]: T[K]
}

export type MergeSlots<
  Slots extends SlotGroups,
  RuntimeFn extends SlotRecipeRuntimeFn | undefined,
> = RuntimeFn extends SlotRecipeRuntimeFn
  ? FilterIndexType<Slots> & RuntimeFnSlots<RuntimeFn>
  : Slots

export type SlotRecipeConfig<
  Slots extends SlotGroups = SlotGroups,
  RuntimeFn extends SlotRecipeRuntimeFn | undefined = undefined,
  Variants extends SlotVariantGroups<
    MergeSlots<Slots, RuntimeFn>
  > = SlotVariantGroups<MergeSlots<Slots, RuntimeFn>>,
> = {
  slots?: Slots & RuntimeFnSlots<RuntimeFn>
  variants?:
    | Variants
    | RuntimeFnVariants<
        RuntimeFn,
        Partial<Record<keyof MergeSlots<Slots, RuntimeFn>, CSSObject>>
      >
  compoundVariants?: CompoundVariantsSelection<
    Variants,
    RuntimeFn,
    Partial<Record<keyof MergeSlots<Slots, RuntimeFn>, CSSObject>>
  >
  defaultVariants?: VariantsSelection<Variants, RuntimeFn>
}

export interface SlotRecipeRuntimeFn<
  S extends SlotGroups = SlotGroups,
  V extends SlotVariantGroups<S> = SlotVariantGroups<S>,
> extends RuntimeFn<V, Record<keyof S, CSSObject>> {
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
    [Key in keyof V]-?: V[Key]
  },
  undefined
>

export type RecipeSlots<RecipeFn extends SlotRecipeRuntimeFn> =
  RecipeFn['slots'][number]
