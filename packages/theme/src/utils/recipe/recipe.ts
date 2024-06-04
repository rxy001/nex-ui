import { style, generateIdentifier, globalStyle } from '@vanilla-extract/css'
import type { StyleRule as OriginalStyleRule } from '@vanilla-extract/css'
import { forEach, isPlainObject } from '@nex-ui/utils'
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

function filterNonNullableStyle(styleRule: OriginalStyleRule) {
  const filtered: OriginalStyleRule = {}
  forEach(styleRule, (value, key) => {
    if (value !== null && value !== undefined) {
      // @ts-ignore
      filtered[key] = isPlainObject(value)
        ? // @ts-ignore
          filterNonNullableStyle(value)
        : value
    }
  })
  return filtered
}

function processStyle(styleRule: StyleRule, whereSelector?: boolean): string {
  if (typeof styleRule === 'string') {
    return styleRule
  }
  if (Array.isArray(styleRule)) {
    return styleRule.map((k) => processStyle(k, whereSelector)).join(' ')
  }
  if (whereSelector === true && isPlainObject(styleRule)) {
    const className = generateIdentifier()
    globalStyle(`:where(.${className})`, filterNonNullableStyle(styleRule))
    return className
  }

  if (isPlainObject(styleRule)) {
    return style(filterNonNullableStyle(styleRule))
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
    mapValues(variant, (styleRule) => processStyle(styleRule)),
  ) as VariantClasses<Variants>

  if (slots && typeof slots === 'object') {
    classes = mapValues(slots, (value) => processStyle(value, true))
  } else if (base !== undefined) {
    classes = processStyle(base, true)
  }

  function compoundStyle(styleRule: StyleRule | Slots) {
    if (styleRule && typeof styleRule === 'object') {
      const isSlotStyles = Object.keys(styleRule).every(
        (key) => !!variantClasses[key],
      )

      if (!isSlotStyles) {
        return processStyle(styleRule)
      }

      return mapValues(styleRule as Slots, (slot) => processStyle(slot))
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
    importPath:
      process.env.NODE_ENV === 'production'
        ? '@nex-ui/theme'
        : '../../utils/recipe/createRuntimeFn',
    importName: 'createRuntimeFn',
    // @ts-ignore
    args: [config],
  })
}
