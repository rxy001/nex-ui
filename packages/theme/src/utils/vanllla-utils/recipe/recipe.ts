import { style } from '@vanilla-extract/css'
import { addFunctionSerializer } from '@vanilla-extract/css/functionSerializer'
import type {
  RecipeOptions,
  VariantGroups,
  SlotGroups,
  VariantClasses,
  RuntimeFn,
  StyleRule,
  SlotClasses,
} from './types'
import { mapValues } from './mapValues'
import { createRuntimeFn } from './createRuntimeFn'

export function recipe<Variants extends VariantGroups, Base extends StyleRule>(
  options: Pick<
    RecipeOptions<Variants, Base>,
    'base' | 'defaultVariants' | 'variants'
  >,
): RuntimeFn<Variants, string>

export function recipe<
  Variants extends VariantGroups,
  Slots extends SlotGroups,
>(
  options: Pick<
    RecipeOptions<Variants, undefined, Slots>,
    'slots' | 'defaultVariants' | 'variants'
  >,
): RuntimeFn<Variants, SlotClasses<Slots>>

export function recipe<
  Variants extends VariantGroups,
  Base extends StyleRule,
  Slots extends SlotGroups,
>(
  options: RecipeOptions<Variants, Base, Slots>,
): RuntimeFn<Variants, SlotClasses<Slots> | string> {
  const { variants = {}, defaultVariants = {}, slots, base } = options

  let slotClasses: SlotClasses<Slots> | string = ''
  const variantClasses = mapValues(variants, (variant) =>
    mapValues(variant, (styleRule) =>
      typeof styleRule === 'string' ? styleRule : style(styleRule),
    ),
  ) as VariantClasses<Variants>

  if (base) {
    if (typeof base === 'string') {
      slotClasses = base
    } else if (typeof base === 'object') {
      slotClasses = style(base)
    }
  } else if (slots) {
    slotClasses = mapValues(slots, (slot) => {
      if (typeof slot === 'string') {
        return slot
      }
      return style(slot)
    })
  }

  const config = {
    variantClasses,
    defaultVariants,
    slotClasses,
  }

  return addFunctionSerializer(createRuntimeFn(config), {
    importPath: '../../utils/vanllla-utils/recipe/createRuntimeFn',
    importName: 'createRuntimeFn',
    // @ts-ignore
    args: [config],
  })
}
