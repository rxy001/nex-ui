import type { ComplexStyleRule } from '@vanilla-extract/css'

export type Resolve<T> = {
  [Key in keyof T]: T[Key]
}

export type StyleRule = ComplexStyleRule | string

export type SlotGroups = Record<string, StyleRule>

export type VariantGroups = Record<string, Record<string, StyleRule>>

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

export type VariantSelection<Variants extends VariantGroups> = {
  [VariantGroup in keyof Variants]?: BooleanMap<keyof Variants[VariantGroup]>
}

export type CompoundVariantsSelection<Variants extends VariantGroups> = {
  [VariantGroup in keyof Variants]?:
    | BooleanMap<keyof Variants[VariantGroup]>
    | BooleanMap<keyof Variants[VariantGroup]>[]
}

export type CompoundVariants<Variants extends VariantGroups, Slots> = Array<
  CompoundVariantsSelection<Variants> & {
    style: Slots extends SlotGroups
      ? Record<keyof Slots, StyleRule> | StyleRule
      : StyleRule
  }
>

export type RecipeOptions<
  Variants extends VariantGroups,
  Base extends StyleRule | undefined,
  Slots extends SlotGroups | undefined = undefined,
> = {
  base?: Base
  slots?: Slots
  variants?: Variants
  defaultVariants?: VariantSelection<Variants>
  compoundVariants?: CompoundVariants<Variants, Slots>
}

export type VariantClasses<Variants extends VariantGroups> = {
  [P in keyof Variants]: {
    [PP in keyof Variants[P]]: string
  }
}

export type SlotClasses<Slots extends SlotGroups> = {
  [p in keyof Slots]: string
}

export type RuntimeConfig<Variants extends VariantGroups, Classes> = {
  classes: Classes
  variantClasses: VariantClasses<Variants>
  defaultVariants: VariantSelection<Variants>
  compoundVariants?: Array<[CompoundVariantsSelection<Variants>, Classes]>
}

export type RuntimeFn<Variants extends VariantGroups, SlotCls> = (
  options?: Resolve<VariantSelection<Variants>>,
) => SlotCls

export type RecipeVariants<RecipeFn extends RuntimeFn<VariantGroups, any>> =
  Parameters<RecipeFn>[0]
