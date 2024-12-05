import { forEach, merge, isArray } from '@nex-ui/utils'
import { memoizeFn } from '../utils'

export function createRuntimeFn(options?: any) {
  const {
    mainStyles,
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
  } = options ?? {}

  function shouldApplyCompound(compoundCheck: any, selections: any) {
    for (const key in compoundCheck) {
      if (Object.prototype.hasOwnProperty.call(compoundCheck, key)) {
        const variantValue = selections[key] ?? defaultVariants?.[key]
        if (
          !(
            (isArray(compoundCheck[key]) &&
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

  function runtimeFn(variantsProp: any) {
    let mergedStyles = {
      ...mainStyles,
    }

    const selections = {
      ...defaultVariants,
      ...variantsProp,
    }

    forEach(selections, (variantSelection: any, variantName: any) => {
      if (variantSelection !== null) {
        let selection = variantSelection as string | boolean

        if (typeof selection === 'boolean') {
          selection = selection === true ? 'true' : 'false'
        }
        mergedStyles = merge(
          {},
          mergedStyles,
          variants?.[variantName]?.[selection],
        )
      }
    })

    forEach(compoundVariants, (compoundVariant: any) => {
      const { css: compoundVariantCSS, ...compoundCheck } = compoundVariant

      if (shouldApplyCompound(compoundCheck as any, selections)) {
        mergedStyles = merge({}, mergedStyles, compoundVariantCSS)
      }
    })

    return mergedStyles
  }

  return memoizeFn(runtimeFn)
}
