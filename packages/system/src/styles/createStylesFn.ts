import { forEach, merge } from '@nex-ui/utils'
import type { CSSObject } from '@emotion/react'
import type { StyleObject } from '../types'
import type {
  VariantGroups,
  BaseStylesDefinition,
  SlotGroups,
  SlotStylesDefinition,
  StylesDefinition,
  RuntimeFn,
  VariantSelection,
  CompoundVariantsSelection,
  CreateStylesFnConfig,
} from './types'

export function createStylesFn({ normalize }: CreateStylesFnConfig) {
  function stylesFn<B extends StyleObject, V extends VariantGroups<B>>(
    options: BaseStylesDefinition<B, V>,
  ): RuntimeFn<V, CSSObject>

  function stylesFn<S extends SlotGroups, V extends VariantGroups<S>>(
    options: SlotStylesDefinition<S, V>,
  ): RuntimeFn<V, Record<keyof S, CSSObject>>

  function stylesFn<
    S extends SlotGroups | StyleObject,
    V extends VariantGroups<S>,
  >({
    colorPalette,
    ...options
  }: StylesDefinition<S, V>): RuntimeFn<
    V,
    CSSObject | Record<keyof S, CSSObject>
  > {
    const normalizedOptions = normalize(options, colorPalette)

    const { base, slots, variants, defaultVariants, compoundVariants } =
      normalizedOptions

    type CompoundVariants = CompoundVariantsSelection<V> & {
      css: S extends SlotGroups ? Record<keyof S, StyleObject> : StyleObject
    }

    function shouldApplyCompound(
      compoundCheck: CompoundVariantsSelection<V>,
      selections: VariantSelection<V>,
    ) {
      for (const key in compoundCheck) {
        if (Object.prototype.hasOwnProperty.call(compoundCheck, key)) {
          const variantValue = selections[key] ?? defaultVariants?.[key]
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

    function runtimeFn(styles: S, config: VariantSelection<V>): S {
      let mergedStyles = {
        ...styles,
      }

      const selections: VariantSelection<V> = {
        ...defaultVariants,
        ...config,
      }

      forEach(
        selections,
        (
          variantSelection: VariantSelection<V>[keyof V],
          variantName: keyof VariantSelection<V>,
        ) => {
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
        },
      )

      forEach(compoundVariants, (compoundVariant: CompoundVariants) => {
        const { css: compoundVariantCSS, ...compoundCheck } = compoundVariant

        if (shouldApplyCompound(compoundCheck as any, selections)) {
          mergedStyles = merge({}, mergedStyles, compoundVariantCSS)
        }
      })

      return mergedStyles
    }

    return (config: VariantSelection<V>) => {
      const isSlotsVariants = !!slots

      const styles = isSlotsVariants
        ? runtimeFn(slots, config)
        : runtimeFn(base, config)

      return styles
    }
  }

  return stylesFn
}

export type StylesFn = ReturnType<typeof createStylesFn>
