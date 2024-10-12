import type {
  SlotGroups,
  BaseStylesDefinition,
  SlotStylesDefinition,
  BaseVariantGroups,
  SlotVariantGroups,
} from './types'

/**
 *
 * defineStyles 支持两种 style 定义, 并且支持多种变体
 *
 * 1. baseStyles:
 * {
 *   base: StyleObject,
 *   variants: Record<VariantKey, Record<VariantValue, StyleObject>>,
 *   compoundVariants: Array<Record<VariantKey, VariantValue | VariantValue[]> & { css: StyleObject}>
 *   defaultVariants: Record<VariantKey, VariantValue>,
 *
 *   // StyleObject 中属性值 colorPalette 的值， 例如 color: colorPalette.500, colorPalette: 'blue', 在 normalize 时会被转换为 color: blue.500
 *   colorPalette: string
 * }
 *
 * 例如：
 * const baseStyles = {
 *  base: {
 *    display: 'flex'
 *  },
 *  variants: {
 *    visual: {
 *      solid: { bg: 'red.200', color: 'white' },
 *      outline: { borderWidth: '1px', borderColor: 'red.200' }
 *    },
 *    size: {
 *      sm: { padding: '4', fontSize: '12px' },
 *      lg: { padding: '8', fontSize: '24px' }
 *    }
 *  }
 * }
 *
 * const style = styles(baseStyles)({ visual: 'solid' }), 当 visual 为 solid 时,
 * style 为 { display: 'flex', bg: 'red.200', color: 'white' }
 *
 * 2. slotStyles
 *
 * {
 *   slots: Record<SlotKey, StyleObject>,
 *
 *   // 被选中 variants 将会根据 SlotKey 合并到 slots 。
 *   variants: Record<VariantKey, Record<VariantValue, Record<SlotKey, StyleObject>>>,
 *   compoundVariants: Array<Record<VariantKey, VariantValue | VariantValue[]> & { css: Record<SlotKey, StyleObject>}>
 *   defaultVariants: Record<VariantKey, VariantValue>,
 *
 *   // StyleObject 中属性值 colorPalette 的值， 例如 color: colorPalette.500, colorPalette: 'blue', 在 normalize 时会被转换为 color: blue.500
 *   colorPalette: string
 * }
 */

export function defineBaseStyles<V extends BaseVariantGroups>(
  options: BaseStylesDefinition<V>,
) {
  return options
}

export function defineSlotStyles<
  S extends SlotGroups,
  V extends SlotVariantGroups<S>,
>(options: SlotStylesDefinition<S, V>) {
  return options
}
