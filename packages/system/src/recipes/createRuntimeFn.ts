import { merge } from '@nex-ui/utils'
import { memoizeFn } from '../utils'

function shouldApplyCompound(compoundCheck: any, selections: any) {
  for (const key in compoundCheck) {
    if (Object.prototype.hasOwnProperty.call(compoundCheck, key)) {
      const variantSection = selections[key]
      if (
        !(
          (Array.isArray(compoundCheck[key]) &&
            compoundCheck[key]?.includes(variantSection)) ||
          compoundCheck[key] === variantSection
        )
      ) {
        return false
      }
    }
  }

  return true
}

export function createRuntimeFn(options: any) {
  const {
    mainStyles,
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
  } = options

  function splitVariantProps(props: any) {
    const variantKeys = Object.keys(variants)
    const result: any = {}

    variantKeys.forEach((key: any) => {
      if (props[key] !== undefined) result[key] = props[key]
    })

    return result
  }

  function runtimeFn(variantsProps: any = {}) {
    let mergedStyles = {
      ...mainStyles,
    }

    const selections = {
      ...defaultVariants,
      ...variantsProps,
    }

    for (const variantKey in selections) {
      // istanbul ignore if
      if (!Object.hasOwn(selections, variantKey)) continue

      const variantSection = selections[variantKey]

      if (variantSection !== null) {
        let selection = variantSection

        if (typeof selection === 'boolean') {
          selection = selection === true ? 'true' : 'false'
        }

        mergedStyles = merge({}, mergedStyles, variants[variantKey][selection])
      }
    }

    for (const compoundVariantKey in compoundVariants) {
      // istanbul ignore if
      if (!Object.hasOwn(compoundVariants, compoundVariantKey)) continue

      const compoundVariantValue = compoundVariants[compoundVariantKey]

      const { css: compoundVariantCSS, ...compoundCheck } = compoundVariantValue

      if (shouldApplyCompound(compoundCheck, selections)) {
        mergedStyles = merge({}, mergedStyles, compoundVariantCSS)
      }
    }

    return mergedStyles
  }

  const memoized = memoizeFn(runtimeFn)

  // @ts-ignore
  memoized.splitVariantProps = splitVariantProps
  return memoized
}
