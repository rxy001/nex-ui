import { forEach, every } from '@nex-ui/utils'
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
  // @ts-ignore
  return every(compoundCheck, (value, key) => {
    const variantValue = selections[key] ?? defaultVariants[key]
    return (
      (Array.isArray(value) &&
        // @ts-ignore
        value?.includes(variantValue)) ||
      value === variantValue
    )
  })
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

    // @ts-ignore
    forEach(selections, (value, variantName: keyof Variants) => {
      const variantSelection = value ?? defaultVariants[variantName]

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
    })

    if (classes && typeof classes === 'object') {
      const slotClasses = { ...classes } as any

      // @ts-ignore
      forEach(variantSelectedClasses, (selectedClasses, variantName) => {
        if (slotClasses[variantName]) {
          slotClasses[variantName] += ` ${selectedClasses}`
        }
      })

      // @ts-ignore
      forEach(compoundVariants, ([compoundCheck, compoundClassName]) => {
        if (shouldApplyCompound(compoundCheck, selections, defaultVariants)) {
          for (const slotName in compoundClassName) {
            if (
              Object.prototype.hasOwnProperty.call(compoundClassName, slotName)
            ) {
              slotClasses[slotName] += ` ${compoundClassName[slotName]}`
            }
          }
        }
      })

      return slotClasses
    }

    let baseClass = classes as string

    // @ts-ignore
    forEach(variantSelectedClasses, (variantClass) => {
      baseClass += ` ${variantClass}`
    })

    // @ts-ignore
    forEach(compoundVariants, ([compoundCheck, compoundClassName]) => {
      if (shouldApplyCompound(compoundCheck, selections, defaultVariants)) {
        baseClass += ` ${compoundClassName}`
      }
    })

    return baseClass
  }
}
