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
    CSSObject | Record<string, CSSObject>
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

    function baseRuntimeFn(config: VariantSelection<V>): StyleObject {
      const selections: VariantSelection<V> = {
        ...defaultVariants,
        ...config,
      }

      let style: StyleObject = {
        ...base,
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
            style = merge({}, style, variants?.[variantName]?.[selection])
          }
        },
      )

      forEach(compoundVariants, (compoundVariant: CompoundVariants) => {
        const { css: compoundVariantCSS, ...compoundCheck } = compoundVariant

        if (shouldApplyCompound(compoundCheck as any, selections)) {
          style = merge({}, style, compoundVariantCSS)
        }
      })

      return style
    }

    function slotRuntimeFn(config: VariantSelection<V>) {
      const selections: VariantSelection<V> = {
        ...defaultVariants,
        ...config,
      }

      let styles = {
        ...slots,
      } as SlotGroups

      forEach(
        selections,
        (
          variantSelection: VariantSelection<V>[keyof V],
          variantName: string,
        ) => {
          if (variantSelection !== null) {
            let selection = variantSelection as string | boolean

            if (typeof selection === 'boolean') {
              selection = selection === true ? 'true' : 'false'
            }
            styles = merge({}, styles, styles?.[variantName]?.[selection])
          }
        },
      )

      forEach(compoundVariants, (compoundVariant: CompoundVariants) => {
        const { css: compoundVariantCSS, ...compoundCheck } = compoundVariant
        if (shouldApplyCompound(compoundCheck as any, selections)) {
          styles = merge({}, styles, compoundVariantCSS)
        }
      })
      return styles
    }

    return (config: VariantSelection<V>) => {
      const isSlotsVariants = !!slots

      const styles = isSlotsVariants
        ? slotRuntimeFn(config)
        : baseRuntimeFn(config)

      return styles
    }
  }

  return stylesFn
}

export type StylesFn = ReturnType<typeof createStylesFn>
