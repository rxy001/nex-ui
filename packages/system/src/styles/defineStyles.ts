import type {
  SlotGroups,
  BaseStylesDefinition,
  SlotStylesDefinition,
  BaseVariantGroups,
  SlotVariantGroups,
} from './types'

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
