import type {
  VariantGroups,
  RuntimeConfig,
  RuntimeFn,
  VariantSelection,
  CompoundVariantsSelection,
} from './types'

const shouldApplyCompound = <Variants extends VariantGroups>(
  compoundCheck: CompoundVariantsSelection<Variants>,
  selections: VariantSelection<Variants>,
  defaultVariants: VariantSelection<Variants>,
) => {
  for (const key in compoundCheck) {
    if (Object.prototype.hasOwnProperty.call(compoundCheck, key)) {
      const variantValue = selections[key] ?? defaultVariants[key]
      if (
        !(
          (Array.isArray(compoundCheck[key]) &&
            // @ts-ignore
            compoundCheck[key]?.includes(variantValue)) ||
          compoundCheck[key] === variantValue
        )
      ) {
        return false
      }
    }
  }

  return true
}

export function createRuntimeFn<Variants extends VariantGroups, SlotCls>(
  config: RuntimeConfig<Variants, SlotCls>,
): RuntimeFn<Variants, SlotCls> {
  return (options) => {
    const {
      variantClasses,
      defaultVariants,
      classes,
      compoundVariants = [],
    } = config

    const selections: VariantSelection<Variants> = {
      ...defaultVariants,
      ...options,
    }

    const variantSelectedClasses = {} as Record<keyof Variants, string>

    for (const variantName in selections) {
      if (Object.prototype.hasOwnProperty.call(selections, variantName)) {
        const variantSelection =
          selections[variantName] ?? defaultVariants[variantName]

        if (variantSelection != null) {
          let selection = variantSelection as string | boolean

          if (typeof selection === 'boolean') {
            selection = selection === true ? 'true' : 'false'
          }

          const selectionCls = variantClasses[variantName][selection]

          if (selectionCls) {
            variantSelectedClasses[variantName] = selectionCls
          }
        }
      }
    }

    if (classes && typeof classes === 'object') {
      const slotClasses = { ...classes } as any

      for (const variantName in variantSelectedClasses) {
        if (
          Object.prototype.hasOwnProperty.call(
            variantSelectedClasses,
            variantName,
          )
        ) {
          const selectedClasses = variantSelectedClasses[variantName]

          if (slotClasses[variantName]) {
            slotClasses[variantName] += ` ${selectedClasses}`
          }
        }
      }

      for (const [compoundCheck, compoundClassName] of compoundVariants) {
        if (shouldApplyCompound(compoundCheck, selections, defaultVariants)) {
          for (const slotName in compoundClassName) {
            if (
              Object.prototype.hasOwnProperty.call(compoundClassName, slotName)
            ) {
              slotClasses[slotName] += ` ${compoundClassName[slotName]}`
            }
          }
        }
      }

      return slotClasses
    }

    let baseClass = classes as string
    for (const variantName in variantSelectedClasses) {
      if (
        Object.prototype.hasOwnProperty.call(
          variantSelectedClasses,
          variantName,
        )
      ) {
        baseClass += ` ${variantSelectedClasses[variantName]}`
      }
    }

    for (const [compoundCheck, compoundClassName] of compoundVariants) {
      if (shouldApplyCompound(compoundCheck, selections, defaultVariants)) {
        baseClass += ` ${compoundClassName}`
      }
    }

    return baseClass
  }
}
