import { forEach, merge, isArray } from '@nex-ui/utils'
import { memoizeFn } from '../utils'
import type { StyleObject } from '../types'
import type {
  BaseStylesDefinition,
  SlotGroups,
  SlotStylesDefinition,
  RuntimeFn,
  BaseVariantGroups,
  SlotVariantGroups,
} from './types'

export function createRuntimeFn(styles?: any) {
  const {
    mainStyles,
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
  } = styles ?? {}

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

  function splitVariantProps(props: any) {
    const variantKeys = Object.keys(variants)

    const result: any = {}

    forEach(variantKeys, (key: any) => {
      if (props[key] !== undefined) result[key] = props[key]
    })

    return result
  }

  const fn = memoizeFn(runtimeFn) as any

  fn.splitVariantProps = memoizeFn(splitVariantProps)

  return fn
}

export function createSvaFn() {
  function sva<S extends SlotGroups, V extends SlotVariantGroups<S>>(
    styles: SlotStylesDefinition<S, V>,
  ): RuntimeFn<V, Record<keyof S, StyleObject>> {
    const { slots, ...other } = styles
    if (slots) {
      return createRuntimeFn({
        mainStyles: slots,
        ...other,
      })
    }
    throw new Error()
  }

  return memoizeFn(sva)
}

export function createCvaFn() {
  function cva<V extends BaseVariantGroups>(
    styles: BaseStylesDefinition<V>,
  ): RuntimeFn<V, StyleObject> {
    const { base, ...other } = styles
    if (base) {
      return createRuntimeFn({
        mainStyles: base,
        ...other,
      })
    }
    throw new Error()
  }

  return memoizeFn(cva)
}

export type CvaFn = ReturnType<typeof createCvaFn>
export type SvaFn = ReturnType<typeof createSvaFn>
