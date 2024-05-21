/* eslint-disable no-restricted-syntax */
import {
  VariantGroups,
  RuntimeConfig,
  RuntimeFn,
  VariantSelection,
} from './types'

export function createRuntimeFn<Variants extends VariantGroups, SlotCls>(
  config: RuntimeConfig<Variants, SlotCls>,
): RuntimeFn<Variants, SlotCls> {
  return (options) => {
    const { variantClasses, defaultVariants, slotClasses } = config

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

    if (typeof slotClasses === 'string') {
      let baseClass = slotClasses as any
      for (const variantName in variantSelectedClasses) {
        if (
          Object.prototype.hasOwnProperty.call(
            variantSelectedClasses,
            variantName,
          )
        ) {
          baseClass = `${baseClass} ${variantSelectedClasses[variantName]}`
        }
      }

      return baseClass
    }

    if (slotClasses && typeof slotClasses === 'object') {
      const classes = slotClasses as any

      // eslint-disable-next-line no-restricted-syntax
      for (const variantName in variantSelectedClasses) {
        if (
          Object.prototype.hasOwnProperty.call(
            variantSelectedClasses,
            variantName,
          )
        ) {
          const selectedClasses = variantSelectedClasses[variantName]

          if (classes[variantName]) {
            classes[variantName] = `${classes[variantName]} ${selectedClasses}`
          }
        }
      }

      return slotClasses
    }

    return ''
  }
}
