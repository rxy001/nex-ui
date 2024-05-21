import type { ComplexStyleRule } from '@vanilla-extract/css'

export type Resolve<T> = {
  [Key in keyof T]: T[Key]
}

export type StyleRule = ComplexStyleRule | string

type StyleDefinations = Record<string, StyleRule>

export type SlotGroups = Record<string, StyleRule>

export type VariantGroups = Record<string, StyleDefinations>

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

export type VariantSelection<Variants extends VariantGroups> = {
  [VariantGroup in keyof Variants]?: BooleanMap<keyof Variants[VariantGroup]>
}

export type RecipeOptions<
  Variants extends VariantGroups,
  Base extends StyleRule | undefined,
  Slots extends SlotGroups | undefined = undefined,
> = {
  base?: Base
  slots?: Slots
  variants?: Variants
  defaultVariants?: VariantSelection<Variants>
}

export type VariantClasses<Variants extends VariantGroups> = {
  [P in keyof Variants]: {
    [PP in keyof Variants[P]]: string
  }
}

export type SlotClasses<Slots extends SlotGroups> = {
  [p in keyof Slots]: string
}

export type RuntimeConfig<Variants extends VariantGroups, SlotsCls> = {
  slotClasses: SlotsCls
  variantClasses: VariantClasses<Variants>
  defaultVariants: VariantSelection<Variants>
}

export type RuntimeFn<Variants extends VariantGroups, SlotCls> = (
  options?: Resolve<VariantSelection<Variants>>,
) => SlotCls

export type RecipeVariants<RecipeFn extends RuntimeFn<VariantGroups, any>> =
  Parameters<RecipeFn>[0]
