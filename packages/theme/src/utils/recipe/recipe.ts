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
  CompoundVariantsSelection,
} from './types'
import { mapValues } from './mapValues'
import { createRuntimeFn } from './createRuntimeFn'

function processStyleRule(styleRule: StyleRule): string {
  if (typeof styleRule === 'string') {
    return styleRule
  }
  if (Array.isArray(styleRule)) {
    return styleRule.map((k) => processStyleRule(k)).join(' ')
  }
  if (Object.prototype.toString.call(styleRule) === '[object Object]') {
    return style(styleRule)
  }

  throw new Error(
    `ProcessStyleRule: This style rule is't supported ${styleRule}`,
  )
}

export function recipe<Variants extends VariantGroups, Base extends StyleRule>(
  options: Omit<RecipeOptions<Variants, Base, undefined>, 'slots'>,
): RuntimeFn<Variants, string>

export function recipe<
  Variants extends VariantGroups,
  Slots extends SlotGroups,
>(
  options: Omit<RecipeOptions<Variants, undefined, Slots>, 'base'>,
): RuntimeFn<Variants, SlotClasses<Slots>>

export function recipe<
  Variants extends VariantGroups,
  Base extends StyleRule,
  Slots extends SlotGroups,
>(
  options: RecipeOptions<Variants, Base, Slots>,
): RuntimeFn<Variants, SlotClasses<Slots> | string> {
  const {
    slots,
    base,
    variants = {},
    defaultVariants = {},
    compoundVariants,
  } = options

  let classes: SlotClasses<Slots> | string = ''
  const variantClasses = mapValues(variants, (variant) =>
    mapValues(variant, (styleRule) =>
      typeof styleRule === 'string' ? styleRule : style(styleRule),
    ),
  ) as VariantClasses<Variants>

  if (slots && typeof slots === 'object') {
    classes = mapValues(slots, processStyleRule)
  } else if (base !== undefined) {
    classes = processStyleRule(base)
  }
  function compoundStyle(styleRule: StyleRule | Slots) {
    if (styleRule && typeof styleRule === 'object') {
      const isSlotStyles = Object.keys(styleRule).every(
        (key) => !!variantClasses[key],
      )

      if (!isSlotStyles) {
        return style(styleRule)
      }

      return mapValues(styleRule as Slots, (slot) => {
        if (typeof slot === 'string') {
          return slot
        }
        return style(slot!)
      })
    }

    return styleRule
  }

  const compounds: Array<
    [CompoundVariantsSelection<Variants>, string | SlotClasses<Slots>]
  > = []

  if (compoundVariants) {
    for (const compound of compoundVariants) {
      const { style: cStyle, ...cVariants } = compound
      compounds.push([cVariants as any, compoundStyle(cStyle)])
    }
  }

  const config = {
    classes,
    variantClasses,
    defaultVariants,
    compoundVariants: compounds,
  }

  return addFunctionSerializer(createRuntimeFn(config), {
    importPath: '../../utils/vanllla-utils/recipe/createRuntimeFn',
    importName: 'createRuntimeFn',
    // @ts-ignore
    args: [config],
  })
}
