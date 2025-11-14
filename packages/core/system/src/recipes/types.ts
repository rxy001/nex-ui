import type { CSSObject, Dictionary } from '../types'

type IsIndexType<T> = string extends keyof T
  ? true
  : number extends keyof T
    ? true
    : symbol extends keyof T
      ? true
      : false

type FilterOutIndexType<T> = IsIndexType<T> extends true ? {} : T

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
  FilteredVariants = FilterOutIndexType<Variants>,
  FilteredExtendedVariants = FilterOutIndexType<ExtendedVariants>,
> = Array<
  {
    [K in
      | keyof FilteredVariants
      | keyof FilteredExtendedVariants]?: string extends K
      ? unknown
      :
            | (K extends keyof FilteredVariants
                ? keyof FilteredVariants[K]
                : never)
            | (K extends keyof FilteredExtendedVariants
                ? keyof FilteredExtendedVariants[K]
                : never) extends infer L
        ? BooleanMap<L> | BooleanMap<L[]>
        : never
  } & {
    css?: Value
  }
>

type VariantsSelection<
  Variants extends BaseVariantGroups | SlotVariantGroups,
  RuntimeFn extends
    | RecipeRuntimeFn
    | SlotRecipeRuntimeFn
    | undefined = undefined,
  ExtendedVariants = RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn
    ? Exclude<RuntimeFn['__config']['variants'], undefined>
    : {},
  FilteredVariants = FilterOutIndexType<Variants>,
  FilteredExtendedVariants = FilterOutIndexType<ExtendedVariants>,
> = {
  [K in
    | keyof FilteredVariants
    | keyof FilteredExtendedVariants]?: string extends K
    ? unknown
    : BooleanMap<
        | (K extends keyof FilteredVariants ? keyof FilteredVariants[K] : never)
        | (K extends keyof FilteredExtendedVariants
            ? keyof FilteredExtendedVariants[K]
            : never)
      >
}

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

export type MergeVariants<
  Variants,
  RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn | undefined,
> = RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn
  ? Exclude<RuntimeFn['__config']['variants'], undefined> extends infer V
    ? IsIndexType<V> extends true
      ? IsIndexType<Variants> extends true
        ? {}
        : Variants
      : IsIndexType<Variants> extends true
        ? V
        : V & Variants
    : {}
  : IsIndexType<Variants> extends true
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
  extend?: RuntimeFn
}

export interface RecipeRuntimeFn<
  Variants extends BaseVariantGroups = BaseVariantGroups,
> extends RuntimeFn<Variants, CSSObject> {
  __recipe: true
  __config: RecipeConfig<Variants>
  variants: (keyof Variants)[]
}

export type RuntimeFnSlots<RuntimeFn> = RuntimeFn extends SlotRecipeRuntimeFn
  ? Exclude<RuntimeFn['__config']['slots'], undefined> extends infer Slots
    ? IsIndexType<Slots> extends false
      ? {
          [K in keyof Slots]: CSSObject
        }
      : never
    : never
  : never

export type MergeSlots<
  Slots extends SlotGroups,
  RuntimeFn extends SlotRecipeRuntimeFn | undefined,
> = RuntimeFn extends SlotRecipeRuntimeFn
  ? IsIndexType<Slots> extends false
    ? {
        [K in keyof Slots | keyof RuntimeFnSlots<RuntimeFn>]: CSSObject
      }
    : {
        [K in keyof RuntimeFnSlots<RuntimeFn>]: CSSObject
      }
  : IsIndexType<Slots> extends false
    ? Slots
    : {}

export type SlotRecipeConfig<
  Slots extends SlotGroups,
  RuntimeFn extends SlotRecipeRuntimeFn | undefined = undefined,
  Variants extends SlotVariantGroups<
    MergeSlots<Slots, RuntimeFn>
  > = SlotVariantGroups<MergeSlots<Slots, RuntimeFn>>,
> = {
  slots?: Slots | Partial<RuntimeFnSlots<RuntimeFn>>
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
  extend?: RuntimeFn
}

export interface SlotRecipeRuntimeFn<
  Slots extends SlotGroups = SlotGroups,
  Variants extends SlotVariantGroups<Slots> = SlotVariantGroups<Slots>,
> extends RuntimeFn<Variants, Record<keyof Slots, CSSObject>> {
  __slotRecipe: true
  __config: SlotRecipeConfig<Slots, undefined, Variants>
  variants: (keyof Variants)[]
  slots: (keyof Slots)[]
}

export type RecipeVariants<
  RuntimeFn extends RecipeRuntimeFn | SlotRecipeRuntimeFn,
  Args = Parameters<RuntimeFn>[0],
> = Exclude<
  {
    [Key in keyof Args]-?: Args[Key]
  },
  undefined
>

export type RecipeSlots<RuntimeFn extends SlotRecipeRuntimeFn> =
  RuntimeFn['slots'][number]
